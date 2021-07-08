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
    const [error, setError] = useState(false)

    function validateForm() {
        return heading.length > 0 && description.length > 0
    }

    function handleSubmit(event) {
        const formData = new FormData();
        formData.append("heading", heading);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("tags", tags);

        fetch(
            "http://sgse2.ad.fh-bielefeld.de/api/offers/article",
            {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                    'Content-Type': 'multipart/form-data ',
                    'Authorization': 'Bearer '+ sessionStorage.getItem("accessToken")
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: formData // body data type must match "Content-Type" header
          })
          .then((res)=>{
              if (!res.ok){
                setError(true);
              } else {
                history.push("/");
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
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
            />
            </Form.Group>

            <Form.Group size="lg" controlId="description">
            <Form.Label>Beschreibung</Form.Label>
            <Form.Control
                as="textarea" rows={3}
                autoFocus
                type="text"
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
            <Form.Label>Tags</Form.Label>
            <Form.Control
                autoFocus
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                aria-describedby="tagsHelper"
            />
            <Form.Text id="tagsHelper" muted>
                Gib hier prägnante Tags kommasepariert ein. Es wird die Erreichbarkeit erhöhen!
            </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Control as="select">
                    <option value="household">Haushaltswaren</option>
                    <option value="electronics">Elektroartikel</option>
                    <option value="antiques">Antiquitäten</option>
                    <option value="miscellaneous">Sonstiges</option>
                    <option>Default select</option>
                </Form.Control>
            </Form.Group>

            <Button block size="lg" onClick={()=>handleSubmit()} disabled={!validateForm()}>
            Artikel einstellen
            </Button>
        </Form>
        </Container>
    )
}

export default CreateArticle