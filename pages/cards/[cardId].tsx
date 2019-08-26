import { useRouter } from "next/dist/client/router";

function CardPage() {
  const { cardId } = useRouter().query;

  return (
    <>
      <h1>{`Dr. ${cardId} Bingo Card`}</h1>
    </>
  );
}

export default CardPage;
