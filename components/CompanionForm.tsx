// "use client";
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "../../components/ui/field"
// import { Input } from "../../components/ui/input"
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroupTextarea,
// } from "../../../components/ui/input-group"
// import { Controller } from "react-hook-form"

// const formSchema = z.object({
//     name: z.string().min(1, { message: "Companion is required" }),
// subject: z.string().min(1, { message: "Subject is required" }),
// topic: z.string().min(1, { message: "Topic is required" }),
// voice: z.string().min(1, { message: "Voice is required" }),
// style: z.string().min(1, { message: "Style is required" }),
// duration: z.coerce.number().min(1, { message: "Duration is required" }),
// })




//     const CompanionForm = () => {

//         const form = useForm<z.infer<typeof formSchema>>({
//             resolver: zodResolver(formSchema),
//             defaultValues: {
//                 name:'',
//                 subject:'',
//                 topic:'',
//                 voice:'',
//                 style:'',
//                 duration:15,
//             },
//         })

//         const onSubmit=(data: z.infer<typeof formSchema>) =>{
//         // Do something with the form values.
//             console.log(data)
//         }
//         return (
//              <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>Bug Report</CardTitle>
//         <CardDescription>
//           Help us improve by reporting bugs you encounter.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
//           <FieldGroup>
//             <Controller
//               name="title"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-title">
//                     Bug Title
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="form-rhf-demo-title"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="Login button not working on mobile"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//             <Controller
//               name="description"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-description">
//                     Description
//                   </FieldLabel>
//                   <InputGroup>
//                     <InputGroupTextarea
//                       {...field}
//                       id="form-rhf-demo-description"
//                       placeholder="I'm having an issue with the login button on mobile."
//                       rows={6}
//                       className="min-h-24 resize-none"
//                       aria-invalid={fieldState.invalid}
//                     />
//                     <InputGroupAddon align="block-end">
//                       <InputGroupText className="tabular-nums">
//                         {field.value.length}/100 characters
//                       </InputGroupText>
//                     </InputGroupAddon>
//                   </InputGroup>
//                   <FieldDescription>
//                     Include steps to reproduce, expected behavior, and what
//                     actually happened.
//                   </FieldDescription>
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </FieldGroup>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <Field orientation="horizontal">
//           <Button type="button" variant="outline" onClick={() => form.reset()}>
//             Reset
//           </Button>
//           <Button type="submit" form="form-rhf-demo">
//             Submit
//           </Button>
//         </Field>
//       </CardFooter>
//     </Card>
//         )
//     }

// export default CompanionForm
// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm, Controller } from "react-hook-form"
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroupTextarea,
// } from "@/components/ui/input-group"

// const formSchema = z.object({
//   name: z.string().min(1, { message: "Companion is required" }),
//   subject: z.string().min(1, { message: "Subject is required" }),
//   topic: z.string().min(1, { message: "Topic is required" }),
//   voice: z.string().min(1, { message: "Voice is required" }),
//   style: z.string().min(1, { message: "Style is required" }),
//   duration: z.coerce.number().min(1, { message: "Duration is required" }),
// })

// export default function CompanionForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       subject: "",
//       topic: "",
//       voice: "",
//       style: "",
//       duration: 15,
//     },
//   })

//   const onSubmit = (data: z.infer<typeof formSchema>) => {
//     console.log(data)
//   }

//   return (
//     <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>Companion Form</CardTitle>
//         <CardDescription>Create a new AI companion</CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <Input {...form.register("name")} placeholder="Name" />
//           <Input {...form.register("subject")} placeholder="Subject" />
//           <Input {...form.register("topic")} placeholder="Topic" />
//           <Input {...form.register("voice")} placeholder="Voice" />
//           <Input {...form.register("style")} placeholder="Style" />
//           <Input type="number" {...form.register("duration")} placeholder="Duration" />

//           <Button type="submit">Submit</Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }
"use client"


import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {subjects} from "@/constants";
import {Textarea} from "@/components/ui/textarea";
import {createCompanion} from "@/lib/actions/companion.actions";
import {redirect} from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is required.'}),
    subject: z.string().min(1, { message: 'Subject is required.'}),
    topic: z.string().min(1, { message: 'Topic is required.'}),
    voice: z.string().min(1, { message: 'Voice is required.'}),
    style: z.string().min(1, { message: 'Style is required.'}),
    duration: z.coerce.number().min(1, { message: 'Duration is required.'}),
})

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values);

        if(companion) {
            redirect(`/companions/${companion.id}`);
        } else {
            console.log('Failed to create a companion');
            redirect('/');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the companion name"
                                    {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                value={subject}
                                                key={subject}
                                                className="capitalize"
                                            >
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex. Derivates & Integrals"
                                    {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue
                                            placeholder="Select the voice"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue
                                            placeholder="Select the style"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal">
                                            Formal
                                        </SelectItem>
                                        <SelectItem value="casual">
                                            Casual
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated session duration in minutes</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="15"
                                    {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
            </form>
        </Form>
    )
}

export default CompanionForm