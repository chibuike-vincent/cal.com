import Head from 'next/head';
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
    <div className="w-full max-h-screen overflow-y-hidden flex">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
    </Head>

      <div className="w-1/6 flex flex-col items-center p-2 bg-red-800  pt-14">
      <p onClick={() => router.push("/dashboard")} className="w-full pl-10 m-5  text-white cursor-pointer border-none rounded-md text-2xl font-bold text-left">Event Types</p>
       <p onClick={() => router.push("/book")} className="w-full pl-10  m-5 text-white cursor-pointer border-none rounded-md text-2xl font-bold text-left">Bookings</p>
       <p onClick={() => router.push("/availability")} className="w-full pl-10 m-5 mb-60 text-white cursor-pointer border-none rounded-md text-2xl font-bold text-left">Availability</p>
       <p onClick={() => handleLogout()} className="w-full pl-10 mt-80 max-h-screen  text-white cursor-pointer border-none rounded-md text-2xl font-bold text-left">Log Out</p>
      </div>

     <div className="w-5/6 flex flex-col h-screen">
       <div className="w-full  bg-white flex justify-center items-center shadow-gray-100">
       <p onClick={() => router.push("/dashboard")} className="p-3 m-5 text-red-800 border-none cursor-pointer rounded-md font-bold text-2xl">Cal.com</p>
       </div>
     <main className="w-full bg-gray-100 overflow-scroll min-h-full">
       {props.children}
      </main>
     </div>

     
    </div>
  )
}

export default Layout