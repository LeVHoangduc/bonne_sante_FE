import React from 'react'
import style from './HeaderBar.module.css'
import { Link } from 'react-router-dom'
import useUserContext from '../../hooks/useUserContext'

const HeaderBar = (props) => {
    const { user, saveUser } = useUserContext();
    const username = user ? user.username : null;

    function logout() {
        saveUser(null);
    }

    function turnBack() {
        const history = window.history;
        if (history.length > 2) {
            history.back();
        } else {
            window.location.href = '/home';
        }
    }

    const getUrl = window.location.href;

    const title = props.title;

    if (getUrl.includes('home')) {
        return (
            <div className={style.header}>
                <Link to={username ? '/user' : '/login'}>
                    <ion-icon name="person-circle-outline"></ion-icon>
                </Link>
                <h3>{title != '' ? title : 'Blood Pressure'}</h3>
                {username ?
                    <Link onClick={logout} to='/' className={style.logout}>
                        <ion-icon name="log-out-outline"></ion-icon>
                    </Link> : <ion-icon name="settings-outline"></ion-icon>}
            </div>
        )
    }

    return (
        <div className={style.header}>
            <Link onClick={turnBack} to='#'>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
            <h3>{title != '' ? title : 'Blood Pressure'}</h3>
            <Link to='/home' className={style.logout}>
                <ion-icon name="home-outline"></ion-icon>
            </Link>
        </div>
    )
}
export default HeaderBar
