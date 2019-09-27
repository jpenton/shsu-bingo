import { Machine, EventObject, assign } from 'xstate';
import { IBingoCell } from '../components/BingoCard';

export interface IBingoContext {
  cellIndex?: number;
  cells: IBingoCell[];
}

export interface IBingoEvent extends EventObject {
  index: number;
}

function getWinnerCells(cells: IBingoCell[]): number[] | undefined {
  const size = Math.sqrt(cells.length);

  for (let i = 0; i < size; i++) {
    // check rows
    for (let j = 0; j < size; j++) {
      // Current cell
      if (!cells[i * size + j].marked) {
        break;
      }

      if (j === size - 1) {
        return Array(size)
          .fill(undefined)
          .map((_, index) => i * size + index);
      }
    }

    // check columns
    for (let j = 0; j < size; j++) {
      // Current cell
      if (!cells[j * size + i].marked) {
        break;
      }

      if (j === size - 1) {
        return Array(size)
          .fill(undefined)
          .map((_, index) => i + size * index);
      }
    }
  }

  // Check TL => BR diagonal
  for (let i = 0; i < size; i++) {
    // Current cell
    if (!cells[i * size + i].marked) {
      break;
    }

    if (i === size - 1) {
      return Array(size)
        .fill(undefined)
        .map((_, index) => index * size + index);
    }
  }

  // Check BL => TR diagonal
  /**
   * size 4
   * i = 4, cell 12
   * i = 3, cell 9
   * i = 2, cell 6
   * i = 1, cell 3
   *
   * size 5
   * i = 5, cell 20
   * i = 4, cell 16
   * i = 3, cell 12
   * i = 2, cell 8
   * i = 1, cell 4
   */
  for (let i = size; i > 0; i--) {
    // Current cell
    if (!cells[size ** 2 - size - (size - i) * (size - 1)].marked) {
      break;
    }

    if (i === 1) {
      return Array(size)
        .fill(undefined)
        .map(
          (_, index) => size ** 2 - size - (size - (size - index)) * (size - 1),
        );
    }
  }
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
