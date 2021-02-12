const addNewField = {
    dontShowAgain: false,
    watchShift(func) {
        if (event.key == "Tab") {
            this[func]()
        }
    },
    showTip(element) {
        const field = element.parentNode
        const coordinates = field.getBoundingClientRect()
        const tipContainer = document.querySelector('.tip')

        let coordsX = coordinates.x + coordinates.width + 16
        let coordsY = coordinates.y + (coordinates.height)

        tipContainer.style.left = `${coordsX}px`
        tipContainer.style.top = `${coordsY}px`

        tipContainer.style.opacity = 1
    },
    removeIngredient(field) {
        const input = field.parentNode
        const fatherDiv = input.parentNode

        if (fatherDiv.childElementCount > 1) {
            const confirmation = confirm('Tem certeza? Essa ação não poderá ser desfeita')
            if (confirmation) input.remove()
        }
        else alert('Você não pode remover todos os campos')
        
    },

    newIngredient() {
        const fatherDiv = document.querySelector('#ingredients .ingredients'),
            fieldContainer = document.querySelectorAll('.ingredient')

        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
        if (newField.children[0].value == 0) return false

        newField.children[0].value = ""
        fatherDiv.appendChild(newField)
    },

    newPreparation() {
        const fatherDiv = document.querySelector('#steps .preparations'),
            fieldContainer = document.querySelectorAll('.preparation')

        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
        if (newField.children[0].value == 0) return false

        newField.children[0].value = ""
        fatherDiv.appendChild(newField)
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
        imagesUpload.input.files = imagesUpload.getAllFiles()
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
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo")
            imagesDiv.push(item)
        })
        
        const totalImages = imagesDiv.length + fileList.length

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
    removeOldImage(event) {
        const photoDiv = event.target.parentNode

        if (photoDiv.id) {
            const removedFiles = document.querySelector('input[name=removed_files]')
            
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }

        }

        photoDiv.remove()
    }
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

const avatarUpload = {
    input: "",
    files: [],
    preview: document.querySelector('.avatar-preview img'),
    handleFileInput(event) {
        const {files: fileList} = event.target
        avatarUpload.input = event.target

        Array.from(fileList).forEach(file => {
            avatarUpload.files.push(file)
            const reader = new FileReader()

            reader.onload = () => {
                avatarUpload.preview.src = reader.result
            }

            reader.readAsDataURL(file)
        })
        avatarUpload.input.files = avatarUpload.getFile()
        avatarUpload.files = []
    },

    getFile() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        avatarUpload.files.forEach(file => dataTransfer.items.add(file))
        return dataTransfer.files
    }
}

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input)

        let results = Validate[func](input.value)

        input.value = results.value

        if (results.error)
            Validate.displayError(input, results.error)
    },
    displayError(input, error) {
        const div = document.createElement('div')
        div.classList.add('message')
        div.classList.add('error')
        div.innerHTML = error

        input.parentNode.appendChild(div)
        // adicionando classe error ao input
        input.parentNode.querySelector('input').classList.add('error')

        input.focus()
    },
    clearErrors(input) {
        // removendo classe error do input
        const inputError = input.parentNode.querySelector('input')
        if (inputError)
        inputError.classList.remove('error')
        
        // removendo mensagem de erro
        const divError = input.parentNode.querySelector('.error')
        if (divError)
            divError.remove('error')
    },
    isEmail(value) {
        let error = null

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!value.match(mailFormat) && value.length > 0)
            error = "Email inválido"
        
        return {
            error,
            value
        }
    }
}

const isChecked = {
    checkbox: document.querySelector('input#isAdmin'),
    inputHidden: document.querySelector('input#hiddenAdmin'),
    toggleInput() {
        if (this.checkbox.checked) {
            this.inputHidden.disabled = true
        } else {
            this.inputHidden.disabled = false
        }
    }
}

const redirectToLogin = {
    loginButton: document.querySelector('a.login'),
    redirect(toLocal) {
        window.location.href = toLocal
    }
}

const getCoords = {
    
}