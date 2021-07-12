import { uid } from 'uid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import './chat.css';
import { MakeRating } from '../ratings/ratings';

/**
 * @author Marius
 * @function ChatSelection
 **/

function ChatSelection() {
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
                    const distinctEntries = [... new Set([... new Set(data.map(x => x.sender)), ...new Set(data.map(x => x.receiver))])];
                    const distinctIds = [... new Set([... new Set(data.map(x => x.senderID)), ...new Set(data.map(x => x.receiverID))])];

                    console.log(distinctEntries);

                    var chatPartners = [];
                    for (let i = 0; i < distinctEntries.length; i++) {
                        if (distinctEntries[i] != userName) {
                            chatPartners.push({
                                'user': distinctEntries[i],
                                'userID': distinctIds[i]
                            });
                        }
                    }

                    console.log(chatPartners);
                    setEntries(chatPartners);
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
                    entries.map((entry) => (
                        <Entry key={uid()} receiver={entry.user} id={entry.userID}/>
                    ))}
            </div>
        </>
    );
}

function Entry(props) {
    return (
        <div className="chat_selection_entry">
            <Link className="chat_selection_link" to={"/userChat-"+props.receiver+'/'+props.id}>
                <div className="chat_select_item" id="chat_select_img_container">
                    <img
                        className="chat_select_img"
                        src={
                            'https://www.linusakesson.net/programming/kernighans-lever/cat.png'
                        }
                    />
                <div className="chat_select_item" id="chat_select_text">{props.receiver}</div>
                </div>
            </Link>
            <div className="chat_select_item"><MakeRating UserID={props.id}></MakeRating></div>
        </div>
    );
}

export default ChatSelection;
