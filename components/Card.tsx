import { useState, useEffect } from 'react';
import _ from 'lodash';
import professors, { ProfessorName } from '../lib/professors';
import Cell from './Cell';

interface IBingoCell {
  image?: string;
  marked?: boolean;
  text?: string;
}

interface IBingoCardProps {
  professorName: ProfessorName;
  size?: number;
}

function BingoCard({ professorName, size = 5 }: IBingoCardProps) {
  const [cells, setCells] = useState<IBingoCell[]>([]);
  const centerIndex = Math.floor(size / 2) * size + Math.floor(size / 2);
  const professor = professors[professorName];

  const onCellClick = (cellIndex: number) => () =>
    setCells(cells =>
      cells.map((cell, index) => {
        if (index === cellIndex) {
          return {
            ...cell,
            marked: !cell.marked,
          };
        }

        return cell;
      }),
    );

  useEffect(() => {
    if (!professorName) {
      return;
    }

    const ismsCopy = [...professor.isms];
    const randomIsms: IBingoCell[] = [];

    for (let i = 0; i < size ** 2; i++) {
      if (size % 2 === 1 && i === centerIndex) {
        randomIsms.push({
          image: professor.centerImage,
          marked: true,
        });
        continue;
      }

      const randNum = Math.floor(Math.random() * ismsCopy.length);
      const [randIsm] = ismsCopy.splice(randNum, 1);
      randomIsms.push({
        text: randIsm,
      });
    }

    setCells(randomIsms.slice(0, size ** 2));
  }, [professorName]);

  return (
    <>
      {_.chunk(cells, 5).map((row, rowIndex) => (
        <div className="bingo-row" key={`row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <Cell
              key={`cell-${rowIndex}-${cellIndex}`}
              image={cell.image}
              marked={cell.marked}
              onClick={onCellClick(rowIndex * size + cellIndex)}
              text={cell.text}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default BingoCard;
