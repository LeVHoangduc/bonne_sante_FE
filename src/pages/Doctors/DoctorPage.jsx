import React from 'react'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import doctorIcon from '../../assets/images/doctor-icon-avatar-white_136162-58.png';
import scheduleIcon2 from '../../assets/images/schedule-icon-8.png';
import style from './Doctor.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

export default function DoctorPage() {
    const navigate = useNavigate();
    const { user, saveUser } = useUserContext();

    return (
        <div className={style.container}>
            <div className={style.header}>
                <HeaderBar title="Doctor" />
            </div>
            <div className={style.card_options}>
                {user ? <Link className={style.card} to="/register/doctor">
                    <img src={scheduleIcon2} alt="schedule icon" />
                    <p className={style.card_text}>Register</p>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </Link> : <div></div>}

                {user ? <Link className={style.card} to="/doctor/list">
                    <img src={doctorIcon} alt="schedule icon" />
                    <p className={style.card_text}>My Doctor</p>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </Link> : <div></div>}
            </div>
        </div>
    )
}
