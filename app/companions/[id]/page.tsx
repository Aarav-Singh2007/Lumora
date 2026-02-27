import CompanionComponent from '@/components/CompanionComponent';
import { getCompanion } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import React from 'react'
interface CompanionSessionPageProps{
  params: Promise<{id:string}>;
}

//params  /url/{id}-> id
//searchparams  /url?key=value1&key1=value2

const CompanionSession =async ({params }: CompanionSessionPageProps) => {

  const {id} = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  // const {name,subject,title,topic,suration} = companion;

  if(!user) redirect(('/sign-in'));
  if(!companion) redirect (('/companions'));

  return (
    <main>
      <article className='flex rounded-border justify-between p-6 max-md:flex-col'>
        <div className='flex items-center gap-2'>
          <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden' style={{backgroundColor:getSubjectColor(companion.subject)}}>
            <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={35} height={35} />


          </div>
          <div className='fleex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <p className='font-bold text-2xl'>
                {companion.name}
                
              </p>
              <div className='subject-badge max-sm:hidden'>
                {companion.subject}
                
              </div>

            </div>
            <p className='text-lg'>{companion.topic}</p>

          </div>

        </div >
        <div className='items-start text-2xl max-md:hidden'>
           {companion.duration} minutes

        </div>
        

      </article>
      <CompanionComponent
      {...companion}
      companionId={id}
      userName={user.firstName!}
      userImage={user.imageUrl!}
      
      
      
      />
    </main>
  )
}

export default CompanionSession

// import CompanionCard from "@/components/CompanionCard";
// import { getAllCompanions } from "@/lib/actions/companion.actions";
// import { getSubjectColor } from "@/lib/utils";

// interface Props {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }

// const CompanionsLibrary = async ({ searchParams }: Props) => {
//   const filters = await searchParams;
//   const subject = typeof filters.subject === 'string' ? filters.subject : '';
//   const topic = typeof filters.topic === 'string' ? filters.topic : '';

//   const companions = await getAllCompanions({ subject, topic });

//   return (
//     <main>
//       <section className="flex justify-between gap-4 max-sm:flex-col">
//         <h1>Companion Library</h1>
//         <div className="flex gap-4">
//           Filters
//         </div>
//       </section>
      
//       <section className="companions-grid">
//         {companions.map((companion) => (
//           <CompanionCard key={companion.id} {...companion}
//           color={getSubjectColor(companion.subject)} />
//         ))}
//       </section>
//     </main>
//   );
// }

// export default CompanionsLibrary;