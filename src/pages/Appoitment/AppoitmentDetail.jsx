import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import styles from './Appointment.module.css'
import useUserContext from '../../hooks/useUserContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Collapse, Badge, Divider, Button, Descriptions } from 'antd';
import { child } from 'firebase/database';
import { API_URL } from '../../constants/values.js'

export default function AppointmentDetail() {
    const [appointment, setAppointment] = useState([]);
    const [options, setOptions] = useState([]);
    const [itemDoctor, setItemDoctor] = useState([]);
    const [itemPatient, setItemPatient] = useState([]);
    const { user, saveUser } = useUserContext();

    const navigater = useNavigate();

    let appointmentIDParam = useParams().id;

    useEffect(() => {
        if (user) {
            axios.get(API_URL + 'patient/appointment/detail/' + appointmentIDParam)
                .then(res => {
                    const appointment = res.data;
                    const doctor = appointment.doctorEntity;
                    const patient = appointment.patientEntity;

                    const itemDoctor = [
                        {
                            key: '1',
                            label: 'Doctor Name',
                            children: doctor.name,
                        },
                        {
                            key: '2',
                            label: 'Doctor ID',
                            children: doctor.id,
                        }
                    ];

                    const itemPatient = [
                        {
                            key: '1',
                            label: 'Patient Name',
                            children: patient.name,
                        },
                        {
                            key: '2',
                            label: 'Patient ID',
                            children: patient.id,
                        }
                    ];

                    setAppointment(appointment);
                    setItemDoctor(itemDoctor);
                    setItemPatient(itemPatient);

                })
                .catch(err => console.log(err));
        }

    }, [user]);

    const setStatusColor = (status) => {
        if (status === 'Scheduled') {
            return '#ffc107';
        } else if (status === 'Approved') {
            return '#28a745';
        } else if (status === 'Done') {
            return '#0dcaf0';
        }
    }

    const items = [
        {
            key: '1',
            label: 'Date',
            children: appointment.date,
        },
        {
            key: '2',
            label: 'Start Time',
            children: appointment.startTime,
        },
        {
            key: '3',
            label: 'End Time',
            children: appointment.endTime
        },
        {
            key: '4',
            label: 'Status',
            span: 3,
            children: <Badge status="processing" text={appointment.status} color={setStatusColor(appointment.status)} />,
        },
        {
            key: '5',
            label: 'Description',
            children: (
                <>
                {appointment.description}
                </>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HeaderBar title="Appointment Detail" />
            </div>
            <div className={styles.appointment}>
                <Descriptions title="Doctor Information" items={itemDoctor} style={{ backgroundColor: '#f0f2f5', padding: '10px', borderRadius: '15px', marginBottom: '5px' }} />
                <Descriptions title="Patient Information" items={itemPatient} style={{ backgroundColor: '#f0f2f5', padding: '10px', borderRadius: '15px', marginBottom: '5px' }} />
                <Divider />
                <Descriptions title="Appointment Status" bordered items={items} />
            </div>
        </div>
    );
}
