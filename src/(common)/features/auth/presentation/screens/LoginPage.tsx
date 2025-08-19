import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useLoginViewModel } from '../../hooks/useLoginViewModel'
import { useStorage } from '../../../../../shared/hoc/useStorageContext'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/shadcn/components/ui/tabs'
import { ReactHookFormSignupForm } from '@/shared/components/reactHookForms'
import { FormikSignupForm } from '@/shared/components/formikForms'
import { UserRole } from '@/shared/_constants/enums'

interface SignupFormValues {
    email: string
    role: UserRole
    password: string
    name: string
}
const LoginPage = () => {
    const [formData, setFormData] = useState<SignupFormValues>({
        email: '',
        role: '' as UserRole,
        password: '',
        name: '',
    })
    const [loading, setLoading] = useState(true)
    const { login } = useLoginViewModel()
    const navigate = useNavigate()
    const storage = useStorage()

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setFormData({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: UserRole.ADMIN,
            })
            setLoading(false)
        }, 1000)
    }, [])

    const handleSubmit = async (data: SignupFormValues) => {
        try {
            const user = await login({
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            })
            console.log('Login successful:', user)
            storage.setItem('user-profile', user)
            navigate({ to: '/' })
        } catch (err) {
            console.error('Login failed:', err)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Multi step Login
                </h2>

                <Tabs defaultValue={'reactHooksForm'} className="w-full">
                    <TabsList>
                        <TabsTrigger value="reactHooksForm">
                            React Hook Form
                        </TabsTrigger>
                        <TabsTrigger value="formik">Formik Forms</TabsTrigger>
                    </TabsList>
                    <TabsContent value="reactHooksForm">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ReactHookFormSignupForm
                                formData={formData}
                                handleSubmit={handleSubmit}
                                setFormData={setFormData}
                            />
                        )}
                    </TabsContent>
                    <TabsContent value="formik">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <FormikSignupForm
                                formData={formData}
                                handleSubmit={handleSubmit}
                                setFormData={setFormData}
                            />
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default LoginPage
