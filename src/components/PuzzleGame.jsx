import React, { useState, useEffect } from "react";
import { createDragHandlers } from '../utils/event_handlers'; 

// Defining the PuzzleGame component
const PuzzleGame = (props) => {
  // This component will handle the game logic and UI



  const playSound = (soundFile) => {
      const audio = new Audio(`/sounds/${soundFile}.mp3`); // If it's in the public folder
      audio.play();
    
  };


  const game_over= () =>{

    let user_won = true;
    let i;

      for(i=0; i< positions.length && user_won ; i++)
      {
          if ( i !== positions[i] )
          {
            user_won = false;
          }
      }
      console.log("user won:");
      console.log(user_won);
      return user_won;   
    
  }


  const [imgUrl, setImageUrl] = useState('/images/lake_mountains.jpg');
  const [ userInteracted, setUserInteracted] = useState(false);

  const [positions, setPositions] = useState([...Array(16).keys()]); // positions intial value is [0,1,2,3,....,15]


  const { handleDrop,handleDragStart, handleDragOver } = createDragHandlers({userInteracted, setUserInteracted,setPositions });


   console.log("positions:");
   console.log(positions);

  
   // Shuffle the positions for the initial puzzle setup
  const shuffle = () => {

    setPositions((prevPositions) => {
        const newPos = [...prevPositions];
        newPos.sort(() => Math.random() - 0.5);
        return newPos;
      });

  }

  const changePic = (e)=>
  {
      console.log(e.target.value);
      setImageUrl('/images/'+e.target.value);
  }

  useEffect(() => {
     shuffle();  
  }, [imgUrl]);


  useEffect(() => {
     // check victory
    if (userInteracted && game_over() )
      {
           console.log( "You won :-) !!! ");
           playSound('success');
      }
  
 }, [positions,userInteracted])

  return (
    <div className="game-container">

<select onChange={changePic} >
            <option value='lake_mountains.jpg'> Select</option>
            <option value='cat_flower.jpeg'>Cat Smelling FLowers</option> 
            <option value='cats.jpeg'>Cats</option>
            <option value='golden_dogs.webp'>Dogs</option> 
            <option value='lake_house.jpg'>Lake House</option>
            <option value='lake_mountains.jpg'>Lake Mountains</option>
            <option value='green_valley.jpeg'>Green Vallye</option>
            <option value='lake_boat.jpg'>Lake Boat</option>
            <option value='sunset.jpg'>Sunset</option>
        </select>

          <div className="reference-image">
              <img src={imgUrl} alt="Reference Image" />
          </div>

          <div className="puzzle-container">

          
     

          {positions.map((pos, index) => {
           /*  const x = (pos % 4) * 100;
            const y = Math.floor(pos / 4) * 100; */

            const x = (pos % 4) * 200;
            const y = Math.floor(pos / 4) * 200;

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
