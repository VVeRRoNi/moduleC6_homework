const btn = document.querySelector('#btn')

btn.addEventListener('click', () => {
    widthscreen = window.screen.width;
    heightscreen = window.screen.height;
    alert(`Экран устройства имеет ширину: ${widthscreen} px и высоту ${heightscreen} px`)
})