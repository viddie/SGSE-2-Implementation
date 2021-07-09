import { func } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'regenerator-runtime/runtime';
import './chat.css';

/**
 * @author Marius
 * @function Chat
 **/

const image =
    'https://www.linusakesson.net/programming/kernighans-lever/cat.png';

function Chat(props) {
    return (
        <div className="Chat">
            <div className="chat_header">
                <h1>Name of Chat Partner</h1>
            </div>
            <div className="chat_section">
                <ChatRoom receiver={props.receiver} />
            </div>
        </div>
    );
}

function ChatRoom(props) {
    const receiver = 'Tristan'; //props.receiver;
    const token = sessionStorage.getItem('accessToken');
    const sender = sessionStorage.getItem('userID');
    const dummy = useRef();
    const chatroomID = getChatroomID(receiver, sender);

    const [formValue, setFormValue] = useState('');

    const [messages, setMessages] = useState([]);

    async function subscribe() {
        let response = await fetch(
            `http://sgse2.ad.fh-bielefeld.de/api/chat/messages/${chatroomID}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }
        );

        if (response.status != 200) {
            this.setState({ errorMessage: error.toString() });
            console.error(
                'Error while sending chat message: API call malfunctioned',
                error
            );
            const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms))
            await asyncWait(50000);
            await subscribe();
        } else {
            // Got message
            let messages = await response.json();
            setMessages(messages);
            if (
                window.location.pathname ===
                'http://sgse2.ad.fh-bielefeld.de/userChat'
            ) {
                const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms))
                await asyncWait(50000);
                await subscribe();
            }
        }
    }

    subscribe();

    const sendMessage = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                room: chatroomID,
                sender: sender,
                receiver: receiver,
                text: formValue
            })
        };
        fetch(
            'http://sgse2.ad.fh-bielefeld.de/api/chat/messages/send',
            requestOptions
        )
            .then(async (response) => {
                const isJson = response.headers
                    .get('content-type')
                    ?.includes('application/json');
                const data = isJson && (await response.json());

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
            })
            .catch((error) => {
                this.setState({ errorMessage: error.toString() });
                console.error(
                    'Error while sending chat message: API call malfunctioned',
                    error
                );
            });

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className="mainchatroom">
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage rec={receiver} message={msg} />
                    ))}
                <span ref={dummy}></span>
            </div>

            <form onSubmit={sendMessage} className="chat_message_form">
                <input
                    className="chat_text_input"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="type..."
                />
                <Button
                    type="submit"
                    className="chat_text_submit"
                    disabled={!formValue}
                >
                    send
                </Button>
            </form>
        </>
    );
}

function ChatMessage(props) {
    const text = props.message.text;
    const uid = props.message.receiver;
    const uid_r = props.rec;

    let messageClass = 'sent';
    if (uid != uid_r) {
        messageClass = 'received';
    }

    return (
        <>
            <div className={`message ${messageClass}`}>
                <img
                    className="chat_img"
                    src={
                        'https://www.linusakesson.net/programming/kernighans-lever/cat.png'
                    }
                />
                <p className="chat_text">{text}</p>
            </div>
        </>
    );
}

function getChatroomID(userID1, userID2) {
    return (hash(userID1) + hash(userID2)).toString();
}

function hash(id) {
    var val = 0;
    for (let i = 0; i < id.length; i++) {
        val = val + (i + 1) * id.charCodeAt(i);
    }
    return val;
}

export default Chat;
