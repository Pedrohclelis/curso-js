function verify(){
    var b_year = document.getElementById('date')
    var a_year = new Date().getFullYear()
    var answer = document.getElementById('answer')

    if (b_year.value.length == 0 || b_year.value > a_year){
        window.alert('[ERRO] Verifique seus dados!')
    } else{
        var age = a_year - b_year.value
        var radsex = document.getElementsByName('radsex')
        var img = document.createElement('img')
        img.setAttribute('id', 'photo')
        if (radsex[0].checked){
            var sex = 'Male'
            if (age >= 0 && age < 18){
                img.setAttribute('src', 'models/man-kid.png')
            } else if(age >= 18 && age < 60){
                img.setAttribute('src', 'models/man-adult.png')
            } else{
                img.setAttribute('src', 'models/man-old.png')
            }
        } else{
            var sex = 'Female'
            if (age >= 0 && age < 18){
                img.setAttribute('src', 'models/woman-kid.png')
            } else if(age >= 18 && age < 60){
                img.setAttribute('src', 'models/woman-adult.png')
            } else{
                img.setAttribute('src', 'models/woman-old.png')
            }
        }
        answer.innerHTML = `<p>You are a ${sex} with ${age} years</p>`
        answer.appendChild(img)
    }
}
