const hideBtns = document.querySelectorAll('.recipe__content span')
const content = document.querySelectorAll('.content__content')


for (let i = 0; i < hideBtns.length; i++) {
    hideBtns[i].addEventListener("click", () => {
        content[i].classList.toggle('active')
        
        if (hideBtns[i].textContent === 'mostrar' && content[i].className.indexOf('active') != -1) {
            hideBtns[i].textContent = 'esconder'
        } else if (hideBtns[i].textContent === 'esconder' && content[i].className.indexOf('active') == -1) {
            hideBtns[i].textContent = 'mostrar'
        }
    })
}