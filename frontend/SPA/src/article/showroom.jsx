import React, { useState, useEffect } from "react";
import SmallView from "./smallView"

const Showroom = () => {
  // Zustandsobjekte 
  const [hasError, setErrors] = useState(false);
  const [articleId, setArticleId] = useState({});

  useEffect(() =>{
      fetch("/api/offers/article/findByCategory?categories=household,%20electronics")
      .then(res => res.json())
      .then(res => setArticleId({ articles: res }))
      .catch(() => setErrors(true))
  });

  return (
      <div>
        {articleId.map((id => <SmallView id={id}></SmallView>))}
      </div>
    );
}

export default Showroom;