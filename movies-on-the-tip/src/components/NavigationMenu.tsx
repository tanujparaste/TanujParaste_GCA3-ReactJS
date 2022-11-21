import { Container, Form, InputGroup, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom";

function NavigationMenu({ search }: { search: any }) {
  return (
    <Navbar variant="light" bg="light" expand="lg" fixed="top" >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-sm-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={NavLink} to="/" >Movies in theatre</Nav.Link>
            <Nav.Link as={NavLink} to="/upcoming" >Coming Soon</Nav.Link>
            <Nav.Link as={NavLink} to="/topindian">Top rated indian</Nav.Link>
            <Nav.Link as={NavLink} to="/top" >Top rated movies</Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">Favourites</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <InputGroup>
              <Form.Control
                type="input"
                placeholder="Search movie"
                aria-label="Search"
                onChange={search}
              />
              <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "#0D6EFD", color: "#fff" }}>Search</InputGroup.Text>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationMenu;