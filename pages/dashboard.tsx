import React, { useState, useEffect } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../Components/layout";
import styles from "../styles/Home.module.css";
import { PrismaClient } from "@prisma/client";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/router";
import * as cookie from "cookie";

const prisma = new PrismaClient();

export async function getServerSideProps(context: any) {
  const sessionCookie = cookie.parse(context.req.headers.cookie);
  console.log(sessionCookie, "ccccc");
  let eventTypes;
  if (!sessionCookie.token) {
    context.res.setHeader("location", "/");
    context.res.statusCode = 302;
    context.res.end();
  } else {
    eventTypes = await prisma.eventsType.findMany();
  }
  return {
    props: {
      events: eventTypes,
    },
  };
}
// export async  function getServerSideProps(context:any){

//   const eventTypes = await prisma.eventsType.findMany()

// return {
//   props: {
//     events: eventTypes
//   }
// }
// }

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

const Home: NextPage = (props: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [owner, setOwner] = useState<any>("");

  useEffect(() => {
    const getData = async () => {
      const user: any = await localStorage.getItem("user");
      const res = JSON.parse(user);
      setUser(res);
      const userId = res.id;
      setOwner(userId.replace(res.userName));
    };
    getData();
  }, []);

  const clickToCopy = (url: any) => {
    navigator.clipboard.writeText(url);
    alert("Link Copied");
  };

  console.log(owner);

  return (
    <Layout>
      <p className={styles.contact_title}>Event types</p>
      <div className={styles.card_container}>
        {props.events.map((event: any) => {
          const eventId = event.id;
          const eventType = eventId.replace(event.title.split(" ")[0]);
          console.log(eventType);
          return (
            <div key={event.id} className={styles.event_card}>
              <div className={styles.card_content}>
                <p className={styles.content_name}>
                  {event.title}
                  <span className={styles.owner}>
                    {`/${user?.userName}/${event.title.split(" ")[0]}`}{" "}
                    {event.title.includes("min") ? "min" : null}
                  </span>
                </p>
                <p className={styles.owner}>{event.description}</p>
                <p className={styles.owner}>
                  <BiTimeFive /> {event.duration}min
                </p>
                <p className={styles.owner}>
                  <AiOutlineUser /> {event.type}
                </p>
              </div>
              <div className={styles.del_btn_container}>
                <input
                  type="button"
                  onClick={() =>
                    router.push(`/${user.id}/${event.id}`)
                  }
                  value="preview"
                  className={styles.button}
                />
                <input
                  type="button"
                  onClick={() =>
                    clickToCopy(
                      `http://localhost:3000/${user.id}/${event.id}`
                    )
                  }
                  value="copy link"
                  className={styles.button}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
