import React, {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoMdAdd } from "react-icons/io"
import { useRouter } from "next/router"
import AvailabilityView from './availabilityView';


export async function getServerSideProps() {
    const response:any = await fetch("/api/availability/getAvailabilities", {
        method: "POST"
    })
    return{
        props: {
            availabilities: []
        }
    }
}

interface Props{
    day:any,
    startTime: any,
    endTime:any
}
function Availability(props:Props) {
    const {day, startTime, endTime} = props
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState(null);
    const [user, setUser] = useState<any>(null)
    const [availableDAta, setAvailableData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [availableTimes, setAvailableTime] = useState(
        {
            day: "",
            start: "",
            end: ""
        })

    
    

    useEffect(() => {
       const getData = async() => {
        const user:any = await localStorage.getItem("user")
        const res = JSON.parse(user)
        setUser(res)

        console.log(res, "from res")

        const response:any = await fetch(`/api/availability/getAvailabilities?id=${res.id}`, {
            method: "GET"
        })
        const result:any = await response.json()
        setAvailableData(result)

       }
       getData()
      }, [])
      
      console.log(user, availableDAta,"user")

    const handleChange = () => {
        setChecked(!checked);
        setSelected(day.day)
    };

   
    const handleDayTimeChange = (e:any) => {
        const {name,value}= e.target

        console.log(value, "value")
        setAvailableTime({
            ...availableTimes,
            [name]: value
        })        
    }


    const saveAvailability = async() => {
        if(availableTimes.day === "" || availableTimes.start === "" || availableTimes.end === ""){
            return alert("All fields are required!")
        }

        setIsLoading(true)

        const data = {
            day:availableTimes.day,
            start: availableTimes.start,
            end: availableTimes.end,
            owner: user.id
        }

         const response:any = await fetch("/api/availability/create", {
             method: "POST",
             body: JSON.stringify(data)
         })
 
         console.log(response)
         if(response.status === 200){
             setIsLoading(false)
             alert("Created")
            //  router.push("")
         }
    }
    console.log(selected, checked)

    return (
        <>
         <h2>Create Availabilities</h2>
        <div className={styles.av_time_card}>

                <div className={styles.av_time_container}>
                <select onChange={(e) => handleDayTimeChange(e)} value={availableTimes.day} name="day" className={styles.av_day_select}>
                    <option  value="">Select Day</option>
                      {
                          day.map((t:any, i:any) => (
                              <option key={t.id} value={t.day}>{t.day}</option>
                          ))
                      }
                  </select>
                </div>

                <div className={styles.av_time_container}>
                    <select onChange={(e) => handleDayTimeChange(e)} value={availableTimes.start} name="start" className={styles.av_time_select}>
                        <option  value="">Select start time</option>
                        {
                            startTime.map((t:any, i:any) => (
                                <option key={i} value={t}>{t}</option>
                            ))
                        }
                    </select>
                    <h3>-</h3>
                    <select onChange={(e) => handleDayTimeChange(e)} value={availableTimes.end} name="end" className={styles.av_time_select}>
                        <option  value="">Select end time</option>
                    {
                            endTime.map((t:any, i:any) => (
                                <option key={i} value={t}>{t}</option>
                            ))
                        }
                    </select>
                </div>
                 

                
                        <div className={styles.del_btn_container}>
                         <input type="button" onClick={() => saveAvailability()} value={isLoading ? "Processing..." : "Submit"} className={styles.button} />
    
                    </div>
                    
        </div>
        <h2>My Availabilities</h2>
       {
           availableDAta.length ? availableDAta.map((item:any) => (
                <AvailabilityView item={item} day={day} startTime={startTime} endTime={endTime} user={user} />
            )) : <p>Loading...</p>
       }
        </>
    )
}

export default Availability