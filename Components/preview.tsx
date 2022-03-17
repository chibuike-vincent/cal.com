import React, { useState, useEffect } from "react"
import Head from 'next/head'
import Image from 'next/image'
import Layout from "./layout"
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NestedSelect from "./nestedSelect"
import moment from "moment"
import { data } from "autoprefixer"


interface User {
    id: string 
    userName: string
    email: string
    password: string
}

interface User {
    id: string 
    userName: string
    email: string
    password: string
}

interface Event {
    id: string 
    title: string
    description: string
    type: string
    duration:number
    url?:string
    location?: string
}

export default function Book() {
    const router = useRouter()
    const [value, onChange] = useState(new Date());
    const [time, setTime] = useState<any[]>([])
    const [availableDAta, setAvailableData] = useState<any[]>([])
    const [userDAta, setUserData] = useState<any>()
    const [eventDAta, setEventData] = useState<any>()
    const [error, setError] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [timeZone, setSelectedTimeZone] = useState("")
    const [isMoreGuest, setIsMoreGuest] = useState(false)
    const [data, setData] = useState({
        userName: "",
        email: "",
        notes: ""
    })

 

  useEffect(() => {
    

      const getAvailableTime = async() => {
        const {user,preview} = await router.query

        if(user !== undefined && preview !== undefined){

            const response:any = await fetch(`/api/availability/getAvailabilities?id=${user}`, {
                method: "GET"
            })
            const result:any = await response.json()
            setAvailableData(result)

            const eventType:any = await fetch(`/api/event/eventById?id=${preview}`, {
                method: "GET"
            })

            const event:any = await eventType.json()
            setEventData(event)

            const currentUser:any = await fetch(`/api/auth/userById?id=${user}`, {
                method: "GET"
            })
            const userData:any = await currentUser.json()
            setUserData(userData)
            
         }}

      getAvailableTime()
     
  }, [])


    const handleChange = (e: any) => {
        onChange(e)

        var oneDate = moment(new Date(e), 'DD-MM-YYYY');

        var day = oneDate.format('dddd');

        for (let j = 0; j < availableDAta.length; j++) {

            if (availableDAta[j].day === day) {
                let start = moment(`${availableDAta[j].start}`, 'hh:mm A').format('HH:mm:ss')

                let end = moment(`${availableDAta[j].end}`, 'hh:mm A').format('HH:mm:ss')

                var startTime = moment(start, 'HH:mm');
                var endTime = moment(end, 'HH:mm');

                if (endTime.isBefore(startTime)) {
                    endTime.add(1, 'day');
                }

                var timeStops = [];

                while (startTime <= endTime) {
                    timeStops.push(moment(startTime).format('HH:mm a'));
                    startTime.add(eventDAta?.duration, 'minutes');
                }

                setTime(timeStops);
                break;

            } else {
                setTime([])
                setError("Unvailable")
            }
        }

    }

    const handleInputChange = (e: any) => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const setTimeZone = (e:any) => {
        setSelectedTimeZone(e)
    }


    const handleBooking = async() => {
        console.log(moment(value).format("YYYY-MM-DD"), "val")

        let start = `${moment(value).format("YYYY-MM-DD")} ${selectedTime.split(" ")[0]}`
        console.log(start, "start")
        let duration = `0:${eventDAta.duration}`
        console.log(duration, "dura")
            // starttime = selectedTime.split(" ")[0];

        let [hour, minute] = duration.split(":");
        console.log(minute)
        //shorthand initialization for the argument
        let endtime = moment(start).add(minute, 'minutes').format("hh:mm a");
        console.log(endtime, "emff")
        const dataObj = {
            date: value,
            title: eventDAta?.title,
            attendees: data?.userName,
            owner: userDAta?.id,
            startTime: selectedTime,
            endTime: endtime,
            ownerName: userDAta?.userName,
            ownerEmail: userDAta?.email,
            attendeeEmail: data.email,
            status: 'active'
        }

        const response:any = await fetch("/api/booking/book", {
            method: "POST",
            body: JSON.stringify(dataObj)
        })

        const result = await response.json()

        if(result.responseCode === "00"){
            alert("Booking Successful")
            // router.push("/")
        }
    }

    return (

        <>
        {
            selectedTime !== "" ? (
            <div className={styles.preview_container_two}>
            <div className={styles.meet_info_two}>
                <h3>{userDAta && userDAta.userName}</h3>
                <h1>{eventDAta && eventDAta.title}</h1>
                <p>{eventDAta && eventDAta.duration} min</p>
                <p>{moment(value).format("dddd, MMMM Do, YYYY")}  {selectedTime}</p>
            </div>
            <div className={styles.divider}></div>
            
            <div className={styles.info_input}>

                <label className={styles.bk_label}>Your Name</label>
                <input type="text" name='userName' value={data.userName}  onChange={(e) => handleInputChange(e)} placeholder='John Doe' className={styles.bk_input} />
                <label className={styles.bk_label}>Email</label>
                <input type="email" name='email' value={data.email} onChange={(e) => handleInputChange(e)} placeholder='me@gmail.com' className={styles.bk_input} />
                {
                    isMoreGuest ? (
                        <>
                        <label className={styles.bk_label}>Geusts </label>
                        <input type="email" name='email' value={data.email} onChange={(e) => handleInputChange(e)} placeholder='guest@gmail.com' className={styles.bk_input} />
                        </>
                    ) : (
                        <p className={styles.add_guest_label} onClick={() => setIsMoreGuest(!isMoreGuest)}>+ Additional Geusts </p>
               
                    )
                }

                <label className={styles.bk_label}>Additional Notes</label>
                <textarea  name='notes' value={data.notes} onChange={(e) => handleInputChange(e)} placeholder='Please help share anything that will help prepare for our meeting' className={styles.bk_input} />
                <div className={styles.bk_btn_container}>
                <input type="button" onClick={() => handleBooking()} value="Confirm" className={styles.button} />
                <input type="button" onClick={() => console.log("Cancel")} value="Cancel" className={styles.button} />
                </div>
            </div>

            
        </div>

            ) : (
                <div className={styles.preview_container}>
            <div className={styles.meet_info}>
                <h3>{userDAta && userDAta.userName}</h3>
                <h1>{eventDAta && eventDAta.title}</h1>
                <p>{eventDAta && eventDAta.duration} min</p>
                <NestedSelect setTimeZone={(e:any)=>setTimeZone(e)}/>
            </div>
            <div className={styles.divider}></div>
            
            <Calendar
                onChange={(e: any) => handleChange(e)}
                value={value}
                className={styles.calender}
            />
            

            {
                    time.length ?(<div className={styles.divider}></div>) : !time.length && error !== "" ? (
                        <div className={styles.divider}></div>
                    ) : null
                }
             
            {time.length ? ( <div className={styles.slot}>
               
                {
                    time.length ? time.map((t,index) => (
                        <div key={index} onClick={() => setSelectedTime(t)} className={styles.slotTime}>
                            <p>{t}</p>
                        </div>
                    )) : !time.length && error !== "" ? (
                        <p>{error}</p>
                    ) : null
                }
            </div>) : null }
        </div>

            )
        }
        </>
        

    )
}
