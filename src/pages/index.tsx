import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [sudukoSize, setSudukoSize] = useState(9);
  const [boardValue, setBoardValue] = useState<Array<Array<number>>>([[]]);
  const [solution, setSolution] = useState<Array<Array<number>>>([[]]);

  const generateSuduko = async () => {
    const response = await fetch('https://sudoku-api.vercel.app/api/dosuku');
    const jsonResponse = (await response.json()) as {
      newboard: {
        grids: Array<{
          value: Array<Array<number>>;
          solution: Array<Array<number>>;
          difficulty: string;
        }>
        message: string;
        results: number
      }
    };

    setBoardValue(jsonResponse.newboard.grids[0].value)
    setSolution(jsonResponse.newboard.grids[0].solution)
  }

  const boardChanged = (value: string, row: number, col: number) => {
    const numberValue = parseInt(value, 10);
    const updatedBoard = boardValue;
    updatedBoard[row][col] = numberValue;
    if (solution[row][col] === numberValue) {
      setBoardValue(updatedBoard);
    } else {
      setBoardValue(updatedBoard);
    }
  }

  useEffect(() => {
    generateSuduko();
  }, [])


  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="suduko grid grid-cols-9 gap-0">
        {
          boardValue.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  onChange={(e) => boardChanged(e.target.value, rowIndex, colIndex)}
                  value={cell.toString()}
                  className="text-center border py-2 px-2 text-lg"
                  maxLength={1}
                />
              )
            })
          })
        }
      </div>


      <button
        className="m-5 py-2 px-4 border rounded bg-foreground/20 text-xs cursor-pointer"
        onClick={generateSuduko}
      >Generate New Board!</button>
    </div>

  );
}
