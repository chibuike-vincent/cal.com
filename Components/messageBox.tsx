import React from 'react'


interface Props {
    message: string
    icon:any
}
function MessageBox(props: Props) {
  return (
    <div className='w-full flex justify-center items-center flex-col  p-20'>
        {props.icon}
        <h2 className='text-2xl mt-2.5 font-bold'>{props.message}</h2>
    </div>
  )
}

export default MessageBox