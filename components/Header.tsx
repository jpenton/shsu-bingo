import Link from 'next/link';
import Container from './Container';

function Header() {
  return (
    <Container className="bg-cool-grey-800 py-3">
      <div className="flex justify-between items-baseline">
        <Link href="/">
          <a className="text-xl text-white font-medium">SHSU Bingo</a>
        </Link>
        {/* <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              GitHub
            </NavLink>
          </NavItem>
        </Nav> */}
        <div>
          <a
            className="text-lg text-white"
            href="https://github.com/jpenton/shsu-bingo/issues"
            target="_blank"
            rel="noopener"
          >
            Open Issues
          </a>
        </div>
      </div>
    </Container>
  );
}

export default Header;
