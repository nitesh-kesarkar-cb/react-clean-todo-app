import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../../../shared/hoc/useAuthContext'
import { useUserViewModel } from '../../hooks/useUserViewModal'
import type { UserDetails } from '../../di/UserInterface'
import { Button } from '@/shadcn/components/ui/button'
import { RoleBasedAccessComponent } from '@/shared/hoc/useAuthComponent'
import { UserRole } from '@/shared/_constants/enums'

const UserProfilePage = () => {
    const { user } = useAuthContext()
    const [allUsers, setAllUsers] = useState<UserDetails[]>([])

    const { getUsers } = useUserViewModel()

    // Fetch user details if needed
    useEffect(() => {
        if (user) {
            fetchAllUsers()
        }
    }, [user])

    const fetchAllUsers = async () => {
        try {
            const data = await getUsers()
            setAllUsers(data.users || [])
        } catch (error) {
            console.error('Failed to fetch users:', error)
        }
    }

    const handleEdit = () => {
        alert('Edit functionality only available for loggedin users.')
    }

    const handleDelete = async () => {
        alert('Profile deleted for the admin only')
    }

    const handleExport = () => {
        alert('Profile exported for the organization only')
    }
    const handleShare = () => {
        alert('Profile shared for the organization and admin!')
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
                        <div className="flex flex-col gap-2 mt-2">
                            <span className="font-semibold">Email:</span>
                            <span>{user.email}</span>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <span className="font-semibold">Role:</span>
                            <span>{user.role}</span>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-6 justify-center">
                        <Button onClick={handleEdit}>Edit Profile</Button>
                    </div>
                </div>
            )}

            {user && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">All Users</h3>
                    {allUsers.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {allUsers.map((userDetail: UserDetails) => (
                                <li
                                    key={userDetail.id}
                                    className="p-4 border rounded-lg bg-white"
                                >
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold">
                                            Name:
                                        </span>
                                        <span>{userDetail.firstName}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-2">
                                        <span className="font-semibold">
                                            Email:
                                        </span>
                                        <span>{userDetail.email}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-2">
                                        <span className="font-semibold">
                                            Role:
                                        </span>
                                        <span>{userDetail.role}</span>
                                    </div>
                                    <div className="flex gap-4 mt-4 justify-end">
                                        <RoleBasedAccessComponent
                                            userRole={user.role}
                                            allowRoles={[UserRole.ADMIN]}
                                            onError={(error) =>
                                                console.error(error)
                                            }
                                        >
                                            <Button
                                                onClick={handleDelete}
                                                variant="destructive"
                                            >
                                                Delete
                                            </Button>
                                        </RoleBasedAccessComponent>
                                        <RoleBasedAccessComponent
                                            userRole={user.role}
                                            allowRoles={[
                                                UserRole.ADMIN,
                                                UserRole.ORG,
                                            ]}
                                            onError={(error) =>
                                                console.error(error)
                                            }
                                        >
                                            <Button onClick={handleShare}>
                                                Share
                                            </Button>
                                        </RoleBasedAccessComponent>
                                        <RoleBasedAccessComponent
                                            userRole={user.role}
                                            allowRoles={[UserRole.ORG]}
                                            onError={(error) =>
                                                console.error(error)
                                            }
                                        >
                                            <Button
                                                onClick={handleExport}
                                                variant="outline"
                                            >
                                                Export
                                            </Button>
                                        </RoleBasedAccessComponent>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default UserProfilePage
