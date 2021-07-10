import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { styles, colors } from './styles';

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
            `http://sgse2.ad.fh-bielefeld.de/api/ratings/ratings/UserID/7897dfg98687dfg68767fdgd86/Rating/${value}`, //replaced ${userID}
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
            <p> Anzahl Sterne: {currentValue}</p>
            <p> Durchschnittliche Bewertung</p>
            <RatingStars userID={userID} avgRating={avgRating} numRatings={numRatings}></RatingStars>
        </div>
    );
};

export const RatingStars = (props) => {
    const [numRatings, setNumRating] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const stars = Array(5).fill(0);

    useEffect(() => {
        fetch(
            `http://sgse2.ad.fh-bielefeld.de/api/ratings/ratings/UserID/` +
                `7897dfg98687dfg68767fdgd86`,
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
            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={12}
                            color={
                                 (props.avgRating || avgRating) > index ? colors.green : colors.grey
                            }
                            style={{
                                marginRight: 10,
                                cursor: 'pointer'
                            }}
                        />
                    );
                })}
            </div>
            !props.numRating ?
            (<p> Anzahl der Bewertungen: {numRatings}</p>)
             :
            (<p> Anzahl der Bewertungen: {props.numRatings}</p>)
        </div>
    );
};
