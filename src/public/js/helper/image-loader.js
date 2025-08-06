function loadImage(inputImagen, imagenPrevisualizada) {
    const archivo = inputImagen.files[0];
    const reader = new FileReader();


    reader.onload = () => {
        console.log('cargando imagen');
        reduceImage(reader.result, inputImagen, imagenPrevisualizada)
        imagenPrevisualizada.src = reader.result;
    };

    reader.readAsDataURL(archivo);
}

function reduceImage(src, inputImagen, imagenPrevisualizada) {
    const img = new Image();
    img.src = src; //e.target.result
    const file = inputImagen.files[0];
    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxSize = 128 * 128 //1024 * 1024; // 1MB
        let width = img.width;
        let height = img.height;

        // Redimensionar la imagen si es mayor a 1MB
        if (file.size > maxSize) {
            const scaleFactor = Math.sqrt(maxSize / file.size);
            width *= scaleFactor;
            height *= scaleFactor;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a base64
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Ajusta la calidad según sea necesario
        //imagenPrevisualizada.src = dataUrl;

        // Guardar el dataUrl en un campo oculto para enviarlo con el formulario
        console.log(`imagen a guardar en campo oculto ${inputImagen.id}imagenBase64:`)
        console.log(`${dataUrl.split(',')[1]}`)
        document.getElementById(inputImagen.id + 'Base64').value = dataUrl.split(',')[1];
    };

}

function resizeImage(inputImagen, imagenPrevisualizada) {
    const archivo = inputImagen.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        console.log('reajustando imagen');
        // Obtener el ancho y alto del elemento de la imagen previsualizada
        const imagenAncho = imagenPrevisualizada.naturalWidth;
        const imagenAlto = imagenPrevisualizada.naturalHeight;
        console.log(imagenAncho);
        console.log(imagenAlto);

        // Escalar la imagen proporcionalmente para que se ajuste al ancho del contenedor
        const contenedorAncho = imagenPrevisualizada.parentNode.offsetWidth; // Ancho del contenedor padre
        const escala = contenedorAncho / imagenAncho;

        imagenPrevisualizada.width = imagenAncho * escala;
        imagenPrevisualizada.height = imagenAlto * escala;

    };

    reader.readAsDataURL(archivo);
}

function mostrarImagenPrevisualizada(inputImagen, imagenPrevisualizada) {
    console.log(inputImagen);
    console.log(imagenPrevisualizada);
    const fileSize = inputImagen.files[0].size;

    const MAX_WIDTH = 600; // Ancho máximo en píxeles
    const MAX_HEIGHT = 600; // Alto máximo en píxeles
    const MB = 1048576;
    console.log(`fileSize: ${fileSize}`);
    /*if (fileSize > (MB)) {
      inputImagen.value = "";
      alert('La imagen no puede superar un tamaño aproximado de 1 MB.');
      return;
    }*/

    loadImage(inputImagen, imagenPrevisualizada);
    setTimeout(() => {
        resizeImage(inputImagen, imagenPrevisualizada);
    }, 10);

}

export { mostrarImagenPrevisualizada };