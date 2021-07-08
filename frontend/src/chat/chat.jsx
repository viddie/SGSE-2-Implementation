import { func } from 'prop-types';
import React, { useRef, useState } from 'react';
import { Button } from "react-bootstrap";
import 'regenerator-runtime/runtime'

/**
 * @author Marius
 * @function Chat
 **/

const image = "https://www.linusakesson.net/programming/kernighans-lever/cat.png"


function Chat(props) {
    return (
        <div className="Chat" style={{ textAlign: 'center', maxWidth: 728 + 'px', margin: 0 + 'auto' }}>
            <header style={{ backgroundColor: '#' + 181717, height: 10 + 'vh', minHeight: 50 + 'px', color: 'white', position: 'fixed', width: 100  + '%', maxWidth: 728 + 'px', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'spaceBetween', zIndex: 99, padding: 10 + 'px', boxSizing: 'border-box' }}>
                <h1>Name of Chat Partner</h1>
                <div>Options</div>
            </header>
            <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 100 + 'vh', backgroundColor: "rgb(40, 37, 53)" }}>
                <ChatRoom receiver="Ben" token="Alf"/>
            </section>
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


    console.log("ChatRoom: [messages]");
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
            <main style={{ padding: 10 + 'px', height: 80 + 'vh', margin: 10 + 'vh ' +  0 + ' ' + 10 + 'vh', overflowY: 'scroll', display: 'flex', flexDirection: 'column' }}>
                {messages && messages.map(msg => <ChatMessage key={msg.receiver} val={receiver} message={msg.text} />)}
                <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage} style={{ height: 10 + 'vh', position: 'fixed', bottom: 0, backgroundColor: 'rgb(24, 23, 23)', width: 100 + '%', maxWidth: 728 + 'px', display: 'flex', fontSize: 1.5 + 'rem' }}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type..." style={{ lineHeight: 1.5, width: 100 + '%', fontSize: 1.5 + 'rem', background: 'rgb(58, 58, 58)', color: 'white', outline: 'none', border: 'none', padding: 0 + ' ' + 10 + 'px' }}/>
            </form>
            <Button type="submit" disabled={!formValue} style="background-color: green; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; cursor: pointer; font-size: 1.25rem;">send</Button>
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
                <img src={'https://www.linusakesson.net/programming/kernighans-lever/cat.png'} />
                <p>{text}</p>
            </div>
        </>
    );
}

function getMessages(other_user, token) {
    //var this_user = extract_username_from_token(token);
    var this_user = token;

    var data1 = ApiCall(this_user, other_user);
    var data2 = ApiCall(other_user, this_user);
    var data = []

    console.log(data1)
    console.log(data2)
    
    Promise.all([data1, data2]).then(function(val) {
        console.log(val);
        data = [...val[0],...val[1]];
        console.log(data);
    });

    return data;
}

function ApiCall(user1, user2) {
    const request = async () => {
        const response = await fetch(`http://sgse2.ad.fh-bielefeld.de/api/chat/messages/receive/${user1}/${user2}`, {method: 'GET'});
        const json = await response.json();
        return json;
    }
    
    const data = request();
    return data;
}

export default Chat