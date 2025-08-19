// import { useAuthContext } from '../../../../../shared/hoc/useAuthContext'
// import { Button } from '@/shadcn/components/ui/button'
// import { useStorage } from '@/shared/hoc/useStorageContext'
// import { useUserProfileDetailsQuery } from '../../infrastructure/UserServiceMock'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs'
// import { ReactHookFormProfileForm } from '@/shared/components/reactHookForms'
// const UserProfileDetailsPage = () => {
//     const { data: profileDetailsData, isLoading, refetch: refetchUserProfileDetails } = useUserProfileDetailsQuery()

//     const storage = useStorage()
//     const { user } = useAuthContext()

//     const handleEdit = () => {
//         alert('Edit functionality only available for loggedin users.')
//     }

//     return (
//         <div className="mt-10 bg-white shadow-lg rounded-lg p-8">
//             <h2 className="text-2xl font-bold mb-6 text-center">
//                 User Profile
//             </h2>
//             {user && (
//                 <div>
//                     <div className="mb-4">
//                         <div className="flex flex-col gap-2">
//                             <span className="font-semibold">Name:</span>
//                             <span>{user.name}</span>
//                         </div>
//                     </div>
//                     <div className="flex gap-4 mt-6 justify-center">
//                         <Button onClick={handleEdit}>Edit Profile</Button>
//                     </div>
//                 </div>
//             )}

//             {user && (
//                 <div className="mt-8">
//                     <h3 className="text-xl font-semibold mb-4">User Profile Details</h3>

//                     <Tabs defaultValue={"reactHooksForm"} className="w-full">
//                         <TabsList>
//                             <TabsTrigger value="reactHooksForm">
//                                 React Hook Form
//                             </TabsTrigger>
//                             <TabsTrigger value="formik">
//                                 Formik Forms
//                             </TabsTrigger>
//                         </TabsList>
//                         <TabsContent value="reactHooksForm">
//                             {isLoading ? (
//                                 <p>Loading...</p>
//                             ) : (
//                                 <ReactHookFormProfileForm
//                                     // formData={formData}
//                                     // handleSubmit={handleSubmit}
//                                     // setFormData={setFormData}
//                                 />
//                             )}
//                         </TabsContent>
//                         <TabsContent value="formik">
//                             {/* {loading ? (
//                                 <p>Loading...</p>
//                             ) : (
//                                 <FormikSignupForm
//                                     formData={formData}
//                                     handleSubmit={handleSubmit}
//                                     setFormData={setFormData}
//                                 />
//                             )} */}
//                         </TabsContent>
//                     </Tabs>

//                 </div>
//             )}
//         </div>
//     )
// }

// export default UserProfileDetailsPage
