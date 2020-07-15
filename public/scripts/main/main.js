const links = document.querySelectorAll('header .links a')

const currentPage = location.pathname

for (let link of links) {
    if (currentPage.includes(link.getAttribute('href'))) {
        link.classList.add('active')
    }
}