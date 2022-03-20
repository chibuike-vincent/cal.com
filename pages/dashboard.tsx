import React, { useState, useEffect } from "react";

import type { NextPage } from "next";
import Layout from "../Components/layout";
import { PrismaClient } from "@prisma/client";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/router";
import * as cookie from "cookie";
import {CgCopy} from "react-icons/cg"
import {MdPreview} from "react-icons/md"

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
//     title:"15 min",
//     description:"A 15 min meeting to discuss issues",
//     type: "1-on-1",
//     duration:15,
//     url:"none",
//     location: "google meet"
//   },
//   {
//     title:"Secret",
//     description:"A meeting to discuss secret issues",
//     type: "1-on-1",
//     duration:45,
//     url:"none",
//     location: "google meet"
//   },
//   {
//     title:"Dev-brainstorm",
//     description:"A brainstorming session for developers",
//     type: "1-on-1",
//     duration:30,
//     url:"none",
//     location: "google meet"
//   },
//   {
//     title:"Interview",
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

  useEffect(() => {
    const getData = async () => {
      const user: any = await localStorage.getItem("user");
      const res = JSON.parse(user);
      setUser(res);
    };
    getData();
  }, []);

  const clickToCopy = (url: any) => {
    navigator.clipboard.writeText(url);
    alert("Link Copied");
  };

  

  return (
    <Layout>
      <p className="ml-10 font-bold text-3xl font-mono text-red-800 mt-20 mb-5">Event types</p>
      <div className="w-full flex-wrap flex justify-around">
        {props.events.map((event: any) => {
          
          return (
            <div key={event.id} className="w-2/5 bg-white m-5 flex flex-row justify-between rounded-md p-2">
              <div className="ml-2.5 w-4/5 ">
                <p className="text-xl font-bold leading-normal">
                  {event.title}
                  <span className="text-gray-800 leading-3 text-xs">
                    {`/${user?.userName}/${event.title.split(" ")[0]}`}{" "}
                    {event.title.includes("min") ? "min" : null}
                  </span>
                </p>
                <p className="text-gray-800 leading-3 text-xs">{event.description}</p>
                <p className="text-gray-800 pt-2 leading-3 text-1xl flex">
                  <BiTimeFive size={15} /> {event.duration} min
                </p>
                <p className="text-gray-800 pt-2 leading-4 text-xs flex">
                  <AiOutlineUser size={15} /> {event.type}
                </p>
              </div>

             
              <div className="w-1/5  flex items-center justify-around">
                <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() =>
                    router.push(`/${user.id}/${event.id}`)
                  }>
                <MdPreview size={20} />
                  <p className="text-xs">Preview</p>
                  </div>
                
                <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() =>
                    clickToCopy(
                      `https://vincent-cal-clone.vercel.app//${user.id}/${event.id}` // BaseURL to be added to env
                    )
                  }>
                <CgCopy size={20} />
                  <p className="text-xs">Copy link</p>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
