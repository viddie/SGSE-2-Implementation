import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import haenchen from './wurm.jpg'

function SmallArticle(article) {
    const [hoover, setHoover] = useState({
      background: "white",
      cursor: "default"
    });
  
    return (
      <ListGroup.Item>
        <Row
          style={{
            background: hoover.background,
            cursor: hoover.cursor,
            borderWidth: "50px",
            border: "double 4px transparent",
            borderRadius: "8px"
          }}
          onMouseOver={() =>
            setHoover({ background: "#e0e0e0", cursor: "pointer" })
          }
          onMouseLeave={() =>
            setHoover({ background: "white", cursor: "default" })
          }
          className="justify-content-md-center"
        >
          <Col>
            <img width="150px" alt="tick" src={haenchen}></img>
          </Col>
          <Col xs align="left">
            <Row>
              <b style={{ color: "darkgreen", fontSize: "20px" }}>
                {article.heading}
              </b>
            </Row>
            <Row>Angeboten von: {article.sellerID}</Row>
            <Row>Endet am: {article.endsOn}</Row>
          </Col>
          <Col className="d-flex justify-content-center">
            <b className="center-block" col-xs-1 style={{ fontSize: "30px" }}>
              {article.price} €{" "}
            </b>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

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
            <SmallArticle article={article}></SmallArticle>
        )
    } else {
        return null
    }
    
}

export default SmallView;