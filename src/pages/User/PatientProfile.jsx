import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import styles from './User.module.css'
import useUserContext from '../../hooks/useUserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { API_URL } from '../../constants/values.js'

export default function PatientProfile() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('other');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [healthID, setHealthID] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const { user, saveUser } = useUserContext();

    const navigater = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi
            .open({
                type: 'loading',
                content: 'Action in progress..',
                duration: 2.5,
            })
            .then(() => message.success('Profile updated successfully', 1.5))
    };

    useEffect(() => {
        let patient = JSON.parse(localStorage.getItem('patient'));
        if (!patient) {
            if (user) {
                axios.get(API_URL + 'patient/' + user.id)
                    .then(res => {
                        const patient = res.data;

                        setId(patient.id);
                        setName(patient.name);
                        setAge(patient.age);
                        setGender(patient.gender == 0 ? "male" : "female");
                        setEmail(patient.email);
                        setPhone(patient.phone);
                        setAddress(patient.address);
                        setHealthID(patient.healthId);
                        setBloodGroup(patient.bloodGroup);
                        setWeight(patient.weight);
                        setHeight(patient.height);

                        // lưu vào local storage
                        localStorage.setItem('patient', JSON.stringify(patient));
                    })
                    .catch(err => console.log(err));
            }
        } else {
            setId(patient.id);
            setName(patient.name);
            setAge(patient.age);
            setGender(patient.gender == 0 ? "male" : "female");
            setEmail(patient.email);
            setPhone(patient.phone);
            setAddress(patient.address);
            setHealthID(patient.healthId);
            setBloodGroup(patient.bloodGroup);
            setWeight(patient.weight);
            setHeight(patient.height);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault
        if (user) {
            const patient = {
                id: id,
                userId: user.id,
                name: name,
                age: age,
                gender: gender == 'male' ? 0 : 1,
                email: email,
                phone: phone,
                address: address,
                healthId: healthID,
                bloodGroup: bloodGroup,
                weight: weight,
                height: height
            }
            axios.post(API_URL + 'patient/save', patient)
                .then(res => {
                    if (res.status === 200) {
                        success();
                        navigater('/profile');
                        localStorage.setItem('patient', JSON.stringify(patient));
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HeaderBar title="Patient Profile" />
            </div>
            {contextHolder}
            <form className={styles.formProfile}>
                <div className={styles.inputGroup}>
                    <label>Name</label>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Age</label>
                    <input type="number" name="age" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Gender</label>
                    <div className={styles.genderButtons}>
                        <button type='button' className={gender === 'male' ? `${styles.genderButton} ${styles.active}` : styles.genderButton} onClick={() => setGender('male')}>Male</button>
                        <button type='button' className={gender === 'female' ? `${styles.genderButton} ${styles.active}` : styles.genderButton} onClick={() => setGender('female')}>Female</button>
                        <button type='button' className={gender === 'other' ? `${styles.genderButton} ${styles.active}` : styles.genderButton} onClick={() => setGender('other')}>Other</button>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Phone</label>
                    <input type="text" name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Address</label>
                    <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Health ID</label>
                    <input type="text" name="healthID" value={healthID} onChange={e => setHealthID(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Blood Group</label>
                    <input type="text" name="bloodGroup" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Weight</label>
                    <input type="number" name="weight" value={weight} onChange={e => setWeight(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Height</label>
                    <input type="number" name="height" value={height} onChange={e => setHeight(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <button type="button" className={styles.saveButton} onClick={handleSubmit}>SAVE</button>
                </div>
            </form>
        </div>
    )
}
