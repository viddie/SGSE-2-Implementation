import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import SmallView from "./smallView"

const Showroom = (props) => {
  // Zustandsobjekte 
  const [hasError, setErrors] = useState(false);
  const [articleIds, setArticleIds] = useState([]);

  useEffect(() =>{
    const categories = props.categories
      fetch("/api/offers/article/findByCategory?categories="+ categories.join(","))
      .then(res => res.json())
      .then(res => setArticleIds(res))
      .catch(() => setErrors(true))
  }, []);

  return (
      <ListGroup>
        {articleIds.map((id => <SmallView id={id} key={id}></SmallView>))}
      </ListGroup>
    );
}

export default Showroom;