import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from "../../Components/layout"
import Preview from "../../Components/preview"
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()





const Home: NextPage = (props:any) => {
  return (
    <Layout>
      <Preview />
    </Layout>
  )
}

export default Home
