import { getWorkExperiences } from 'utils/mdx'
import type { BaseMetadata } from 'utils/mdx'
import { CustomMDX } from 'app/components/mdx'
import React from 'react'

interface WorkExperience extends BaseMetadata {
    company: string
    role: string
    location: string
    startDate: string
    endDate: string
    type: string
    technologies: string[]
}

const WorkPage = () => {
  const workExperiences = getWorkExperiences<WorkExperience>()
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid gap-6">
        {workExperiences.map((experience, index) => (
          <div className="flex flex-row gap-4 h-full" key={experience.metadata.company}>
            <div className="text-left py-6 text-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {experience.metadata.startDate} - {experience.metadata.endDate}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {experience.metadata.location}
                  </p>
            </div>
            <div 
            key={experience.metadata.company}
            className="rounded-lg shadow-lg px-6  translate-y-4 animate-fadeInUp"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-mono font-semibold text-primary">
                    {experience.metadata.company}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                    {experience.metadata.role}
                  </p>
                </div>
                
              </div>
              
             <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {experience.metadata.summary}
             </p>
            </div>
                    {/* <CustomMDX source={experience.content} /> */}

          </div>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default WorkPage