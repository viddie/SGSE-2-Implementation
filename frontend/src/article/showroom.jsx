import React, { useState, useEffect } from "react";
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
      <div>
        {articleIds.map((id => <SmallView id={id} key={id}></SmallView>))}
      </div>
    );
}

export default Showroom;