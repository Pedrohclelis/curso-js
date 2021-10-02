let inputs = document.querySelectorAll('input') //Faz um array com todos os inputs
let checkbox_inputs = document.querySelectorAll('input[type=checkbox]')
let radio_inputs = document.querySelectorAll('input[type=radio]')
let login_email = window.prompt("Login with your email","example@email.com");

document.querySelector('#header-extra').innerHTML = `${login_email}`

function clean(){
    for (let i=0; i<inputs.length; i++){
        inputs[i].value = ''   
    }
    for (let i=0; i<checkbox_inputs.length; i++){
        checkbox_inputs[i].checked = false
    }
    for (let i=0; i<radio_inputs.length; i++){
        radio_inputs[i].checked = false
    }

}

function send(){
    window.location.href = "extra/end.html";
}