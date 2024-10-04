import React, { Suspense, lazy } from 'react'
import style from './ListResult.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import useResultsContext from '../../hooks/useResultsContext'
import Loading from '../../lazy/Loading'


function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    }).then(() => promise);
};

const DataResult = lazy(() => delayForDemo(import('./DataResult')));

const ResultPage = () => {
    const navigate = useNavigate();
    const { result } = useResultsContext();
    const patient = JSON.parse(localStorage.getItem('patient'));
    const resultId = localStorage.getItem('resultId') ? localStorage.getItem('resultId') : useParams().id;

    const renderResult = () => {
        if (Object.keys(result).length === 0) {
            return <h1>On data loading ...</h1>
        } else {
            return Object.keys(result).filter(key => result[key].result.resultId === resultId).map((key, index) => {
                return (
                    <DataResult data={{ result: result[key] }} key={index} />
                )
            })
        }
    }

    return (
        <div className={style.page}>
            <div className={style.container}>
                <HeaderBar title="Result Measurement"/>
                <div className={style.loading_data}>
                    {result &&
                        (<Suspense fallback={<Loading />}>
                            {renderResult()}
                        </Suspense>)
                    }
                </div>
                <button className={style.button} onClick={() => navigate('/add-data')}>
                    Continue Measurement
                </button>
            </div>
        </div>
    )
}
export default ResultPage;
