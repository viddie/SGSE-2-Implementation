import { func } from 'prop-types';
import React, { useRef, useState } from 'react';
import 'regenerator-runtime/runtime'

/**
 * @author Marius
 * @function Chat
 **/

const image = "https://www.linusakesson.net/programming/kernighans-lever/cat.png"


function Chat(props) {
    return (
        <div className="Chat">
            <header>
                <h1>Name of Chat Partner</h1>
                <div>Options</div>
            </header>
            <section>
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

    const [messages] = getMessages(receiver, token);

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
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.receiver} val={receiver} message={msg.text} />)}
                <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type..." />
            </form>
            <button type="submit" disabled={!formValue}>send</button>
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

    if (data1 != undefined && data1.length == 0) {
        if (data2 != undefined && data2.length != 0) {
            data = data2;
        }
    } else {
        if (data2 != undefined && data2.length == 0) {
            data = data1;
        } else {
            data = [...data1, ...data2];
            
            console.log("ALL GLORY TO THE DATA!");
            console.log(data1);
            console.log(data2);
            console.log(data);
/*
            function compareTimestamps(a, b) {
                a = a.toLowerCase();
                b = b.toLowerCase();
                return (a<b)?-1:(a>b)?1:0;
            }

            data.sort( function(a, b) {
                return compareTimestamps(a.timestamp, b.timestamp);
            });*/
        }
    }

    return data;
}

function ApiCall(user1, user2) {
    const request = async () => {
        const response = await fetch(`http://sgse2.ad.fh-bielefeld.de/api/chat/messages/receive/${user1}/${user2}`, {method: 'GET'});
        const json = await response.json();
        console.log("does data exist and if so, can it feel?");
        console.log(json);

        return json;
    }
    
    return request();
}

export default Chat