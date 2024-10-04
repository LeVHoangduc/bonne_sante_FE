import axios from 'axios'
import * as faceapi from 'face-api.js'
import ProgressBar from '@ramonak/react-progress-bar'
import React, { useRef, useEffect, useState } from 'react'
import useUserContext from '../hooks/useUserContext'
import VideoCamera from './VideoCamera/VideoCamera'
import { useNavigate } from 'react-router-dom'
import { PATH_URL } from "../constants/values"
import useResultsContext from '../hooks/useResultsContext'
import { database } from '../services/firebase/config'
import { ref, set, child } from 'firebase/database'
import ToastResult from './Meeting/ToastResult'
import uuid from 'react-uuid'


const FaceDetectionComponent = props => {

  let cancelStateProp = props.cancelState;

  const [cancelState, setCancelState] = useState(cancelStateProp);
  const [errorState, setErrorState] = useState(false);
  const [isFinish, setIsFinish] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const { user, saveUser } = useUserContext();
  const { result, setResult } = useResultsContext();

  const intervalRef = useRef(null)
  const videoRef = useRef(null)
  const detectionRef = useRef(null)
  const timeoutRef = useRef();
  const timeoutRef1 = useRef();


  const dbRef = ref(database);

  const MODEL_URL = '/models'

  const [recordedChunks, setRecordedChunks] = useState([]);

  const navigate = useNavigate();

  async function getCameraStream() {
    await navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
      })
      .then(stream => {
        detectionRef.current.srcObject = stream

        videoRef.current = new MediaRecorder(stream)

        videoRef.current.ondataavailable = event => {
          if (event.data.size > 0) {
            setRecordedChunks(prevChunks => [...prevChunks, event.data]);
          }
        }

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
        }

        videoRef.current.onstop = () => {
          console.log('STOP!!!')
        }

        videoRef.current.onstart = (event) => {
          console.log('START!!!')
        }

        console.log('errorState', errorState)
      }).catch(err => {
        console.log(`The following error occurred: ${err.name}`)
      })
  }

  useEffect(() => {
    console.log('recordedChunks after update:', recordedChunks);
  }, [recordedChunks]);



  useEffect(() => {
    if (isFinish) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' })
      const formData = new FormData();

      const patient = JSON.parse(localStorage.getItem('patient'))

      formData.append('user_id', 1)
      formData.append('video_file', blob)

      setCancelState(true);

      axios
        .post(PATH_URL + 'model/', formData)
        .then(response => {
          if (response.data) {

            setShowToast(true)
            const dataResult = {
              ...response.data,
              resultId: uuid(),
              date: new Date().toLocaleDateString(),
            }

            setResult(dataResult);
            
            set(child(dbRef, `result/` + dataResult.resultId), {
              patientId: patient.id,
              result: dataResult,
            })
              .then(() => {
                localStorage.setItem('resultId', dataResult.resultId);
                props.setShow(false);
              })
              .catch((error) => {
                console.log(error)
              })

            if (props.isAddData) {
              navigate("/result/" + dataResult.resultId)
            }
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [isFinish])

  useEffect(() => {
    if (!errorState) {
      setRecordedChunks([])

      videoRef.current && videoRef.current.start(33);
      console.log('error: ', errorState);
      timeoutRef1.current = setTimeout(() => {
        timeoutRef.current = setTimeout(async () => {
          videoRef.current.stop();
          setIsFinish(true)
        }, 32000);
      }, 2000);

    } else {
      videoRef.current.stop();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        clearTimeout(timeoutRef1.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        clearTimeout(timeoutRef1.current);
      }
    };
  }, [errorState]);

  async function getApiCamera() {
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
    await getCameraStream()
    videoRef.current.start(33)
  }

  const handlePlaying = () => {
    intervalRef.current = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        detectionRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )

      if (detections.length === 1) setErrorState(false)
      else setErrorState(true)
    }, 1000)
  }

  if (cancelStateProp || cancelState) {
    console.log('cancelStateProp', cancelStateProp, 'cancelState', cancelState)
    videoRef.current.stop()
    console.log('cancelState', cancelState)
    const stream = detectionRef.current.srcObject
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      console.log('stop')
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      console.log('clearInterval')
    }
  };

  useEffect(() => {
    if (detectionRef.current) {
      console.log('add event listener')
      detectionRef.current.addEventListener('play', handlePlaying)
    }

    return () => {
      if (detectionRef.current) {
        detectionRef.current.removeEventListener('play', handlePlaying)
        const stream = detectionRef.current.srcObject

        if (stream) {
          const tracks = stream.getTracks()

          tracks.forEach(track => track.stop())
          detectionRef.current.srcObject = null
        }
      }
    }
  }, [])

  useEffect(() => {

    getApiCamera()

  }, [])



  return (
    <>
      <ToastResult isSuccess={result} show={showToast} setShow={setShowToast} />
      <VideoCamera errorState={errorState} videoRef={detectionRef} />
      {errorState ? (
        <p style={{ textAlign: 'center' }}> Please keep your face still in the camera</p>
      ) : (!isFinish ?
        <ProgressBar
          completed={100}
          maxCompleted={100}
          width='100%'
          height='25px'
          bgColor='#e71e50'
          isLabelVisible={false}
          animateOnRender={true}
          initCompletedOnAnimation={10}
          transitionDuration='32s'
        /> : <h3>Sending....</h3>
      )}
    </>
  )
}

export default FaceDetectionComponent