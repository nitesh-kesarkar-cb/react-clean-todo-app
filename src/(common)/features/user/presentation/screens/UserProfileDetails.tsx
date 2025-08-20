import { useAuthContext } from '../../../../../shared/hoc/useAuthContext'
import { useStorage } from '@/shared/hoc/useStorageContext'
import { useUserProfileDetailsQuery } from '../../infrastructure/UserServiceMock'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/shadcn/components/ui/tabs'
import { ReactHookFormProfileForm } from '@/shared/components/reactHookForms'
import { useEffect, useState } from 'react'
import type { UserProfileDetails } from '../../di/UserProfileDetails'
import { FormikProfileForm } from '@/shared/components/formikForms'
const UserProfileDetailsPage = () => {
    const {
        data: profileDetailsData,
        isLoading,
        refetch: refetchUserProfileDetails,
    } = useUserProfileDetailsQuery()
    const [formData, setFormData] = useState<UserProfileDetails | undefined>()

    useEffect(() => {
        if (profileDetailsData) {
            setFormData(profileDetailsData)
        }
    }, [profileDetailsData])

    const storage = useStorage()
    const { user } = useAuthContext()

    const handleSubmit = async (data: UserProfileDetails) => {
        try {
            console.log('Updating profile...')
            storage.setItem('userProfileDetails', data)
            await refetchUserProfileDetails()
            alert('Profile updated successfully!')
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Failed to update profile. Please try again.')
        }
    }

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
                User Profile
            </h2>
            {user && (
                <div>
                    <div className="mb-4">
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold">Name:</span>
                            <span>{user.name}</span>
                        </div>
                    </div>
                </div>
            )}

            {user && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">
                        User Profile Details
                    </h3>

                    <Tabs defaultValue={'reactHooksForm'} className="w-full">
                        <TabsList>
                            <TabsTrigger value="reactHooksForm">
                                React Hook Form
                            </TabsTrigger>
                            <TabsTrigger value="formik">
                                Formik Forms
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="reactHooksForm">
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <ReactHookFormProfileForm
                                    formData={formData as UserProfileDetails}
                                    onSubmit={handleSubmit}
                                    setFormData={setFormData}
                                />
                            )}
                        </TabsContent>
                        <TabsContent value="formik">
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <FormikProfileForm
                                    formData={formData as UserProfileDetails}
                                    onSubmit={handleSubmit}
                                    setFormData={setFormData}
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </div>
    )
}

export default UserProfileDetailsPage
