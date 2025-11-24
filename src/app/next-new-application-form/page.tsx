import FormHeaderContent from '@/components/next-application-form/FormHeaderContent'
import NoInfo from '@/components/next-application-form/NoInfo'
import React from 'react'

export default function page() {
  return (
    <div className="relative border border-border bg-section-bg w-full rounded-[20px] p-10 flex flex-col gap-8">
        <FormHeaderContent />
        <NoInfo />
        <div className="flex justify-end">
          <button className="bg-[#0044FF] text-white text-[16px] font-regular py-4 rounded-[100px] w-[30%]">
            Yarat
          </button>
        </div>
      </div>
  )
}
