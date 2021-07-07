import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import haenchen from './wurm.jpg'

const SmallView = (props) => {

    // Zustandsobjekte
    const [loaded, setLoaded] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [article, setArticle] = useState({});

    useEffect(() =>{
        fetch("/api/offers/article/"+props.id)
        .then(res => res.json())
        .then(res => {
            setArticle(res);
            setLoaded(true);
        })
        .catch(() => setErrors(true))
    }, []);

    if (loaded){
        return (
            <Container>
                <Row>
                    <Col>
                        {article.pictures[0] ? <img width="100px" align="left" src={article.pictures[0]}></img> :<img width="100px" align="left" src={haenchen}></img>}
                    </Col>
                    <Col>
                        <ListGroup>
                        <ListGroup.Item><b>{article.heading}</b></ListGroup.Item>
                        <ListGroup.Item>{article.description}</ListGroup.Item>
                        <ListGroup.Item>{article.price} €</ListGroup.Item>
                        <ListGroup.Item>Angeboten von: {article.sellerID}</ListGroup.Item>
                        <ListGroup.Item>Endet am: {article.endsOn}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    </Row>
            </Container>
            );
    } else {
        return null
    }
    
}

export default SmallView;