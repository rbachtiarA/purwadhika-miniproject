import { event } from 'cypress/types/jquery';
import TicketFormik from './ticketFormik';

export default function TicketForm({ handleFormClose, eventId }: { handleFormClose: any, eventId:number }) {
  return (
    <div className='absolute z-0 top-0 left-0 w-full h-full bg-slate-600/50'>
      <div className='absolute z-1 w-full h-full' onClick={handleFormClose}></div>
      <div className='flex justify-center items-center w-full h-full'>  
        <div className='relative w-full md:w-1/2 p-4 rounded-md bg-white [&_label]:font-semibold'>
          <h1 className='text-3xl font-bold text-center'>Create Ticket</h1>
          <TicketFormik eventId={eventId} handleClose={handleFormClose}/>
          <button onClick={handleFormClose} className='absolute top-2 right-2'>X</button>
        </div>

      </div>
    </div>
  )
}
