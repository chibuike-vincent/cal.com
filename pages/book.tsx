import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from "../Components/layout"
import Book from "../Components/book"
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

export async  function getServerSideProps(){
  // const contactData = await prisma.events.findMany()
return {
  props: {
    contacts: ""
  }
}
}



const Home: NextPage = (props:any) => {
  return (
    <Layout>
      <div className={styles.booking_main_container}>
        <Book />
      </div>
    </Layout>
  )
}

export default Home
