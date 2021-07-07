import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import haenchen from './wurm.jpg'

function SmallArticle(props) {
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
          {props.article.pictures[0] ?
            <img width="150px" alt="tick" src={props.article.pictures[0]}></img> : <img width="150px" alt="tick" src={haenchen}></img>  
          }
            
          </Col>
          <Col xs align="left">
            <Row>
              <b style={{ color: "darkgreen", fontSize: "20px" }}>
                {props.article.heading}
              </b>
            </Row>
            <Row><b>Angeboten von: </b>{props.article.sellerID}</Row>
            <Row><b>Angeboten seit: </b>{props.article.startedOn}</Row>
            <Row><b>Endet am:</b> {props.article.endsOn}</Row>
          </Col>
          <Col className="d-flex justify-content-center">
            <b className="center-block" col-xs-1 style={{ fontSize: "30px" }}>
              {props.article.price} €{" "}
            </b>
          </Col>
          {hoover.expanded ? (
          <Container>
            <Row>
              <Col>
                <b> Beschreibung </b>
                <div>{props.article.description}</div>
                <b> Verkäufer </b>
                <div style={{ fontStyle: "italic" }}>
                  {props.article.sellerID}
                </div>
                <div float="left">
                  <text>Bewertung:</text>
                  <RatingStars></RatingStars>
                </div>
              </Col>
              <Col style={{ display: "flex", alignItems: "center" }}>
                <Button size="lg" block>
                  Anbieter kontaktieren
                </Button>
              </Col>
            </Row>
          </Container>
        ) : null}
        </Row>
      </ListGroup.Item>
    );
  }

function RatingStars(props) {
  return (
    <svg height="10px" width="100px">
      <RatingStar fill={true} offset={5} />
      <RatingStar fill={true} offset={15} />
      <RatingStar fill={true} offset={25} />
      <RatingStar fill={true} offset={35} />
      <RatingStar fill={true} offset={45} />
    </svg>
  );
}
  
function RatingStar(props) {
  if (props.fill) {
    return (
      <circle
        cx={15 + props.offset}
        cy="5"
        r="4"
        stroke="black"
        stroke-width="1"
        fill="orange"
      />
    );
  } else {
    return (
      <circle
        cx={5 + props.offset}
        cy="5"
        r="4"
        stroke="black"
        stroke-width="1"
        fill="white"
      />
    );
  }
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