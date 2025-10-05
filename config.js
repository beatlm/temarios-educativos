// Configuración de Supabase desde variables de entorno
export const SUPABASE_CONFIG = {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
};

// Validación de configuración
if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
    console.error('⚠️ ERROR: Variables de entorno de Supabase no configuradas. Verifica tu archivo .env');
}
