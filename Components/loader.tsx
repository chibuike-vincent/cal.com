import React from 'react'
import { Oval } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function loader() {
  return (
    <Oval 
        color="#00BFFF" 
        height={80} 
        width={80} 
    />
  )
}

export default loader