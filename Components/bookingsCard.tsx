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
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelBooking = async() => {
    setIsLoading(true)
    const response:any = await fetch(`/api/booking/cancelBooking?id=${props.booking.id}`, {
        method: "PUT"
    })

    const result = await response.json()

    console.log(response, result)

    if(response.status === 200){
      setIsLoading(false)
        alert("Booking cancelled Successfully")
        // router.push("/")
    }
}

console.log(new Date(props.booking.date) < new Date(), "moment(props.booking.date).format")
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
    {
      props.booking.status !== "active" || new Date(props.booking.date) < new Date() ? null :(
        <div className={styles.bk_del_btn_container}>
        <button onClick={() => handleCancelBooking()} className={styles.button}>{isLoading ? "Processing..." : <><MdOutlineCancel size={20} /> <span className={styles.bk_btn_span}>Cancel</span></>}</button>
        <button onClick={() => console.log("reschedule event")} className={styles.button}><BiTimeFive size={20}/> <span className={styles.bk_btn_span}>Reschedule</span></button>
    </div>
      ) 
    }
  </div>
  )
}

export default BookingsCard