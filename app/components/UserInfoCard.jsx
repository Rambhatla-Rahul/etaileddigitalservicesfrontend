import React from 'react'
import { useUser } from '../context/UserContext';

const UserInfoCard = () => {
  const { user, setUser, darkMode, setDarkMode } = useUser();

  return (
    <div className={`w-[400px] h-[400px] rounded-3xl shadow-2xl bg-gray-200 p-6 flex flex-col justify-start gap-8`}>
      <div className={`w-full flex items-stretch ${darkMode ? 'text-white':'text-black'} gap-2 mt-2`}>
         <span className='font-bold'>Name -</span><span className=''>{user?.name}</span>
      </div>
    </div>
  )
}

export default UserInfoCard
