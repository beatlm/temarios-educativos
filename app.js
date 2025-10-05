// Estado de la aplicación
let cursoSeleccionado = null;
let asignaturaSeleccionada = null;
let trimestreFiltro = 'todos';

// Referencias DOM
const cursoSelect = document.getElementById('curso-select');
const asignaturaContainer = document.getElementById('asignatura-container');
const asignaturaSelect = document.getElementById('asignatura-select');
const infoSection = document.getElementById('info-section');
const filtroSection = document.getElementById('filtro-section');
const unidadesSection = document.getElementById('unidades-section');
const emptyState = document.getElementById('empty-state');
const unidadesContainer = document.getElementById('unidades-container');

// Elementos de información
const infoTitulo = document.getElementById('info-titulo');
const infoNivel = document.getElementById('info-nivel');
const infoComunidad = document.getElementById('info-comunidad');
const infoNormativa = document.getElementById('info-normativa');
const infoDescripcion = document.getElementById('info-descripcion');

// Inicialización
function init() {
    cargarCursos();
    configurarEventListeners();
}

// Cargar cursos en el selector
function cargarCursos() {
    data.cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id;
        option.textContent = curso.nombre;
        cursoSelect.appendChild(option);
    });
}

// Configurar event listeners
function configurarEventListeners() {
    cursoSelect.addEventListener('change', handleCursoChange);
    asignaturaSelect.addEventListener('change', handleAsignaturaChange);

    // Filtros de trimestre
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    filtroButtons.forEach(btn => {
        btn.addEventListener('click', handleFiltroClick);
    });
}

// Manejo de cambio de curso
function handleCursoChange(e) {
    const cursoId = parseInt(e.target.value);

    if (!cursoId) {
        resetearVista();
        return;
    }

    cursoSeleccionado = data.cursos.find(c => c.id === cursoId);
    cargarAsignaturas(cursoId);
    asignaturaContainer.style.display = 'block';
}

// Cargar asignaturas del curso seleccionado
function cargarAsignaturas(cursoId) {
    // Limpiar selector
    asignaturaSelect.innerHTML = '<option value="">-- Elige una asignatura --</option>';

    const asignaturas = data.asignaturas.filter(a => a.id_curso === cursoId);

    asignaturas.forEach(asignatura => {
        const option = document.createElement('option');
        option.value = asignatura.id;
        option.textContent = `${asignatura.nombre} (${asignatura.codigo})`;
        asignaturaSelect.appendChild(option);
    });
}

// Manejo de cambio de asignatura
function handleAsignaturaChange(e) {
    const asignaturaId = parseInt(e.target.value);

    if (!asignaturaId) {
        ocultarContenido();
        return;
    }

    asignaturaSeleccionada = data.asignaturas.find(a => a.id === asignaturaId);
    mostrarInformacion();
    cargarUnidades(asignaturaId);
}

// Mostrar información del curso y asignatura
function mostrarInformacion() {
    infoTitulo.textContent = `${asignaturaSeleccionada.nombre} - ${cursoSeleccionado.nombre}`;
    infoNivel.textContent = cursoSeleccionado.nivel;
    infoComunidad.textContent = cursoSeleccionado.comunidad;
    infoNormativa.textContent = cursoSeleccionado.normativa;
    infoDescripcion.textContent = asignaturaSeleccionada.descripcion;

    infoSection.style.display = 'block';
    filtroSection.style.display = 'block';
    emptyState.style.display = 'none';
}

// Cargar unidades didácticas
function cargarUnidades(asignaturaId) {
    const unidades = data.unidades.filter(u => u.id_asignatura === asignaturaId);
    renderizarUnidades(unidades);
    unidadesSection.style.display = 'block';
}

// Renderizar unidades
function renderizarUnidades(unidades) {
    unidadesContainer.innerHTML = '';

    // Filtrar por trimestre si es necesario
    const unidadesFiltradas = trimestreFiltro === 'todos'
        ? unidades
        : unidades.filter(u => u.trimestre === parseInt(trimestreFiltro));

    if (unidadesFiltradas.length === 0) {
        unidadesContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <p style="font-size: 1.2rem;">No hay unidades para este trimestre</p>
            </div>
        `;
        return;
    }

    unidadesFiltradas.forEach(unidad => {
        const unidadCard = crearUnidadCard(unidad);
        unidadesContainer.appendChild(unidadCard);
    });
}

// Crear card de unidad didáctica
function crearUnidadCard(unidad) {
    const card = document.createElement('div');
    card.className = 'unidad-card';

    const saberesHTML = unidad.saberes.map((saber, index) => `
        <li class="saber-item">
            <span class="saber-numero">${index + 1}</span>
            <span class="saber-descripcion">${saber}</span>
        </li>
    `).join('');

    card.innerHTML = `
        <div class="unidad-header">
            <div class="unidad-title-group">
                <div class="unidad-numero">Unidad ${unidad.numero}</div>
                <h3 class="unidad-titulo">${unidad.titulo}</h3>
            </div>
            <span class="trimestre-badge trimestre-${unidad.trimestre}">
                ${unidad.trimestre}º Trimestre
            </span>
        </div>
        <div class="unidad-body">
            <div class="unidad-objetivo">
                <span class="objetivo-label">🎯 Objetivo</span>
                <p class="objetivo-text">${unidad.objetivo}</p>
            </div>
            <h4 class="saberes-titulo">📋 Saberes Básicos</h4>
            <ul class="saberes-lista">
                ${saberesHTML}
            </ul>
        </div>
    `;

    return card;
}

// Manejo de filtro por trimestre
function handleFiltroClick(e) {
    const btn = e.target;

    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Actualizar filtro
    trimestreFiltro = btn.dataset.trimestre;

    // Re-renderizar unidades
    if (asignaturaSeleccionada) {
        cargarUnidades(asignaturaSeleccionada.id);
    }
}

// Ocultar contenido
function ocultarContenido() {
    infoSection.style.display = 'none';
    filtroSection.style.display = 'none';
    unidadesSection.style.display = 'none';
    emptyState.style.display = 'block';
}

// Resetear vista
function resetearVista() {
    cursoSeleccionado = null;
    asignaturaSeleccionada = null;
    trimestreFiltro = 'todos';

    asignaturaContainer.style.display = 'none';
    asignaturaSelect.innerHTML = '<option value="">-- Elige una asignatura --</option>';

    ocultarContenido();

    // Resetear filtro de trimestre
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-trimestre="todos"]').classList.add('active');
}

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', init);
