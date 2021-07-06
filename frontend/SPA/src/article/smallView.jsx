import React, { useState, useEffect } from "react";
import haenchen from './wurm.jpg'

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
            {article.pictures[0] ? <img height="100px" align="left" src={article.pictures[0]}></img> : <img height="100px" align="left" src={haenchen}></img>}
            <div><b>{article.heading}</b></div>
            <div>{article.description}</div>
            <div>{article.price} €</div>
            <div>Angeboten von: {article.sellerID}</div>
            <div>Endet am: {article.endsOn}</div>
        </div>
        );
}

export default SmallView;