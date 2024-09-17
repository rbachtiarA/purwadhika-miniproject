import BreadCrumbs from '@/components/breadcrumbs';
import EventDetails from '@/components/event/eventDetails';
import { verifyRole } from '@/lib/backend';
import { getEventSlug } from '@/lib/event'
import { getToken } from '@/lib/server';
import Image from 'next/image';

export default async function page({ params }: { params: { slug: string } }) {
  const { name, event, ticket } = await getEventSlug(params.slug);
  console.log(event);
  
  const token = await getToken()
  let isAdmin = false
  if(token && event.user) {
    const verifiedUser = await verifyRole(token)
    if(verifiedUser.status !== 'error') {
      isAdmin = (event.user.id === verifiedUser.userId) 
    }
  }

  if(event === null) {
    return (
      <section>
        <div>
          <h1>ID NOT FOUND</h1>
        </div>
      </section>
    )
  }

  return (
    <section className=''>
      <div className='p-1 md:p-4'>
        <div className='lg:flex gap-4 h-full lg:h-auto '>

          <div className='w-full md:w-[400px]'>
            <div className='breadcrumbs'>
              <BreadCrumbs title={event.name} />
            </div>

            <Image
              src={event.img_poster}
              alt={`poster ${event.name}`}
              width={0}
              height={0}
              sizes='100vw'
              style={{width: '100%', height: 'auto', objectFit: 'cover', objectPosition:''}}
              className='max-h-[400px]  md:max-h-none'
            />
          </div>
          
          <EventDetails event={event} ticket={ticket} isAdmin={isAdmin}/>
        </div>       
      </div>
    </section>
  )
}
