import { Machine, EventObject, assign } from 'xstate';
import { IBingoCell } from '../components/BingoCard';

export interface IBingoContext {
  cells: IBingoCell[];
}

export interface IBingoEvent extends EventObject {
  index: number;
}

function getWinnerCells(cells: IBingoCell[]) {
  const winLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  return winLines.find(lines => lines.every(index => cells[index].marked));
}

const bingoMachine = Machine<IBingoContext, any, IBingoEvent>(
  {
    id: 'bingo',
    initial: 'READY',
    states: {
      READY: {
        entry: ['isWinner'],
        on: {
          CLICK: 'CLICKED',
        },
      },
      CLICKED: {
        entry: ['toggleCell'],
        on: {
          '': [{ target: 'WINNER', cond: 'isWinner' }, { target: 'READY' }],
        },
      },
      WINNER: {
        entry: ['setWinnerCells'],
      },
    },
  },
  {
    actions: {
      toggleCell: assign<IBingoContext, IBingoEvent>({
        cells: (ctx, event) =>
          ctx.cells.map((cell, index) => {
            if (index === event.index) {
              return {
                ...cell,
                marked: !cell.marked,
              };
            }

            return cell;
          }),
      }),
      setWinnerCells: assign<IBingoContext, IBingoEvent>({
        cells: (ctx, event) => {
          const winnerCells = getWinnerCells(ctx.cells);

          if (!winnerCells) {
            return ctx.cells;
          }

          return ctx.cells.map((cell, index) => {
            if (winnerCells.includes(index)) {
              return {
                ...cell,
                win: true,
              };
            }

            return cell;
          });
        },
      }),
    },
    guards: {
      isWinner: ctx => !!getWinnerCells(ctx.cells),
    },
  },
);

export default bingoMachine;
