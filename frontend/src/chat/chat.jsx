import React from 'react'

/**
 * @author Marius
 * @function Chat
 **/

const image = "https://www.linusakesson.net/programming/kernighans-lever/cat.png"


function Chat() {
    return (
        <div className="Chat">
            <header>
                <h1>Name of Chat Partner</h1>
                <div>Options</div>
            </header>
            <section>
                <ChatRoom/>
            </section>
        </div>
    );
}

function ChatRoom() {
    const { receiver, token } = props;
    const dummy = useRef();
    
    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = { user, image };

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

export default Chat