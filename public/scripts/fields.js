const addIngredientBtn = document.querySelector('.add-ingredient')
const addPreparationBtn = document.querySelector('.add-step')

function deleteIngredient(length) {
    const deleteIngredientBtns = document.querySelectorAll('.ingredient-delete-button')
    const fieldContainer = document.querySelectorAll('.ingredient')
    let count = fieldContainer.length
    
    for (let i = 0; i < length; i++) {
        deleteIngredientBtns[i].addEventListener('click', function() {
            
            if (count > 1) {
                const confirmation = window.confirm('Deseja exclui o campo?')
                if (confirmation) {
                    fieldContainer[i].remove()
                    count--
                }
            } else {
                alert('Você não pode excluir todos os campos!')
            }
        })
    }
}
function deletePreparation(length) {
    const deletePreparationBtns = document.querySelectorAll('.preparation-delete-button')
    const fieldContainer = document.querySelectorAll('.preparation')
    let count = fieldContainer.length

    for (let i = 0; i < length; i++) {
        
        deletePreparationBtns[i].addEventListener('click', function() {
            
            if (count > 1) {
                fieldContainer[i].remove()
                count = count - 1
            } else {
                alert('Você não pode excluir todos os campos!')
            }
        })
    }
}
function onLoadPage() {
    deleteIngredient(document.querySelector(".ingredients").children.length)
    deletePreparation(document.querySelector(".preparations").children.length)
}

document
    .querySelector("body")
    .addEventListener('load', onLoadPage())

addIngredientBtn.addEventListener('click', function () {
    const fatherDiv = document.querySelector('#ingredients .ingredients'),
          fieldContainer = document.querySelectorAll('.ingredient')

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == 0) return false

    newField.children[0].value = ""
    fatherDiv.appendChild(newField)
    deleteIngredient(fatherDiv.children.length)
})


addPreparationBtn.addEventListener('click', function () {
    const fatherDiv = document.querySelector('#steps .preparations'),
          fieldContainer = document.querySelectorAll('.preparation')

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == 0) return false

    newField.children[0].value = ""
    fatherDiv.appendChild(newField)
    deletePreparation(fatherDiv.children.length)
})
