import React, { useState, useEffect } from "react";

const Showroom = () => {

    const [hasError, setErrors] = useState(false);
    const [articles, setArticles] = useState({});
  
    useEffect(() =>{
        fetch("/api/offers/article/findByCategory?categories=household,%20electronics")
        .then(res => res.json())
        .then(res => setArticles({ articles: res }))
        .catch(() => setErrors(true))
        console.log("hi");
    });

    return (
        <div>
          <div>{JSON.stringify(articles)}</div>;
        </div>
      );
}

export default Showroom;