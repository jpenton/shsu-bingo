import { useRouter } from "next/dist/client/router";

function CardPage() {
  const { cardId } = useRouter().query;

  return <>{cardId ? <h1>{`Dr. ${cardId} Bingo Card`}</h1> : null}</>;
}

export default CardPage;
