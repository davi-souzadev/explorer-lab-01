import "./css/index.css"

const creditCardColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const creditCardColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const creditCardFlagSVG = document.querySelector('.cc-logo span:nth-child(2) img')

const setCardFlag = flag => {
    const colors = {
        visa: ['#436D99', '#2D57F2'],
        mastercard: ['#DF6F29', '#C69347'],
        default: ['black', 'grey']
    }

    creditCardColor01.setAttribute('fill', colors[flag][0])
    creditCardColor02.setAttribute('fill', colors[flag][1])
    creditCardFlagSVG.setAttribute('src', `cc-${flag}.svg`)
}

setCardFlag('visa')