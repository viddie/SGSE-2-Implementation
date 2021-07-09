import React, { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import LineView from './articleView';

const Showroom = (props) => {
    const [hasError, setErrors] = useState(false);
    const [articleIds, setArticleIds] = useState([]);

    useEffect(() => {
        const path = props.path;
        fetch(path)
            .then((res) => res.json())
            .then((res) => setArticleIds(res))
            .catch(() => setErrors(true));
    }, []);

    return (
        <Container className="justify-content-md-center">
            <div>{articleIds.length} Artikel gefunden!</div>
            <ListGroup>
                {articleIds.map((id) => (
                    <LineView store={props.store} id={id} key={id}></LineView>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Showroom;
