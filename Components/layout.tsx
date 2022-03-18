import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'


interface props{
  children: any
}

const Layout = (props: props) => {
    const router = useRouter()

    const handleLogout = async() => {
      const response:any = await fetch("/api/auth/logout", {
        method: "POST",
        body: JSON.stringify({})
    })
      router.push("/")
    }

  
  return (
    <div className={styles.container}>

      <div className={styles.side_bar_container}>
      <p onClick={() => router.push("/dashboard")} className={styles.side_bar_btn}>Event Types</p>
       <p onClick={() => router.push("/book")} className={styles.side_bar_btn}>Bookings</p>
       <p onClick={() => router.push("/availability")} className={styles.side_bar_btn}>Availability</p>
       <p onClick={() => handleLogout()} className={styles.side_bar_btn}>Log Out</p>
      </div>

     <div className={styles.contents_container}>
       <div className={styles.header}>
       <p onClick={() => router.push("/dashboard")} className={styles.app_menu_items}>Cal.com</p>
       </div>
     <main className={styles.main}>
       {props.children}
      </main>
     </div>

     
    </div>
  )
}

export default Layout