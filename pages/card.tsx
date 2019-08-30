import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import _ from "lodash";

interface IBingoCell {
  text: string;
  marked?: boolean;
  isImage?: boolean;
}

const CellStrings: Record<"Burris" | "Cho", IBingoCell[]> & {
  [key: string]: IBingoCell[];
} = {
  Burris: [
            { text: "Professional Grade!!" },
            { text: "\"Mickey Mouse Programming\"" },
            { text: "\"Are you/we satisfied??\"" },
            { text: "5x \"Deal\" [ ][ ][ ][ ][ ]" },
            { text: "\"Wrong side of the tracks\"" },
            { text: "\"Road map fee\"" },
            { text: "\"Donald Knuth\"" },
            { text: "\"Garbage Collection\"" },
            { text: "\"The Snake\" / \"The Squeeze\"" },
            { text: "\"It's ethical!!\"" },
            { text: "\"I've got time\"" },
            { text: "\"Let's see if we can't...\"" },
            { text: '/static/profHat.png', isImage: true },
            { text: "\"Are you kidding me??\"" },
            { text: "\"Back when I worked with NASA...\"" },
            { text: "\"Do your competition a favor!\"" },
            { text: "\"The Hymnal\"" },
            { text: "*anything about DF majors being untrustworthy*" },
            { text: "\"Kiss the pavement\"" },
            { text: "*something about assembly being your favorite language*" },
            { text: "*something about Apollo 11 having 2k of storage / 32k memory*" },
            { text: "\"If you haven't started on your lab...\"" },
            { text: "\"If you do the *x* option, you should be able to do the *y* option.\"" },
            { text: "\"In Ada...\"" },
            { text: "\"Fruit of the Loom\"" },
          ],
  Cho: []
};

interface IBingoCardProps {
  profName: string;
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
