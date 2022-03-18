import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from "../../Components/layout"
import Preview from "../../Components/preview"
import styles from '../../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'


const Home: NextPage = (props:any) => {
  return (
    <div className={styles.preview_main}>
      <Preview />
    </div>
  )
}

export default Home
