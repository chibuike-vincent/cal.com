import React, {useState} from "react"
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import Link from 'next/link'

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [data, setData] = useState({
        userName: "",
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

    const signUp = async() => {
       if(data.userName === "" || data.email === "" || data.password === "" ){
           return alert("All fields are required!")
       }
       setIsLoading(true)
        const response:any = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(data)
        })

        const result = await response.json()

        console.log(result, "dddddd")
        if(result.responseCode === "00"){
            setIsLoading(false)
            alert("Created Successfully")
            router.push("/")
        }else{
            setIsLoading(false)
            alert(result.message)
        }

    }
  return (
    <>
        <p className={styles.add_contact_title}>Sign Up</p>
        <div className={styles.form}>
            <input type="text" name='userName' value={data.userName} onChange={(e) => handleChange(e)} placeholder='User Name' className={styles.input} />
            <input type="email" name='email' value={data.email} onChange={(e) => handleChange(e)} placeholder='Email' className={styles.input} />
            <input type="password" name='password' value={data.password} onChange={(e) => handleChange(e)} placeholder='Password' className={styles.input} />
            <input type="button" onClick={() => signUp()} value={isLoading ? "Processing..." : "Sign Up"} className={styles.button} />
            <p>Already have an account? <Link href="/">Sign In</Link></p>
        </div>
    </>
        
     
  )
}
