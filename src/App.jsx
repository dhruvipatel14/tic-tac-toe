import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import { useState } from "react"
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./winning_combinations.js";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]

]

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');


  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combi of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combi[0].row][combi[0].column];
    const secondSquareSymbol = gameBoard[combi[1].row][combi[1].column];
    const thirdSquareSymbol = gameBoard[combi[2].row][combi[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {

      winner = firstSquareSymbol;

    }

  }

  const hasDraw = gameTurns.length === 9 && !winner;


  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currActivePlayer) => (currActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {

      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [{
        square: { row: rowIndex, col: colIndex },
        player: currentPlayer
      },
      ...prevTurns];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
    setActivePlayer('X');

  }

  return (
    <main>
      <div id="game-container" >

        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} OnRestart={handleRestart}></GameOver>}

        <GameBoard onSelectSquare={handleSelectSquare}
          gameBoard={gameBoard}></GameBoard>

      </div>

      <Log turns={gameTurns} ></Log>
    </main>
  )
}

export default App
