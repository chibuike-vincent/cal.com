import React, {useState} from "react"
import Head from 'next/head'
import Image from 'next/image'
import Layout from "../Components/layout"
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"

export default function Book() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: any) => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const login = async() => {
       if(data.email === "" || data.password === "" ){
           return alert("All fields are required!")
       }

       setIsLoading(true)
        const response:any = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data)
        })

        const result = await response.json()

        console.log(result, "ddd")
        if(result.responseCode === "00"){
            setIsLoading(false)
            alert("Logged In")
            localStorage.setItem("user", JSON.stringify(result.data))
            router.push("/dashboard")
        }else{
            setIsLoading(false)
            alert(result.message)
        }
    }
  return (
    <>
        <p className={styles.add_contact_title}>Login</p>
        <div className={styles.form}>
            <input type="email" name='email' value={data.email} onChange={(e) => handleChange(e)} placeholder='Email' className={styles.input} />
            <input type="password" name='password' value={data.password} onChange={(e) => handleChange(e)} placeholder='Password' className={styles.input} />
            <input type="button" onClick={() => login()} value={isLoading ? "Processing..." : "Login"} className={styles.button} />
            
            <p>Don't have an account? <a href="/sign_up">Sign Up</a></p>
            
        </div>
    </>
        
     
  )
}
