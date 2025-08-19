import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import Joi from 'joi'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/shadcn/components/ui/card'
import { Input } from '@/shadcn/components/ui/input'
import { Button } from '@/shadcn/components/ui/button'
import { Label } from '@/shadcn/components/ui/label'
import { UserRole } from '@/shared/_constants/enums'

export const signupSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
    }),
    role: Joi.string()
        .valid(...Object.values(UserRole))
        .required()
        .messages({
            'any.only': 'Invalid role',
            'string.empty': 'Role is required',
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Invalid email',
            'string.empty': 'Email is required',
        }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
    }),
})

export type SignupFormValues = {
    name: string
    role: UserRole
    email: string
    password: string
}

type SignupFormProps = {
    formData: SignupFormValues
    handleSubmit: (data: SignupFormValues) => void
    setFormData: (data: SignupFormValues) => void
}

export default function SignupForm({
    formData,
    handleSubmit,
    setFormData,
}: SignupFormProps) {
    const [step, setStep] = useState<1 | 2>(1)

    const formik = useFormik<SignupFormValues>({
        initialValues: formData,
        validate: (values) => {
            const errors: Partial<Record<keyof SignupFormValues, string>> = {}
            let schema
            if (step === 1) {
                schema = signupSchema.fork(['email', 'password'], (field) =>
                    field.optional()
                )
            } else {
                schema = signupSchema
            }

            const { error } = schema.validate(values, { abortEarly: false })
            if (error) {
                error.details.forEach((d) => {
                    errors[d.path[0] as keyof SignupFormValues] = d.message
                })
            }
            return errors
        },
        onSubmit: (values) => {
            handleSubmit(values)
        },
    })

    useEffect(() => {
        setFormData(formik.values)
    }, [formik.values, setFormData])

    const validateStep1 = async () => {
        const errors = await formik.validateForm()
        if (!errors.name && !errors.role) setStep(2)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Signup Form with Formik forms + Joi Validation
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Stepper */}
                <div className="flex items-center mb-6">
                    <div
                        className={`flex-1 text-center ${
                            step === 1
                                ? 'font-bold text-primary'
                                : 'text-gray-400'
                        }`}
                    >
                        1. Name & Role
                    </div>
                    <div className="w-8 h-0.5 bg-gray-300 mx-2" />
                    <div
                        className={`flex-1 text-center ${
                            step === 2
                                ? 'font-bold text-primary'
                                : 'text-gray-400'
                        }`}
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
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.name && (
                                <p className="text-sm text-red-500">
                                    {formik.errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Role</Label>
                            <select
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full border rounded px-2 py-1"
                            >
                                <option value="">Select role</option>
                                {Object.values(UserRole).map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.role && (
                                <p className="text-sm text-red-500">
                                    {formik.errors.role}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            Next
                        </Button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && (
                                <p className="text-sm text-red-500">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.password && (
                                <p className="text-sm text-red-500">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                className="w-full"
                                variant={'outline'}
                                onClick={() => setStep(1)}
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
