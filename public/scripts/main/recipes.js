const cards = document.querySelectorAll('.card')


for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        cardIndex = i
        window.location.href = `recipes/${i}`
    })
}