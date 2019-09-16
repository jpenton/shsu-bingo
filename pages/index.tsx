import Link from 'next/link';
import Head from 'next/head';
import Container from '../components/Container';
import Card from '../components/Card';

interface ICard {
  image: string;
  name: string;
}

const cards: ICard[] = [
  {
    image:
      'https://cs.shsu.edu/dotAsset/05835d24-63bd-4a76-a63a-50dccf4144ad.jpg',
    name: 'Burris',
  },
  {
    image: 'https://cs.shsu.edu/images/2017-faculty/Dr.+Cho.jpg',
    name: 'Cho',
  },
];

function HomePage() {
  return (
    <>
      <Head>
        <title>Home | SHSU Bingo</title>
      </Head>
      <h1 style={{ marginBottom: '24px' }}>Choose Bingo Card:</h1>
      <Container>
        <div className="flex">
          {cards.map((item, index) => (
            <div className="w-1/3 mx-2" key={index}>
              <Link
                href={{
                  pathname: 'card',
                  query: {
                    name: item.name,
                  },
                }}
              >
                <a>
                  <Card img={item.image} title={`Dr. ${item.name}`} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default HomePage;
