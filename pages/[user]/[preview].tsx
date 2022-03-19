import type { NextPage } from 'next'
import Preview from "../../Components/preview"


const PreviewHome: NextPage = (props:any) => {
  return (
    <div className="w-full flex bg-gray-200 h-screen">
      <Preview />
    </div>
  )
}

export default PreviewHome
