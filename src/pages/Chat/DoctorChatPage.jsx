import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';
import React, { useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import style from './Chat.module.css';
import { useLocation } from 'react-router-dom';
import { Input } from 'antd';

export default function ListDoctorPage() {
    const { state } = useLocation();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const inputReference = React.createRef();

    const styles = {
        message: {
            color: 'black',
            fontSize: '14px',
            borderRadius: '10px',
        },
        input: {
            borderRadius: '10px',
            fontSize: '14px',
            padding: '10px',
            width: '90%',
        }
    };

    const renderMessages = () => {
        return messages.map((msg, index) => (
            <MessageBox
                key={index}
                position={msg.position}
                type={'text'}
                text={msg.text}
                date={msg.date}
            />
        ));
    };

    const handleSend = () => {
        if (inputValue.trim() !== '') {
            setMessages([
                ...messages,
                {
                    position: 'right',
                    text: inputValue,
                    date: new Date(),
                }
            ]);
            setInputValue('');
            // Simulate a response from the doctor
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        position: 'left',
                        text: 'Tính năng này đang được phát triển',
                        date: new Date(),
                    }
                ]);
            }, 1000);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <HeaderBar title={'Dr. ' + (state != null ? state.name : '')} />
            </div>
            <div className={style.chat_body}>
                {renderMessages()}
            </div>
            <div className={style.chat_input}>
                <Input
                    ref={inputReference}
                    multiline={true}
                    placeholder="Type a message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleSend}
                    style={styles.input}
                />
                <ion-icon name="send-outline" onClick={handleSend}></ion-icon>
            </div>
        </div>
    );
}
