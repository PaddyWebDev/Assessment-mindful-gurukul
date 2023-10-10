import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
export default function Login() {
    const router = useRouter();
    const [AdminData, SetAdminData] = useState({
        email: '',
        password: '',
    })
    const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        SetAdminData({ ...AdminData, [id]: value })
    }
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const response = await axios.post(`/api/Admin/Login`, AdminData)
        SetAdminData({
            email: '',
            password: '',
        })
        router.push('/Admin/Dashboard')
    }
    return (
        <main className='min-h-screen p-1'>
            <form className=' md:w-[40vw] w-[80vw] mx-auto mt-[10vh]' onSubmit={handleSubmit}>
                <h1 className='text-2xl mb-3'>Admin Login </h1>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" value={AdminData.email} onChange={HandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="search" id="password" value={AdminData.password} onChange={HandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </main >
    )
}
