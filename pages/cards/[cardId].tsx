import { useRouter } from "next/dist/client/router";
import Head from "next/head";

function CardPage() {
  const { cardId } = useRouter().query;

  return (
    <>
      <Head>
        <title>{`${
          cardId ? `Dr. ${cardId}` : "Bingo Card"
        } | SHSU Bingo`}</title>
      </Head>
      {cardId ? <h1>{`Dr. ${cardId} Bingo Card`}</h1> : null}
    </>
  );
}

export default CardPage;
