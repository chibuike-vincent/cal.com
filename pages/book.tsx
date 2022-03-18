import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from "../Components/layout"
import Book from "../Components/book"
import styles from '../styles/Home.module.css'
import * as cookie from 'cookie'


export async function getServerSideProps(context:any) {
  const sessionCookie = cookie.parse(context.req.headers.cookie);
  console.log(sessionCookie, "ccccc")

  if(!sessionCookie.token){
    context.res.setHeader("location", "/");
    context.res.statusCode = 302;
    context.res.end();
  }
  return {
    props: {},
  };
}



const BookPage: NextPage = (props:any) => {
  return (
    <Layout>
      <div className={styles.booking_main_container}>
        <Book />
      </div>
    </Layout>
  )
}

export default BookPage
