import axios from "axios";
import React, { useEffect, useState } from "react";
import makeHttpCall from "../../utils/makeHttpCall";
import './ChatWidget.css';

const ChatWidget = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');

    useEffect(() => {
        const webhookCall = async () => {
            const data = {
                "session": {
                    "new": true
                },
                "message": {
                    "type": "text",
                    "val": userMessage
                },
                "from": {
                    "id": "test@test.com",
                    "userInfo": {
                        "firstName": "fname",
                        "lastName": "lname",
                        "email": "xyz@gmail.com"
                    }
                },
                "to": {
                    "id": "st-dd42b999-8ea0-58fd-9099-94b50b90f6f5"
                },
                "mergeIdentity": "",
                "preferredChannelForResponse": "",
                "customData": {
                    "customText": "This is generated by customData"
                }
            }
            // const headers = {
            //     "headers": {
            //         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLWIxNjlmNjQ3LWQ4MTEtNTI4NS05YjcxLTEwNWI1ZTlhYWUwMCIsInN1YiI6IjEyMzQifQ.P7G-Lnt6n_m_M3y_6OnlJ5zmPgGHSAgW0A9M8qWzGLg",
            //         "Content-Type": "application/json",
            //         "Access-Control-Allow-Origin": "*",
            //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            //     }
            // }

            const headers = {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLWIxNjlmNjQ3LWQ4MTEtNTI4NS05YjcxLTEwNWI1ZTlhYWUwMCIsInN1YiI6IjEyMzQifQ.P7G-Lnt6n_m_M3y_6OnlJ5zmPgGHSAgW0A9M8qWzGLg",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "User-Agent": "Custom-App"
            }

            // const botResponse = await axios.post(
            //     'https://bots.kore.ai/chatbot/v2/webhook/st-969e6350-0439-5958-a697-d239ec90c45b',
            //     data,
            //     {
            //         "headers": {
            //             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLWIxNjlmNjQ3LWQ4MTEtNTI4NS05YjcxLTEwNWI1ZTlhYWUwMCIsInN1YiI6IjEyMzQifQ.P7G-Lnt6n_m_M3y_6OnlJ5zmPgGHSAgW0A9M8qWzGLg",
            //             "Content-Type": "application/json"
            //         }
            //     }
            // );

            const botResponse = await makeHttpCall(
                'post',
                'https://bots.kore.ai/chatbot/v2/webhook/st-969e6350-0439-5958-a697-d239ec90c45b',
                data,
                headers
            );
            
            setMessages(
                [
                    ...messages,
                    {
                        sender: 'bot',
                        text: botResponse.data.data[0].val
                    }
                ]
            );
        }
        if (userMessage.trim()) {
            webhookCall();
        }
        setUserMessage('');
    }, [messages]);

    const handleSendMessage = () => {
        setMessages(
            [
                ...messages,
                {
                    sender: 'user',
                    text: userMessage
                }
            ]
        );
    }

    const handleInputChange = (e) => {
        setUserMessage(e.target.value);
    }

    const handleEndChat = () => {
        window.close();
    }

    return (
        // <div>
        //     <input
        //         type="text"
        //         value={userMessage}
        //         onChange={(e) => setUserMessage(e.target.value)}
        //     />
        //     <button onClick={sendMessage}>Send</button>
        //     <p>Response: 
        //         <ul>
        //             {messages.map((message, index) => (

        //                 <li key={index}>{message.name}: {message.message}</li>
        //             ))}
        //         </ul>
        //     </p>
        // </div>

        <div className="chat-app">
            <div className="chat-window">
                <div className="messages">
                    <table style={{width: '100%'}}>
                        {messages.map((message, index) => (
                            <tr>
                            <div key={index} className={`${message.sender === 'user' ? "message-align-right" : "message-align-left"}`}>
                                <div className="message-container">
                                    <strong>{message.sender}:</strong> {message.text}
                                </div>
                            </div>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={userMessage}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                handleSendMessage();
                            }
                        }
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
                <div className="input-container end-chat-button">
                    <button onClick={handleEndChat}>End Chat</button>
                </div>
            </div>
        </div>
    );
}

export default ChatWidget;