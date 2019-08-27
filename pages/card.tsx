import { useRouter } from "next/dist/client/router";
import Head from "next/head";

function CardPage() {
  const { name } = useRouter().query;

  return (
    <>
      <Head>
        <title>{`${name ? `Dr. ${name}` : "Bingo Card"} | SHSU Bingo`}</title>
      </Head>
      {name ? <h1>{`Dr. ${name} Bingo Card`}</h1> : null}
    </>
  );
}

export default CardPage;
