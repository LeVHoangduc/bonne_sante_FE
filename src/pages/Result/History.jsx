import React from 'react'
import style from './ListResult.module.css'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import DataResult from './DataResult'
import useResultsContext from '../../hooks/useResultsContext'

const History = () => {
  let navigate = useNavigate();

  const { result } = useResultsContext();

  function renderDataResult() {
    if (Object.keys(result).length === 0) {
      return <h1>No data found</h1>
    } else {
      return Object.keys(result).map((key, index) => {
        console.log(result[key]);
        return (
          <SwiperSlide key={index}>
            <DataResult data={{ result: result[key] }} />
          </SwiperSlide>
        )
      })
    }
  }

  return (
    <div className={style.page}>
      <div className={style.container}>
        <HeaderBar title="History Measurement" />
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className={style.content}
        >
          {renderDataResult()}
        </Swiper>
        <button className={style.button} onClick={() => navigate('/add-data')}>
          Continue Measurement
        </button>
      </div>
    </div>
  )
}
export default History