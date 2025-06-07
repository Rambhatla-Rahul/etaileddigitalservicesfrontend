'use client'
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import BasicInfo from '../components/BasicInfo';
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import TeamInfo from '../components/TeamInfo';
import axios from 'axios';
import { IoMdExit } from "react-icons/io";

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function Dashboard() {
  const { user,setUser, darkMode, setDarkMode } = useUser();
  const router = useRouter();
  const [rotate, setRotate] = useState(false); // Rotation state
  const [viewAll,setViewAll] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const sampleData = [
        {
          projectId: 1,
          projectProgress: [
            { day: 'Mon', progress: 20 },
            { day: 'Tue', progress: 40 },
            { day: 'Wed', progress: 50 },
            { day: 'Thu', progress: 60 },
            { day: 'Fri', progress: 80 }
          ]
        },
        {
          projectId: 2,
          projectProgress: [
            { day: 'Mon', progress: 10 },
            { day: 'Tue', progress: 15 },
            { day: 'Wed', progress: 40 },
            { day: 'Thu', progress: 60 },
            { day: 'Fri', progress: 90 }
          ]
        },
        {
          projectId: 3,
          projectProgress: [
            { day: 'Mon', progress: 5 },
            { day: 'Tue', progress: 20 },
            { day: 'Wed', progress: 35 },
            { day: 'Thu', progress: 50 },
            { day: 'Fri', progress: 100 }
          ]
        },
        {
          projectId: 4,
          projectProgress: [
            { day: 'Mon', progress: 7 },
            { day: 'Tue', progress: 19 },
            { day: 'Wed', progress: 46 },
            { day: 'Thu', progress: 75 },
            { day: 'Fri', progress: 100 }
          ]
        },
      ];
  const [selectedProject, setSelectedProject] = useState(sampleData[0].projectId);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    setRotate(true);
    setTimeout(() => setRotate(false), 200);
  };
  
  
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
    localStorage.removeItem('theme'); 
    
    setUser(null);                    
    router.push('/login');

  };

  useEffect(() => {
    const userExists = localStorage.getItem('user')
    if (!userExists) {
      router.push('/login');
      setUser(null);
    }
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token') || null;
        if(token){
            const response = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setUser(response.data);
        }
        
        else{
          redirect('/login');
        }
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [user, darkMode]);

  if (!user) return null;

  return (
    <>
      {
        user?.layout === 'grid' ? (
          <div className={`p-6 relative md:flex-col ${!darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} h-screen overflow-y-scroll`}>
      
            <button
              className={`absolute top-4 lg:top-4 right-4 text-white p-2 px-3 rounded-full shadow-lg transition-colors overflow-hidden ${
                darkMode ? 'bg-gray-500' : 'bg-gray-700'
              }`}
              onClick={toggleTheme}
            >
              <div
                className={`transition-transform duration-200 ease-in-out ${
                  rotate ? 'rotate-[360deg]' : ''
                }`}
              >
                {darkMode ? (
                  <MdOutlineDarkMode className="w-4 h-6" />
                ) : (
                  <MdLightMode className="w-4 h-6" />
                )}
              </div>
            </button>
            <button
              className={`absolute right-20 top-4 lg:top-16 lg:right-4 text-white p-2 px-3 rounded-full shadow-lg transition-colors overflow-hidden ${
                darkMode ? 'bg-gray-500' : 'bg-gray-700'
              }`}
              onClick={logout}
            >
              <div
                className={``}
              >
                {darkMode ? (
                  <IoMdExit className="w-4 h-6" />
                ) : (
                  <IoMdExit className="w-4 h-6" />
                )}
              </div>
            </button>
            

            <div className="flex justify-start gap-10 items-center">
              
            </div>
            <p className="text-sm">Theme: {darkMode ? 'light' : 'dark'}, Layout: {user?.layout}</p>

            <div className="flex flex-col lg:flex-row items-start justify-start gap-8 w-full md:mt-20 ">

              <BasicInfo />
              <TeamInfo setSelectedProject={setSelectedProject} selectedProject={selectedProject} sampleData={sampleData} setViewAll={setViewAll} viewAll={viewAll}/>
              
            </div>
            {
              viewAll && (  
              <div className='flex flex-col flex-1 mt-10 lg:grid lg:grid-cols-2 w-full h-full p-4'>
                {
                    sampleData.map((project)=>{
                      return(
                        <div className='flex-col w-full md:max-w-[200px] h-full pr-4 mb-4' key={project.projectId}>
                          <h1 className={`${project.projectId === parseInt(selectedProject)? 'text-gray-500': ' '} text-bold text-wrap whitespace-nowrap text-2xl font-bold`}>Project: {project?.projectId}</h1>
                          <Bar
                            data={{
                            labels: project.projectProgress.map(p => p.day),
                            datasets: [
                            {
                              label: 'Progress',
                              data: project.projectProgress.map(p => p.progress),
                              backgroundColor: '#3b82f6',
                              borderRadius: 6,
                              barThickness: 20
                            }
                            ]
                            }}
                            options={{
                              responsive: false,
                              maintainAspectRatio: true,
                              plugins: {
                                legend: {
                                  display: false
                                  },
                                  tooltip: {
                                    enabled: true,
                                    mode: 'index',
                                    intersect: false
                                    }
                                  },
                                                        
                            }}
                            width={300}
                          />
                        </div>
                      )
                    })
                }
                </div>
              )
              }
          </div>
        ):
        (
          <div className={`p-6 relative flex-col ${!darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} h-screen overflow-y-scroll`}>
      
            <button
              className={`absolute top-4 right-4 text-white p-2 px-3 rounded-full shadow-lg transition-colors overflow-hidden ${
                darkMode ? 'bg-gray-500' : 'bg-gray-700'
              }`}
              onClick={toggleTheme}
            >
              <div
                className={`transition-transform duration-200 ease-in-out ${
                  rotate ? 'rotate-[360deg]' : ''
                }`}
              >
                {darkMode ? (
                  <MdOutlineDarkMode className="w-4 h-6" />
                ) : (
                  <MdLightMode className="w-4 h-6" />
                )}
              </div>
            </button>
            <button
              className={`absolute lg:top-16 lg:right-4 text-white p-2 px-3 rounded-full shadow-lg transition-colors overflow-hidden ${
                darkMode ? 'bg-gray-500' : 'bg-gray-700'
              }`}
              onClick={logout}
            >
              <div
                className={``}
              >
                {darkMode ? (
                  <IoMdExit className="w-4 h-6" />
                ) : (
                  <IoMdExit className="w-4 h-6" />
                )}
              </div>
            </button>
              
            <div className="flex w-full justify-start gap-10 items-center">
              
                <h1 className="text-2xl font-bold">Welcome, {userInfo?.name}</h1>
              
            </div>
            <p className="text-sm">Theme: {darkMode ? 'light' : 'dark'}, Layout: {userInfo?.layout}</p>

            <div className={`flex flex-col lg:${userInfo?.layout === 'grid'? 'flex-row':'flex-col'} items-start justify-start gap-8 w-full md:mt-20 `}>
              <BasicInfo />
              <TeamInfo setSelectedProject={setSelectedProject} selectedProject={selectedProject} sampleData={sampleData} setViewAll={setViewAll} viewAll={viewAll}/>
            </div>
            {
              viewAll && (  <div className='flex flex-col w-full h-full p-4'>
                {
                    sampleData.map((project)=>{
                      return(
                        <div className='flex flex-col w-full h-full pr-4 mb-4' key={project.projectId}>
                          <h1 className={`${project.projectId === parseInt(selectedProject)? 'text-gray-500': ' '} text-bold text-wrap whitespace-nowrap text-2xl font-bold`}>Project: {project?.projectId}</h1>
                          <Bar
                            data={{
                            labels: project.projectProgress.map(p => p.day),
                            datasets: [
                            {
                              label: 'Progress',
                              data: project.projectProgress.map(p => p.progress),
                              backgroundColor: '#3b82f6',
                              borderRadius: 6,
                              barThickness: 20
                            }
                            ]
                            }}
                            options={{
                              responsive: false,
                              maintainAspectRatio: true,
                              plugins: {
                                legend: {
                                  display: false
                                  },
                                  tooltip: {
                                    enabled: true,
                                    mode: 'index',
                                    intersect: false
                                    }
                                  },
                                                              
                            }}
                          />
                        </div>
                      )
                    })
                }
                </div>
              )
              }
          </div>
        )
      }
      
    </>
  );
}





