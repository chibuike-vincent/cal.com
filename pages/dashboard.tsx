import React, {useState, useEffect} from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from "../Components/layout"
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router'

const prisma = new PrismaClient()

export async  function getServerSideProps(){
  const eventTypes = await prisma.eventsType.findMany()

return {
  props: {
    events: eventTypes
  }
}
}


// const eventData = [
//   {
//     title:"15 min meeting",
//     description:"A 15 min meeting to discuss issues",
//     type: "1-on-1",
//     duration:15,
//     url:"none",
//     location: "google meet"
//   },
//   {
//     title:"Secret Meeting",
//     description:"A meeting to discuss secret issues",
//     type: "1-on-1",
//     duration:45,
//     url:"none",
//     location: "google meet"
//   },
//   {
//     title:"Dev brainstorm",
//     description:"A brainstorming session for developers",
//     type: "1-on-1",
//     duration:30,
//     url:"none",
//     location: "google meet"
//   },
//   {
//     title:"Board Meeting",
//     description:"A board meeting to discuss issues",
//     type: "1-on-1",
//     duration:60,
//     url:"none",
//     location: "google meet"
//   },
// ]


// const saveEvents = async() => {
 
//  const savedContacts = await fetch("/api/event/event_types", {
//      method: "POST",
//      body: JSON.stringify(eventData)
//  })

//  if(savedContacts){
//      alert("Saved")
//     //  router.push("/")
//  }
// }

// saveEvents()



const Home: NextPage = (props:any) => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getData = async() => {
     const user:any = await localStorage.getItem("user")
     const res = JSON.parse(user)
     setUser(res)

    }
    getData()
   }, [])

   console.log(user, "user")
 
  return (
    <Layout>
      <p className={styles.contact_title}>Event types</p>
      <div   className={styles.card_container}>
        {
          props.events.map((event:any) => (
            <div key={event.id} className={styles.event_card}>
            <div className={styles.card_content}>
            <p className={styles.content_name}>{event.title}<span className={styles.owner}>{`/${user?.userName}/${event.title.split(" ")[0]}`} {event.title.includes("min") ? "min" : null}</span></p>
            <p className={styles.owner}>{event.description}</p>
            <p className={styles.owner}><BiTimeFive /> {event.duration}min</p>
            <p className={styles.owner}><AiOutlineUser /> {event.type}</p>
            </div>
            <div className={styles.del_btn_container}>
            <input type="button" onClick={() => router.push(`/${user.id}/${event.id}`)} value="preview" className={styles.button} />
            <input type="button" onClick={() => alert("clicked")} value="copy link" className={styles.button} />
            </div>
          </div>
          ))
        }
      </div>
    </Layout>
  )
}

export default Home