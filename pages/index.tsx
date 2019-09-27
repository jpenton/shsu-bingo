import Link from 'next/link';
import Head from 'next/head';
import Container from '../components/Container';
import Card from '../components/Card';
import professors, { ProfessorName } from '../lib/professors';

function HomePage() {
  return (
    <>
      <Head>
        <title>Home | SHSU Bingo</title>
      </Head>
      <h1 style={{ marginBottom: '24px' }}>Choose Bingo Card:</h1>
      <Container>
        <div className="flex">
          {Object.keys(professors).map((key: ProfessorName) => (
            <div className="w-1/3 mx-2" key={`professor-${key}`}>
              <Link
                href={{
                  pathname: 'card',
                  query: {
                    name: key,
                  },
                }}
              >
                <a>
                  <Card
                    img={professors[key].profileImage}
                    title={`Dr. ${key}`}
                  />
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
