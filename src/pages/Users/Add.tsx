import React, { useState } from 'react'
import HeadSection from '../components/HeadSection'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Add() {
    const router = useRouter()
    const [FormData, SetFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        city: '',
        state: '',
    })

    const HandleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = event.target;
        if (id === 'city') {
            const selectedCity = cities.find(city => city.name === value);
            if (selectedCity) {
                SetFormData({ ...FormData, [id]: value, state: selectedCity.state });
            } else {
                SetFormData({ ...FormData, [id]: value, state: '' }); // Handle the case if the selected city is not found
            }
        } else {
            SetFormData({ ...FormData, [id]: value });
        }
    }
    const cities = [
        { id: 1, name: 'Mumbai', state: 'Maharashtra' },
        { id: 2, name: 'Delhi', state: 'Delhi' },
        { id: 3, name: 'Bangalore', state: 'Karnataka' },
        { id: 4, name: 'Hyderabad', state: 'Telangana' },
        { id: 5, name: 'Chennai', state: 'Tamil Nadu' }
    ];

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (FormData.phone.length !== 10) {
                alert("Phone Number should be 10 digits")
            }
            else {
                const response = await axios.post(`/api/Users/add`, { FormData })
                alert(response.data.result.affectedRows > 0 ? 'Added' : 'Already Added');
                SetFormData({
                    name: '',
                    email: '',
                    phone: '',
                    gender: '',
                    city: '',
                    state: '',
                })
                router.push("/Admin/Dashboard")
            }
        } catch (error) {
            console.log(`Internal Server Error ${error}`);
        }
    }
    return (
        <>
            <HeadSection />

            <div id="addUser-modal" className=" border min-h-screen flex items-center ">
                <div className="relative w-full max-w-2xl max-h-full mx-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Add User
                            </h3>

                        </div>
                        <div className='p-3 m-2'>
                            <form method='post' onSubmit={HandleSubmit}>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="search" name="name" value={FormData.name} onChange={HandleChange} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="email" name="email" id="email" value={FormData.email} onChange={HandleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="number" name="phone" id="phone" value={FormData.phone} onChange={HandleChange} className=" [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <label htmlFor="default-radio-1">Select Your Gender</label>

                                    <div className=' flex items-center justify-evenly mt-1'>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Male"
                                                onChange={HandleChange}
                                                name="gender"
                                                id="gender"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="gender-male" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Female"
                                                onChange={HandleChange}
                                                name="gender"
                                                id="gender"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="gender-female" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Others"
                                                onChange={HandleChange}
                                                name="gender"
                                                id="gender"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="gender-others" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Others</label>
                                        </div>
                                    </div>

                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <label htmlFor="city">Select a city:</label>
                                    <select id="city" value={FormData.city} onChange={HandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                        <option value="">--Select a city--</option>
                                        {cities.map(city => (
                                            <option key={city.id} value={city.name}>{city.name}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <label htmlFor="state">State:</label>
                                    <input type='search' id='state' value={FormData.state} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>




        </>
    )
}
