"use client";
import { useState, useEffect, useRef } from "react";
import { TiPlus } from "react-icons/ti";
const MazeContainer = () => {
  // Define the maze using a 2D array
  const initialMaze = [
    ".###############.",
    ".#.............#.",
    ".#.#####.#####.#.",
    ".#.#...#.#.....#.",
    ".#.#.#.#.#######.",
    ".#.#.#.#.#.....#.",
    "##.#.#.#.#.###.##",
    "S....#.#.#...#..X",
    "##.###.#####.####",
    ".#.#...#...#.#.#.",
    ".#.#.###.#.#.#.#.",
    ".#.#.....#...#.#.",
    ".#.###########.#.",
    ".#.............#.",
    ".###############.",
  ];

  // Define player position
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 7 });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [playerReady, SetPlayerReady] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(3);
  const countdownStartedRef = useRef(false);
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
    if (gameOver || !playerReady) {
      return;
    }

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
        setPlayerPosition(() => ({ x: newX, y: newY }));
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

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !playerReady && !countdownStartedRef.current) {
      setCountDown(3);
      countdownStartedRef.current = true;
      const countDownInterval = setInterval(() => {
        setCountDown((prevCount) => prevCount - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countDownInterval);
        SetPlayerReady(true);

        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keypress", handleKeyPress);
      }, 3000);
    }
  };

  const restartGame = () => {
    setPlayerPosition({ x: 0, y: 7 });
    setGameOver(false);
    SetPlayerReady(false);
    setCountDown(3);
    countdownStartedRef.current = false;
  };

  // Attach event listener for keyboard input
  useEffect(() => {
    const { x, y } = playerPosition;

    // Check if the player has reached the exit
    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("keydown", handleKeyDown);
    if (initialMaze[y][x] === "X") {
      setGameOver(true);
      // Optionally, you can reset the game or perform other actions
      // setPlayerPosition({ x: 1, y: 1 });
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.addEventListener("keypress", handleKeyPress);
    };
  }, [playerPosition, initialMaze, gameOver, playerReady, countdownStartedRef]);
  return (
    <div className="relative flex justify-center items-center w-full">
      {countDown > 0 && !playerReady && (
        <div className="absolute top-[10%] left-[10%] h-[80%] w-[80%] flex justify-center items-center text-white flex-col bg-slate-900 rounded-2xl ">
          <div className="absolute text-3xl top-0 right-0 p-4 rotate-45">
            <TiPlus />
          </div>
          <div className="flex flex-col items-center my-8">
            <p className="text-3xl my-4">{countDown}</p>
            <p className="text-xl">Are you ready?</p>
            <p className="text-[12px] mt-1">Press ENTER to start</p>
          </div>
          <button
            className="px-7 py-1 text-base bg-slate-800 rounded my-1 text-gray-200"
            onClick={restartGame}
          >
            Back to Main
          </button>
        </div>
      )}
      {gameOver && (
        <div className="absolute top-[10%] left-[10%] h-[80%] w-[80%] flex justify-center items-center text-white flex-col bg-slate-900 rounded-2xl ">
          <div className="absolute text-3xl top-0 right-0 p-4 rotate-45">
            <TiPlus />
          </div>
          <div className="flex flex-col items-center my-8">
            <p className="text-3xl my-4">Well Played!</p>
            <p className="text-xl">Your time: 12.8s</p>
            <p className="text-[12px] mt-1">Personal Best: 12.8s</p>
          </div>
          <button
            className="px-4 py-2 text-xl bg-slate-600 rounded my-1"
            onClick={restartGame}
          >
            Restart Level
          </button>
          <button
            className="px-7 py-1 text-base bg-slate-800 rounded my-1 text-gray-200"
            onClick={restartGame}
          >
            Back to Main
          </button>
        </div>
      )}
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
    </div>
  );
};

export default MazeContainer;
