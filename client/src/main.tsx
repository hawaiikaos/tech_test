import React, { useState } from 'react'
import { XorO } from './types'


export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])

  const [currentPlayer, setCurrentPlayer] = useState<XorO>('O');

  const takeTurn = (row:number, col:number) => {
    console.log('in takeTurn');

    // only mark square if it's unoccupied
    // AND there isn't a winner
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
      
    </div>
  </div>
}
