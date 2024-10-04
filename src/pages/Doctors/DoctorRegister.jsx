import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import doctorIcon from '../../assets/images/doctor-icon-avatar-white_136162-58.png';
import style from './DoctorRegister.module.css';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_URL } from '../../constants/values';

export default function DoctorPage() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedDoctorIds, setSelectedDoctorIds] = useState([]);

    useEffect(() => {
        axios.get(API_URL + 'doctor/list')
            .then(res => {
                const doctors = res.data;
                setDoctors(doctors);
            })
            .catch(err => console.log(err));
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
        const filteredDoctors = doctors.filter(doctor =>
            doctor.name.toLowerCase().includes(search.toLowerCase())
        );

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
                        </div>
                        <div className={style.card_image}>
                            <img src={doctorIcon} alt="image" />
                        </div>
                    </div>
                );
            });
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const patient  = JSON.parse(localStorage.getItem('patient'));

    const registerDoctor = () => {
        if (selectedDoctorIds.length === 0) {
            alert('Please select a doctor');
            return;
        } else {
            axios.post(API_URL + 'patient/' + patient.id + '/register/doctor', { doctorIds: selectedDoctorIds })
                .then(res => {
                    console.log('Doctors registered successfully:', res.data);
                    navigate('/home');
                })
                .catch(err => console.log('Error registering doctors:', err));
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <HeaderBar title="Register Doctor" />
            </div>
            <div className={style.search}>
                <input
                    className={style.search_input}
                    type="text"
                    placeholder="Search Name Doctor"
                    name='search'
                    value={search}
                    onChange={handleSearch}
                />
                <button className={style.search_btn}><SearchOutlined /></button>
            </div>
            {renderDoctor()}
            <div className={style.footer}>
                <Button
                    className={style.btn}
                    type="primary"
                    onClick={registerDoctor}
                    style={{ backgroundColor: '#28a745' }}
                >
                    Register Doctor
                </Button>
            </div>
        </div>
    );
}
