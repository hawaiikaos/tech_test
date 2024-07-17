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
  // these tallies are not very scalable but I don't think the
  // number of players is meant to be scalable?
  const [xTally, setxTally] = useState<number>(0);
  const [oTally, setoTally] = useState<number>(0);

  const takeTurn = (row:number, col:number) => {

    // only mark square if it's unoccupied
    // AND there isn't a winner

    if ((board[row][col] === undefined) && !winner) {
      board[row][col] = currentPlayer;
      checkWinState();
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  const reset = () => {
    setBoard(board.map(row => row.map(item => undefined)));
    setWinner(undefined);
  };

  const clearStats = () => {
    localStorage.clear();
    setoTally(0);
    setxTally(0);
  }

  const findWinner = (w) => {
    setWinner(w);
    if (w === 'O') {
      setoTally(oTally + 1);
    } else if (w === 'X') {
      setxTally(xTally + 1);
    }

    // Problem 3 asks for a simple backend to store the win data
    // however I was thinking about the use case in your software
    // where users do not have reliable internet connection.
    // One way to support offline use is to use local or session
    // storage in the browser. This should NEVER be used for 
    // sensitive data. However I don't think game stats qualify
    // as sensitive data, so instead of a SQL backend, I'm using
    // local storage (saves even when the user closes the browser).
    // If I had more time I might write a function to periodically
    // check for a stable connection in the background, then send the
    // stat data to the hypothetical backend server

    localStorage.setItem('oTally', String(oTally));
    localStorage.setItem('xTally', String(xTally));

  }

  const checkWinState = () => {

    // win states:
    // - any row filled with same player
    // - any column filled with same player
    // - any diagonal filled with same player

    function checkBoard(b) {
      console.log('in checkBoard');
      let Odiagonaltotal = 0;
      let Xdiagonaltotal = 0;
      let rowindex = 0;
      for (let row of b) {
        const rowlen = row.length;
        let Ocoltotal = 0;
        let Xcoltotal = 0;
        let colindex = 0;
        for (let col of row) {
          if (colindex === rowindex) {
            if (col === 'O') {
              Odiagonaltotal++;
            }
            if (col === 'X') {
              Xdiagonaltotal++;
            }
          }
          if (col == 'O') {
            Ocoltotal++;
          }
          if (col == 'X') {
            Xcoltotal++;
          }
          if (Ocoltotal == row.length) {
            // O wins
            findWinner('O');
          } else if (Xcoltotal == row.length) {
            // X wins
            findWinner('X');
          }
          colindex++;
        }
        rowindex++;
      }
      if (Odiagonaltotal === b.length) {
        // O wins
        findWinner('O');
      } else if (Xdiagonaltotal === b.length) {
        // X wins
        findWinner('X');
      }
      
    }

    function rotateBoard(b) {

      // I'm not a leetcoder so rotating the board
      // was the only way I could think to get the
      // other diagonal match. I am certain there
      // is probably a more efficient/simple method

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
    checkBoard(rotateBoard(board.slice()));
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
      <div>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>X</td>
              <td>{ xTally }</td>
            </tr>
            <tr>
              <td>O</td>
              <td>{ oTally }</td>
            </tr>
          </tbody>
          <tfoot>
              <tr>
                <td>
                  <button onClick={ clearStats }>Clear stats</button>
                </td>
              </tr>
            </tfoot>
        </table>
      </div>
    </div>
  </div>
}
