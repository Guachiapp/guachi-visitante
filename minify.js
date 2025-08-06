const fs = require('fs');
const path = require('path');
const uglifyJS = require('uglify-js');
const cssmin = require('cssmin');

const inputFolder = 'src';
const outputFolder = 'dist';

// Crear carpeta de salida si no existe
fs.mkdirSync(outputFolder, { recursive: true });

// Función para crear directorios en la carpeta de salida
function createOutputDir(filePath) {
  const relativeDir = path.dirname(path.relative(inputFolder, filePath));
  const targetDir = path.join(outputFolder, relativeDir);
  fs.mkdirSync(targetDir, { recursive: true });
  return targetDir;
}

// Procesar archivos
function processFiles() {
  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        const ext = path.extname(entry.name);
        const relativePath = path.relative(inputFolder, fullPath);
        const outputPath = path.join(outputFolder, relativePath);
        createOutputDir(fullPath);

        if (ext === '.js') {
          const code = fs.readFileSync(fullPath, 'utf8');
          const result = uglifyJS.minify(code);
          if (result.error) {
            console.error(`Error minificando ${fullPath}:`, result.error);
          } else {
            fs.writeFileSync(outputPath, result.code, 'utf8');
          }
        } else if (ext === '.css') {
          const content = fs.readFileSync(fullPath, 'utf8');
          fs.writeFileSync(outputPath, cssmin(content), 'utf8');
        } else {
          fs.copyFileSync(fullPath, outputPath);
        }
      }
    }
  };

  walk(inputFolder);
}

processFiles();
