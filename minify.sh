#!/bin/bash

# Carpeta de entrada
input_folder="src"

# Carpeta de salida
output_folder="dist"

# Crear carpeta de salida si no existe
mkdir -p "$output_folder"

# Función para crear directorios en la carpeta de salida
create_output_dir() {
    dir="$output_folder/$(dirname "${1#$input_folder/}")"
    mkdir -p "$dir"
}

# Minificar y ofuscar archivos JavaScript
find "$input_folder" -type f -name '*.js' | while read -r file; do
    output_file="$output_folder/${file#$input_folder/}"
    create_output_dir "$file"
    ./node_modules/.bin/uglifyjs "$file" -o "$output_file" --compress --mangle
done

# Minificar y copiar archivos CSS
find "$input_folder" -type f -name '*.css' | while read -r file; do
    output_file="$output_folder/${file#$input_folder/}"
    create_output_dir "$file"
    ./node_modules/.bin/cssmin "$file" > "$output_file"
done

# Copiar otros archivos
find "$input_folder" -type f ! -name '*.css' ! -name '*.js' | while read -r file; do
    output_file="$output_folder/${file#$input_folder/}"
    create_output_dir "$file"
    cp "$file" "$output_file"
done


#Dar Permisos 
#chmod +x minify.sh
