'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { AiOutlineLoading } from "react-icons/ai";
const steps = ["Login"];
export default function Login() {
  const router = useRouter();
    const { setUser, darkMode, setDarkMode } = useUser();
    const [step,setStep] = useState(0);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
      email: '',
      password: '',
    });
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      setError(false);
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const submit = async() => {
      setLoading(true);
      
      setError(false);
      
      if (!isValid()) {setLoading(false); return alert('Please fill all required fields')}
          try {
            const response = await axios.post('http://localhost:5000/api/login', form, { withCredentials: true });
            if (response.status === 200) {
              setLoading(false);
              localStorage.setItem('token', response.data.token);
              setUser(response.data.user);
              router.push('/dashboard');
            } else {
              setError(true);
              setLoading(false);
              alert(response.data.message || 'Login failed');
            }
          } catch (error) {
            setLoading(false);
            console.error(error);
            alert('An error occurred while logging in');
          }
    };
  
    const back = () => step > 0 && setStep(step - 1);
  
    const isValid = () => {
      if (step === 0) return form.password && form.email;
      return true;
    };
    useEffect (() => {
      const user = localStorage.getItem('user');
      if(user){router.push('/dashboard')}
    }, [])
  return (
    <div className={`w-full min-h-screen flex items-center justify-between px-4 sm:px-6 md:px-8 bg-white text-black dark:bg-gray-900 dark:text-white`}>
      {
        loading?(
          <div className="w-full h-screen absolute max-w-md p-4 sm:p-6 md:p-8 sm:h-auto flex items-center justify-center">
            <div className="text-4xl font-extrabold animate-spin delay-"><AiOutlineLoading /></div>
          </div>
        ):
        (
          <div className={`w-full max-w-md p-4 sm:p-6 md:p-8 h-full sm:h-auto flex justify-evenly rounded shadow-2xl ${darkMode ? 'shadow-black' : ''} bg-white dark:bg-gray-900`}>
            <div className='w-full flex flex-col flex-1'>
              <h1 className='w-full text-center text-2xl sm:text-3xl font-bold italic'>
                Login to E-Tailed Digital Services
              </h1>
              {error && (
                <h2 className='text-center text-red-700'>Invalid Details</h2>
              )}

              <div className='flex flex-col items-center justify-center w-full mt-6 space-y-6'>
                {step === 0 && (
                  <div className='w-full flex flex-col space-y-4'>
                    <input name="email" type='email' placeholder="E-mail" onChange={handleChange} className={`input ${!darkMode ? 'inputDark' : 'inputLight'}`} value={form.email} />
                    <input name="password" type='password' placeholder="Password" onChange={handleChange} className={`input ${!darkMode ? 'inputDark' : 'inputLight'}`} value={form.password} />
                  </div>
                )}
              </div>
              <button className='text-blue-500 hover:cursor-pointer mt-2'
              onClick={() => router.push('/onboarding')}
              >Not a User? Resgister Here!</button>
              <div className="mt-8 w-full flex flex-col sm:flex-row justify-between gap-4">
                <button onClick={back} className="btn w-full sm:w-auto">Back</button>
                <button onClick={submit} className="btn w-full sm:w-auto">Submit</button>
              </div>

            </div>
            

          </div>
        )
      }
      {
        !loading && (
          <div className='hidden md:flex h-full items-center justify-center w-1/2'>
              <img src='/Etailed-digital-india-Logo.png' className='flex w-full h-screen '/>
          </div>
        )
      }
            
    </div>

  )
}