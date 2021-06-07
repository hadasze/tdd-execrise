
import React from 'react'

export const Board = (props) => {
 return(  <div>
   {props.board.map((row, rowIndex) => {
     return (
       <div key={rowIndex}>
         {row.map((cellValue, colIndex) => {
           const key = `cell-${rowIndex}-${colIndex}`;
           return (
             <span
               className={props.cell}
               key={key}
               data-hook={key}
               onClick={() => props.handleCellClick(rowIndex, colIndex)}
             >
               {cellValue}
             </span>
           );
         })}
       </div>
     );
   })}
 </div>
 );
}
