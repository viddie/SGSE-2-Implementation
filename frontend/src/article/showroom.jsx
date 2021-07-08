import React, { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import SmallView from "./smallView"

const Showroom = (props) => {
  // Zustandsobjekte 
  const [hasError, setErrors] = useState(false);
  const [articleIds, setArticleIds] = useState([]);

  useEffect(() =>{
    const path = props.path
      fetch(path)
      .then(res => res.json())
      .then(res => setArticleIds(res))
      .catch(() => setErrors(true))
  }, []);

  return (
    <Container style={{ maxWidth: "60%", minWidth: "600px" }}>
      <div>Zeige {articleIds.length} Artikel von 10</div>
      <ListGroup>
        {articleIds.map((id => <SmallView store={props.store} id={id} key={id}></SmallView>))}
      </ListGroup>
    </Container>
    );
}

export default Showroom;
