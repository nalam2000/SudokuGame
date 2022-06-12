let scores = [{"date": "2021/01/17", "duration": "3:41"}, 
              {"date": "2021/01/21", "duration": "4:01"},
              {"date": "2021/02/01", "duration": "2:52"},
              {"date": "2020/02/17", "duration": "3:08"},
              {"date": "2020/03/02", "duration": "2:51"}]

window.onload = function() {

    var score_board = document.getElementById("hiscores");

    for (let a = 0; a < scores.length; a++) {
        var r = document.createElement("tr");
        r.className = "score"
        
        for (let b = 0; b < 2; b++) {
            var space = document.createElement("td");
            space.className = "hiscores-data";

            if(b == 0){
                space.textContent = scores[a].date;
            } else {
                space.textContent = scores[a].duration;
            }
        
            r.appendChild(space);
        }
        score_board.appendChild(r);     
    }
}