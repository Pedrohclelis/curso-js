let num = document.querySelector('input#num')
let list = document.querySelector('select#list')
let msg = document.querySelector('div#msg')
var alert = document.createElement('span');
let values = []

function isNumber(n){
    if (Number(n) >= 1 && Number(n) <= 100){
        return true
    } else{
        return false
    }
}

function inList(n, l){
    if (l.indexOf(Number(n)) == -1){
        return false
    } else{
        return true
    }
}

function put(){
    if(isNumber(num.value) && !inList(num.value, values)){
        values.push(Number(num.value))

        let item = document.createElement('option')
        item.text = `Value ${(num.value)} was added.`
        list.appendChild(item)
        //or:   tab.innerHTML += `<option value="tab${num}"> Value ${num} was added. </option>`

        msg.innerHTML = ''
        alert.innerHTML = ''
        list.setAttribute('size', `${values.length+1}`)
    } else{
        alert.innerHTML = '* Invalid value or already in the list!'
        document.querySelector('p').appendChild(alert);
        alert.style.color = 'red';
        alert.style.fontSize = '10.5pt';

        //window.alert("Invalid value or already in the list")
    }
    num.value = ''
    num.focus()
}

function analyze(){
    alert.innerHTML = ''
    if (values.length == 0){
        msg.style.color = 'red';
        msg.innerHTML = '<p>* Please, digit some values to analyze first!</p>'
    } else{
        msg.style.color = 'black';
        msg.innerHTML = ''

        values.sort()
        let sum = 0
        for (let i = 0; i<values.length; i++){
            sum += values[i]
        }

        msg.innerHTML += `<p>At all, we have ${values.length} registered numbers</p>`
        msg.innerHTML += `<p>The highest informed value was ${values[values.length-1]}</p>`
        msg.innerHTML += `<p>The lowest informed value was ${values[0]}</p>`
        msg.innerHTML += `<p>Summing all values, we have ${sum}</p>`
        msg.innerHTML += `<p>The average of the values is ${sum/values.length}</p>`
    }
}

function toClear(){
    values = []
    num.value = ''
    num.focus()
    list.innerHTML = ''
    msg.innerHTML = ''
    alert.innerHTML = ''
}