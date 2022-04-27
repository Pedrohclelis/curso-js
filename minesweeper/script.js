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
        element.classList.add("undiscovered")
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
                    board[mineLine][mineColumn].id = -1
                    count += 1
                    setNumbersAround(mineLine, mineColumn)
                }
            }
        }
    }
}

function setNumbersAround(mineLine, mineColumn){
    //for each 9 fields around mine...
    for (var k=mineLine-1; k<=mineLine+1; k++){
        for (var l=mineColumn-1; l<=mineColumn+1; l++){
            //if exists, and isnt the original mine field, neither other mine field, set his id to +1 to sinalize the original mine
            if ( ((k >= 0) && (k < boardLength) && (l >= 0) && (l < boardLength)) && !(k == mineLine && l == mineColumn) && (board[k][l].id != -1) )
                board[k][l].id += 1
        }
    }
}

function cluedBoard(){
    for (var i=0; i<boardLength; i++){
        for (var j=0; j<boardLength; j++){
            if (board[i][j].id == -1){
                document.querySelector('div.test').innerHTML += `[~] `
            } else{
                document.querySelector('div.test').innerHTML += `[${board[i][j].id}] `
            }
        }
        document.querySelector('div.test').innerHTML += " - "
        document.querySelector('div.test').innerHTML += `[${i}]`
        document.querySelector('div.test').innerHTML += `<br>`
    }
    document.querySelector('div.test').innerHTML += `<br>`
    document.querySelector('div.test').innerHTML += `<br>`
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

            //Putting the <img> inside the <td> cell
            cell.appendChild(img)
        }
    }
}

function removeBoard(){
    for (var i=0; i<boardLength; i++){
        //Insert a row <tr> for each line
        var row = document.querySelectorAll('tbody tr')
        row[0].remove()
    }
}

function clearFields(line, col){
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
                    clearFields(k, l)
                }
            }
        }
    }
}

setBoard()
setMines(10)
cluedBoard()
printBoard()



function showBombs(){
    for (i=0; i<boardLength; i++){
        for(j=0; j<boardLength; j++){
            if (board[i][j].id == -1){
                board[i][j].visible = true
                var nodeIndex = boardLength*i + j
                setImg(document.querySelectorAll('td img')[nodeIndex], i, j)
            }
        }
    }
}

tabel = document.querySelector('table')
tabel.onclick = revealField
tabel.oncontextmenu = flagField

function flagField(event){
    //Remove default menu at right click
    event.preventDefault()

    var cell = event.target
    var line = cell.parentNode.parentNode.rowIndex;
    var col = cell.parentNode.cellIndex;
  
    if (board[line][col].visible == false){
        if (cell.className == "undiscovered"){
            cell.className = "flag"
            cell.src = "assets/flag.png"
            cell.alt = "flag"
        } else if (cell.className == "flag"){
            cell.className = "undiscovered"
            cell.src = "assets/undiscovered.png"
            cell.alt = "undiscovered"
        }
    }
}

function revealField(event){
    //cell == td > img == one field
    var cell = event.target
    var line = cell.parentNode.parentNode.rowIndex;
    var col = cell.parentNode.cellIndex;
    console.log(`Line: ${line} - Column: ${col} - Alt: ${cell.alt} - Src: ${cell.src}`)

    //Execute only when the field hasnt a flag in it
    if (cell.classList.contains("flag") == false){
        //Organize the 'board' matrix, saying that field is visible now
        board[line][col].visible = true

        //Change 'undiscovered' img to his related id, based on 'board' matrix
        setImg(cell, line, col)
        
        switch (board[line][col].id){
            case -1:
                loseGame(cell, line, col)
                break
            case 0:
                clearFields(line, col)
                break
        }
    }
}

function timerHUD(){
    timer = document.querySelector('.timer')
    const timerInterval = setInterval(incrementSeconds, 1000);
    var seconds = 0;
    function incrementSeconds() {
        seconds += 1;
        timer.innerHTML = seconds;
    }
}
//missing stop timer when lose game

function loseGame(e, line, col){
    showBombs()
    e.src = "assets/mine-red.png"
    e.alt = "mine-red"
    window.alert('You lose')
    
}

timerHUD()
