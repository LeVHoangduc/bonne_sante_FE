import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import doctorIcon from '../../assets/images/doctor-icon-avatar-white_136162-58.png';
import style from './DoctorRegister.module.css';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Button } from 'antd';
import axios from 'axios';
import { API_URL } from '../../constants/values.js'

export default function DoctorList() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedDoctorIds, setSelectedDoctorIds] = useState([]);
    const [error, setError] = useState(false);
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

    const handleCheckboxChange = (doctorId) => {
        setSelectedDoctorIds(prevSelectedDoctorIds => {
            if (prevSelectedDoctorIds.includes(doctorId)) {
                return prevSelectedDoctorIds.filter(id => id !== doctorId);
            } else {
                return [...prevSelectedDoctorIds, doctorId];
            }
        });
    };

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
                    <div key={index} className={style.card}>
                        <Checkbox
                            onChange={() => handleCheckboxChange(doctor.id)}
                            checked={selectedDoctorIds.includes(doctor.id)}
                        />
                        <div className={style.card_content}>
                            <p className={style.title}><strong className={style.sub_title}>Dr.</strong> {doctor.name}</p>
                            <p><strong className={style.sub_title}>Doctor ID: </strong> {doctor.id}</p>
                            <p><strong className={style.sub_title}>Special: </strong> {doctor.specialization}</p>
                            <p><strong className={style.sub_title}>Hospital: </strong> {doctor.hospital}</p>
                            <p><strong className={style.sub_title}>Phone: </strong> {doctor.phone}</p>
                            <p><strong className={style.sub_title}>Email: </strong> {doctor.email}</p>
                            <p><strong className={style.sub_title}>Address: </strong> {doctor.address}</p>
                            <p><strong className={style.sub_title}>Time: </strong> {doctor.timeSlot}</p>
                        </div>
                        <div className={style.card_image}>
                            <img src={doctorIcon} alt="image" />
                        </div>
                    </div>
                );
            });
        }
    };

    const deleteDoctor = () => {
        let doctorsNotDeleted = doctors.filter(doctor => !selectedDoctorIds.includes(doctor.id));
        let doctorsNotDeletedIds = doctorsNotDeleted.map(doctor => doctor.id);
        
        axios.post(API_URL + 'patient/' + patient.id + '/doctor/update', { doctorIds: doctorsNotDeletedIds })
            .then(res => {
                console.log('Doctors deleted:', res.data);
                setDoctors(doctorsNotDeleted);
            })
            .catch(err => console.log('Error registering doctors:', err));
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <HeaderBar title="My Doctor" />
            </div>
            {renderDoctor()}
            <div className={style.footer}>
                {error == false ? (
                    <Button
                        className={style.btn}
                        type="primary"
                        onClick={deleteDoctor}
                        style={{ backgroundColor: '#e71e50' }}
                    >
                        Delete Doctor
                    </Button>
                ) : (
                    <Button
                        className={style.btn}
                        type="primary"
                        onClick={() => navigate('/register/doctor')}
                        style={{ backgroundColor: '#e71e50' }}
                    >
                        Register Doctor
                    </Button>
                )}
            </div>
        </div>
    );
}
