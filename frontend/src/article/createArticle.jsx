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
            <Form.Group size="lg" controlId="heading">
            <Form.Label>Überschrift</Form.Label>
            <Form.Control
                as="textarea" rows={3}
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
            />
            </Form.Group>

            <Form.Group size="lg" controlId="description">
            <Form.Label>Beschreibung</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </Form.Group>

            <Form.Group size="lg" controlId="price">
            <Form.Label>Mein Preis</Form.Label>
            <Form.Control
                type="number"
                placeholder="0.00" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            </Form.Group>

            <Form.Group size="lg" controlId="tags">
            <Form.Label>Beschreibung</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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