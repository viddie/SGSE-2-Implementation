import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import haenchen from './wurm.jpg'

function SmallArticle(props) {
  const [hoover, setHoover] = useState({
    expanded: false,
    background: "white"});
  
    return (
      <ListGroup.Item>
        <Row
          style={{
            background: hoover.background,
            borderWidth: "50px",
            border: "double 4px transparent",
            borderRadius: "8px"
          }}
          onMouseOver={() =>
            setHoover({ background: "#e0e0e0", expanded: true })
          }
          onMouseLeave={() =>
            setHoover({ background: "white", expanded: false })
          }
          className="justify-content-md-center"
        >
          <Col>
          {props.article.pictures[0] ?
            <Image width="150px" rounded alt="tick" src={props.article.pictures[0]}></Image> : <Image width="150px" maxHeight="150px" rounded alt="tick" src={haenchen}></Image>  
          }
            
          </Col>
          <Col xs align="left">
            <Row>
              <b style={{ color: "darkgreen", fontSize: "20px" }}>
                {props.article.heading}
              </b>
            </Row>
            <Row>
              <b>Angeboten seit: </b>
              <div>{props.article.startedOn}</div>
              </Row>
            <Row><b>Endet am:</b> <div>{props.article.endsOn}</div></Row>
          </Col>
          <Col className="d-flex justify-content-center">
            <b className="center-block" style={{ fontSize: "30px" }}>
              {props.article.price} €{" "}
            </b>
          </Col>
          {hoover.expanded ? (
            <Container>
              <Row>
                <Col xs align="left">
                  <b> Beschreibung </b>
                  <div>{props.article.description}</div>
                  <b> Verkäufer </b>
                  <div style={{ fontStyle: "italic" }}>
                    {props.article.sellerName}
                  </div>
                  <div float="left">
                    <div>Bewertung:</div>
                    <RatingStars></RatingStars>
                  </div>
                </Col>
                <Col style={{ display: "flex", alignItems: "center" }}>
                  {props.store.loggedIn ? <ContactButton></ContactButton> : <LoginButton></LoginButton>}
                </Col>
              </Row>
            </Container>
          ) : null}
        </Row>
      </ListGroup.Item>
    );
  }

function ContactButton() {
  return (    
      <Link to="/chat">
        <Button size="lg" block style={{ backgroundColor: "darkgreen", borderColor: "darkgreen" }}>
          Anbieter kontaktieren
        </Button>
      </Link>
  )
}

function LoginButton() {
  return (    
      <Link to="/login">
        <Button size="lg" block style={{ backgroundColor: "darkgreen", borderColor: "darkgreen" }}>
          Einloggen, um Anbieter zu kontaktieren
        </Button>
        <div>Noch nicht dabei? Registriere dich!</div>
      </Link>
  )
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
        strokeWidth="1"
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
        strokeWidth="1"
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