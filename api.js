// Servicio de API para conexión con Supabase
class SupabaseAPI {
    constructor() {
        this.client = null;
        this.initialized = false;
    }

    // Inicializar cliente de Supabase
    init() {
        try {
            if (!window.supabase) {
                throw new Error('Supabase client no está cargado');
            }

            this.client = window.supabase.createClient(
                SUPABASE_CONFIG.url,
                SUPABASE_CONFIG.anonKey
            );

            this.initialized = true;
            console.log('✅ Conexión con Supabase establecida');
        } catch (error) {
            console.error('❌ Error al inicializar Supabase:', error);
            this.initialized = false;
        }
    }

    // Verificar si está inicializado
    checkInitialized() {
        if (!this.initialized) {
            throw new Error('Supabase no está inicializado. Llama a init() primero.');
        }
    }

    // ==================== CURSOS ====================

    async obtenerCursos() {
        this.checkInitialized();

        try {
            const { data, error } = await this.client
                .from('cursos')
                .select('*')
                .order('id_curso', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener cursos:', error);
            throw error;
        }
    }

    async obtenerCursoPorId(id) {
        this.checkInitialized();

        try {
            const { data, error } = await this.client
                .from('cursos')
                .select('*')
                .eq('id_curso', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener curso:', error);
            throw error;
        }
    }

    // ==================== ASIGNATURAS ====================

    async obtenerAsignaturas(cursoId = null) {
        this.checkInitialized();

        try {
            let query = this.client
                .from('asignaturas')
                .select('*');

            if (cursoId) {
                query = query.eq('id_curso', cursoId);
            }

            query = query.order('id_asignatura', { ascending: true });

            const { data, error } = await query;

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener asignaturas:', error);
            throw error;
        }
    }

    async obtenerAsignaturaPorId(id) {
        this.checkInitialized();

        try {
            const { data, error } = await this.client
                .from('asignaturas')
                .select('*')
                .eq('id_asignatura', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener asignatura:', error);
            throw error;
        }
    }

    // ==================== UNIDADES DIDÁCTICAS ====================

    async obtenerUnidades(asignaturaId = null, trimestre = null) {
        this.checkInitialized();

        try {
            let query = this.client
                .from('unidades_didacticas')
                .select('*');

            if (asignaturaId) {
                query = query.eq('id_asignatura', asignaturaId);
            }

            if (trimestre) {
                query = query.eq('trimestre', trimestre);
            }

            query = query.order('numero_unidad', { ascending: true });

            const { data, error } = await query;

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener unidades:', error);
            throw error;
        }
    }

    async obtenerUnidadPorId(id) {
        this.checkInitialized();

        try {
            const { data, error } = await this.client
                .from('unidades_didacticas')
                .select('*')
                .eq('id_unidad', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener unidad:', error);
            throw error;
        }
    }

    // ==================== SABERES BÁSICOS ====================

    async obtenerSaberes(unidadId) {
        this.checkInitialized();

        try {
            const { data, error } = await this.client
                .from('saberes_basicos')
                .select('*')
                .eq('id_unidad', unidadId)
                .order('orden', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener saberes:', error);
            throw error;
        }
    }

    // ==================== CONSULTAS COMBINADAS ====================

    async obtenerUnidadesConSaberes(asignaturaId, trimestre = null) {
        this.checkInitialized();

        try {
            // Obtener unidades
            const unidades = await this.obtenerUnidades(asignaturaId, trimestre);

            // Obtener saberes para cada unidad
            const unidadesConSaberes = await Promise.all(
                unidades.map(async (unidad) => {
                    const saberes = await this.obtenerSaberes(unidad.id_unidad);
                    return {
                        id: unidad.id_unidad,
                        id_asignatura: unidad.id_asignatura,
                        numero: unidad.numero_unidad,
                        titulo: unidad.titulo,
                        objetivo: unidad.objetivo,
                        trimestre: unidad.trimestre,
                        saberes: saberes.map(s => s.descripcion)
                    };
                })
            );

            return unidadesConSaberes;
        } catch (error) {
            console.error('Error al obtener unidades con saberes:', error);
            throw error;
        }
    }

    async obtenerDatosCompletos(cursoId, asignaturaId) {
        this.checkInitialized();

        try {
            const [curso, asignatura, unidades] = await Promise.all([
                this.obtenerCursoPorId(cursoId),
                this.obtenerAsignaturaPorId(asignaturaId),
                this.obtenerUnidadesConSaberes(asignaturaId)
            ]);

            return {
                curso,
                asignatura,
                unidades
            };
        } catch (error) {
            console.error('Error al obtener datos completos:', error);
            throw error;
        }
    }

    // ==================== UTILIDADES ====================

    async testConexion() {
        this.checkInitialized();

        try {
            const { data, error } = await this.client
                .from('cursos')
                .select('count')
                .limit(1);

            if (error) throw error;

            console.log('✅ Test de conexión exitoso');
            return true;
        } catch (error) {
            console.error('❌ Test de conexión fallido:', error);
            return false;
        }
    }
}

// Crear instancia global de la API
const api = new SupabaseAPI();
