let display = document.querySelector('.display')

function insert(num){
    
        
}

function clearDisplay(){
    display.innerHTML = '0'
    pilha = []
}

const Insert = {
    num(num){
        if (display.innerHTML == '0'){
            display.innerHTML = num
        } else{
            display.innerHTML += num
        }
    },
    operator(ope){
        if (display.innerHTML == '0' && ope != '-'){
            display.innerHTML = 0
        } else{
            display.innerHTML += ope
        }
    }
}

let aux3 = 0
let aux = '', aux1 = '', aux2 = ''
let pilha = []

function calculate(){
    pilha = []
    aux = ''
    for(let i=0; i<display.innerHTML.length ; i++){
        switch(display.innerHTML[i]){
            case ('1'):
                aux += display.innerHTML[i]
                break
            case ('2'):
                aux += display.innerHTML[i]
                break
            case ('3'):
                aux += display.innerHTML[i]
                break
            case ('4'):
                aux += display.innerHTML[i]
                break          
            case ('5'):
                aux += display.innerHTML[i]
                break
            case ('6'):
                aux += display.innerHTML[i]
                break  
            case ('7'):
                aux += display.innerHTML[i]
                break  
            case ('8'):
                aux += display.innerHTML[i]
                break 
            case ('9'):
                aux += display.innerHTML[i]
                break 
            case ('0'):
                aux += display.innerHTML[i]
                break 
            case ('.'):
                aux += display.innerHTML[i]
                break  

            case '+':
                if (aux != '')
                    pilha.push(aux)
                aux = ''
                break
            case '-':
                if (aux != '')
                    pilha.push(aux)
                aux = ''
                if (pilha = [])
                    aux = '-'
                break
            case 'x':
                if (aux != '')
                    pilha.push(aux)
                aux = ''
                break
            case '/':
                if (aux != '')
                    pilha.push(aux)
                aux = ''
                break
        }
    }
    if (aux != '')
        pilha.push(aux)
    
    let j = 0
    for(i=0; i<display.innerHTML.length; i++){
        switch(display.innerHTML[i]){
            case '+':
                console.log('case +1')
                j++;
                break;

            case '-':
                console.log('case -1')
                j++
                break;
            case 'x':
                console.log('case x')
                aux1 = pilha.splice(j, 1)
                aux2 = pilha.splice(j, 1)
                aux3 = Number.parseFloat(aux1) * Number.parseFloat(aux2)
                aux3 = aux3.toString()
                pilha.splice(j, 0, aux3)
                break
            case '/':
                console.log('case /')
                aux1 = pilha.splice(j, 1)
                aux2 = pilha.splice(j, 1)
                aux3 = Number.parseFloat(aux1) / Number.parseFloat(aux2)
                aux3 = aux3.toString()
                pilha.splice(j, 0, aux3)
                break
        }
    }

    for(i=0; i<display.innerHTML.length; i++){
        switch(display.innerHTML[i]){
            case '+':
                console.log('case +2')
                aux1 = pilha.shift()
                aux2 = pilha.shift()
                aux3 = Number.parseFloat(aux1) + Number.parseFloat(aux2)
                aux3 = aux3.toString()
                pilha.unshift(aux3)
                break
            case '-':
                if (pilha != []){
                    console.log('case -2')
                    aux1 = pilha.shift()
                    aux2 = pilha.shift()
                    aux3 = Number.parseFloat(aux1) - Number.parseFloat(aux2)
                    aux3 = aux3.toString()
                    pilha.unshift(aux3)
                }
                break
        }
    }

    display.innerHTML = pilha
}