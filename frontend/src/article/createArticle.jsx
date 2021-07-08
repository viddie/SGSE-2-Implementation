import React, { useState } from 'react';
import { Button, Form, Container, Alert} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'; 

const CreateArticle = (props) => {
    const history = useHistory();

    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.00);
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("Haushalt")

    function validateForm() {
        return username.length > 0 && password.length > 0 && email.length > 0;
    }

    function handleSubmit(event) {
        const data = {
            username: username,
            email: email,
            password: password
        };
        fetch(
            "http://sgse2.ad.fh-bielefeld.de/api/user/auth/signup",
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
              if (!res.ok){
                setError(true);
                setPassword("");
                setEmail("");
                setUsername("");
              } else {
                history.push("/login");
              }
          })
          .catch(()=>{
              ;
          })
    }
    
    return(
        <Container className="m-auto" style={{maxWidth: "60%"}} >
        {error &&
            <Alert variant={"warning"}>
                Email nicht valide!
            </Alert>
        }
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
            <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Button block size="lg" onClick={()=>handleSubmit()} disabled={!validateForm()}>
            Login
            </Button>
        </Form>
        </Container>
    )
}

export default CreateArticle