import React, { useState } from 'react'
import { useUser } from '../context/UserContext';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; 

const TeamInfo = ({sampleData,setViewAll,viewAll,setSelectedProject,selectedProject}) => {
    
    const { user, setUser, darkMode, setDarkMode } = useUser();
    
    const [showModal, setShowModal] = useState(false);
    
  return (
    <div className="max-md:mr-2.5 max-md:max-w-full h-full">
        <div className="flex gap-5 max-md:flex-col h-full min-w-full">
          <div className="flex flex-col w-full max-md:ml-0 lg:mr-10">
            <div className={`flex flex-col px-2 pt-2 pb-6 w-full lg:w-[900px] ${user?.layout ==='grid'? 'md:ml-6':''} min-h-[300px] rounded-[30px] ${darkMode ? 'bg-white shadow-[0px_5px_16px_rgba(0,0,0,0.20)]':'bg-gray-800 shadow-[0px_2px_4px_rgba(0,0,0,0.9)] text-white'} max-md:mt-10 transition-all duration-300 ease-in-out`}>
              <div className="flex gap-4 w-full items-center justify-between pr-2.5 pl-2 leading-snug min-h-[72px]">
                <div className='flex'>
                    <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e429e27ea2e1a81577df35763892e71deee3a5af5d7fc4b3f6c55a753334854b?placeholderIfAbsent=true&apiKey=9ceb13d5794c4d029560c576098b7d34"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto aspect-square rounded-[221px] w-[55px]"
                    />
                    <div className="self-stretch my-auto text-2xl font-semibold w-full]">
                    Team info
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div className='pr-10 text-gray-500'>
                        <button className="flex gap-2.5 text-wrap text-start my-auto text-sm font-small text-teal-300"
                                onClick={() => setShowModal(true)}>
                                    Edit
                        </button>
                    </div>
                    <div className='pr-10 text-gray-500'>
                        <button className="flex gap-2.5 text-start my-auto text-sm text-teal-300"
                                onClick={() => setViewAll(!viewAll)}>
                                    {viewAll? 'Close':'View'} All
                        </button>
                    </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 justify-start min-w-[363px] max-w-screen text-sm font-medium leading-tight">
                <div className="flex gap-10 justify-between items-center w-full whitespace-nowrap min-h-[26px] max-md:px-5">
                  <div className="flex gap-2 justify-center items-center self-stretch my-auto">
                    <div className="self-stretch my-auto md:pl-6">
                      Team Members: 12
                    </div>
                  </div>
                </div>
                <div className="mt-2 w-full min-h-[4px]" />
                <div className="flex flex-col h-full w-full">
                    {
                    sampleData
                        .filter(project => project.projectId === parseInt(selectedProject))
                        .map(project => (
                        <div key={project.projectId} className="flex flex-col flex-1 w-full pr-4 mb-4">
                            <h1 className="flex font-bold font-sans text-1xl mb-4 ml-6">
                            Project ID: {project.projectId}
                            </h1>
                        <div className="w-full lg:w-[900px] h-[100px] px-4">
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
                                    responsive: true, // ✅ disables automatic sizing
                                    maintainAspectRatio: false,
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
                                width={'500px'}
                            />
                </div>
            </div>
            ))
        }

                </div>
              </div>
            </div>
          </div>
          
        </div>
        {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 team-modal">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-white text-black' : 'bg-gray-800 text-white'} w-80`}>
            <h2 className="text-lg font-semibold mb-4">Select Project</h2>
            <select
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(parseInt(e.target.value));
                setShowModal(false);
              }}
              className={`w-full p-2 rounded-lg border outline-none ${darkMode ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} transition`}
            >
              {sampleData.map(project => (
                <option key={project.projectId} value={project.projectId}>
                  Project {project.projectId}
                </option>
              ))}
            </select>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      </div>
  )
}

export default TeamInfo
