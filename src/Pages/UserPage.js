import React, { useEffect, useState,Fragment, useRef } from 'react'
import axios from 'axios'
import UserCards from '../Components/UserCards'
import { Dialog, Transition } from '@headlessui/react'
import {v4 as uuid} from 'uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPage = () => {

    const [userData, setuserData] = useState([])
    const [updateData, setupdateData] = useState()
    const [open, setOpen] = useState(false)
    const [panel, setpanel] = useState("default")

    const cancelButtonRef = useRef(null)
    const FisrtName = useRef(null)
    const LastName = useRef(null)
    const Email = useRef(null)

   
    const del=(id)=>{
        try{
            axios.post('https://reqres.in/api/users/2')
            .then(response=>{
                if(response.status===201){
                    const newData=userData.filter((el)=>{
                        if(el.id!==id){
                            return el
                        }else{
                            return null;
                        }
                    })
                    setuserData(newData)
                    toast.success("Item Delete successfully!");
                }
            })
        }
        catch(err){
            toast.error(err);
        }
    }
    const changepanel=(data)=>{
        setupdateData(data)
        setOpen(true)
        setpanel('edit_panel')
    }
    const update=()=>{
        try{
            axios.post("https://reqres.in/api/users/2")
            .then(response=>{
                if(response.status===201){
                let up=userData.map(el=>{
                        if(el.id===updateData.id){
                            let newobj={...el,email:Email.current.value,first_name:FisrtName.current.value,last_name: LastName.current.value}
                            return newobj;
                        }
                        return el;
                    })
                    setuserData(up)
                    setOpen(!open)
                    toast.success("Item Updated successfully!");
                }
            })
        }
        catch(err){
            toast.error(err);
        }
    }
    

    const addNewUser=(e)=>{
        e.preventDefault();
        let obj={
            first_name:FisrtName.current.value,
            last_name:LastName.current.value,
            email:Email.current.value,
            avatar:'',
            id:uuid()
        }
        try{
            axios.post('https://reqres.in/api/users')
            .then(response=>{
                if(response.status===201){
                    setuserData([...userData,obj])
                    setOpen(!open)
                    toast.success("New Item Add successfully!");
                }
            })
        }
        catch(err){
            toast.error(err);
        }
    }

    useEffect(() => {
        axios.get('https://reqres.in/api/users/')
        .then(response=>{
            setuserData(response.data.data)
        })
        
    }, [])
    console.log(userData)


    return (
        < >
            <div className="container w-4/5 mx-auto my-5 rounded-xl bg-purple-200">
            <div className="w-full justify-center items-center flex h-20 text-3xl font-semibold text-purple-600" >--USER PROFILES--</div>
            <div className="flex justify-end items-center mb-3 px-10"><button className="py-3 px-4  bg-purple-600 font-semibold text-white rounded-lg" onClick={()=>{setOpen(!open)}}>Add new User</button></div>
            <div className="flex flex-wrap px-10 ">
           
            {userData.map((el)=>{
                return <UserCards userData={el} Del={del} update={changepanel}/>   
            })}
            </div>
            <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
                </span>
            
            
                { panel==="default" && 
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:w-1/3  my-8 sm:align-middle">
                    <form onSubmit={addNewUser} className=" px-4 pt-5 pb-4 flex flex-col jus lg:w-full">
                        <div className="ml-5 text-purple-600 font-semibold mb-3">Add new User</div>
                        <div className="m-3">
                            <label className=" m-5   w-24 text-purple-600 ">FirstName</label><input ref={FisrtName} defaultValue={""} className=" border-b-2 outline-none w-3/4 h-10" type="text" placeholder="FirstName"/>
                        </div>
                        <div className="m-3">
                            <label className="m-5 w-24 text-purple-600" >LastName</label><input ref={LastName} defaultValue={""} className=" border-b-2 outline-none w-3/4 h-10" type="text" placeholder="FirstName"/>
                        </div>
                        <div className="m-3">
                            <label className="m-5 w-24 mr-14 text-purple-600">Email</label><input ref={Email}  defaultValue={""} className=" border-b-2 outline-none w-3/4 h-10" type="text" placeholder="FirstName"/>
                        </div>
                    
                    </form>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={addNewUser}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                </Transition.Child>

                }
                {panel==="edit_panel" && 
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:w-1/3  my-8 sm:align-middle">
                    <form onSubmit={update} className="px-4 pt-5 pb-4 flex flex-col jus lg:w-full">
                        <div className="ml-5 text-purple-600 font-semibold mb-3">Edit User</div>
                        <div className="m-3">
                            <label className="text-purple-600 m-5">FirstName</label><input defaultValue={updateData.first_name} ref={FisrtName} className="w-3/4 h-10 border-b-2 outline-none" type="text" placeholder="FirstName"/>
                        </div>
                        <div className="m-3">
                            <label className="text-purple-600 m-5">LastName</label><input defaultValue={updateData.last_name} ref={LastName} className="w-3/4 h-10 border-b-2 outline-none" type="text" placeholder="FirstName"/>
                        </div>
                        <div className="m-3">
                            <label className="text-purple-600 m-5 mr-14">Email</label><input  defaultValue={updateData.email} ref={Email} className="w-3/4 h-10 border-b-2 outline-none" type="text" placeholder="FirstName"/>
                        </div>
                    
                    </form>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:ring-purple-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={update}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                    >
                        Cancel
                    </button>
                    </div>
                </div> 
                </Transition.Child>

                }
            
            </div>
            </Dialog>
            </Transition.Root>
            <ToastContainer />
           </div> 
</>
    )
}

export default UserPage
