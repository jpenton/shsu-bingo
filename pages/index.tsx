import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardBody,
  Row,
  Col
} from "reactstrap";

interface ICard {
  image: string;
  name: string;
}

const cards: ICard[] = [
  {
    image: "https://source.unsplash.com/random/286x180",
    name: "Dr. Burris"
  },
  {
    image: "https://source.unsplash.com/random/286x180",
    name: "Dr. Cho"
  }
];

function HomePage() {
  return (
    <>
      <h1 style={{ marginBottom: "24px" }}>Choose Bingo Card</h1>
      <Row>
        {cards.map((item, index) => (
          <Col xs={4}>
            <Card>
              <CardImg top width="180" src={item.image} />
              <CardBody>
                <h5 className="card-title">{item.name}</h5>
                {/* <CardTitle>{item.name}</CardTitle> */}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomePage;
