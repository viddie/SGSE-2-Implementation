import React, { useRef, useState } from 'react';
import 'regenerator-runtime/runtime';
import './routeNotFound.css';
import logo from '/static/wurm.png'

/**
 * @author Marius
 * @function Error 404 Page
 **/

function ErrorPageNotFound() {
    return (
        <div className="content">
            <div className="container">
                <div className="container_title">
                    Something went wrong ... 404
                </div>
                <div className="container_text">
                    The page you're looking for does not exist.
                </div>
                <LinkContainer to="/login">
                    <Nav.Link >Home</Nav.Link>
                </LinkContainer>
            </div>
            <img className="not_found_image" src={logo}/>
        </div>
    );
}


export default ErrorPageNotFound