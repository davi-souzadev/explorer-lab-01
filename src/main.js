import "./css/index.css"
import IMask from "imask"

const creditCardColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const creditCardColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const creditCardFlagSVG = document.querySelector('.cc-logo span:nth-child(2) img')

const setCardFlag = flag => {
    const colors = {
        visa: ['#436D99', '#2D57F2'],
        mastercard: ['#DF6F29', '#C69347'],
        american: ['#6DA18A', '#44866A'],
        hipercard: ['#B71517', '#B60F0C'],
        default: ['white', 'grey']
    }

    creditCardColor01.setAttribute('fill', colors[flag][0])
    creditCardColor02.setAttribute('fill', colors[flag][1])
    creditCardFlagSVG.setAttribute('src', `cc-${flag}.svg`)
}

const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
    mask: '000'
}
const securityCodeMask = IMask(securityCode, securityCodePattern)

const currentYear = String(new Date().getFullYear()).slice(2)
const currentYearPlusTen = String(new Date().getFullYear() + 10).slice(2)

const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
    mask: 'MM{/}YY',
    blocks: {
        YY: {
            mask: IMask.MaskedRange,
            from: currentYear,
            to: currentYearPlusTen
        },

        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
    }
}
const expirationDateMask = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
    mask: [
        {
            mask: '0000 0000 0000 0000',
            cardType: 'visa',
            regex: /^4[0-9]\d{0,15}/
        },
        {
            mask: '0000 0000 0000 0000',
            cardType: 'mastercard',
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/
        },
        {
            mask: '0000 0000 0000 0000',
            cardType: 'american',
            regex: /^3[47]\d{0,13}/
        },
        {
            mask: '0000 0000 0000 0000',
            cardType: 'hipercard',
            regex: /(^6062 82|^3841(?:[046]{0,1}))\d{0,12}/
        },
        {
            mask: '0000 0000 0000 0000',
            cardType: 'default',
        },
        
    ],
    dispatch: function(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, ' ')
        const foundMask = dynamicMasked.compiledMasks.find(item => number.match(item.regex))
        console.log(foundMask)
        setCardFlag(foundMask.cardType)

        return foundMask
    }

    
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const form = document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
})

const cardHolder = document.querySelector('#card-holder')
cardHolder.addEventListener('input', () => {
    const ccHolder = document.querySelector('.cc-holder .value')

    ccHolder.innerText = cardHolder.value ? cardHolder.value : 'FULANO DA SILVA'
})


const updateSecurityCode = code => {
    const ccSecurity = document.querySelector('.cc-security .value')

    ccSecurity.innerText = code ? code : '123'
}
// Método para ouvir eventos do iMask on()
securityCodeMask.on('accept', () => updateSecurityCode(securityCodeMask.value))

const updateCardNumber = cardNumber => {
    const ccNumber = document.querySelector('.cc-number')

    ccNumber.innerText = cardNumber ? cardNumber : '1234 5678 9012 3456'
}

cardNumberMasked.on('accept', () => updateCardNumber(cardNumberMasked.value))

const updateExpirationDate = date => {
    const ccExpiration = document.querySelector('.cc-expiration .value')

    ccExpiration.innerText = date ? date : '02/32'
}

expirationDateMask.on('accept', () => updateExpirationDate(expirationDateMask.value))