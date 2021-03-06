import { useState, useEffect } from 'react';
import _ from 'lodash';
import professors, { ProfessorName, IProfessor } from '../lib/professors';
import Cell from './BingoCell';
import bingoMachine, { IBingoContext, IBingoEvent } from '../machines/bingo';
import { StateNode } from 'xstate';
import { useMachine } from '@xstate/react';
import classnames from 'classnames';

export interface IBingoCell {
  count?: number;
  countMax?: number;
  image?: string;
  locked?: boolean;
  marked?: boolean;
  text?: string;
  type?: 'counter';
  win?: boolean;
}

interface IBingoCardProps {
  professorName: ProfessorName;
  size?: number;
}

function generateCells(professor: IProfessor, size: number): IBingoCell[] {
  const centerIndex = Math.floor(size / 2) * size + Math.floor(size / 2);
  const ismsCopy = [...professor.isms];
  const randomIsms: IBingoCell[] = [];

  for (let i = 0; i < size ** 2; i++) {
    if (size % 2 === 1 && i === centerIndex) {
      randomIsms.push({
        image: professor.centerImage,
        locked: true,
        marked: true,
      });
      continue;
    }

    const randNum = Math.floor(Math.random() * ismsCopy.length);
    const [randIsm] = ismsCopy.splice(randNum, 1);
    randomIsms.push(
      typeof randIsm === 'string'
        ? {
            text: randIsm,
          }
        : randIsm.type === 'counter'
        ? {
            ...randIsm,
            count: 0,
          }
        : randIsm,
    );
  }

  return randomIsms.slice(0, size ** 2);
}

function getSize(length: number): number {
  const initSize = Math.sqrt(length);

  if (initSize % 1 === 0) {
    return initSize > 5 ? 5 : initSize;
  }

  const initSizePlus1 = Math.sqrt(length + 1);

  if (initSizePlus1 % 1 === 0 && initSizePlus1 % 2 === 1) {
    return initSizePlus1 > 5 ? 5 : initSizePlus1;
  }

  return Math.floor(initSize);
}

function BingoCard({ professorName }: IBingoCardProps) {
  if (!professorName) {
    return null;
  }

  const professor = professors[professorName];
  const size = getSize(professor.isms.length);
  const persistedBingoMachine = bingoMachine.withConfig(
    {},
    {
      cells: generateCells(professor, size),
    },
  );
  const [state, send] = useMachine<IBingoContext, IBingoEvent>(
    persistedBingoMachine,
  );

  const onCellClick = (cellIndex: number) => () =>
    send('CLICK', { index: cellIndex });

  return (
    <div className="bingo-table overflow-x-auto">
      {/* {state.value === 'WINNER' ? <h1>WINNER</h1> : null} */}
      {_.chunk(state.context.cells, size).map((row, rowIndex) => (
        <div className="flex" key={`row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <Cell
              count={cell.count}
              countMax={cell.countMax}
              className={classnames(
                cellIndex !== 0 ? 'border-l' : 'border-l-2',
                cellIndex !== size - 1 ? 'border-r' : 'border-r-2',
                rowIndex !== 0 ? 'border-t' : 'border-t-2',
                rowIndex !== size - 1 ? 'border-b' : 'border-b-2',
                // 'rounded-full m-2',
                state.value === 'WINNER' && 'cursor-not-allowed',
              )}
              key={`cell-${rowIndex}-${cellIndex}`}
              image={cell.image}
              locked={cell.locked}
              marked={cell.marked}
              onClick={
                !cell.locked
                  ? onCellClick(rowIndex * size + cellIndex)
                  : undefined
              }
              roundCorner={
                rowIndex === 0
                  ? cellIndex === 0
                    ? 'top-left'
                    : cellIndex === size - 1
                    ? 'top-right'
                    : undefined
                  : rowIndex === size - 1
                  ? cellIndex === 0
                    ? 'bottom-left'
                    : cellIndex === size - 1
                    ? 'bottom-right'
                    : undefined
                  : undefined
              }
              text={cell.text}
              win={cell.win}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default BingoCard;
