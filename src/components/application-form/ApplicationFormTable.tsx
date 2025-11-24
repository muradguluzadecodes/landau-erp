import ApplicationFormTableData from './ApplicationFormTableData'

function ApplicationFormTable() {
  return (
    <div className='grid grid-cols-3 gap-4'>
        <ApplicationFormTableData />
        <ApplicationFormTableData />
        <ApplicationFormTableData />
    </div>
  )
}

export default ApplicationFormTable