import { Machine, EventObject, assign } from 'xstate';
import { IBingoCell } from '../components/BingoCard';

export interface IBingoContext {
  cellIndex?: number;
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
        on: {
          CLICK: 'CLICKED',
          '': [{ target: 'WINNER', cond: 'isWinner' }],
        },
      },
      CLICKED: {
        entry: ['setCellIndex'],
        on: {
          '': [
            { target: 'INCREMENT_CELL', cond: 'isIncrementable' },
            { target: 'TOGGLE_CELL' },
          ],
        },
      },
      TOGGLE_CELL: {
        entry: ['toggleCell', 'removeCellIndex'],
        on: {
          '': 'READY',
        },
      },
      INCREMENT_CELL: {
        entry: ['incrementCell', 'removeCellIndex'],
        on: {
          '': 'READY',
        },
      },
      WINNER: {
        entry: ['setWinnerCells'],
      },
    },
  },
  {
    actions: {
      incrementCell: assign<IBingoContext>({
        cells: ctx =>
          ctx.cells.map((cell, index) => {
            if (index === ctx.cellIndex) {
              const count = cell.count + 1;

              return {
                ...cell,
                ...(count === cell.countMax ? { marked: true } : {}),
                count,
              };
            }

            return cell;
          }),
      }),
      toggleCell: assign<IBingoContext>({
        cells: ctx =>
          ctx.cells.map((cell, index) => {
            if (index === ctx.cellIndex) {
              const marked = !cell.marked;

              return {
                ...cell,
                marked,
                ...(!marked && cell.count !== undefined ? { count: 0 } : {}),
              };
            }

            return cell;
          }),
      }),
      removeCellIndex: assign<any>({
        cellIndex: () => undefined,
      }),
      setCellIndex: assign<IBingoContext, IBingoEvent>({
        cellIndex: (_, event) => event.index,
      }),
      setWinnerCells: assign<IBingoContext>({
        cells: ctx => {
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
      isIncrementable: ctx => {
        const cell = ctx.cells[ctx.cellIndex];

        if (cell.type === 'counter') {
          return cell.count < cell.countMax;
        }

        return false;
      },
      isWinner: ctx => !!getWinnerCells(ctx.cells),
    },
  },
);

export default bingoMachine;
