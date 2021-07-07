import React from 'react'
import { Button, Form } from 'react-bootstrap'


const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        const data = {
            username: username,
            password: password
        };
        fetch(
            "http://sgse2.ad.fh-bielefeld.de/api/user/auth/login",
            {
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
          .then((res)=>{
            sessionStorage.setItem('bodyWieHempie', res.body);
          })
          .catch(()=>setError(true))
    }
    
    return(
        <div style={{maxWidth: "60%"}} >
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
            <Button block size="lg" type="submit" onClick={()=>handleSubmit} disabled={!validateForm()}>
            Login
            </Button>
        </Form>
        </div>
    )
}

export default Login