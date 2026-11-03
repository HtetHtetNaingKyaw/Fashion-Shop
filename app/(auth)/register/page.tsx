import { redirect } from "next/navigation";

import { SignupForm } from "@/components/auth/signup-form"
import { getSession } from "@/lib/session"
import { Suspense } from "react";

const RegisterPageContent = async () => {
  const session =  await getSession();
    if(session) {
        redirect("/")
    }

    return (
        <>
        <SignupForm/>
        </>
    )
}

const  Register = () => {
    return (
        <Suspense fallback={<SignupForm/>}>
            <RegisterPageContent/>
        </Suspense>
    )
}

export default Register