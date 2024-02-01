import './style.css'
import Square from "./Components/Square.tsx";
import {useState} from "react";
export default function Board() {
    const [xIsNext, setXIsNext] = useState<boolean>(true)
    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

    const isNext = () =>{

        return xIsNext ? "X" : "O"
    }
    const handleClick = (i: number):void => {
        const nextSquares = [...squares];
        nextSquares[i] = isNext();
        setSquares(nextSquares);
    }

    return (
      <>
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