import React from 'react'
import { Button, Navbar, Nav, Form, FormControl, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
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
                        <Link to="/login">
                            <Nav.Link >Login</Nav.Link>
                        </Link>
                        <Link to="/login">
                            <Nav.Link to="/createAccount">Konto erstellen</Nav.Link>
                        </Link>
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