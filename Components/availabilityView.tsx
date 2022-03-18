import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

interface Props {
    day: any,
    startTime: any,
    endTime: any
    item: any,
    user:any
}
function AvailabilityView(props: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const { item, day, startTime, endTime, user } = props
    const [availableTimes, setAvailableTime] = useState(
        {
            day: item.day,
            start: item.start,
            end: item.end
        })


    const handleDayTimeChange = (e: any) => {
        const { name, value } = e.target

        console.log(value, "value")
        setAvailableTime({
            ...availableTimes,
            [name]: value
        })
    }


    const updateAvailability = async () => {
        if (availableTimes.day === "" || availableTimes.start === "" || availableTimes.end === "") {
            return alert("All fields are required!")
        }

        setIsLoading(true)
        const data = {
            id: item.id,
            day: availableTimes.day,
            start: availableTimes.start,
            end: availableTimes.end,
            owner: user.id
        }

        const response: any = await fetch("/api/availability/update", {
            method: "POST",
            body: JSON.stringify(data)
        })

        console.log(response)
        if (response.status === 200) {
            setIsLoading(false)
            alert("Updated")
        }
    }
    return (
        <div className={styles.av_time_card}>

            <div className={styles.av_time_container}>
                <div onChange={(e) => handleDayTimeChange(e)}  className={styles.av_day_div}>
                    <p>{item.day}</p>
                </div>
            </div>

            <div className={styles.av_time_container}>
                <select onChange={(e) => handleDayTimeChange(e)} value={availableTimes.start} name="start" className={styles.av_time_select}>
                <option  value={item.start}>{item.start}</option>
                    {
                        startTime.map((t: any, i: any) => (
                            <option key={i} value={t}>{t}</option>
                        ))
                    }
                </select>
                <h3>-</h3>
                <select onChange={(e) => handleDayTimeChange(e)} value={availableTimes.end} name="end" className={styles.av_time_select}>
                <option  value={item.end}>{item.end}</option>
                    {
                        endTime.map((t: any, i: any) => (
                            <option key={i} value={t}>{t}</option>
                        ))
                    }
                </select>
            </div>



            <div className={styles.del_btn_container}>
                <input type="button" onClick={() => updateAvailability()} value={isLoading ? "Processing..." : "Update"} className={styles.button} />

            </div>

        </div>
    )
}

export default AvailabilityView