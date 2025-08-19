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
import { Textarea } from '@/shadcn/components/ui/textarea'
import { Label } from '@/shadcn/components/ui/label'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/shadcn/components/ui/select'
import { UserGender as Gender } from '@/(common)/features/user/di/UserProfileDetails'

const addressSchema = z.object({
    addr_line: z.object({
        addr1: z.string().min(1, 'Address Line 1 is required'),
        addr2: z.string().optional(),
    }),
    locality: z.string().min(1, 'Locality is required'),
    country: z.string().min(1, 'Country is required'),
})

const universitySchema = z.object({
    name: z.string().min(1, 'University name is required'),
    address: addressSchema,
    establishedYear: z.number().min(1800, 'Year must be valid'),
})

const profileSchema = z.object({
    age: z.number().min(0, 'Age is required'),
    gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
    phone: z.string().min(10, 'Phone is required'),
    birthDate: z.date(),
    image: z.string().url(),
    bloodGroup: z.string().min(1, 'Blood group is required'),
    height: z.number().min(1, 'Height required'),
    weight: z.number().min(1, 'Weight required'),
    eyeColor: z.string().min(1, 'Eye color required'),
    university: universitySchema,
    about: z.string().min(10, 'About must be at least 10 characters'),
    address: addressSchema,
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfileForm() {
    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            age: 25,
            gender: Gender.Male,
            phone: '',
            birthDate: new Date(),
            bloodGroup: '',
            height: 170,
            weight: 70,
            eyeColor: '',
            university: {
                name: '',
                address: {
                    addr_line: { addr1: '', addr2: '' },
                    locality: '',
                    country: '',
                },
                establishedYear: 2000,
            },
            about: '',
            address: {
                addr_line: { addr1: '', addr2: '' },
                locality: '',
                country: '',
            },
        },
    })

    const handleProfile = (data: ProfileFormValues) => {
        console.log('✅ Profile data', data)
    }

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Form</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={profileForm.handleSubmit(handleProfile)}
                        className="space-y-4"
                    >
                        {/* Personal Info */}
                        <div>
                            <Label>Age</Label>
                            <Input
                                type="number"
                                {...profileForm.register('age', {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>

                        <div>
                            <Label>Gender</Label>
                            <Select
                                defaultValue={profileForm.getValues('gender')}
                                onValueChange={(v: string) =>
                                    profileForm.setValue('gender', v as Gender)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                        Female
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Phone</Label>
                            <Input
                                type="tel"
                                {...profileForm.register('phone')}
                            />
                        </div>

                        <div>
                            <Label>Date of Birth</Label>
                            <Input
                                type="date"
                                {...profileForm.register('birthDate')}
                            />
                        </div>

                        <div>
                            <Label>Image URL</Label>
                            <Input
                                type="url"
                                {...profileForm.register('image')}
                            />
                        </div>

                        <div>
                            <Label>Blood Group</Label>
                            <Input
                                type="text"
                                {...profileForm.register('bloodGroup')}
                            />
                        </div>

                        <div>
                            <Label>Height (cm)</Label>
                            <Input
                                type="number"
                                {...profileForm.register('height', {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>

                        <div>
                            <Label>Weight (kg)</Label>
                            <Input
                                type="number"
                                {...profileForm.register('weight', {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>

                        <div>
                            <Label>Eye Color</Label>
                            <Input
                                type="text"
                                {...profileForm.register('eyeColor')}
                            />
                        </div>

                        {/* University */}
                        <div className="pt-4">
                            <h3 className="font-semibold">University</h3>
                        </div>

                        <div>
                            <Label>University Name</Label>
                            <Input
                                {...profileForm.register('university.name')}
                            />
                        </div>

                        <div>
                            <Label>Established Year</Label>
                            <Input
                                type="number"
                                {...profileForm.register(
                                    'university.establishedYear',
                                    {
                                        valueAsNumber: true,
                                    }
                                )}
                            />
                        </div>

                        <div>
                            <Label>University Address Line 1</Label>
                            <Input
                                {...profileForm.register(
                                    'university.address.addr_line.addr1'
                                )}
                            />
                        </div>

                        <div>
                            <Label>University Address Line 2</Label>
                            <Input
                                {...profileForm.register(
                                    'university.address.addr_line.addr2'
                                )}
                            />
                        </div>

                        <div>
                            <Label>University Locality</Label>
                            <Input
                                {...profileForm.register(
                                    'university.address.locality'
                                )}
                            />
                        </div>

                        <div>
                            <Label>University Country</Label>
                            <Input
                                {...profileForm.register(
                                    'university.address.country'
                                )}
                            />
                        </div>

                        {/* Personal Address */}
                        <div className="pt-4">
                            <h3 className="font-semibold">Home Address</h3>
                        </div>

                        <div>
                            <Label>Address Line 1</Label>
                            <Input
                                {...profileForm.register(
                                    'address.addr_line.addr1'
                                )}
                            />
                        </div>

                        <div>
                            <Label>Address Line 2</Label>
                            <Input
                                {...profileForm.register(
                                    'address.addr_line.addr2'
                                )}
                            />
                        </div>

                        <div>
                            <Label>Locality</Label>
                            <Input
                                {...profileForm.register('address.locality')}
                            />
                        </div>

                        <div>
                            <Label>Country</Label>
                            <Input
                                {...profileForm.register('address.country')}
                            />
                        </div>

                        <div>
                            <Label>About</Label>
                            <Textarea
                                rows={3}
                                {...profileForm.register('about')}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Save Profile
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
