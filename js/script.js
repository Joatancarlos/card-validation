let nameCard = document.querySelector('#name')
let numberCard = document.querySelector('#number-card')
let monthCard = document.querySelector('#month')
let yearCard = document.querySelector('#year')
let cvcCard = document.querySelector('#cvc')

let listInputForms = document.querySelectorAll('form input')
// -> [nameForm, numberForm, monthForm, yearForm, cvcForm]

let listInputsCard = [nameCard, numberCard, monthCard, yearCard, cvcCard]
// Inputs need to be in the list because the name and card number inputs are not in the same order as the form inputs

let listErroMessage = document.querySelectorAll('.error')
// -> [errorName, errorNumber, errorDate, errorCvc]

let form = document.querySelector('.form')
let btnConfirm = document.querySelector('#btn-form')


let divThanks = document.querySelector('.thanks')
let btnContinue = document.querySelector('#btn-confirm') 

// Detects the input of the form and applies validation to the form's value. So, returns an object containing the validation result and the error message.
const validation = (inputForm, inputValue) => {
    let regex
    let err
    
    const validation = {
        name: /\d/g,
        number: /\D/g,
        
    }

    switch (inputForm) {
        case listInputForms[0]:
            regex = validation.name
            err = listErroMessage[0]
            break
        case listInputForms[1]:
            regex = validation.number
            err = listErroMessage[1]
            break
        case listInputForms[2]:
        case listInputForms[3]:
            regex = validation.number
            err = listErroMessage[2]
            break
        case listInputForms[4]:
            regex = validation.number
            err = listErroMessage[3]
            break

        default:
            console.log('Something went wrong')
    }

    return {
        test: regex.test(inputValue),
        divError: err
    } 
}

// Inserts the form values into the card
const updateValue = (inputCard, e) => {
        inputCard.value = e.target.value
}

// add events in input form

listInputForms.forEach((input, index) => {
    input.addEventListener('keyup', (e) => {
        
        let objValidation = validation(input, input.value)
        
        if(objValidation.test === true ) {
            objValidation.divError.classList.add('active')
        } else {
            objValidation.divError.classList.remove('active')
        }     
        updateValue(listInputsCard[index], e)
        
    })
       
})


// Hides the form and shows the divThanks
btnConfirm.addEventListener('click', (e) => {
    e.preventDefault()
    form.style.display = 'none'
    divThanks.style.display = 'flex'
    
})

// Hides the divThanks and shows the form
btnContinue.addEventListener('click', (e) => {
    e.preventDefault()
    divThanks.style.display = 'none'
    form.style.display = 'flex'
    for (let i = 0; i < listInputForms.length; i++) {
        // Cleaning form inputs 
        listInputForms[i].value = '' 

        // Cleaning card inputs
        if(i <= 1) {
            listInputsCard[i].value = listInputForms[i].placeholder
        } else if (i == 4) {
            listInputsCard[i].value = '000'
        } else {
            listInputsCard[i].value = '00'
        }
    }
})

