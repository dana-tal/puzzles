

export const createDragHandlers = ({ userInteracted, setUserInteracted,setPositions}) =>{

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
    
        if (!userInteracted)
        {
           setUserInteracted(true);
        }
    
      };



      // Handling the start of a drag event
        const handleDragStart = (e, position) => {
            e.dataTransfer.setData("text/plain", position);
        };


         // Allowing the drop action by preventing default behavior
        const handleDragOver = (e) => {
            e.preventDefault();
        };



        
      return {
        handleDrop, handleDragStart,handleDragOver 
      }
};

