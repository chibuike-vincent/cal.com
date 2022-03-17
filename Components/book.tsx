import React, {useState, useEffect} from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import BookingsCard from "./bookingsCard"

export default function Book() {
    const router = useRouter()
    const [bookingData, setBookingData] = useState<any[]>([])
    const [cancelledBookingData, setCancelledBookingData] = useState<any[]>([])
    const [data, setData] = useState({
        fullName: "",
        profession: "",
        placeOfWork: "",
        githubProfile: ""
    })


    useEffect(() => {
      const getData = async() => {
       const user:any = await localStorage.getItem("user")
       const res = JSON.parse(user)
       

       console.log(res, "from res")

       const response:any = await fetch(`/api/booking/getBookings?id=${res.id}`, {
           method: "GET"
       })
       const result:any = await response.json()
       const active = result.filter((item:any) => item.status === "active")
       const cancelled = result.filter((item:any) => item.status === "cancelled")
       setBookingData(active)
       setCancelledBookingData(cancelled)

      }
      getData()
     }, [])

    const handleChange = (e: any) => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    
  return (
    <>
    <h2>Bookings</h2>
    <p className={styles.bk_comment}>See upcoming and past events booked through your event type links.</p>
    <Tabs>
    <TabList>
      <Tab>Upcoming</Tab>
      <Tab>Past</Tab>
      <Tab>Cancelled</Tab>
    </TabList>

    <TabPanel>
      {
        bookingData.length && bookingData.map((item:any) => (
          <BookingsCard booking={item} />
        ))
      }
    
    </TabPanel>
    <TabPanel>
      <h2>No past booking yet</h2>
    </TabPanel>
    <TabPanel>
    {
        cancelledBookingData.length && cancelledBookingData.map((item:any) => (
          <BookingsCard booking={item} />
        ))
      }
    </TabPanel>
  </Tabs>
    </>
        
     
  )
}



