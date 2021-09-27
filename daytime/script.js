function sync(){
    var hora = new Date().getHours()
    var min = new Date().getMinutes()
    var msg = window.document.getElementById('msg')
    var img = window.document.getElementById('picture')
    msg.innerHTML = `Now it's ${hora}:${min} hours.`

    if (hora >= 0 && hora < 12){
        img.src = 'models/day.png'
        document.body.style.background = '#e2d631'
    } else if (hora >= 12 && hora < 18){
        img.src = 'models/evening.png'
        document.body.style.background = '#a94532'
        
    } else{
        img.src = 'models/night.png'
        document.body.style.background = '#446296'
    }

}