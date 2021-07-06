import React, { useState, useEffect } from "react";
import SmallView from "./smallView"

const Showroom = () => {
  // Zustandsobjekte 
  const [hasError, setErrors] = useState(false);
  const [articleIds, setArticleIds] = useState([]);

  useEffect(() =>{
      fetch("/api/offers/article/findByCategory?categories=household,%20electronics")
      .then(res => res.json())
      .then(res => setArticleId(res))
      .catch(() => setErrors(true))
  });

  return (
      <div>
        {articleIds}
      </div>
    );
}

export default Showroom;