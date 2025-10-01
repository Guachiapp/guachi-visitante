**Guachi Web**

***Node version: v20.18.0***
***Npm version: 11.0.0***


```bash
>npm install

>node minify.js

>npm run build

```

Datos complementarios acceso visitantes. Campos de Seguridad.


## 🧱 1. Crear el enlace simbólico desde `/srv` a tu carpeta en `/home`

```bash
sudo ln -s /home/guachi/files/visitas /srv/guachi/visitas
```

Esto crea el alias visible como:

```bash
/srv/guachi/visitas → /home/guachi/files/visitas
```

---

## 🔐 2. Ajustar permisos de directorios para que `www-data` pueda atravesarlos

Nginx necesita permiso de **ejecución (`x`)** en cada directorio de la ruta. Ejecuta:

```bash
chmod o+x /home
chmod o+x /home/guachi
chmod o+x /home/guachi/files
chmod o+x /home/guachi/files/visitas
```

Esto permite que cualquier usuario (incluido `www-data`) pueda **navegar** por la estructura de carpetas.

---

## 📂 3. Dar permisos de lectura a los archivos servidos

Para que Nginx pueda leer las imágenes:

```bash
chmod -R o+r /home/guachi/files/visitas
```

---
