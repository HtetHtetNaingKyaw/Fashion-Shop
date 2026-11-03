import { getSession } from "@/lib/session"
import UserNavClient from "./user-nav-client"

const UserNav = async () => {

    const session = await getSession()

    return (
        <UserNavClient session={session} />
    )
}

export default UserNav
