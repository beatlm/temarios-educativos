# 📚 Temarios Educativos - Aplicación Web

Aplicación web moderna para consultar temarios educativos organizados por cursos y asignaturas, con integración a Supabase.

## 🚀 Características

- ✨ Diseño moderno y responsive
- 🎨 Interfaz intuitiva y amigable
- 📱 Compatible con dispositivos móviles
- 🔍 Filtrado por trimestre
- 🌐 Conexión en tiempo real con Supabase
- 📊 Visualización clara de unidades didácticas y saberes básicos

## 📁 Estructura del Proyecto

```
Aprende/
├── index.html              # Versión con datos estáticos
├── index-supabase.html     # Versión con Supabase
├── styles.css              # Estilos CSS
├── app.js                  # Lógica (versión estática)
├── app-supabase.js         # Lógica (versión Supabase)
├── data.js                 # Datos estáticos
├── config.js               # Configuración de Supabase
├── api.js                  # Servicio de API para Supabase
└── scripts/
    └── script_mates_4.sql  # Script de base de datos
```

## 🛠️ Configuración con Supabase

### Paso 1: Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota la URL del proyecto y la clave anon key

### Paso 2: Ejecutar el script SQL

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Copia y pega el contenido del archivo `scripts/script_mates_4.sql`
3. Ejecuta el script para crear las tablas e insertar datos

### Paso 3: Configurar credenciales

Edita el archivo `config.js` y reemplaza los valores:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://tu-proyecto.supabase.co', // Tu URL de Supabase
    anonKey: 'tu-anon-key-aqui'             // Tu clave anon key
};
```

### Paso 4: Configurar políticas RLS (Row Level Security)

En Supabase, ve a **Authentication > Policies** y configura las políticas para permitir lectura pública:

**Para cada tabla (cursos, asignaturas, unidades_didacticas, saberes_basicos):**

```sql
-- Permitir lectura pública
CREATE POLICY "Permitir lectura pública" ON nombre_tabla
FOR SELECT
USING (true);
```

O desactiva RLS temporalmente (solo para desarrollo):

```sql
ALTER TABLE cursos DISABLE ROW LEVEL SECURITY;
ALTER TABLE asignaturas DISABLE ROW LEVEL SECURITY;
ALTER TABLE unidades_didacticas DISABLE ROW LEVEL SECURITY;
ALTER TABLE saberes_basicos DISABLE ROW LEVEL SECURITY;
```

## 🎯 Uso

### Versión con datos estáticos

Abre `index.html` en tu navegador. Los datos están hardcodeados y no requiere configuración adicional.

### Versión con Supabase

1. Configura las credenciales en `config.js`
2. Abre `index-supabase.html` en tu navegador
3. La aplicación se conectará automáticamente a Supabase

## 📊 Base de Datos

### Tablas

- **cursos**: Información de cursos académicos
- **asignaturas**: Asignaturas por curso
- **unidades_didacticas**: Unidades didácticas por asignatura
- **saberes_basicos**: Saberes básicos de cada unidad

### Relaciones

```
cursos (1) ──→ (N) asignaturas
asignaturas (1) ──→ (N) unidades_didacticas
unidades_didacticas (1) ──→ (N) saberes_basicos
```

## 🎨 Personalización

### Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #06b6d4;
    --accent-color: #f59e0b;
    /* ... más variables */
}
```

### Funcionalidades

- `app-supabase.js`: Lógica de la aplicación con Supabase
- `api.js`: Servicio de API con métodos para consultar datos
- `config.js`: Configuración de credenciales

## 🔧 Desarrollo Local

### Opción 1: Servidor local simple

```bash
# Python 3
python -m http.server 8000

# Node.js con npx
npx serve
```

Luego abre `http://localhost:8000` en tu navegador.

### Opción 2: Live Server (VS Code)

1. Instala la extensión "Live Server"
2. Click derecho en `index-supabase.html`
3. Selecciona "Open with Live Server"

## 📝 API de Supabase

### Métodos disponibles

```javascript
// Cursos
await api.obtenerCursos()
await api.obtenerCursoPorId(id)

// Asignaturas
await api.obtenerAsignaturas(cursoId)
await api.obtenerAsignaturaPorId(id)

// Unidades
await api.obtenerUnidades(asignaturaId, trimestre)
await api.obtenerUnidadPorId(id)

// Saberes
await api.obtenerSaberes(unidadId)

// Consultas combinadas
await api.obtenerUnidadesConSaberes(asignaturaId, trimestre)
await api.obtenerDatosCompletos(cursoId, asignaturaId)
```

## 🐛 Solución de Problemas

### Error: "No se pudo conectar con la base de datos"

- Verifica que las credenciales en `config.js` sean correctas
- Asegúrate de que el proyecto de Supabase esté activo
- Revisa la consola del navegador para más detalles

### Error: "No hay datos"

- Verifica que hayas ejecutado el script SQL completo
- Revisa las políticas RLS en Supabase
- Verifica que las tablas tengan datos

### Error de CORS

- Supabase maneja CORS automáticamente
- Asegúrate de usar HTTPS o localhost para desarrollo

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles iOS/Android

## 🤝 Contribuir

Para agregar más cursos o asignaturas:

1. Edita el script SQL en `scripts/script_mates_4.sql`
2. Ejecuta el script actualizado en Supabase
3. Los cambios se reflejarán automáticamente en la aplicación

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 🔗 Enlaces útiles

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Decreto 61/2022 BOCAM](https://www.bocm.es)

---

**Desarrollado con ❤️ para la educación**
