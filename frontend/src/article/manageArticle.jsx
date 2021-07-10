import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

export const EditArticle = (props) => {
    const history = useHistory();
    let { id } = useParams();

    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('household');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/api/offers/article/' + id)
            .then((res) => res.json())
            .then((res) => {
                setHeading(res.heading);
                setDescription(res.price);
                setTags(res.tags.join(','));
                setCategory(res.category);
            })
            .catch(() => setErrors(true));
    }, []);

    function validateForm() {
        return heading.length > 0 && description.length > 0;
    }

    function handleSubmit(event) {
        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('tags', tags);
        formData.append('articleID', id);

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        fetch('http://sgse2.ad.fh-bielefeld.de/api/offers/article', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: formData // body data type must match "Content-Type" header
        })
            .then((res) => {
                if (!res.ok) {
                    setError(true);
                } else {
                    history.push('/');
                }
            })
            .catch(() => {});
    }
    return (
        <Container className="m-auto" style={{ maxWidth: '60%' }}>
            {!error ? (
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
                            as="textarea"
                            rows={3}
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
                            Gib hier prägnante Tags kommasepariert ein. Es wird
                            die Erreichbarkeit erhöhen!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            as="select"
                        >
                            <option value="household">Haushaltswaren</option>
                            <option value="electronics">Elektroartikel</option>
                            <option value="antiques">Antiquitäten</option>
                            <option value="miscellaneous">Sonstiges</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.File
                            id="custom-file"
                            data-browse="Datei suchen"
                            custom
                            onChange={(e) => setFiles(e.target.files)}
                        />
                    </Form.Group>
                    <Button
                        block
                        size="lg"
                        onClick={() => handleSubmit()}
                        disabled={!validateForm()}
                    >
                        Artikel einstellen
                    </Button>
                </Form>
            ) : (
                <div>Artikel konnte nicht geladen werden!</div>
            )}
        </Container>
    );
};

export const CreateArticle = (props) => {
    const history = useHistory();

    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('household');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(false);

    function validateForm() {
        return heading.length > 0 && description.length > 0;
    }

    function handleSubmit(event) {
        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('tags', tags);

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        fetch('http://sgse2.ad.fh-bielefeld.de/api/offers/article', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: formData // body data type must match "Content-Type" header
        })
            .then((res) => {
                if (!res.ok) {
                    setError(true);
                } else {
                    history.push('/');
                }
            })
            .catch(() => {});
    }

    return (
        <Container className="m-auto" style={{ maxWidth: '60%' }}>
            {error && <Alert variant={'warning'}>Email nicht valide!</Alert>}
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
                        as="textarea"
                        rows={3}
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
                        Gib hier prägnante Tags kommasepariert ein. Es wird die
                        Erreichbarkeit erhöhen!
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        as="select"
                    >
                        <option value="household">Haushaltswaren</option>
                        <option value="electronics">Elektroartikel</option>
                        <option value="antiques">Antiquitäten</option>
                        <option value="miscellaneous">Sonstiges</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.File
                        id="custom-file"
                        data-browse="Datei suchen"
                        custom
                        onChange={(e) => setFiles(e.target.files)}
                    />
                </Form.Group>
                <Button
                    block
                    size="lg"
                    onClick={() => handleSubmit()}
                    disabled={!validateForm()}
                >
                    Artikel einstellen
                </Button>
            </Form>
        </Container>
    );
};
