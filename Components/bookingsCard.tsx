import React, {useState} from 'react'
import styles from '../styles/Home.module.css'
import { BiTimeFive } from 'react-icons/bi';
import {MdOutlineCancel} from "react-icons/md"
import moment from "moment"

interface Props{
  booking:any
}




function BookingsCard(props:Props) {
  const [isOpen, setIsOpen] = useState(false)


  const handleOpenModal = async() => {

  }

  const handleCancelBooking = async() => {

    const response:any = await fetch("/api/booking/cancelBooking", {
        method: "PUT"
    })

    const result = await response.json()

    if(result.responseCode === "00"){
        alert("Booking cancelled Successfully")
        // router.push("/")
    }
}
  return (
    <div className={styles.bk_event_card}>
    <div className={styles.bk_card_content}>
    
    <div>
    <p className={styles.bk_contents}>{moment(props.booking.date).format("dddd, MMMM Do, YYYY")}  {props.booking.startTime}</p>
    <p className={styles.bk_content_time}>{props.booking.startTime} - {props.booking.endTime}</p>
    </div>

    <div className={styles.bk_content_container}>
    <p className={styles.bk_contents}>{`${props.booking.title} Meeting between ${props.booking.ownerName} and ${props.booking.attendees}` } </p>
    <a className={styles.bk_contents_a} href="#">{props.booking.ownerEmail}</a>
    </div>

    </div>
    <div className={styles.bk_del_btn_container}>
        <button onClick={() => handleCancelBooking()} className={styles.button}><MdOutlineCancel size={20} /> <span className={styles.bk_btn_span}>Cancel</span></button>
        <button onClick={() => handleOpenModal()} className={styles.button}><BiTimeFive size={20}/> <span className={styles.bk_btn_span}>Reschedule</span></button>
    </div>
  </div>
  )
}

export default BookingsCard