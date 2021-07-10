import React, { useState } from 'react';
import {
    Button,
    Navbar,
    Nav,
    Form,
    FormControl,
    Container,
    Image
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '/static/wurm.png';

const Header = (props) => {

    const [query, setQuery] = useState("");

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
                {!props.store.loggedIn ? (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/createAccount">
                                <Nav.Link>Konto erstellen</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Leg direkt los!"
                                    className="mr-2"
                                    aria-label="Search"
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <LinkContainer to={'/search-' + query} >
                                    <Button variant="dark">Suche</Button>
                                </LinkContainer>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                ) : (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/myArticles">
                                <Nav.Link>Meine Artikel</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/createArticle">
                                <Nav.Link>Artikel einstellen</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/userChat">
                                <Nav.Link>Chat</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Leg direkt los!"
                                    className="mr-2"
                                    aria-label="Search"
                                    onChange={(e) => setQuery(e.target.value)}
                                    />
                                <LinkContainer to={'/search-' + query} >
                                    <Button variant="dark">Suche</Button>
                                </LinkContainer>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
