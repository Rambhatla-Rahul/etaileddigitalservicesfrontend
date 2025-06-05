'use client'
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

const steps = ["Personal Info", "Business Info", "Preferences"];

export default function Onboarding() {
  const router = useRouter();
  const { setUser, darkMode, setDarkMode } = useUser();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '',
    company: '', industry: '', size: '',
    theme: 'light', layout: 'grid',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const next = () => {
    if (!isValid()) return alert('Please fill all required fields');
    if (step < 2) setStep(step + 1);
    else {
      setUser(form);
      setDarkMode(form.theme === 'dark');
      router.push('/dashboard');
    }
  };

  const back = () => step > 0 && setStep(step - 1);

  const isValid = () => {
    if (step === 0) return form.name && form.email;
    if (step === 1) return form.company && form.industry && form.size;
    return true;
  };
  useEffect (() => {
    const user = localStorage.getItem('user');
    if (user){
      redirect('/dashboard');
    }
  }, [])
  
  return (
    <div className={`w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-white text-black dark:bg-gray-900 dark:text-white`}>
      <div className={`w-full max-w-md p-4 sm:p-6 md:p-8 h-full sm:h-auto flex flex-col justify-evenly rounded shadow-2xl ${darkMode ? 'shadow-black' : ''} bg-white dark:bg-gray-900`}>
        <h1 className='w-full text-center text-2xl sm:text-3xl font-bold italic'>
          Welcome to Onboarding to E-Tailed Digital Services
        </h1>

        <div className="mt-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-800 ease-in-out"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-center font-bold">Step {step + 1} of 3</p>
        </div>

        <div className='flex flex-col items-center justify-center w-full mt-6 space-y-6'>
          {step === 0 && (
            <div className='w-full flex flex-col space-y-4'>
              <input name="name" placeholder="Name" onChange={handleChange} className={`input ${!darkMode ? 'inputDark' : 'inputLight'}`} value={form.name} />
              <input name="email" placeholder="Email" onChange={handleChange} className={`input ${!darkMode ? 'inputDark' : 'inputLight'}`} value={form.email} />
            </div>
          )}

          {step === 1 && (
            <div className='w-full flex flex-col space-y-4'>
              <input name="company" placeholder="Company Name" onChange={handleChange} className={`input ${!darkMode ? 'inputDark' : 'inputLight'}`} value={form.company} />
              <input name="industry" placeholder="Industry" onChange={handleChange} className={`input ${!darkMode ? 'inputDark' : 'inputLight'}`} value={form.industry} />
              <input name="size" placeholder="Company Size" onChange={handleChange} className={`input ${!darkMode ? 'inputDark' : 'inputLight'}`} value={form.size} />
            </div>
          )}

          {step === 2 && (
            <div className='w-full flex flex-col space-y-4'>
              <select name="theme" onChange={handleChange} className={`input ${!darkMode ? 'inputDark' : 'inputLight'}`} value={form.theme}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
              <select name="layout" onChange={handleChange} className={`input ${!darkMode ? 'inputDark' : 'inputLight'}`} value={form.layout}>
                <option value="grid">Grid</option>
                <option value="list">List</option>
              </select>
            </div>
          )}
        </div>

        <div className="mt-8 w-full flex flex-col sm:flex-row justify-between gap-4">
          <button onClick={back} className="btn w-full sm:w-auto">Back</button>
          <button onClick={next} className="btn w-full sm:w-auto">{step === 2 ? 'Submit' : 'Next'}</button>
        </div>
      </div>
    </div>
  );
}
