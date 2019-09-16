import Link from 'next/link';
import Container from './Container';

function Header() {
  return (
    <Container className="bg-cool-grey-800 py-3">
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
    </Container>
  );
}

export default Header;
