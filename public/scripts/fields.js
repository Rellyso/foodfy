const addIngredientBtn = document.querySelector('.add-ingredient')
const addPreparationBtn = document.querySelector('.add-step')


addIngredientBtn.addEventListener('click', function () {
    const fatherDiv = document.querySelector('#ingredients .ingredient')
    const fieldContainer = document.querySelectorAll('.ingredient')

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == 0) return false

    newField.children[0].value = ""
    fatherDiv.appendChild(newField)
})
addPreparationBtn.addEventListener('click', function () {
    const fatherDiv = document.querySelector('#steps .preparation')
    const fieldContainer = document.querySelectorAll('.preparation')

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == 0) return false

    newField.children[0].value = ""
    fatherDiv.appendChild(newField)
})

