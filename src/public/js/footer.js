fetch('public/shared/footer.htm')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el footer:', error));


document.addEventListener('DOMContentLoaded', function () {
    //var header = document.querySelector('.footer');
    //header.style.backgroundImage = "url('/images/Serranía_Guatire.jpg')";
});
