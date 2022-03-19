import React, { useState } from "react"
import type { NextPage } from 'next'
import Layout from "../Components/layout"
import AvailabilityComponent from "../Components/availability"
import moment from "moment"
import * as cookie from 'cookie'


export async function getServerSideProps(context:any) {
  const sessionCookie = cookie.parse(context.req.headers.cookie);
  console.log(sessionCookie, "ccccc")

  let startTime;
  let endTime;

  if(!sessionCookie.token){
    context.res.setHeader("location", "/");
    context.res.statusCode = 302;
    context.res.end();
  }else{
    const getStartTime = async (time:string) => {
        let start = moment(time, 'hh:mm A').format('HH:mm:ss')

        let end = moment("23:00 PM", 'hh:mm A').format('HH:mm:ss')

        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');

        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }

        var timeStops = [];

        while (startTime <= endTime) {
            timeStops.push(moment(startTime).format('HH:mm a'));
            startTime.add(15, 'minutes');
        }

        return timeStops
    }
    startTime = await getStartTime("09:00 AM")
    endTime = await getStartTime("09:00 AM")
  }
  return {
    props: {
        startTime: startTime,
        endTime: endTime
    },
  };
}

// export async function getStaticProps() {
//     // const contactData = await prisma.events.findMany()
//     const getStartTime = async (time:string) => {
//         let start = moment(time, 'hh:mm A').format('HH:mm:ss')

//         let end = moment("23:00 PM", 'hh:mm A').format('HH:mm:ss')

//         var startTime = moment(start, 'HH:mm');
//         var endTime = moment(end, 'HH:mm');

//         if (endTime.isBefore(startTime)) {
//             endTime.add(1, 'day');
//         }

//         var timeStops = [];

//         while (startTime <= endTime) {
//             timeStops.push(moment(startTime).format('HH:mm a'));
//             startTime.add(15, 'minutes');
//         }

//         return timeStops
//     }
//     const startTime = await getStartTime("09:00 AM")
//     const endTime = await getStartTime("17:00 PM")
//     return {
//         props: {
//             startTime: startTime,
//             endTime: endTime
//         }
//     }

// }

const daysOfWeek = [{
    id:0,
    day:"Sunday"
}, {
    id:1,
    day:"Monday"
}, {
    id:2,
    day:"Tuesday"
}, {
    id:3,
    day:"Wednesday"
}, {
    id:4,
    day:"Thursday"
}, {
    id:5,
    day:"Friday"
}, {
    id:6,
    day:"Saturday"
}]


const Availability: NextPage = (props: any) => {
   
    return (
        <Layout>
            <div className="w-full p-7">
                <h2 className="text-3xl font-bold">Availability</h2>
                <p className="mb-20 leading-3 pt-3 text-gray-600">Configure times when you are available for bookings.</p>
                <div className="w-full bg-white m-5 mb-20 flex flex-col justify-between rounded-md p-5">
                    
                                <AvailabilityComponent day={daysOfWeek}  startTime={props.startTime} endTime={props.endTime} />
                              
                     
                </div>
            </div>
        </Layout>
    )
}

export default Availability
