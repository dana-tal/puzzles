import React, { useState, useEffect } from "react";
import imgUrl from '/house.jpg';


// Defining the PuzzleGame component
const PuzzleGame = () => {
  // This component will handle the game logic and UI


  // Handling the start of a drag event
  const handleDragStart = (e, position) => {
    e.dataTransfer.setData("text/plain", position);
  };

  // Handling the drop event
  const handleDrop = (e, position) => {
    e.preventDefault();
    const originalPosition = e.dataTransfer.getData("text");
    // Add logic here to swap positions of puzzle pieces
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      [newPos[originalPosition], newPos[position]] = [
        newPos[position],
        newPos[originalPosition]
      ];
      return newPos;
    });
  };

  // Allowing the drop action by preventing default behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };



  const [positions, setPositions] = useState([...Array(16).keys()]); // positions intial value is [0,1,2,3,....,15]

   // Shuffle the positions for the initial puzzle setup
  const shuffle = () => {

    setPositions((prevPositions) => {
        const newPos = [...prevPositions];
        newPos.sort(() => Math.random() - 0.5);
        return newPos;
      });

  }

  useEffect(() => {
     shuffle();  
  }, []);


  return (
    <div className="game-container">
        
        <div className="reference-image">
            <img src={imgUrl} alt="Reference Image" />
        </div>

        <div className="puzzle-container">
        {positions.map((pos, index) => {
          const x = (pos % 4) * 100;
          const y = Math.floor(pos / 4) * 100;
          return (
            <div
              key={index}
              className="puzzle-piece"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
              style={{
                backgroundImage: `url('${imgUrl}')`,
                backgroundPosition: `-${x}px -${y}px`
              }}
            />
          );
        })}
      </div>

    </div>
  );
};

// Exporting the component for use in other files
export default PuzzleGame;
