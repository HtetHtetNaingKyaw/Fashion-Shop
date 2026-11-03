'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { UserIcon } from "lucide-react"

type UserNavClientProps = {
    session: any
}

const UserNavClient = ({ session }: UserNavClientProps) => {

    if (!session) {
        return (<Button variant='ghost' size='icon'>
            <Link href='/login'>
                <UserIcon /></Link>
        </Button>)
    }

    return (
        <div>
            User
        </div>
    )
}

export default UserNavClient
