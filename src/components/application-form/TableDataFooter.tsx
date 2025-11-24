'use client'
import { Switch } from 'antd'

function TableDataFooter() {
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
      };
  return (
    <div className='flex items-center justify-between p-4'>
      <h3 className='text-[12px] font-semibold text-[#141414]'>Aktiv</h3>
      <Switch onChange={onChange} />
    </div>
  )
}

export default TableDataFooter