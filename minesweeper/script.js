const boardLength = 9
const board = []

function setBoard(){
    //Create the initial matrix for the board, who each field has id: 0 and visible:
    for (var i=0; i<boardLength; i++){
        board[i] = []
        for (var j=0; j<boardLength; j++){
            board[i][j] = {id: 0, visible: false}
        }
    }
}

function setImg(element, line, col){
    if (board[line][col].visible == false){
        element.src = "assets/undiscovered.png"
        element.alt = "undiscovered"
    } else{
        switch(board[line][col].id){
            case -1:
                element.src = "assets/mine.png"
                element.alt = "mine"
                break
            case 0:
                element.src = "assets/nothing.png"
                element.alt = "nothing"
                break
            case 1:
                element.src = "assets/1.png"
                element.alt = "number 1"
                break
            case 2:
                element.src = "assets/2.png"
                element.alt = "number 2"
                break
            case 3:
                element.src = "assets/3.png"
                element.alt = "number 3"
                break
            case 4:
                element.src = "assets/4.png"
                element.alt = "number 4"
                break
            case 5:
                element.src = "assets/5.png"
                element.alt = "number 5"
                break
        }
    }
    
}

function sortNumber(){
    min = Math.ceil(0);
    max = Math.floor(boardLength);
    return Math.floor(Math.random() * (max - min)) + min;
}


function setMines(amount){
    var count = 0
    while (count < amount){
        var mineLine = sortNumber()
        var mineColumn = sortNumber()
        for (var i=0; i<boardLength; i++){
            for (var j=0; j<boardLength; j++){
                //for each field, if his cordinates is equal to sorted mine coords, and this field isnt a mine yet, put here a mine
                if ((i == mineLine && j == mineColumn) && (board[i][j].id != -1)){
                    board[i][j].id = -1
                    count += 1
                    //for each 9 fields around mine...
                    for (var k=mineLine-1; k<=mineLine+1; k++){
                        for (var l=mineColumn-1; l<=mineColumn+1; l ++){
                            //if exists, and isnt the original mine field, neither other mine field, set his id to +1 to sinalize the original mine
                            if ( ((k >= 0) && (k < boardLength) && (l >= 0) && (l < boardLength)) && !(k == mineLine && l == mineColumn) && (board[k][l].id != -1) )
                                board[k][l].id += 1
                        }
                    }
                }
            }
        }
    }
}

function printBoard2(){
    for (var i=0; i<boardLength; i++){
        for (var j=0; j<boardLength; j++){
            if (board[i][j].id == -1){
                document.querySelector('div').innerHTML += `[~] `
            } else{
                document.querySelector('div').innerHTML += `[${board[i][j].id}] `
            }
        }
        document.querySelector('div').innerHTML += " - "
        document.querySelector('div').innerHTML += `[${i}]`
        document.querySelector('div').innerHTML += `<br>`
    }
    document.querySelector('div').innerHTML += `<br>`
    document.querySelector('div').innerHTML += `<br>`
}

function printBoard(){
    for (var i=0; i<boardLength; i++){
        //Insert a row <tr> for each line
        var row = document.querySelector('tbody').insertRow(`${i}`)
        for (var j=0; j<boardLength; j++){
            //Insert the cells <td> in respective row <tr> for each column 
            cell = row.insertCell(`${j}`)

            //Create and imaginary element <img>, without place yet.
            var img = document.createElement("img")

            //Setting img 'src' (and 'alt') atribute based on matrix data
            setImg(img, i, j)
            img.setAttribute("width", "32px")
            cell.classList.add("hidden")

            //Putting the <img> inside the <td> cell
            cell.appendChild(img)
        }
    }
}

function if0(line, col){
    if (board[line][col].id == 0){
        //for each 9 fields around '0'...
        for (var k=line-1; k<=line+1; k++){
            for (var l=col-1; l<=col+1; l++){
                //if exists, and isnt the original '0' field, and isnt visible yet, reveal then
                if ( ((k >= 0) && (k < boardLength) && (l >= 0) && (l < boardLength)) && !(k == line && l == col) && (board[k][l].visible == false) ){
                    board[k][l].visible = true
                    var nodeIndex = boardLength*k + l
                    setImg(document.querySelectorAll('td img')[nodeIndex], k, l)
                    //Recursive for others 0 around that remain undiscovered yet
                    if0(k, l)
                }
            }
        }
    }
}

setBoard()
setMines(10)
printBoard2()
printBoard()

//onClick function for each <img> inside a <td> (arrayed in a NodeList) 
document.querySelectorAll('td img').forEach(function (e, index){
    //Picking the related line and col, based on img position known by the node array index. Extra info on log
    var line = Math.floor(index / boardLength)
    var col = parseInt(index % boardLength)
    

    //Normal click, reveal field
    e.onclick  = function(){
        console.log(`Line: ${line} - Column: ${col} - Alt: ${e.alt} - Src: ${e.src}`)
        //CSS to remove class
        e.classList.remove("hidden")

        //Execute only when the field is undiscovered
        if (board[line][col].visible == false){
            //Organize the board matrix, saying that field is visible now
            board[line][col].visible = true
            //Change 'undiscovered' img to his related id, based on board matrix
            setImg(e, line, col)
            //if '0' field, then reveal other 9 field around him in a recursive loop 
            if0(line, col)
        }
    }

    //Right click, put flag instead of default contextmenu
    e.addEventListener("contextmenu", function(el){
        el.preventDefault()
        if (board[line][col].visible == false){
            e.src = "assets/flag.png"
            e.alt = "flag"
        }
        console.log('Flag placed')
    })
})

