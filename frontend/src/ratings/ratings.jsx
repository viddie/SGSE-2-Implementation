import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
//import { styles, colors } from './styles'

export const MakeRating = (props) => {
    const [numRatings, setNumRating] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [error, setError] = useState(false);
    const [avgRating, setAvgRating] = useState(0);

    const stars = Array(5).fill(0);
    const userID = sessionStorage.getItem('userID');

    function handleClick(value) {
        fetch(
            `http://sgse2.ad.fh-bielefeld.de/api/ratings/ratings/UserID/${userID}/Rating/${value}`,
            {
                method: 'POST',
                headers: {
                    Authorization:
                        'Bearer ' + sessionStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        setAvgRating(Math.round(data.avgStar));
                        setNumRating(data.totalRatings);
                        console.log(data);
                    });
                } else {
                    setError(true);
                }
            })

            .catch(() => {});
        setCurrentValue(value);
    }

    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };

    return (
        <div style={styles.container}>
            <h2> User-Bewertung </h2>
            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={
                                (hoverValue || currentValue) > index
                                    ? colors.orange
                                    : colors.grey
                            }
                            style={{
                                marginRight: 10,
                                cursor: 'pointer'
                            }}
                        />
                    );
                })}
            </div>
            <RatingStars userID={userID}></RatingStars>
        </div>
    );
};

export const RatingStars = (props) => {
    const [numRatings, setNumRating] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        fetch(
            `http://sgse2.ad.fh-bielefeld.de/api/ratings/ratings/UserID/` +
                props.userID,
            {
                method: 'GET',
                headers: {
                    Authorization:
                        'Bearer ' + sessionStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                if (res.ok) {
                    console.log(res.body);
                    res.json().then((data) => {
                        setAvgRating(Math.round(data.avgStar));
                        setNumRating(data.totalRatings);
                    });
                } else {
                    setError(true);
                }
            })
            .catch(() => {});
    }, []);

    return (
        <div>
            <p> Anzahl Sterne: {currentValue}</p>
            <p> Durchschnittliche Bewertung</p>
            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={12}
                            color={
                                avgRating > index ? colors.green : colors.grey
                            }
                            style={{
                                marginRight: 10,
                                cursor: 'pointer'
                            }}
                        />
                    );
                })}
            </div>
            <p> Anzahl der Bewertungen: {numRatings}</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    stars: {
        display: 'flex',
        flexDirection: 'row'
    },
    textarea: {
        border: '1px solid #a9a9a9',
        borderRadius: 5,
        padding: 10,
        margin: '20px 0',
        minHeight: 100,
        width: 300
    },
    button: {
        border: '1px solid #a9a9a9',
        borderRadius: 5,
        width: 300,
        padding: 10
    }
};

const colors = {
    orange: '#FFBA5A',
    grey: '#a9a9a9',
    green: '#40E0D0'
};
