import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'regenerator-runtime/runtime';
import './chat.css';

/**
 * @author Marius
 * @function ChatSelection
 **/

function ChatButton() {
    const token = sessionStorage.getItem('accessToken');
    const userName = sessionStorage.getItem('userName');

    const [entries, setEntries] = useState([]);

    const startPolling = () => {
        fetch(
            `http://sgse2.ad.fh-bielefeld.de/api/chat/messages/receive/${userName}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }
        ).then((res) => {
            if (!res.ok) {
                const data = res.json();
                const error = (data.json && data.message) || res.status;
                console.error(
                    'Error while sending chat message: API call malfunctioned',
                    error
                );
            } else {
                // Got message
                res.json().then((data) => {
                    const distinctEntries = Array.from(new Set([... new Set(data.map(x => x.sender)), ...new Set(data.map(x => x.receiver))]));
                    setEntries(distinctEntries);
                });
            }
        });
    }
    useEffect(() => {
        const interval = setInterval(startPolling, 5000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <>
            <LinkContainer to="/chatSelection">
                <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            <div className="chat_button">
                {entries.length}
            </div>
        </>
    );
}


export default ChatButton;
