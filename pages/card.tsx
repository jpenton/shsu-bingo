import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import _ from "lodash";
import Isms from '../resources/isms.json';

interface IBingoCell {
  text: string;
  marked?: boolean;
  isImage?: boolean;
}

const CellStrings: Record<"Burris" | "Cho", IBingoCell[]> & {
  [key: string]: IBingoCell[];
} = Isms;

interface IBingoCardProps {
  profName: string;
}

function CellClicked() {
  return;
}

function BingoCard({ profName }: IBingoCardProps) {
  const [cells, setCells] = React.useState<IBingoCell[]>([]);

  React.useEffect(() => {
    if (!profName) {
      return; 
    }

    const cellCopy = [...CellStrings[profName]].filter((cell) => !cell.isImage);
    const populatedCard = [];

    for (var i = 0; i < 25; i++) {
      if (i === 12) {
        populatedCard.push(CellStrings[profName][12]);
        continue;
      }
      const randNum = Math.floor(Math.random() * cellCopy.length);
      const randIsm = cellCopy.splice(randNum, 1);
      populatedCard.push(randIsm[0]);
    }

    setCells(populatedCard);
  }, [profName]);

  return (
    <>
      {_.chunk(cells, 5).map((row, index) => (
        <div className="bingo-row" key={index}>
          {row.map((cell, index) => (
            <div className="bingo-cell" key={index}>
              {cell.isImage ? (<img src= {cell.text} style = {{width: '100%'}}/>) : <span style= {{textAlign: 'center'}}> {cell.text} </span>}
            </div>
          ))}
        </div>
      ))}
    </> 
  );
}

function CardPage() {
  const { name } = useRouter().query;

  return (
    <>
      <Head>
        <title>{`${name ? `Dr. ${name}` : "Bingo Card"} | SHSU Bingo`}</title>
      </Head>
      <h1>{name ? `Dr. ${name} ` : null}Bingo Card</h1>
      <BingoCard profName={Array.isArray(name) ? name[0] : name} />
    </>
  );
}

export default CardPage;
