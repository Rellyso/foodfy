const cards = document.querySelectorAll('.card')
const modalOverlay = document.querySelector('.modal-overlay')
const modalImg = modalOverlay.querySelector('.modal__img img')
const modalTitle = modalOverlay.querySelector('.modal__desc h2')
const modalAuthor = modalOverlay.querySelector('.modal__desc p')


for (let card of cards) {
    card.addEventListener('click', function () {

        modalOverlay.classList.add('active')
        modalImg.src = card.querySelector('figure img').src
        modalAuthor.innerHTML = card.querySelector('.card__content p').textContent
        modalTitle.innerHTML = card.querySelector('.card__content h3').textContent
    })
}

modalOverlay.querySelector('.modal .close__modal a').addEventListener('click', function () {
    modalOverlay.classList.remove('active')
    modalImg.src = ''
    modalAuthor.innerHTML = ''
    modalTitle.innerHTML = ''
})
