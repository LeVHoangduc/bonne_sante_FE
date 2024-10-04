import React, { useState } from 'react'
import style from './MeetingUser.module.css'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import FindingDoctor from '../../lazy/FindingDoctor'
import { ref, onValue, child } from 'firebase/database'
import { database } from '../../services/firebase/config'
import JoinMeetingUser from '../../components/Meeting/JoinMeetingUser'

const MeetingUser = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  const dbRef = ref(database);

  const patientId = JSON.parse(localStorage.getItem('patient')).id;

  onValue((child(dbRef, `videoCall/${patientId}`)), (snapshot) => {
    const requestInfo = snapshot.val();

    if (requestInfo.isAccepted !== isAccepted) {
      setIsAccepted(requestInfo.isAccepted);
    }
  });

  return (
    <div className={style.page}>
      <div className={style.header}>
        <HeaderBar title='Meeting' />
      </div>
      <div className={style.containerMeetingUser}>
        <div className={style.contentMeetingUser}>
          {
            isAccepted ? <JoinMeetingUser /> : <FindingDoctor />
          }
        </div>
      </div>
    </div>
  )
}
export default MeetingUser;
