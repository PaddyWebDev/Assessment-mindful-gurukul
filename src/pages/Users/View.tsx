import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'
export default function View({ UserData }: any) {
  const router = useRouter()
  return (
    <>
      <main className='min-h-screen p-2'>
        <section className='border sm:w-fit  mx-auto mt-[25vh] md:p-10 p-3 rounded-lg dark:bg-slate-900'>
          <div className=' mb-3 flex items-center justify-start gap-3 '>
            <button onClick={() => router.push('/Admin/Dashboard') }><ArrowLeft /></button>
            <h1 className='text-2xl'>User Details</h1>
          </div>
          <hr className='  border-gray-700 ' />
          <div>
            <h4 className='text-lg font-normal break-all '> Name: <span className=' text-lg   ' >{UserData.userName}</span> </h4>
            <h4 className='text-lg font-normal break-all '> Email: <span className=' text-lg   ' >{UserData.userEmail}</span> </h4>
            <h4 className='text-lg font-normal break-all '> Phone Number: <span className=' text-lg    ' >{UserData.userPhoneNum}</span> </h4>
            <h4 className='text-lg font-normal break-all '> Gender: <span className=' text-lg   ' >{UserData.userGender}</span> </h4>
            <h4 className='text-lg font-normal break-all '> City: <span className=' text-lg   ' >{UserData.City} </span></h4>
            <h4 className='text-lg font-normal break-all '> State: <span className=' text-lg   ' >{UserData.State}</span> </h4>
          </div>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }: any) {
  const { Id } = query
  const response = await axios.get(`http://localhost:3000/api/Users/get/${Id}`)
  return {
    props: {
      UserData: response.data.result[0]
    }
  }
}




