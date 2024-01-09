import { useState } from 'react';
interface Message {
    text: string;
    user: string;
}
const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: newMessage, user: 'user' },
            ]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-interface">
            <div className="message-container">
                {messages.map((message, index) => (
                    <div key={index}>{`${message.user}: ${message.text}`}</div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{ flex: 1, marginRight: '10px' }}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
