import React from 'react'

const CompanionSession = () => {
  return (
    <div>CompanionSession</div>
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