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
                sender: "WHY IS THIS EVEN HERE???",
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
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
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
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
            <div className={`message ${messageClass}`}>
                <img src={photoURL || 'https://www.linusakesson.net/programming/kernighans-lever/cat.png'} />
                <p>{text}</p>
            </div>
        </>
    );
}

function getMessages(other_user, token) {
    //var this_user = extract_username_from_token(token);
    this_user = token;
    var data = ApiCall(this_user, other_user).push(ApiCall(other_user, this_user));

    console.log(data)

    function compareTimestamps(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return (a<b)?-1:(a>b)?1:0;
    }

    data.sort( function(a, b) {
        return compareTimestamps(a.timestamp, b.timestamp);
    });

    return data;
}

function ApiCall(user1, user2) {
    const data = {}
    const getMessages = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'GET'
        };
        fetch(`http://sgse2.ad.fh-bielefeld.de/api/chat/receive/${user1}/${user2}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                data = isJson && await response.json();
    
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

    return data
}

export default Chat