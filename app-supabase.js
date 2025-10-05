// Estado de la aplicación
let cursoSeleccionado = null;
let asignaturaSeleccionada = null;
let trimestreFiltro = 'todos';
let cargando = false;

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
async function init() {
    try {
        mostrarCargando('Conectando con la base de datos...');

        // Inicializar Supabase
        api.init();

        // Test de conexión
        const conexionOk = await api.testConexion();

        if (!conexionOk) {
            mostrarError('No se pudo conectar con la base de datos. Verifica tu configuración en config.js');
            return;
        }

        // Cargar cursos
        await cargarCursos();
        configurarEventListeners();

        ocultarCargando();
    } catch (error) {
        console.error('Error en inicialización:', error);
        mostrarError('Error al inicializar la aplicación: ' + error.message);
    }
}

// Cargar cursos desde Supabase
async function cargarCursos() {
    try {
        const cursos = await api.obtenerCursos();

        cursoSelect.innerHTML = '<option value="">-- Elige un curso --</option>';

        cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.id_curso;
            option.textContent = curso.nombre;
            cursoSelect.appendChild(option);
        });

        console.log(`✅ ${cursos.length} cursos cargados`);
    } catch (error) {
        console.error('Error al cargar cursos:', error);
        mostrarError('Error al cargar los cursos');
        throw error;
    }
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
async function handleCursoChange(e) {
    const cursoId = parseInt(e.target.value);

    if (!cursoId) {
        resetearVista();
        return;
    }

    try {
        mostrarCargando('Cargando curso...');

        cursoSeleccionado = await api.obtenerCursoPorId(cursoId);
        await cargarAsignaturas(cursoId);

        asignaturaContainer.style.display = 'block';
        ocultarCargando();
    } catch (error) {
        console.error('Error al cambiar curso:', error);
        mostrarError('Error al cargar el curso');
    }
}

// Cargar asignaturas del curso seleccionado
async function cargarAsignaturas(cursoId) {
    try {
        asignaturaSelect.innerHTML = '<option value="">-- Elige una asignatura --</option>';

        const asignaturas = await api.obtenerAsignaturas(cursoId);

        asignaturas.forEach(asignatura => {
            const option = document.createElement('option');
            option.value = asignatura.id_asignatura;
            option.textContent = `${asignatura.nombre}${asignatura.codigo ? ' (' + asignatura.codigo + ')' : ''}`;
            asignaturaSelect.appendChild(option);
        });

        console.log(`✅ ${asignaturas.length} asignaturas cargadas`);
    } catch (error) {
        console.error('Error al cargar asignaturas:', error);
        throw error;
    }
}

// Manejo de cambio de asignatura
async function handleAsignaturaChange(e) {
    const asignaturaId = parseInt(e.target.value);

    if (!asignaturaId) {
        ocultarContenido();
        return;
    }

    try {
        mostrarCargando('Cargando unidades didácticas...');

        asignaturaSeleccionada = await api.obtenerAsignaturaPorId(asignaturaId);
        mostrarInformacion();
        await cargarUnidades(asignaturaId);

        ocultarCargando();
    } catch (error) {
        console.error('Error al cambiar asignatura:', error);
        mostrarError('Error al cargar la asignatura');
    }
}

// Mostrar información del curso y asignatura
function mostrarInformacion() {
    infoTitulo.textContent = `${asignaturaSeleccionada.nombre} - ${cursoSeleccionado.nombre}`;
    infoNivel.textContent = cursoSeleccionado.nivel;
    infoComunidad.textContent = cursoSeleccionado.comunidad;
    infoNormativa.textContent = cursoSeleccionado.normativa;
    infoDescripcion.textContent = asignaturaSeleccionada.descripcion || '';

    infoSection.style.display = 'block';
    filtroSection.style.display = 'block';
    emptyState.style.display = 'none';
}

// Cargar unidades didácticas desde Supabase
async function cargarUnidades(asignaturaId) {
    try {
        const trimestreParam = trimestreFiltro === 'todos' ? null : parseInt(trimestreFiltro);
        const unidades = await api.obtenerUnidadesConSaberes(asignaturaId, trimestreParam);

        renderizarUnidades(unidades);
        unidadesSection.style.display = 'block';

        console.log(`✅ ${unidades.length} unidades cargadas`);
    } catch (error) {
        console.error('Error al cargar unidades:', error);
        throw error;
    }
}

// Renderizar unidades
function renderizarUnidades(unidades) {
    unidadesContainer.innerHTML = '';

    if (unidades.length === 0) {
        unidadesContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <p style="font-size: 1.2rem;">No hay unidades para este trimestre</p>
            </div>
        `;
        return;
    }

    unidades.forEach(unidad => {
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
async function handleFiltroClick(e) {
    const btn = e.target;

    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Actualizar filtro
    trimestreFiltro = btn.dataset.trimestre;

    // Re-cargar unidades desde Supabase
    if (asignaturaSeleccionada) {
        try {
            mostrarCargando('Filtrando unidades...');
            await cargarUnidades(asignaturaSeleccionada.id_asignatura);
            ocultarCargando();
        } catch (error) {
            console.error('Error al filtrar:', error);
            mostrarError('Error al filtrar las unidades');
        }
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

// ==================== UTILIDADES DE CARGA ====================

function mostrarCargando(mensaje = 'Cargando...') {
    cargando = true;

    // Crear overlay si no existe
    let overlay = document.getElementById('loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>${mensaje}</p>
        </div>
    `;
    overlay.style.display = 'flex';
}

function ocultarCargando() {
    cargando = false;
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function mostrarError(mensaje) {
    ocultarCargando();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <span>${mensaje}</span>
            <button onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;

    document.body.appendChild(errorDiv);

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Iniciar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
