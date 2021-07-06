import React, { useState, useEffect } from "react";

const Showroom = () => {

    const [hasError, setErrors] = useState(false);
    const [planets, setPlanets] = useState({});
  
    useEffect(() =>
    fetch("/api/offers/article/findByCategory?categories=household,%20electronics")
      .then(res => res.json())
      .then(res => this.setState({ articles: res }))
      .catch(() => this.setState({ hasErrors: true }))
  );

    return (
        <div>
          return <div>{JSON.stringify(planets)}</div>;
        </div>
      );
}

export default Showroom;