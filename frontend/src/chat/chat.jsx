import { func } from 'prop-types';
import React, { useRef, useState } from 'react';
import { Button } from "react-bootstrap";
import 'regenerator-runtime/runtime'
import './chat.css';

/**
 * @author Marius
 * @function Chat
 **/

const image = "https://www.linusakesson.net/programming/kernighans-lever/cat.png"


function Chat(props) {
    return (
        <div className="Chat">
            <div className="chat_header">
                <h1>{props.receiver}</h1>
                <div className="chat_header_options">Options</div>
            </div>
            <div className="chat_section">
                <ChatRoom receiver="Ben" token="Alf"/>
            </div>
        </div>
    );
}

// <ChatRoom receiver={props.receiver} token={props.token}/>

function ChatRoom(props) {
    const receiver = props.receiver;
    const token = props.token;
    const dummy = useRef();
    
    const [formValue, setFormValue] = useState('');

    const messages = getMessages(receiver, token);


    console.log("DEBUG: ChatRoom: messages");
    console.log(messages);

    const sendMessage = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 1,
                sender: token,
                receiver: receiver,
                text: formValue
            })
        };
        fetch('http://sgse2.ad.fh-bielefeld.de/api/chat/messages/send', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('Error while sending chat message: API call malfunctioned', error);
            });

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div className='mainchatroom'>
                {messages && messages.map(msg => <ChatMessage key={msg.receiver} val={receiver} message={msg.text} />)}
                <span ref={dummy}></span>
            </div>

            <form onSubmit={sendMessage} className="chat_message_form">
                <input className="chat_text_input" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type..."/>
                <Button type="submit" className="chat_text_submit" disabled={!formValue}>send</Button>
            </form>
        </>
    )
}

function ChatMessage(props) {
    const text = props.message;
    const uid = props.key;
    const uid_r = props.val;

    const messageClass = 'sent';
    if (uid == uid_r) {
        messageClass = 'received';
    }

    return (
        <>
            <div className={`message ${messageClass}`}>
                <img className="chat_img" src={'https://www.linusakesson.net/programming/kernighans-lever/cat.png'} />
                <p className="chat_text">{text}</p>
            </div>
        </>
    );
}

const getMessages = async(other_user, token) => {
    //var this_user = extract_username_from_token(token);
    var this_user = token;
    
    const request = async (user1, user2) => {
        const response = await fetch(`http://sgse2.ad.fh-bielefeld.de/api/chat/messages/receive/${user1}/${user2}`, {method: 'GET'});
        const json = await response.json();
        return json;
    }

    var data1 = await request(this_user, other_user);
    var data2 = await request(other_user, this_user);
    var data = undefined;

    Promise.all([data1, data2]).then(function(val) {
        data = [...val[0],...val[1]];
        console.log("DEBUG: getMessages: val")
        console.log(val);
    });

    console.log("DEBUG: getMessages: data")
    console.log(data);

    if (data != undefined) {
        return data;
    }
}

export default Chat