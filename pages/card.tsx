import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import _ from "lodash";

interface IBingoCell {
  text: string;
  marked: boolean;
}

interface IBingoCard {
  freeImage: string;
  spaces: IBingoCell[];
}
const CellStrings: Record<"Burris" | "Cho", string[]> & {
  [key: string]: string[];
} = {
  Burris: ["\"Professional Grade!!\"", "\"Mickey Mouse Programming\"", "\"Are you/we satisfied??\"", "5x \"Deal\" [ ][ ][ ][ ][ ]", "\"Wrong side of the tracks\"",
            "\"Road map fee\"", "\"Donald Knuth\"", "\"Garbage Collection\"", "\"The Snake\" / \"The Squeeze\"", "\"It's ethical!!\"", 
            "\"I've got time\"", "\"Let's see if we can't...\"", "\"Are you kidding me??\"", "\"Back when I worked with NASA...\"",
            "\"Do your competition a favor!\"", "\"The Hymnal\"", "*anything about DF majors being untrustworthy*", "\"Kiss the pavement\"",
            "*something about assembly being your favorite language*", "*something about Apollo 11 having 2k of storage / 32k memory*",
            "\"If you haven't started on your lab...\"", "\"If you do the *x* option, you should be able to do the *y* option.\"",
            "\"In Ada...\"", "\"Fruit of the Loom\""],
  Cho: ["cho1", "cho2"]
};
const freeImages = ["bur", "cho"];

interface IBingoCardProps {
  profName: string;
}

function BingoCard({ profName }: IBingoCardProps) {
  const [cells, setCells] = React.useState([]);

  React.useEffect(() => {
    if (!profName) {
      return;
    }

    const cellCopy = [...CellStrings[profName]];
    const populatedCard = [];

    for (var i = 0; i < 25; i++) {
      if (i === 12) {
        populatedCard.push(null);
        continue;
      }
      const randNum = Math.floor(Math.random() * cellCopy.length);
      const randIsm = cellCopy.splice(randNum, 1);
      populatedCard.push(randIsm);
    }

    setCells(populatedCard);
  }, [profName]);

  return (
    <>
      {_.chunk(cells, 5).map((row, index) => (
        <div className="bingo-row" key={index}>
          {row.map((cell, index) => (
            <div className="bingo-cell" key={index}>
              {cell}
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
      {/* {name ? <h1>{`Dr. ${name} Bingo Card`}</h1> : null} */}
      <BingoCard profName={Array.isArray(name) ? name[0] : name} />
    </>
  );
}

export default CardPage;
