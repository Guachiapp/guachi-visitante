function loadHeader() {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    const checkbox = document.getElementById('menu');
    const menu = document.querySelector('.menu');
    
    function applyMenuBackground() {
        if (mediaQuery.matches && checkbox.checked) {
            menu.style.backgroundColor = '#111';
        } else {
            menu.style.backgroundColor = ''; // Restablecer el color a su valor original
        }
    }

    // Llama a la función cuando la media query cambia
    mediaQuery.addEventListener('change', applyMenuBackground);

    // Llama a la función cuando el estado del checkbox cambia
    checkbox.addEventListener('change', applyMenuBackground);

    // Llama a la función en la carga inicial de la página
    applyMenuBackground();
}
fetch('public/shared/header.htm')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        loadHeader();
    })
    .catch(error => console.error('Error al cargar el header:', error));




document.addEventListener('DOMContentLoaded', function () {
    //var header = document.querySelector('.header');
    //header.style.backgroundImage = "url('/images/Serranía_Guatire.jpg')";

});
