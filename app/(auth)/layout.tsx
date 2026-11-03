import AuthShell from "@/components/auth/auth-shell"

const AuthLayout = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
    return (
        <div>
            <AuthShell >
                {children}
            </AuthShell>
        </div>
    )
}

export default AuthLayout