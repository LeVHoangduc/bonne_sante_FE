import React, { useEffect, useState } from 'react';
import { Flex, Segmented } from 'antd';
import { Button, Select, Checkbox } from 'antd';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import style from './User.module.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../constants/values.js'


const MakeAppointment = (props) => {
    const date = new Date();
    const currentDate = date.toLocaleDateString();

    const [dateSelected, setDateSelected] = useState(currentDate);
    const [timeSelected, setTimeSelected] = useState('early morning');
    const [schedule, setSchedule] = useState([]);
    const [timeSlotSelected, setTimeSlotSelected] = useState([]);

    const doctorID = useParams().id;

    const navigator = useNavigate();
    
    const location = useLocation();
    const doctor  = location.state;
    
    useEffect(() => {
        axios.post(API_URL + 'doctor/' + doctorID + '/schedule', dateSelected)
            .then(res => {
                setSchedule(res.data);
            })
            .catch(err => console.log(err));
    }, [dateSelected]);

    const datesPerPage = 4;

    const getAllDate = () => {
        const allDate = [];
        for (let i = 0; i < 12; i++) {
            const newDate = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
            const option = {
                value: newDate.toLocaleDateString(),
                label: newDate.toLocaleDateString(),
            };

            allDate.push(option);
        }
        return allDate;
    };

    const getTimeUnavailable = () => {
        const timeUnavailable = [];
        schedule.forEach(slot => {
            const time = slot.time.split(':')[0];
            timeUnavailable.push(parseInt(time));
        });
        return timeUnavailable;
    };

    const allDates = getAllDate();
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(allDates.length / datesPerPage);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const currentDates = allDates.slice(
        currentPage * datesPerPage,
        (currentPage + 1) * datesPerPage
    );

    const renderTime = (session) => {
        const time = [];
        const timeUnavailable = getTimeUnavailable();
        for (let i = 0; i < 24; i++) {
            if (!timeUnavailable.includes(i)) {
                time.push(i);
            }
        }

        if (session === 'early morning') {
            return time.map((hour, index) => {
                if (hour < 8) {
                    return (
                        <div className={style.sub_content} key={index}>
                            <input type='checkbox' onChange={() => handleCheckboxChange(hour + ':00')} />
                            <p>{hour}:00 - {hour + 1}:00</p>
                        </div>
                    );
                }
            });
        } else if (session === 'office hours') {
            return time.map((hour, index) => {
                if (hour >= 8 && hour < 16) {
                    return (
                        <div className={style.sub_content} key={index}>
                            <input type='checkbox' onChange={() => handleCheckboxChange(hour + ':00')} />
                            <p>{hour}:00 - {hour + 1}:00</p>
                        </div>
                    );
                }
            });
        } else if (session === 'evening') {
            return time.map((hour, index) => {
                if (hour >= 16) {
                    return (
                        <div className={style.sub_content} key={index}>
                            <input type='checkbox' onChange={() => handleCheckboxChange(hour + ':00')} />
                            <p>{hour}:00 - {hour + 1}:00</p>
                        </div>
                    );
                }
            });
        }
    };

    const renderTimeSlot = () => {
        if (timeSelected === 'early morning') {
            return (
                <div className={style.content}>
                    {renderTime('early morning')}
                </div>
            );
        } else if (timeSelected === 'office hours') {
            return (
                <div className={style.content}>
                    {renderTime('office hours')}
                </div>
            );
        } else if (timeSelected === 'evening') {
            return (
                <div className={style.content}>
                    {renderTime('evening')}
                </div>
            );
        }
    };

    const handleCheckboxChange = (time) => {
        setTimeSlotSelected(prevTimeSlotSelected => {
            if (prevTimeSlotSelected.includes(time)) {
                return prevTimeSlotSelected.filter(hour => hour !== time);
            } else {
                return [...prevTimeSlotSelected, time];
            }
        });
    };

    const patient = JSON.parse(localStorage.getItem('patient'));

    const scheduleAppointment = () => {
        const appointment = {
            doctorId: doctor.id,
            patientId: patient.id,
            date: dateSelected,
            timeSlot: timeSlotSelected,
        };

        axios.post(API_URL + 'patient/appointment', appointment)
            .then(res => {
                if (res.status === 200) {
                    navigator('/appointment');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <HeaderBar title="Make Appointment" />
            </div>
            <h2>Dr. {doctor && doctor.name}</h2>
            <Flex justify="center">
                <LeftOutlined onClick={handlePrevPage} className={currentPage === 0 ? style.disabled : ''} />
                <Segmented
                    onChange={(value) => setDateSelected(value)}
                    options={currentDates}
                    defaultValue={currentDate}
                    style={{ margin: '15px auto' }}
                    block
                />
                <RightOutlined onClick={handleNextPage} className={currentPage === totalPages - 1 ? style.disabled : ''} />
            </Flex>
            <Select
                defaultValue='early morning'
                options={[
                    { label: 'Early Morning', value: 'early morning' },
                    { label: 'Office Hours', value: 'office hours' },
                    { label: 'Evening', value: 'evening' },
                ]}
                onChange={(value) => setTimeSelected(value)}
            />
            {renderTimeSlot()}
            <div className={style.footer}>
                <Button
                    onClick={scheduleAppointment}
                    className={style.btn}
                    type="primary"
                    style={{ backgroundColor: '#e71e50' }}
                >
                    Schedule
                </Button>
            </div>
        </div>
    )
};

export default MakeAppointment;
