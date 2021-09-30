function calc(){
    var num = document.getElementById('num')
    var tab = document.getElementById('tab')
    var main = document.getElementById('main')

    if (num.value.length == 0){
        window.alert('Please, digit a number')
    } else{
        tab.innerHTML = ''
        n = Number(num.value)
        for (var i=1; i<=10; i++){
            tab.innerHTML += `<option value="tab${i}"> ${n} x ${i} = ${n*i} </option>`
        }
    }
}