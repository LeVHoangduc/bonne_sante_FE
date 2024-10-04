import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import styles from './User.module.css'
import useUserContext from '../../hooks/useUserContext';


export default function UserInfo() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { user, saveUser } = useUserContext();
    useEffect(() => {
        setUsername(user.username);
        setPassword(user.password);
    }, [user])

    const updateInfo = (e) => {
        e.preventDefault();
        saveUser({ ...user, username, password });
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HeaderBar title="User Profile" />
            </div>
            <form className={styles.formProfile}>
                <div className={styles.inputGroup}>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <button type="submit" className={styles.saveButton}>SAVE</button>
                </div>
            </form>
        </div>
    )
}
