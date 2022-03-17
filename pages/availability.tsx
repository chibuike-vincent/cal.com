import React, { useState } from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from "../Components/layout"
import Book from "../Components/book"
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
import AvailabilityComponent from "../Components/availability"
import moment from "moment"

// const prisma = new PrismaClient()

export async function getStaticProps() {
    // const contactData = await prisma.events.findMany()
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
    const startTime = await getStartTime("09:00 AM")
    const endTime = await getStartTime("17:00 PM")
    return {
        props: {
            startTime: startTime,
            endTime: endTime
        }
    }

}

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
            <div className={styles.booking_main_container}>
                <h2>Availability</h2>
                <p className={styles.bk_comment}>Configure times when you are available for bookings.</p>
                <div className={styles.av_container_card}>
                    
                                <AvailabilityComponent day={daysOfWeek}  startTime={props.startTime} endTime={props.endTime} />
                              
                     
                </div>
            </div>
        </Layout>
    )
}

export default Availability
