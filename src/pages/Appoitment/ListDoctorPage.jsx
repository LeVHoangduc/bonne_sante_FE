import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import doctorIcon from '../../assets/images/doctor-icon-avatar-white_136162-58.png';
import style from './DoctorRegister.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../constants/values.js'

export default function ListDoctorPage() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    const hash = window.location.pathname;

    const patient = JSON.parse(localStorage.getItem('patient'));
  
    useEffect(() => {
        axios.get(API_URL + 'patient/' + patient.id + '/doctor/list')
            .then(res => {
                const doctors = res.data;
                if (doctors.length === 0) {
                    setError(true);
                } else {
                    setDoctors(doctors);
                }
            })
            .catch(err => {
                console.log(err);
                setError(true);
            });
    }, []);

    const renderDoctor = () => {
        let filteredDoctors = [...doctors];

        if (doctors.length > 0) {
            filteredDoctors = doctors.filter(doctor =>
                doctor.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (error == true) {
            return <p>You have to register a doctor</p>;
        }

        if (filteredDoctors.length === 0) {
            return (
                <div className="loadingio-spinner-wedges-dk9crgcrlkk">
                    <div className="ldio-bp6looxr9xh">
                        <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
                    </div>
                </div>
            );
        } else {
            return filteredDoctors.map((doctor, index) => {
                return (
                    <>
                        <div key={index} className={style.card}>
                            <div className={style.card_content}>
                                <p className={style.title}><strong className={style.sub_title}>Dr.</strong> {doctor.name}</p>
                                <p><strong className={style.sub_title}>Doctor ID: </strong> {doctor.id}</p>
                                <p><strong className={style.sub_title}>Special: </strong> {doctor.specialization}</p>
                                <p><strong className={style.sub_title}>Hospital: </strong> {doctor.hospital}</p>
                                <p><strong className={style.sub_title}>Phone: </strong> {doctor.phone}</p>
                                <p><strong className={style.sub_title}>Email: </strong> {doctor.email}</p>
                                {hash == '/chat' ? (
                                    <Link to={'/chat/doctor/' + doctor.id} state={doctor} className={style.card_button}>Chat with doctor</Link>
                                ) : (
                                    <Link to={'/make-appointment/' + doctor.id} state={doctor} className={style.card_button}>Make an appointment</Link>
                                )}
                            </div>
                            <div className={style.card_image}>
                                <img src={doctorIcon} alt="image" />
                            </div>
                        </div>

                    </>
                );
            });
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <HeaderBar title="Select Doctor" />
            </div>
            {renderDoctor()}
        </div>
    );
}
