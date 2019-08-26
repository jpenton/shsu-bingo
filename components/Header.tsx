import {
  Navbar,
  NavbarBrand,
  // Nav,
  // NavItem,
  // NavLink,
  Container
} from "reactstrap";

function Header() {
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand href="/">SHSU Bingo</NavbarBrand>
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
    </Navbar>
  );
}

export default Header;
