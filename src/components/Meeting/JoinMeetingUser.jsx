import React from 'react';
import { MeasureModal } from './MeasureModal';
import useResultsContext from '../../hooks/useResultsContext';
import MeetingRoomUser from './MeetingRoomUser';
import { ref } from "firebase/database";
import { database } from "../../services/firebase/config";
import { set } from 'lodash';

function JoinMeetingUser() {

  const [stateMeasure, setStateMeasure] = React.useState(false);
  const { result, setResult } = useResultsContext();
  const patientId = JSON.parse(localStorage.getItem('patient')).id;

  const dbRef = ref(database);

  const getMeasure = () => {
    setStateMeasure(true);
  }

  return (
    <div>
      <main>
        <MeetingRoomUser role={0} userID={patientId} />

        {stateMeasure ? (
          <MeasureModal />
        ) : (
          <div>
            <button onClick={getMeasure}>Measure</button>
          </div>
        )}
      </main>
    </div>
  );
}
export default JoinMeetingUser;