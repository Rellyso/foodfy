const addNewField = {
    deleteIngredient(length) {
        const deleteIngredientBtns = document.querySelectorAll('.ingredient-delete-button')
        const fieldContainer = document.querySelectorAll('.ingredient')
        console.log(fieldContainer)
        let count = fieldContainer.length

        for (let i = 0; i <= length; i++) {
            deleteIngredientBtns[i].addEventListener('click', function () {
                if (count > 1) {
                    const confirmation = window.confirm('Deseja excluir o campo?')
                    if (confirmation) {
                        fieldContainer[i].remove()
                        count--
                    }
                } else if (count <= 1) {
                    alert('Você não pode excluir todos os campos!')
                }
            })
        }
    },
    
    deletePreparation(length) {
        const deletePreparationBtns = document.querySelectorAll('.preparation-delete-button')
        const fieldContainer = document.querySelectorAll('.preparation')
        let count = fieldContainer.length

        for (let i = 0; i <= length; i++) {

            deletePreparationBtns[i].addEventListener('click', function () {
                if (count > 1) {
                    fieldContainer[i].remove()
                    count = count - 1
                } else {
                    alert('Você não pode excluir todos os campos!')
                }
            })
        }
    },

    newIngredient() {
        const fatherDiv = document.querySelector('#ingredients .ingredients'),
            fieldContainer = document.querySelectorAll('.ingredient')

        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
        if (newField.children[0].value == 0) return false

        newField.children[0].value = ""
        fatherDiv.appendChild(newField)
        addNewField.deleteIngredient(fatherDiv.children.length - 1)
    },

    newPreparation() {
        const fatherDiv = document.querySelector('#steps .preparations'),
            fieldContainer = document.querySelectorAll('.preparation')

        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
        if (newField.children[0].value == 0) return false

        newField.children[0].value = ""
        fatherDiv.appendChild(newField)
        addNewField.deletePreparation(fatherDiv.children.length - 1)
    }

}



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
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} imagens.`)
            event.preventDefault()
            return true
        }

        const imagesDiv = []
        imagesUpload.preview.childNodes.forEach(item => {
            if (item.classList & item.classList == "photo")
                imagesDiv.push(item)
        })

        const totalImages = imagesDiv.length + preview.length

        if (totalImages > uploadLimit) {
            alert("Você atingiu o limite de fotos.")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        imagesUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = imagesUpload.removeImage

        div.appendChild(image)
        div.appendChild(imagesUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')

        button.classList.add('material-icons')
        button.innerHTML = 'close'

        return button
    },
    removeImage(event) {
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(imagesUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        imagesUpload.files.splice(index, 1)
        imagesUpload.input.files = imagesUpload.getAllFiles()

        photoDiv.remove()
    },
}

const imageGallery = {
    preview: document.querySelectorAll("#gallery .gallery-preview img"),
    highlight: document.querySelector("#gallery .highlight > img"),
    setImage(e) {
        const { target } = e

        imageGallery.preview.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        imageGallery.highlight.src = target.src

    }
}