const addIngredientBtn = document.querySelector('.add-ingredient')
const addPreparationBtn = document.querySelector('.add-step')

function deleteIngredient(length) {
    const deleteIngredientBtns = document.querySelectorAll('.ingredient-delete-button')
    const fieldContainer = document.querySelectorAll('.ingredient')
    let count = fieldContainer.length

    for (let i = 0; i < length; i++) {
        deleteIngredientBtns[i].addEventListener('click', function () {

            if (count > 1) {
                const confirmation = window.confirm('Deseja exclui o campo?')
                if (confirmation) {
                    fieldContainer[i].remove()
                    count--
                }
            }
            if (count <= 1) {
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

        deletePreparationBtns[i].addEventListener('click', function () {

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


const imagesUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        imagesUpload.input = event.target

        if (imagesUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            imagesUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = reader.result

                const div = imagesUpload.getContainer(image)
                imagesUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = imagesUpload
        const { files: fileList } = event.target

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} imagens.`)
            event.preventDefault()
            return true
        }

        // continuar
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        imagesUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photos')

        div.onclick = imagesUpload.removeImage

        div.appendChild(image)
        // div.appendChild(imagesUpload.getRemoveButton)

        return div
    },
    getRemoveButton() {

    },
    removeImage(event) {

    },
}