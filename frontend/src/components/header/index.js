import React from 'react'
import { Button, Navbar, NavDropdown, Nav, Form, FormControl, Container, Image } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'
import ReactDOM from 'react-dom';
import App from '../../chat/chat';

/**
 * @author
 * @function Header
 **/


const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
            <Navbar sticky="top" />
            <Container>
                <Navbar.Brand href="http://sgse2.ad.fh-bielefeld.de">Barter Smarter</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Angebot erstellen</Nav.Link>
                        <input type="button" className="chatButton" onClick={() => {
                            ReactDOM.render(
                                <React.StrictMode>
                                    <App />
                                </React.StrictMode>,
                                document.getElementById('root')
                              );
                        }}>
                            Chat
                        </input>
                        <NavDropdown title="User" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Sign Up</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#pricing">Kontakt</Nav.Link>
                    </Nav>
                    <Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Leg direkt los!"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="dark">Suche</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header