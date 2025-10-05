# 🚀 Guía de Despliegue en Netlify

Esta guía te ayudará a desplegar la aplicación de Temarios Educativos en Netlify.

## 📋 Prerrequisitos

1. Una cuenta en [Netlify](https://www.netlify.com/) (gratis)
2. Una cuenta en [Supabase](https://supabase.com/) (gratis)
3. Git instalado en tu computadora
4. Haber configurado Supabase con el script SQL

## 🔧 Método 1: Despliegue con Git (Recomendado)

### Paso 1: Preparar el repositorio

```bash
# Inicializar git en el proyecto (si no lo has hecho)
cd /Volumes/HDD/Proyectos/Aprende
git init

# Agregar todos los archivos EXCEPTO config.js
git add .
git commit -m "Initial commit"
```

### Paso 2: Crear repositorio en GitHub/GitLab

1. Ve a [GitHub](https://github.com) o [GitLab](https://gitlab.com)
2. Crea un nuevo repositorio llamado `temarios-educativos`
3. NO inicialices con README (ya tienes archivos)

### Paso 3: Subir el código

```bash
# Conectar con el repositorio remoto
git remote add origin https://github.com/TU_USUARIO/temarios-educativos.git

# Subir el código
git branch -M main
git push -u origin main
```

### Paso 4: Configurar en Netlify

1. Inicia sesión en [Netlify](https://app.netlify.com)
2. Click en **"Add new site"** → **"Import an existing project"**
3. Selecciona tu proveedor Git (GitHub/GitLab)
4. Autoriza a Netlify a acceder a tus repositorios
5. Selecciona el repositorio `temarios-educativos`
6. Configuración del despliegue:
   - **Build command:** (dejar vacío)
   - **Publish directory:** `.` (punto)
   - Click en **"Deploy site"**

### Paso 5: Configurar variables de entorno

1. En Netlify, ve a **Site settings** → **Environment variables**
2. Click en **"Add a variable"** → **"Add a single variable"**
3. Agrega estas variables:

```
Key: SUPABASE_URL
Value: https://tu-proyecto.supabase.co

Key: SUPABASE_ANON_KEY
Value: tu-anon-key-aqui
```

### Paso 6: Crear archivo de configuración para producción

Crea un archivo `config.prod.js` en tu repositorio:

```javascript
const SUPABASE_CONFIG = {
    url: window.SUPABASE_URL || 'TU_SUPABASE_URL',
    anonKey: window.SUPABASE_ANON_KEY || 'TU_SUPABASE_ANON_KEY'
};
```

Actualiza `index-supabase.html` para usar este archivo en producción.

---

## 🎯 Método 2: Despliegue Manual (Drag & Drop)

### Paso 1: Preparar archivos

1. Edita `config.js` con tus credenciales de Supabase
2. Asegúrate de que todos los archivos estén listos

### Paso 2: Crear ZIP

```bash
# Crear un archivo ZIP con todos los archivos necesarios
cd /Volumes/HDD/Proyectos/Aprende
zip -r temarios.zip . -x "*.git*" -x "node_modules/*" -x "scripts/*" -x "prompts/*"
```

### Paso 3: Subir a Netlify

1. Ve a [Netlify](https://app.netlify.com)
2. En el dashboard, arrastra la carpeta del proyecto (o el ZIP) a la zona de "drag and drop"
3. Netlify desplegará automáticamente

⚠️ **IMPORTANTE:** Este método incluirá `config.js` con tus credenciales. Para producción, usa el Método 1.

---

## 🔐 Método 3: Variables de Entorno con _redirects

### Paso 1: Crear archivo _redirects

Crea un archivo `public/_redirects`:

```
/*    /index-supabase.html   200
```

### Paso 2: Usar variables de entorno de Netlify

Modifica `config.js` para usar variables de entorno:

```javascript
const SUPABASE_CONFIG = {
    url: process.env.SUPABASE_URL || 'TU_SUPABASE_URL',
    anonKey: process.env.SUPABASE_ANON_KEY || 'TU_SUPABASE_ANON_KEY'
};
```

---

## 🌐 Configuración de Dominio Personalizado

### En Netlify:

1. Ve a **Domain settings**
2. Click en **"Add custom domain"**
3. Ingresa tu dominio (ej: `temarios.tudominio.com`)
4. Sigue las instrucciones para configurar DNS

---

## ✅ Verificación Post-Despliegue

Después del despliegue, verifica:

1. ✅ La página carga correctamente
2. ✅ Se conecta a Supabase (ver indicador verde)
3. ✅ Los cursos se cargan desde la base de datos
4. ✅ Las asignaturas y unidades funcionan
5. ✅ El filtro por trimestre funciona

---

## 🐛 Solución de Problemas

### Error: "No se pudo conectar con la base de datos"

**Causa:** Credenciales incorrectas o no configuradas

**Solución:**
- Verifica las variables de entorno en Netlify
- Asegúrate de que `config.js` tenga las credenciales correctas
- Verifica que el proyecto de Supabase esté activo

### Error: CORS o "Access Denied"

**Causa:** Políticas de seguridad de Supabase

**Solución:**
```sql
-- En Supabase SQL Editor, ejecuta:
ALTER TABLE cursos DISABLE ROW LEVEL SECURITY;
ALTER TABLE asignaturas DISABLE ROW LEVEL SECURITY;
ALTER TABLE unidades_didacticas DISABLE ROW LEVEL SECURITY;
ALTER TABLE saberes_basicos DISABLE ROW LEVEL SECURITY;
```

### Error: "Site not found"

**Causa:** Build fallido o configuración incorrecta

**Solución:**
- Revisa los logs de deploy en Netlify
- Verifica que `netlify.toml` esté en la raíz del proyecto
- Asegúrate de que todos los archivos necesarios estén en el repo

---

## 📊 Monitoreo y Analytics

### Netlify Analytics (Opcional)

1. En Netlify, ve a **Analytics**
2. Activa Netlify Analytics ($9/mes)
3. Obtén estadísticas de tráfico, pageviews, etc.

### Google Analytics (Gratis)

Agrega a `index-supabase.html` antes del `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU_ID');
</script>
```

---

## 🔄 Actualizaciones Continuas

Para actualizar la aplicación:

```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción de cambios"
git push

# Netlify desplegará automáticamente
```

---

## 📱 Configuración PWA (Opcional)

Para convertir en Progressive Web App:

1. Crea `manifest.json`
2. Agrega Service Worker
3. Configura iconos
4. Netlify servirá automáticamente con HTTPS

---

## 🎉 ¡Listo!

Tu aplicación estará disponible en:
- URL temporal: `https://random-name-123456.netlify.app`
- Puedes cambiar el nombre en Site Settings → Site details

---

## 📞 Soporte

- [Documentación de Netlify](https://docs.netlify.com/)
- [Documentación de Supabase](https://supabase.com/docs)
- [Issues del proyecto](https://github.com/TU_USUARIO/temarios-educativos/issues)
