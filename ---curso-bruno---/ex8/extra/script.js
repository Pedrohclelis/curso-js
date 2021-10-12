let num = document.querySelector('input#num')
let answer = document.createElement('div')

function convert(){
    if (num.value.length == 0 || num.value < 0){
        window.alert("Please digit a valid value!")
        clean()
        num.focus()
    } else{
        answer.innerHTML = `<p> $${Number(num.value)}   →   <span id='dol'>R$ ${Number(num.value)*5}</span></p>`
        document.querySelector('main').appendChild(answer)
    }
}

function clean(){
    num.value = ''
    answer.innerHTML = ''
    num.focus()
}