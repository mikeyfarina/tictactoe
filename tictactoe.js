/**
 *  Do the programming here. I setup the html for you and basic styles.
 *
 *  It is sort of complicated but can be broken down into steps.
 *
 *    - There are two players and the turns alternate each time.
 *        You can keep track of this by storing it in a variable `currentPlayer`. 0 will mean player 1. and 1 will mean player 2
 *
 *    - Add event listeners to each grid item and on click:
 *      - Check if the square that was clicked is available (hasnt been clicked yet)
 *        - if it isnt then do nothing
 *      - Check which current player's turn it is and add text to the item based on the current player (player 1 is "0" player 2 is "x")
 *
 *    - Check if there are anywinners (you will need to write an algorithm that checks for 3 of the same pieces in a row — checking diagonal will be the hardest part)
 *
 *    - If there was a winner then do something like "alert('Player 1 won')" or something to notify the user
 *
 *    - If no one has won yet then switch the current user to the other player and repeat until there is a winner
 *
 *
 * HINTS:
 *   - You will need to use document.querySelector and document.querySelectorAll to query for the elements. This is how you interact with them.
 *
 *   - You will need to use addEventListener on the elements you queried for to watch for click events on the items.
 *
 *   -
 *
 */

 /** This is how you can keep track of the current player */
 let currentPlayer = 0
 let diagonals = false
 let rows = false
 let columns = false
 let winner = false
/**
 * This is how you can query for elements. document.querySelector returns a single element. Note how "current-player" has a "." before it but on the element is defined like <div class="current-player">. The period before it
 tells javascript you are querying an element by it's classname. It is identical to how you write css
 */
 const currentPlayerIndicator = document.querySelector('.current-player')

 /** Update the player indicator to show the current player. */
 currentPlayerIndicator.innerText = "Player " + (currentPlayer + 1)

// You first step is to query for all of the element (hint use document.querySelectorAll)
let gameBlocks = document.querySelectorAll(".tic-tac-toe__row__item")
let clickedBlocks = document.querySelectorAll(".clicked");
let emptyBlocks = document.querySelectorAll(".empty")
let container  = document.querySelector(".container")

for(let i=0; i <gameBlocks.length; i++){
  gameBlocks[i].addEventListener("click", function(){
    if(winner != true){
      if(this.classList.contains("clicked")){
        console.log("bad spot")
      } else {
          this.innerText = currentPlayer ==  0 ? "X" : "O"
          this.classList.add("clicked")
          this.classList.remove("empty")
          currentPlayer == 0 ? currentPlayer++ : currentPlayer--
          showWinner()
          currentPlayerIndicator.innerText = "Player " + (currentPlayer + 1)
           + "--  " + (currentPlayer ==  0 ? "X" : "O")
      }
    } else {
        console.log("Tic Tac Toe")
    }
  })
}

function reset(){
  [].forEach.call(gameBlocks, function(el){
    el.classList.remove("clicked")
    el.classList.add("empty")
  })

  currentPlayer = 0;
  diagonals = false;
  rows = false;
  columns = false;
  winner = false;

  container.style.background = "#e1e1e1"

  for(let i=0; i <gameBlocks.length; i++){
    gameBlocks[i].innerText = ""
  }
  currentPlayerIndicator.innerText = "Player " + (currentPlayer + 1)
}

function showWinner(){
  testDiag()
  testRows()
  testColumns()

  if (diagonals){
    console.log("Slashed!\nPlayer " + (currentPlayer + 1) + " wins!!" )
    winner = true
  } else if (rows) {
    console.log("ROWS!!\nPlayer " + (currentPlayer + 1) + " wins!!" )
    winner = true
  } else if (columns) {
    console.log("Staright uP!\n Player " + (currentPlayer + 1) + " wins!!" )
    winner = true
  } else {
    console.log("nice move")
  }
  if(winner){
    changeBackground()
  }

}

function testDiag(){
  if (gameBlocks[0].innerText != "" &&
      gameBlocks[0].innerText == gameBlocks[4].innerText &&       //DOWN RIGHT \
      gameBlocks[0].innerText == gameBlocks[8].innerText ||
      gameBlocks[2].innerText != "" &&
      gameBlocks[2].innerText == gameBlocks[4].innerText     //UP LEFT /
    && gameBlocks[2].innerText == gameBlocks[6].innerText){
    diagonals = true
    console.log("three in a row diagnally.")
 }else
   diagonals = false
}

function testRows(){
  for(let i = 0;i <= 8;i){
    //console.log("rows i: " + i + ", gameBlocks[i]: " + gameBlocks[i].innerText + gameBlocks[i+1].innerText + gameBlocks[i+2].innerText)
    let row = gameBlocks[i].innerText + gameBlocks[i+1].innerText + gameBlocks[i+2].innerText
    if  (row == 'XXX' || row == 'OOO' ){
      rows = true
      console.log("three in a row in row " + (i/3 + 1) +"." )
      break
    } else {
      rows = false
    }
    i += 3
  }
}

function testColumns(){
  for(let i=0;i<3;i++){
    j = i + 3
    k = i + 6
    column = gameBlocks[i].innerText + gameBlocks[i+3].innerText + gameBlocks[i+6].innerText
    //console.log("columns i: " + i + ", column: " + column)
    if (column == 'XXX' || column == 'OOO'){
      columns = true
      console.log("three in a row in column " + (i+1) +"." )
      break
    } else {
      columns = false
    }
  }
}


function changeBackground(){
  container.style.background = "mediumseagreen"
}








