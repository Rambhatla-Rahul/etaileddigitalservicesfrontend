import React from 'react'
import { useUser } from '../context/UserContext';
const appointments = [
    {
      date: "20-12-24 13.00 hrs",
      doctorImg: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e46d814079dc6ab1e2d8706dddc2f4e17db93975a4b898b42fb8ede1dffcc13?placeholderIfAbsent=true&apiKey=9ceb13d5794c4d029560c576098b7d34",
      doctorName: "Dr. Ravindra Kumar",
      doctorSpecialty: "Gynaecologist",
      status: "Ongoing",
      caseStatus: "View",
      actionRequired: "Make Payment",
      actionLink: "#",
    },
    {
      date: "27-08-24 18.30 hrs",
      doctorImg: "https://cdn.builder.io/api/v1/image/assets/TEMP/f2850353e4b581c34a0945ae2373966f02a37e3c6cfb292d9fa6cf05ca68b81f?placeholderIfAbsent=true&apiKey=9ceb13d5794c4d029560c576098b7d34",
      doctorName: "Dr. Radhika Iyer",
      doctorSpecialty: "Dentist",
      status: "Completed",
      caseStatus: "View",
      actionRequired: "Submit Reports",
      actionLink: "#",
    },
    {
      date: "15-06-24 10.45 hrs",
      doctorImg: "https://cdn.builder.io/api/v1/image/assets/TEMP/f2850353e4b581c34a0945ae2373966f02a37e3c6cfb292d9fa6cf05ca68b81f?placeholderIfAbsent=true&apiKey=9ceb13d5794c4d029560c576098b7d34",
      doctorName: "Dr. Suresh Radhakrishanan",
      doctorSpecialty: "General Physician",
      status: "Completed",
      caseStatus: "View",
      actionRequired: "Book Follow-up",
      actionLink: "#",
    },
  ];
const BasicInfo = () => {
    const { user, setUser, darkMode, setDarkMode } = useUser();
  return (
    <div className="max-md:mr-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
            <div className={`flex flex-col px-2 pt-2 pb-6 mx-auto min-h-[300px] rounded-[30px] ${darkMode ? 'bg-white shadow-[0px_5px_16px_rgba(0,0,0,0.20)]':'bg-gray-800 shadow-[0px_2px_4px_rgba(0,0,0,0.9)] text-white'} max-md:mt-10 transition-all duration-300 ease-in-out`}>
              <div className="flex gap-4 items-center pr-2.5 pl-2 w-full leading-snug min-h-[72px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e429e27ea2e1a81577df35763892e71deee3a5af5d7fc4b3f6c55a753334854b?placeholderIfAbsent=true&apiKey=9ceb13d5794c4d029560c576098b7d34"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto aspect-square rounded-[221px] w-[55px]"
                />
                <div className="self-stretch my-auto text-2xl font-semibold w-[219px]">
                  Basic info
                </div>
                <div className="flex gap-2.5 text-wrap text-start my-auto text-sm font-small text-teal-300">
                  Edit
                </div>
              </div>
              <div className="flex flex-col flex-1 justify-between w-full max-w-screen text-sm font-medium leading-tight">
                <div className="flex gap-10 justify-between items-center px-6 w-full whitespace-nowrap min-h-[26px] max-md:px-5">
                  <div className="flex gap-2 justify-center items-center self-stretch my-auto">
                    <div className="self-stretch my-auto ">
                      Name: {user? user.name : '-'}
                    </div>
                  </div>
                </div>
                <div className="mt-2 w-full min-h-[4px]" />
                <div className="flex gap-10 justify-between items-center px-6 mt-2 w-full min-h-[26px] max-md:px-5">
                  <div className="flex gap-2 justify-center items-center self-stretch my-auto whitespace-nowrap">
                    <div className="self-stretch my-auto ">
                      Company: {user ? user.company : '-'}
                    </div>
                  </div>
                </div>
                <div className="mt-2 w-full min-h-[4px]" />
                <div className="flex gap-2 items-center px-6 py-0.5 mt-2 w-full max-md:px-5">
                  <div className="self-stretch my-auto ">
                    Email id : {user.email ? user.email : '-'}
                  </div>
                  
                </div>
                <div className="mt-2 w-full min-h-[4px]" />
                <div className="flex flex-col justify-center px-6 mt-2 w-full max-md:px-5">
                  <div className="flex gap-2 items-center w-full">
                    <div className="self-stretch my-auto ">
                      Phone number:  {user.phone ? user.phone : '-'}
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
  )
}

export default BasicInfo
