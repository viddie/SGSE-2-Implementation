import React from 'react'
import { Button, Navbar, NavDropdown, Nav, Form, FormControl, Container, Image } from 'react-bootstrap'
import logo from '/static/wurm.png'


const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
            <Navbar sticky="top" />
            <Container>
                <Navbar.Brand href="http://sgse2.ad.fh-bielefeld.de">
                    Barter 
                    <Image src={logo} height="40"></Image>
                    Smarter
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#login">Login</Nav.Link>
                        <Nav.Link href="#createAccount">Konto erstellen</Nav.Link>
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