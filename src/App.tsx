import './style.css'
import Square from "./Components/Square.tsx";
import {useState} from "react";

interface IPropsBoard {
    xIsNext: boolean,
    squares: (string | null)[],
    onPlay: (nextSquares: (string | null)[]) => void
}
function Board({xIsNext, squares, onPlay}: IPropsBoard) {
    const winner = calculateWinner(squares);
    const status = winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O");

    const handleClick = (i: number):void => {
        if(squares[i] || calculateWinner(squares)) return;

        const nextSquares = [...squares];
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
    }

    function calculateWinner(squares: (string | null)[]) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    return (
      <>
          <div className="status">{status}</div>
          <div className="board-row">
              <Square value={squares[0]} handleClick={() => handleClick(0)} />
              <Square value={squares[1]} handleClick={() => handleClick(1)} />
              <Square value={squares[2]} handleClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
              <Square value={squares[3]} handleClick={() => handleClick(3)} />
              <Square value={squares[4]} handleClick={() => handleClick(4)} />
              <Square value={squares[5]} handleClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
              <Square value={squares[6]} handleClick={() => handleClick(6)} />
              <Square value={squares[7]} handleClick={() => handleClick(7)} />
              <Square value={squares[8]} handleClick={() => handleClick(8)} />
          </div>
      </>
  )
}

export default function Game() {
    const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares: (string | null)[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        const description = move > 0 ? 'Go to move #' + move : 'Go to game start';

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}