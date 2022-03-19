import React, {useState} from "react"
import { useRouter } from "next/router"
import Link from 'next/link'

export default function Login() {
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

// /width: 100%;
// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;
// text-align: center;

  return (
    <>
        <p className="text-3xl font-bold text-red-600 text-center mt-20 mb-10">Login</p>
        <div className="w-full flex flex-col justify-center items-center text-center">
            <input type="email" name='email' value={data.email} onChange={(e) => handleChange(e)} placeholder='Email' 
            className="border-solid border-2 border-black-400 m-5 w-1/2 p-4 rounded-md" />
            <input type="password" name='password' value={data.password} onChange={(e) => handleChange(e)} placeholder='Password' 
            className="border-solid border-2 border-black-400 m-5 w-1/2 p-4 rounded-md" />
            <input type="button" onClick={() => login()} value={isLoading ? "Processing..." : "Login"} 
            className="m-5 border-none bg-red-700 text-white p-4 cursor-pointer font-bold rounded-md" />
            
            <p >Don't have an account? <Link href="/sign_up" ><span className="text-red-400 hover:text-red-600 cursor-pointer">Sign Up</span></Link> </p>
            
        </div>
    </>
        
     
  )
}
