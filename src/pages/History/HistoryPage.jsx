import React from 'react'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import scheduleIcon from '../../assets/images/schedule-icon.png';
import patientIcon from '../../assets/images/HearthRateIcon.png';
import style from './History.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

export default function HistoryPage() {
    const navigate = useNavigate();
    const { user, saveUser } = useUserContext();

    return (
        <div className={style.container}>
            <div className={style.header}>
                <HeaderBar title="History" />
            </div>
            <div className={style.card_options}>
                {user ? <Link className={style.card} to="/appointment">
                    <img src={scheduleIcon} alt="schedule icon" />
                    <p className={style.card_text}>Appointment</p>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </Link> : <div></div>}

                {user ? <Link className={style.card} to="/history/result">
                    <img src={patientIcon} alt="schedule icon" />
                    <p className={style.card_text}>Measurement</p>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </Link> : <div></div>}
            </div>
        </div>
    )
}
