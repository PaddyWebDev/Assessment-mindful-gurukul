import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '@/pages/components/Navbar';
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { useRouter } from 'next/router';
import HeadSection from '../components/HeadSection';
export default function Dashboard({ UserData }: any) {
    const router = useRouter()
    const [State, SetState] = useState<number>(1)
    const [Users, SetUsers] = useState<Array<any>>(UserData)

    async function deleteUser(Id: number) {
        const decision = window.confirm('Are you sure you want to Delete this User!')
        if (decision) {
            const NewArr = Users.filter(user => user.userId !== Id)
            SetUsers(NewArr)
            await axios.delete(`http://localhost:3000/api/Users/delete/${Id}`,)
        }
    }






    return (
        <main className='min-h-screen '>
            <Navbar />
            <HeadSection />
            <div className='mt-[5vh] flex items-center justify-end w-full'>
                <button onClick={() => router.push('/Users/Add')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 flex items-center justify-start gap-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add User <Plus /></button>
            </div>
            <section className=' md:w-[50vw] mx-auto border mt-[6vh]   p-5'>

                {Users && (

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Operations
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Users.map((User: any, index: number) => (
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {User.userId}
                                            </th>
                                            <td className="px-6 py-4">
                                                {User.userName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {User.userEmail}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => router.push(`/Users/View?Id=${User.userId}`)} className=" hover:bg-gray-800   font-medium rounded-full text-sm p-3  text-[#fafafa]  dark:hover:bg-gray-700  " type="button">
                                                    <Eye />
                                                </button>
                                                <button onClick={() => { router.push(`/Users/Update?Id=${User.userId}`); SetState(State + 1) }} type="button" className="text-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full hover:text-[#fafafa] dark:hover:text-[#fafafa] text-sm p-2 mr-1 dark:text-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> <Pencil /></button>
                                                <button onClick={() => deleteUser(User.userId)} className="text-red-600 hover:bg-red-600 focus:hover:bg-red-600 dark:hover:bg-red-600 dark:focus:bg-red-600 dark:text-red-600 hover:text-[#fafafa] focus:text-[#fafafa] p-2 rounded-full" type="button">
                                                    <Trash2 />
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>

                )
                }
            </section>

        </main>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:3000/api/Users/getAll');
    return {
        props: {
            UserData: res.data.result,
        }
    }

} 