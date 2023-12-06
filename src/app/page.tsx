"use client";
import Image from "next/image";
import ParkingSlots from "@/components/ParkingSlots";
import React, { useState, useEffect } from "react";
export default function Home() {
  // Define the maze using a 2D array
  const initialMaze = [
    "##########",
    "#S#......#",
    "#.#.#.####",
    "#.#.#.#.X#",
    "#.#.#.#.##",
    "#.#.#.#.##",
    "#...#...##",
    "##########",
  ];

  // Define player position
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });

  // SVG cell size
  const cellSize = 30;

  // Maze renderer function
  const renderMaze = () => {
    return initialMaze.map((row, rowIndex) => (
      <g key={rowIndex} className="maze-row">
        {row.split("").map((cell, colIndex) => (
          <rect
            key={colIndex}
            x={colIndex * cellSize}
            y={rowIndex * cellSize}
            width={cellSize}
            height={cellSize}
            className={`maze-cell ${cell === "#" ? "wall" : ""} ${
              cell === "X" ? "exit" : ""
            }`}
          />
        ))}
      </g>
    ));
  };

  // Event handler for keyboard input
  const handleKeyDown = (e: any) => {
    const { x, y } = playerPosition;

    const isMoveValid = (newX: any, newY: any) => {
      if (
        newX >= 0 &&
        newX < initialMaze[0].length &&
        newY >= 0 &&
        newY < initialMaze.length
      ) {
        return initialMaze[newY][newX] !== "#";
      }
      return false;
    };

    const movePlayer = (newX: any, newY: any) => {
      if (isMoveValid(newX, newY)) {
        setPlayerPosition((prevPosition) => ({ x: newX, y: newY }));
      } else {
        console.log("Invalid move!");
      }
    };

    if (e.key === "ArrowUp") {
      movePlayer(x, y - 1);
    } else if (e.key === "ArrowDown") {
      movePlayer(x, y + 1);
    } else if (e.key === "ArrowLeft") {
      movePlayer(x - 1, y);
    } else if (e.key === "ArrowRight") {
      movePlayer(x + 1, y);
    }

    if (initialMaze[y][x] === "X") {
      console.log("Victory!");
    }
  };

  // Attach event listener for keyboard input
  useEffect(() => {
    const { x, y } = playerPosition;

    // Check if the player has reached the exit
    if (initialMaze[y][x] === "X") {
      alert("Congratulations! You reached the exit. Game Over!");
      // Optionally, you can reset the game or perform other actions
      // setPlayerPosition({ x: 1, y: 1 });
    }

    const handleKeyDown = (e: any) => {
      const { x, y } = playerPosition;

      const isMoveValid = (newX: any, newY: any) => {
        if (
          newX >= 0 &&
          newX < initialMaze[0].length &&
          newY >= 0 &&
          newY < initialMaze.length
        ) {
          return initialMaze[newY][newX] !== "#";
        }
        return false;
      };

      const movePlayer = (newX: any, newY: any) => {
        if (isMoveValid(newX, newY)) {
          console.log(`Moving to: (${newX}, ${newY})`);
          setPlayerPosition({ x: newX, y: newY });
        } else {
          console.log("Invalid move!");
        }
      };

      if (e.key === "ArrowUp") {
        movePlayer(x, y - 1);
      } else if (e.key === "ArrowDown") {
        movePlayer(x, y + 1);
      } else if (e.key === "ArrowLeft") {
        movePlayer(x - 1, y);
      } else if (e.key === "ArrowRight") {
        movePlayer(x + 1, y);
      }

      if (initialMaze[y][x] === "X") {
        console.log("Victory!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPosition, initialMaze]);
  return (
    <svg
      className="maze-explorer"
      width={initialMaze[0].length * cellSize}
      height={initialMaze.length * cellSize}
    >
      {renderMaze()}
      <text
        x={playerPosition.x * cellSize}
        y={playerPosition.y * cellSize + 20}
        className="player"
      >
        &#128512;
      </text>
    </svg>
  );
  // return (
  //   <div className="flex flex-col items-center py-16 justify-center w-full">
  //     <main className="w-[1200px] relative">
  //       <div className="absolute top-0 left-0 -z-10">
  //         <Image src="/park.png" height={800} width={1200} alt="" />
  //       </div>
  //       <ParkingSlots />
  //     </main>
  //   </div>
  // );
}
