import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import Card from '../components/BingoCard';
import { ProfessorName } from '../lib/professors';

function CardPage() {
  const { name } = useRouter().query as Record<
    'name',
    ProfessorName | ProfessorName[]
  >;

  return (
    <>
      <Head>
        <title>{`${name ? `Dr. ${name}` : 'Bingo Card'} | SHSU Bingo`}</title>
      </Head>
      <h1>{name ? `Dr. ${name} ` : null}Bingo Card</h1>
      {/* {name ? <h1>{`Dr. ${name} Bingo Card`}</h1> : null} */}
      <div className="flex justify-center">
        <Card professorName={Array.isArray(name) ? name[0] : name} />
      </div>
    </>
  );
}

export default CardPage;
