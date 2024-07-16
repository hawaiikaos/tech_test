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
    console.log('board: ', board);
  };

  const checkWinState = () => {
    console.log('in checkWinState');

    // win states:
    // - any row filled with same player
    // - any column filled with same player
    // - any diagonal filled with same player

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
