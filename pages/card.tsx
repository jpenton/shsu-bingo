import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from 'react';
import _ from 'lodash';

interface IBingoCell {
  text: string;
  marked: boolean;
}

interface IBingoCard {
  freeImage: string;
  spaces: IBingoCell[];
}
const CellStrings: Record<'Burris' | 'Cho', string[]> = { 
  Burris: ['string1', 'string2'],
  Cho: ['cho1', 'cho2']
}
const freeImages = ['bur', 'cho'];

function BingoCard() {
  
  const cellCopy = CellStrings.Burris;
  const populatedCard = [];

  for (var i = 0 ; i < 25 ; i++) {
    if (i === 12) {
      continue;
    }
    const randNum = Math.floor(Math.random()*cellCopy.length)
    const randIsm = cellCopy.splice(randNum, 1);
    populatedCard.push(randIsm);
  }

  const [cells, setCells] = React.useState(populatedCard);

  return(
    <>
    {_.chunk(cells, 5).map((row, index) => (
      <div className = 'bingo-row'
      key = {index}>
      {row.map((cell, index) => (
        <div className = 'bingo-cell'
        key = {index}>
          {cell}
        </div>
      ))}
      </div>
    ))}
    </>
  )

}

function CardPage() {
  const { name } = useRouter().query;

  return (
    <>
      <Head>
        <title>{`${name ? `Dr. ${name}` : "Bingo Card"} | SHSU Bingo`}</title>
      </Head>
      {name ? <h1>{`Dr. ${name} Bingo Card`}</h1> : null}
      <BingoCard/>
    </>
  );
}

export default CardPage;
