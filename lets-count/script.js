function count(){
    var start = document.getElementById('start')
    var end = document.getElementById('end')
    var step = document.getElementById('step')
    var msg = document.getElementById('msg')

    if (start.value.length == 0 || end.value.length == 0 || step.value.length == 0){
        msg.innerHTML = `Without values, its impossible to count!`
    } else {
        a = Number(start.value)
        b = Number(end.value)
        c = Number(step.value)
        if (c == 0){
            window.alert('Invalid step! Considering step = 1')
            c = 1
        } else if (c < 0){
            window.alert('Invalid step! Considering step positive')
            c *= -1
        }

        msg.innerHTML = `Counting: </br>`
        if (a<b){
            for (var i=a; i<=b; i+=c){
                msg.innerHTML += `${i} \u{1F449}`
            }
        } else{
            for (var i=a; i>=b; i-=c){
                msg.innerHTML += `${i} \u{1F449}`
            }
        }
        msg.innerHTML += `\u{1F3C1}`
    }
}