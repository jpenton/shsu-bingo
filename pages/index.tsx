import { Card, CardImg, CardBody, Row, Col } from "reactstrap";
import Link from "next/link";

interface ICard {
  image: string;
  name: string;
}

const cards: ICard[] = [
  {
    image: "https://source.unsplash.com/random/286x180",
    name: "Burris"
  },
  {
    image: "https://source.unsplash.com/random/286x180",
    name: "Cho"
  }
];

function HomePage() {
  return (
    <>
      <h1 style={{ marginBottom: "24px" }}>Choose Bingo Card:</h1>
      <Row>
        {cards.map((item, index) => (
          <Col key={index} xs={4}>
            <Link href={`/cards/${item.name}`}>
              <a>
                <Card>
                  <CardImg top height="180px" src={item.image} />
                  <CardBody>
                    <h5 className="card-title">{`Dr. ${item.name}`}</h5>
                  </CardBody>
                </Card>
              </a>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomePage;
