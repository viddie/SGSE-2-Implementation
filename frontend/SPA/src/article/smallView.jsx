import React, { useState, useEffect } from "react";

const SmallView = (props) => {

    // Zustandsobjekte 
    const [hasError, setErrors] = useState(false);
    const [article, setArticle] = useState({});

    useEffect(() =>{
        fetch("/api/offers/article/"+props.id)
        .then(res => res.json())
        .then(res => setArticle(res))
        .catch(() => setErrors(true))
    });

    return (
        <div>
            <div>{article.heading}</div>
            <div>{article.description}</div>
            <div>{article.price}</div>
            <div>{article.startedOn}</div>
            <div>{article.endsOn}</div>
        </div>
        );
}

export default SmallView;