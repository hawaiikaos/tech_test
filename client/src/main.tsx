import React, { useState } from 'react'
import { XorO } from './types'


export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])

  const [currentPlayer, setCurrentPlayer] = useState<XorO>('O');
  const [winner, setWinner] = useState<XorO>();

  const takeTurn = (row:number, col:number) => {
    console.log('in takeTurn');

    // only mark square if it's unoccupied
    // AND there isn't a winner
    if ((board[row][col] === undefined) && !winner) {
      board[row][col] = currentPlayer;
      checkWinState();
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  const reset = () => {
    console.log('in reset');
    setBoard(board.map(row => row.map(item => undefined)));
    setWinner(undefined);
    console.log('board: ', board);
  };

  const checkWinState = () => {
    console.log('in checkWinState');

    // win states:
    // - any row filled with same player
    // - any column filled with same player
    // - any diagonal filled with same player

    function checkBoard(b) {
      console.log('in checkBoard');
      let Odiagonaltotal = 0;
      let Xdiagonaltotal = 0;
      //let Orowtotal = 0;
      //let Xrowtotal = 0;
      let rowindex = 0;
      for (let row of b) {
        console.log(row);
        const rowlen = row.length;
        let Ocoltotal = 0;
        let Xcoltotal = 0;
        let colindex = 0;
        for (let col of row) {
          if (colindex === rowindex) {
            console.log('colindex: ', colindex);
            console.log('rowindex: ', rowindex);
            if (col === 'O') {
              Odiagonaltotal++;
              console.log('Odiagonaltotal: ', Odiagonaltotal);
            }
            if (col === 'X') {
              Xdiagonaltotal++;
              console.log('Xdiagonaltotal: ', Xdiagonaltotal);
            }
          }
          if (col == 'O') {
            Ocoltotal++;
          }
          if (col == 'X') {
            Xcoltotal++;
          }
          console.log('row length: ', row.length);
          if (Ocoltotal == row.length) {
            console.log("A: O wins");
            setWinner('O');
          } else if (Xcoltotal == row.length) {
            console.log("A: X wins");
            setWinner('X');
          } else {
            //console.log('nobody wins');
          }
          //console.log('Ocoltotal: ', Ocoltotal);
          //console.log('Xcoltotal: ', Xcoltotal);
          colindex++;
        }
        rowindex++;
      }
      if (Odiagonaltotal === b.length) {
        console.log('B: O wins');
        setWinner('O');
      } else if (Xdiagonaltotal === b.length) {
        console.log('B: X wins');
        setWinner('X');
      }
      
    }

    function rotateBoard(b) {
      const rotated : string[][] = [];
      b.reverse();
      
      for (let i = 0; i < b.length; i++) {
        const temp : string[] = [];
        for (let item of b) {
          temp.push(item[i]);
        }
        rotated.push(temp);
      }
      return rotated;
    }

    checkBoard(board);
    checkBoard(rotateBoard(board));
    console.log("board: ", board);
    console.log("rotated board: ", rotateBoard(board));

  }

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <div className='flex flex-col gap-1'>

      {board.map((row, rowindex) => <div className='flex gap-1'>
        {row.map((column, columnindex) => <div onClick={()=>takeTurn(rowindex, columnindex)} key={rowindex+columnindex} className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'>
          {column}
        </div>)}
      </div>)}

      <div>Current Player: { currentPlayer }</div>
      <div><button onClick={ reset }>Reset</button></div>
      { winner &&
        <div>Game won by: { winner } </div>
      }
    </div>
  </div>
}
