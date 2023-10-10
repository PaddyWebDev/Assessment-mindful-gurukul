import React, { useEffect, useState } from 'react'
import HeadSection from '../components/HeadSection'
import axios from 'axios';
import { useRouter } from 'next/router';

interface Formdata {
    userName: string,
    userEmail: string,
    userPhoneNum: string,
    City: string,
    State: string,
}
export default function Update({ user, Id }: any) {
    const router = useRouter()
    const [FormData, SetFormData] = useState<Formdata>({
        userName: '',
        userEmail: '',
        userPhoneNum: '',
        City: '',
        State: '',
    })
    useEffect(() => {
        SetFormData(user[0])
    }, [user])




    const HandleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = event.target;
        if (id === 'City') {
            const selectedCity = cities.find(City => City.name === value);
            if (selectedCity) {
                SetFormData({ ...FormData, [id]: value, State: selectedCity.State });
            } else {
                SetFormData({ ...FormData, [id]: value, State: '' }); // Handle the case if the selected City is not found
            }
        } else {
            SetFormData({ ...FormData, [id]: value });
        }
    }
    const cities = [
        { id: 1, name: 'Mumbai', State: 'Maharashtra' },
        { id: 2, name: 'Delhi', State: 'Delhi' },
        { id: 3, name: 'Bangalore', State: 'Karnataka' },
        { id: 4, name: 'Hyderabad', State: 'Telangana' },
        { id: 5, name: 'Chennai', State: 'Tamil Nadu' }
    ];

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/api/Users/update/${Id}`, { FormData })
            alert(response.data.result.affectedRows > 0 ? 'Updated' : 'Already Updated');
            SetFormData({
                userName: '',
                userEmail: '',
                userPhoneNum: '',
                City: '',
                State: '',
            })
            router.push("/Admin/Dashboard")
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
                                    <input type="search" name="userName" value={FormData.userName} onChange={HandleChange} id="userName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="email" name="userEmail" id="userEmail" value={FormData.userEmail} onChange={HandleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="userEmail" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="number" name="userPhoneNum" id="userPhoneNum" value={FormData.userPhoneNum} onChange={HandleChange} className=" [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="userPhoneNum" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">userPhoneNum number (123-456-7890)</label>
                                </div>



                                <div className="relative z-0 w-full mb-6 group">
                                    <label htmlFor="City">Select a City:</label>
                                    <select id="City" value={FormData.City} onChange={HandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                        <option value="">--Select a City--</option>
                                        {cities.map(City => (
                                            <option key={City.id} value={City.name}>{City.name}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <label htmlFor="State">State:</label>
                                    <input type='search' id='State' value={FormData.State} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
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


export async function getServerSideProps({ query }: any) {
    const response = await axios.get(`http://localhost:3000/api/Users/get/${query.Id}`)
    const Id = query.Id
    return {
        props: {
            user: response.data.result,
            Id: Id
        }
    }
}