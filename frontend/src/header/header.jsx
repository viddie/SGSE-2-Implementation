import React, { useEffect, useState } from 'react';
import { Button, Navbar, Nav, Form, FormControl, Container, Image } from 'react-bootstrap'
import { useJwt } from "react-jwt";
import logo from '/static/wurm.png'
import {LinkContainer} from 'react-router-bootstrap'

const Header = (props) => {
    
    const [expired, setExpired] = useState(true);
    const [user, setUser] = ("");

    useEffect(()=> {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const { decodedToken, isExpired } = useJwt(token);
            setUser(decodedToken.username);
            setExpired(isExpired);
            console.log(isExpired)
        }
    }, [])

    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
            <Navbar sticky="top" />
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand>
                    Barter 
                    <Image src={logo} height="40"></Image>
                    Smarter
                </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {expired ?
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/login">
                                <Nav.Link >Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/createAccount">
                                <Nav.Link >Konto erstellen</Nav.Link>
                            </LinkContainer>
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
                    :
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/userArticles">
                                <Nav.Link >Artikel</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/userChat">
                                <Nav.Link >Chat</Nav.Link>
                            </LinkContainer>
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
                }
            </Container>
        </Navbar >
    )
}

export default Header