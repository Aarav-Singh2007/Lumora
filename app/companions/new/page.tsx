// import { auth } from "@clerk/nextjs/server"
// import CompanionForm from "../../../components/CompanionForm"
// import { redirect } from "next/dist/server/api-utils";


// function NewCompanion = async () =>{
//   const {userId} = await auth();
//   if(!userId) redirect(url: '/sign-in');


//   return (
//     <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
//       <article className="w-full gap-4 flex flex-col">
//         <h1>Companion Builder</h1>
//         <CompanionForm/>
//       </article>
//     </main>
//   )
// }

// export default NewCompanion
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";  // Fixed import
import CompanionForm from "../../../components/CompanionForm"

const NewCompanion = async () => {  // Changed to const + arrow function
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');  // Fixed redirect syntax
  }

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      <article className="w-full gap-4 flex flex-col">
        <h1>Companion Builder</h1>
        <CompanionForm />
      </article>
    </main>
  )
}

export default NewCompanion
