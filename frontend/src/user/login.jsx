import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Login = (props) => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        const data = {
            username: username,
            password: password
        };
        fetch('http://sgse2.ad.fh-bielefeld.de/api/user/auth/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then((res) => {
                if (!res.ok) {
                    setError(true);
                    setPassword('');
                    setUsername('');
                } else {
                    res.json().then((res) => {
                        sessionStorage.setItem('accessToken', res.accessToken);
                        sessionStorage.setItem(
                            'refreshToken',
                            res.refreshToken
                        );
                        var decoded = jwt_decode(res.accessToken);
                        sessionStorage.setItem('userID', decoded.id);
                        sessionStorage.setItem('userName', decoded.username);
                        props.store.loggedIn = true;
                        history.push('/');
                    });
                }
            })
            .catch(() => {});
    }

    return (
        <Container className="m-auto" style={{ width: '60%' }}>
            {error && (
                <Alert variant={'warning'}>
                    Passwort oder Benutzername falsch!
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Benutzername</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Button
                        block
                        size="lg"
                        onClick={() => handleSubmit()}
                        disabled={!validateForm()}
                    >
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default Login;
