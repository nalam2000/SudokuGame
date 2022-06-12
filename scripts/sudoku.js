let numbers = [[1,-1,-1,-1,-1,-1,-1,9,-1],
            [-1,-1,4,-1,-1,-1,2,-1,-1],
            [-1,-1,8,-1,-1,5,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,3,-1],
            [2,-1,-1,-1,4,-1,1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,1,8,-1,-1,6,-1,-1],
            [-1,3,-1,-1,-1,-1,-1,8,-1],
            [-1,-1,6,-1,-1,-1,-1,-1,-1]]

window.onload = function() {

    var targetNumber = -1;
    var board = document.getElementById("board");

    for (let i = 1; i <= 9; i++) {
        var row = document.createElement("tr");
        row.className = "board-row"
        
        for (let j = 1; j <= 9; j++) {
            var cell = document.createElement("td");
            cell.className = "board-cell";
            cell.setAttribute("id", "cell" + i + j);
            cell.textContent = numbers[i-1][j-1];
            row.appendChild(cell);
        }
        board.appendChild(row);     
    }
    checkNums();

    var undoBoardState = board.innerHTML;

    var controls = document.getElementsByClassName('controls-cell');
    var cells = document.getElementsByClassName('board-cell');

    var controlsHandler = function() {
        if(this.id == "btnUndo") {
            board.innerHTML = undoBoardState;
            for (let i = 0; i < cells.length; i++) {
                cells[i].addEventListener('click', cellsHandler, false);
            }
            checkNums();
        } else {
            clearSelected();
            targetNumber = this.textContent;
            this.style.backgroundColor = "#f2f2f2";
        }
    }

    var cellsHandler = function() {
     
        if (targetNumber != -1) {
            undoBoardState = board.innerHTML;
            this.textContent = targetNumber;
            targetNumber = -1;
            checkNums()
        }
    }

    for (let i = 0; i < controls.length; i++) {
        controls[i].addEventListener('click', controlsHandler, false);
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', cellsHandler, false);
    }

}

function checkNums(){
    var table = document.getElementById('board');
    var elements = document.getElementsByClassName("board-cell");
    var controls = document.getElementsByClassName("controls-cell");

    clearSelected();

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent === "-1") {
            elements[i].style.fontSize = "0";
        } else {
            elements[i].style.fontSize = "115%";
        }
        
    }

    var badRow = [];
    var row, rows = table.rows;
    var cell, cells;

    for (let i = 0; i < rows.length; i++) {
        row = rows[i];
        cells = row.cells;

        for (let j = 0; j < cells.length; j++) {
            cell = cells[j];

            for (let k = 0; k < cells.length; k++) {

                if(k != j && sameElement(cells[k], cell)){
                    badRow.push(cells[k]);        
                }
            }        
        }       
    }

    var badCol = [];

    for (let i = 0; i < elements.length / 9; i++) {
        for (let j = 0; j < elements.length; j += 9) {
            for (let k = 0; k < elements.length; k += 9) {
                if(k != j && sameElement(elements[k+i], elements[j+i])){
                    badCol.push(elements[k+i]);         
                }     
            }
        }
    }

    var badBlock = []
    var blockCount = 1;

    for (let i = 0; i < elements.length; i += 3) {
        var cellCount = 1;

        for (let j = 0; j < elements.length / 3; j++) {
            var cellCountCheck = 1;

            for (let k = 0; k < elements.length / 3; k++) {

                if(j != k && sameElement(elements[k+i], elements[j+i])){
                    badBlock.push(elements[k+i]);
                }
                
                if(cellCountCheck % 3 == 0){
                    k += 6;
                }
                cellCountCheck += 1;
            }
            if(cellCount % 3 == 0){
                j += 6;
            }
            cellCount += 1;
        }

        if(blockCount % 3 == 0){
            i += 18;
        }
        blockCount += 1;
    }

    for (let i = 0; i < elements.length; i++) {
        if(badRow.includes(elements[i]) || badCol.includes(elements[i]) || badBlock.includes(elements[i])){
            elements[i].style.backgroundColor = "#f76c5e";
        } else {
            elements[i].style.backgroundColor = null;
        }
        
    }

}
function sameElement(x1, x2) {
    if (x1.textContent != '-1' || x2.textContent != '-1') {
        return x1.textContent == x2.textContent;
    } else {
        return false;
    }
 }

function clearSelected() {
    var controls = document.getElementsByClassName('controls-cell');

    for (let i = 0; i < controls.length; i++) {
        controls[i].style.backgroundColor = null;    
    }
 }