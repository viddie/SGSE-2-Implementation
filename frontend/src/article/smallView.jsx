import React, { useState, useEffect } from "react";
import haenchen from './wurm.jpg'

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
            <div display={"grid"}>
                {article.pictures[0] ? <img width="100px" align="left" src={article.pictures[0]}></img> :<img width="100px" align="left" src={haenchen}></img>}
                <div><b>{article.heading}</b></div>
                <div>{article.description}</div>
                <div>{article.price} €</div>
                <div>Angeboten von: {article.sellerID}</div>
                <div>Endet am: {article.endsOn}</div>
            </div>
            );
    } else {
        return null
    }
    
}

export default SmallView;