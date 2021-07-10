import { uid } from 'uid';
import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import './chat.css';

/**
 * @author Marius
 * @function ChatSelection
 **/

function ChatSelection(props) {
    return (
        <div className="Chat">
            <div className="chat_header">
                <h1>Select open Chat</h1>
            </div>
            <div className="chat_section">
                <Room/>
            </div>
        </div>
    );
}

function Room() {
    const token = sessionStorage.getItem('accessToken');
    const userName = sessionStorage.getItem('userName');

    const [entries, setEntries] = useState([]);

    const startPolling = () => {
        fetch(
            `http://sgse2.ad.fh-bielefeld.de/api/chat/messages/receive${userName}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }
        ).then((res) => {
            if (!res.ok) {
                console.error(
                    'Error while sending chat message: API call malfunctioned',
                    error
                );
            } else {
                // Got message
                res.json().then((data) => {
                    console.log(data);
                    const disdinctReceivers = [... new Set(data.map(x => x.receiver))];
                    console.log(disdinctReceivers);
                    setEntries(disdinctReceivers);
                });
            }
        });
    }
    useEffect(() => {
        const interval = setInterval(startPolling, 1000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <>
            <div className="mainchatroom">
                {entries &&
                    entries.map((msg) => (
                        <Entry key={uid()} receiver={msg.receiver}/>
                    ))}
            </div>
        </>
    );
}

function Entry(props) {
    return (
        <>
            <Link to={"/userChat"+props.sellerName}>
                <p className="chat_select_text">{text}</p>
                <img
                    className="chat_select_img"
                    src={
                        'https://www.linusakesson.net/programming/kernighans-lever/cat.png'
                    }
                />
            </Link>
        </>
    );
}

export default ChatSelection;
