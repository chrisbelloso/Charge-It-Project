import { Nav, Navbar, Container } from "react-bootstrap";
import "./NavBar.css";

const NavBar = () => {
    return(
        <>
  
  <Navbar bg="primary" variant="dark">
    <Container style={{margin: 0, paddingLeft: 12}}>
    <Navbar.Brand style={{fontSize: "2.25rem", margin: 0, padding: 0, paddingRight: 5}} className="logo" href="#home">⚡</Navbar.Brand>
    <Nav className="me-auto">
      <h2 style={{color: "white", marginBottom: 0, marginLeft: 5}}>Charge-it</h2>
    </Nav>
    </Container>
  </Navbar>
</>
    )
}

export default NavBar;