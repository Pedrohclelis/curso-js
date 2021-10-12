let pw = document.querySelector('input#pw')
let answer = document.querySelector('#answer')
let secret = document.querySelector('#secret')

function verify(){
    if (pw.value.length == 0){
        window.alert('Digit your password')
        pw.focus()
    } else{
        if (pw.value == '1234'){
            answer.setAttribute('src', 'extra/ok.png')
            answer.setAttribute('height', '200px')
            secret.innerHTML = '<a target="_blank" href="https://www.linkedin.com/in/pedrohclelis/">Secret Site</a>'
        } else{
            answer.src = 'extra/red.png'
            answer.setAttribute('height', '200px')
            secret.innerHTML = 'Proibido'
        }
    }
    pw.value = ''
}

function clean(){
    pw.value = ''
    pw.focus()
    answer.innerText = ''
    answer.src = 'extra/lock.png'
    secret.innerHTML = ''
}