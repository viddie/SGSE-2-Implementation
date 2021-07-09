import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { OnlineTime } from './helpers';
import haenchen from './wurm.jpg';

const ArticleView = (props) => {
    const [hoover, setHoover] = useState({
        expanded: false,
        background: 'white'
    });
    return (
        <ListGroup.Item>
            <Row
                style={{
                    background: hoover.background,
                    borderWidth: '50px',
                    border: 'double 4px transparent',
                    borderRadius: '8px'
                }}
                onMouseOver={() =>
                    setHoover({ background: '#e0e0e0', expanded: true })
                }
                onMouseLeave={() =>
                    setHoover({ background: 'white', expanded: false })
                }
                className="justify-content-md-center"
            >
                <Col>
                    {props.article.pictures[0] ? (
                        <Image
                            width="150px"
                            rounded
                            alt="tick"
                            src={props.article.pictures[0]}
                        ></Image>
                    ) : (
                        <Image
                            width="150px"
                            maxHeight="150px"
                            rounded
                            alt="tick"
                            src={haenchen}
                        ></Image>
                    )}
                </Col>
                <Col xs align="left">
                    <Row>
                        <b style={{ color: 'darkgreen', fontSize: '20px' }}>
                            {props.article.heading}
                        </b>
                    </Row>
                    <Row>
                        <b>Endet in: </b>
                        <OnlineTime date={props.article.endsOn} />
                    </Row>
                    <Row>
                        <div style={{ fontStyle: 'italic' }}>
                            {props.article.sellerName}
                        </div>
                    </Row>
                </Col>
                <Col className="d-flex justify-content-center">
                    <b className="center-block" style={{ fontSize: '30px' }}>
                        {props.article.price} €{' '}
                    </b>
                </Col>
                {hoover.expanded ? (
                    <Container>
                        <Row>
                            <Col xs align="left">
                                <b> Beschreibung </b>
                                <div>{props.article.description}</div>
                                <b> Verkäuferbewertung</b>

                                <div float="left">
                                    <div>Bewertung:</div>
                                    <RatingStars></RatingStars>
                                </div>
                            </Col>
                            <Col
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {props.store.loggedIn ? (
                                    <DispatchButton
                                        sellerID={props.article.sellerID}
                                        articleID={props.article._id}
                                    ></DispatchButton>
                                ) : (
                                    <LoginButton></LoginButton>
                                )}
                            </Col>
                        </Row>
                    </Container>
                ) : null}
            </Row>
        </ListGroup.Item>
    );
};

function DispatchButton(props) {
    const history = useHistory();

    function deleteArticle(articleID) {
        fetch('http://sgse2.ad.fh-bielefeld.de/api/offers/article', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify({ articleID: articleID })
        }).then(() => {
            history.push('/myArticles');
        });
    }

    if (props.sellerID == sessionStorage.getItem('userID')) {
        return (
            <div>
                <Link to="/editArticle">
                    <Button
                        size="lg"
                        block
                        style={{
                            backgroundColor: 'darkgreen',
                            borderColor: 'darkgreen'
                        }}
                    >
                        Artikel bearbeiten
                    </Button>
                </Link>
                <Link to="/myArticles">
                    <Button
                        size="lg"
                        onClick={() => deleteArticle(props.articleID)}
                        block
                        style={{
                            backgroundColor: 'darkgreen',
                            borderColor: 'darkgreen'
                        }}
                    >
                        Artikel löschen
                    </Button>
                </Link>
            </div>
        );
    } else {
        return (
            <Link to="/chat?hempelmann">
                <Button
                    size="lg"
                    block
                    style={{
                        backgroundColor: 'darkgreen',
                        borderColor: 'darkgreen'
                    }}
                    receiver={props.sellerID}
                >
                    Anbieter kontaktieren
                </Button>
            </Link>
        );
    }
}

function LoginButton() {
    return (
        <div>
            <div>
                <Link to="/login">
                    <Button
                        size="lg"
                        block
                        style={{
                            backgroundColor: 'darkgreen',
                            borderColor: 'darkgreen'
                        }}
                    >
                        Einloggen, um Anbieter zu kontaktieren
                    </Button>
                </Link>
            </div>
            <div>
                <Link to="/createAccount">
                    <div>Noch nicht dabei? Registriere dich!</div>
                </Link>
            </div>
        </div>
    );
}

function RatingStars(props) {
    return (
        <svg height="10px" width="100px">
            <RatingStar fill={true} offset={5} />
            <RatingStar fill={true} offset={15} />
            <RatingStar fill={true} offset={25} />
            <RatingStar fill={true} offset={35} />
            <RatingStar fill={true} offset={45} />
        </svg>
    );
}

function RatingStar(props) {
    if (props.fill) {
        return (
            <circle
                cx={15 + props.offset}
                cy="5"
                r="4"
                stroke="black"
                strokeWidth="1"
                fill="orange"
            />
        );
    } else {
        return (
            <circle
                cx={5 + props.offset}
                cy="5"
                r="4"
                stroke="black"
                strokeWidth="1"
                fill="white"
            />
        );
    }
}

const LineView = (props) => {
    // Zustandsobjekte
    const [loaded, setLoaded] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [article, setArticle] = useState({});

    useEffect(() => {
        fetch('/api/offers/article/' + props.id)
            .then((res) => res.json())
            .then((res) => {
                setArticle(res);
                setLoaded(true);
            })
            .catch(() => setErrors(true));
    }, []);

    if (loaded) {
        return (
            <ArticleView store={props.store} article={article}></ArticleView >
        );
    } else {
        return null;
    }
};

export default LineView;
