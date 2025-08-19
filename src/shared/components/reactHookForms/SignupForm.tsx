import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/shadcn/components/ui/card'
import { Input } from '@/shadcn/components/ui/input'
import { Button } from '@/shadcn/components/ui/button'
import { Label } from '@/shadcn/components/ui/label'
import { useEffect, useState } from 'react'
import { UserRole } from '@/shared/_constants/enums'

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.ORG, UserRole.GUEST]),
    email: z.email(),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(
            /[^A-Za-z0-9]/,
            'Password must contain at least one special character'
        ),
})

type SignupFormProps = {
    formData: z.infer<typeof signupSchema>
    handleSubmit: (data: SignupFormValues) => void
    setFormData: (data: SignupFormValues) => void
}

export type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupForm({
    formData,
    handleSubmit,
    setFormData,
}: SignupFormProps) {
    const [step, setStep] = useState<1 | 2>(1)
    const signupForm = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: formData,
    })
    useEffect(() => {
        const subscription = signupForm.watch((values) => {
            setFormData(values as SignupFormValues)
        })
        return () => subscription.unsubscribe()
    }, [signupForm, setFormData])

    const handleSignup = (data: SignupFormValues) => {
        handleSubmit(data)
    }

    const validateStep1 = async () => {
        const result = await signupForm.trigger(['name', 'role'])
        if (result) setStep(2)
    }

    const handleBack = () => setStep(1)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Signup Form with React Hooks and Zod validation
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Stepper */}
                <div className="flex items-center mb-6">
                    <div
                        className={`flex-1 text-center ${step === 1 ? 'font-bold text-primary' : 'text-gray-400'}`}
                    >
                        1. Name & Role
                    </div>
                    <div className="w-8 h-0.5 bg-gray-300 mx-2" />
                    <div
                        className={`flex-1 text-center ${step === 2 ? 'font-bold text-primary' : 'text-gray-400'}`}
                    >
                        2. Email & Password
                    </div>
                </div>

                {step === 1 && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            validateStep1()
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                {...signupForm.register('name')}
                            />
                            {signupForm.formState.errors.name && (
                                <p className="text-sm text-red-500">
                                    {signupForm.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Role</Label>
                            <select
                                {...signupForm.register('role')}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                            >
                                <option value="">Select a role</option>
                                {Object.values(UserRole).map((role) => (
                                    <option key={role} value={role}>
                                        {role.charAt(0).toUpperCase() +
                                            role.slice(1).toLowerCase()}
                                    </option>
                                ))}
                            </select>
                            {signupForm.formState.errors.role && (
                                <p className="text-sm text-red-500">
                                    {signupForm.formState.errors.role.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            Next
                        </Button>
                    </form>
                )}

                {step === 2 && (
                    <form
                        onSubmit={signupForm.handleSubmit(handleSignup)}
                        className="space-y-4"
                    >
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="text"
                                {...signupForm.register('email')}
                            />
                            {signupForm.formState.errors.email && (
                                <p className="text-sm text-red-500">
                                    {signupForm.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                {...signupForm.register('password')}
                            />
                            {signupForm.formState.errors.password && (
                                <p className="text-sm text-red-500">
                                    {
                                        signupForm.formState.errors.password
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                className="w-full"
                                variant={'outline'}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}
