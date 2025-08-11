import { cn } from '@/shadcn/lib/utils'
import { Button } from '@/shadcn/components/ui/button'
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { UserRole } from '@/shared/_constants/enums'
import { useAuthContext } from '@/shared/hoc/useAuthContext'
import { useStorage } from '@/shared/hoc/useStorageContext'
import type { UserProfile } from '@/shared/types/user.types'
import { useNavigate } from '@tanstack/react-router'

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'form'>) {
    const { setUser } = useAuthContext()
    const storage = useStorage()
    const navigate = useNavigate()

    const handleLogin = () => {
        const user: UserProfile = {
            id: '1',
            name: 'Nitesh',
            email: 'nitesh@email.com',
            role: UserRole.ADMIN,
            password: 'string',
        }
        setUser(user)
        storage.setItem('user-profile', user)
        navigate({ to: '/common/dashboard' })
    }

    return (
        <form className={cn('flex flex-col gap-6', className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" onClick={handleLogin}>
                    Login
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    )
}
