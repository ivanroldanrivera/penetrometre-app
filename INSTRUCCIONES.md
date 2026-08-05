# 📱 PDL App — Instalación en iPhone via GitHub Pages

## Paso 1 — Crear el repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `pdl-app`  
3. Visibilidad: **Public** (necesario para GitHub Pages gratis)
4. Clic en **Create repository**

---

## Paso 2 — Subir los 3 ficheros

En la página del repositorio vacío, clic en **"uploading an existing file"**

Sube los 3 ficheros de esta carpeta:
- `index.html`
- `sw.js`
- `manifest.json`

Clic en **Commit changes**

---

## Paso 3 — Activar GitHub Pages

1. En tu repositorio → pestaña **Settings**
2. En el menú izquierdo → **Pages**
3. En "Branch" → selecciona **main** → carpeta **/ (root)**
4. Clic en **Save**

⏳ Espera 1-2 minutos. GitHub te dará una URL del tipo:  
`https://TU_USUARIO.github.io/pdl-app`

---

## Paso 4 — Instalar en iPhone

1. Abre Safari en tu iPhone
2. Ve a tu URL: `https://TU_USUARIO.github.io/pdl-app`
3. Toca el botón **Compartir** (cuadrado con flecha ↑)
4. → **"Añadir a pantalla de inicio"**
5. → **Añadir**

✅ La app aparece en tu pantalla de inicio como cualquier app nativa.

---

## ¿Cómo funciona offline?

La primera vez que abres la URL con conexión, el Service Worker descarga y guarda todos los ficheros en la memoria del iPhone. A partir de entonces, **la app funciona sin red**, incluso en zona sin cobertura.

Los datos se guardan en el almacenamiento local del iPhone (localStorage). Para mayor seguridad, **exporta el CSV al final de cada sondaje**.

---

## Actualizar la app en el futuro

Si quieres modificar algo, sube el nuevo `index.html` a GitHub y edita `sw.js`:  
Cambia `pdl-v1` por `pdl-v2` para forzar la actualización en los dispositivos.

---

## Para Android

Abre la misma URL en Chrome → menú (⋮) → **"Añadir a pantalla de inicio"**  
Funciona exactamente igual, también offline.
