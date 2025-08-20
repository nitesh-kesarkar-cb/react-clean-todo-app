import { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { Button } from '@/shadcn/components/ui/button'
import { Textarea } from '@/shadcn/components/ui/textarea'
import { Switch } from '@/shadcn/components/ui/switch'
import { Checkbox } from '@/shadcn/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/shadcn/components/ui/radio-group'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/shadcn/components/ui/card'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/shadcn/components/ui/select'
import { Badge } from '@/shadcn/components/ui/badge'
import RawFileInput, { withFileUploader } from '@/shared/hoc/fileUploader'
import {
    UserGender,
    type UserProfileDetails,
} from '@/(common)/features/user/di/UserProfileDetails'

const AddressSchema = z.object({
    addr_line: z.object({
        addr1: z.string().min(1, 'Address line 1 is required'),
        addr2: z.string().optional(),
    }),
    locality: z.string().min(1, 'Locality is required'),
    country: z.string().min(1, 'Country is required'),
    isDefault: z.boolean(),
})

const NotificationPreferencesSchema = z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
})

const ProfileSchema = z.object({
    age: z.number().min(0).max(120),
    gender: z.enum([UserGender.Male, UserGender.Female, UserGender.Other]),
    phone: z.string().min(4),
    birthDate: z.date('Birth date is required'),
    image: z.string(),
    weight: z.number().min(0),
    about: z.string().max(1000),
    address: AddressSchema,
    notificationsEnabled: z.boolean(),
    notificationPreferences: NotificationPreferencesSchema,
    interests: z.array(z.string()).optional(),
    preferredContact: z.enum(['email', 'phone']),
    acceptPrivacy: z.boolean(),
})

export type ProfileFormValues = z.infer<typeof ProfileSchema>

export async function defaultUploadFn(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (formData) {
                const response = {
                    message: 'User profile details fetched successfully',
                    data: { url: 'https://picsum.photos/id/237/200/300' },
                }
                resolve(response.data.url)
            } else {
                reject(new Error('Failed to fetch user'))
            }
        }, 1000)
    })
}

const FileInputWithUploader = withFileUploader(RawFileInput, defaultUploadFn)

export default function ProfileEditForm({
    formData,
    onSubmit,
    setFormData,
}: {
    formData?: ProfileFormValues
    onSubmit: (data: ProfileFormValues) => void
    setFormData: (data: ProfileFormValues) => void
}) {
    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: formData as ProfileFormValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const {
        register,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = profileForm

    const imageValue = watch('image')
    const notificationsEnabled = watch('notificationsEnabled')

    function handleUploadedUrl(url: string) {
        profileForm.setValue('image', url, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }

    const handleProfileSubmit = (data: ProfileFormValues) => {
        try {
            onSubmit(data as UserProfileDetails)
            alert('Profile updated successfully!')
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Failed to update profile. Please try again.')
        }
    }

    useEffect(() => {
        const subscription = profileForm.watch((values) => {
            setFormData(values as UserProfileDetails)
        })
        return () => subscription.unsubscribe()
    }, [profileForm, setFormData])

    const interestOptions = useMemo(
        () => ['sports', 'music', 'travel', 'programming', 'reading'],
        []
    )

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>
                    Edit profile with React Hooks form and Zod
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Age</Label>
                            <Input
                                type="number"
                                {...register('age', { valueAsNumber: true })}
                            />
                            {errors.age && (
                                <p className="text-sm text-destructive">
                                    {errors.age.message as string}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Gender</Label>
                            <select
                                {...register('gender')}
                                className="block w-full rounded-md border px-2 py-2"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <Label>Phone</Label>
                            <Input {...register('phone')} />
                        </div>

                        <div>
                            <Label>Birth date</Label>
                            <Input type="date" {...register('birthDate')} />
                        </div>

                        <div>
                            <Label>Weight (kg)</Label>
                            <Input
                                type="number"
                                {...register('weight', { valueAsNumber: true })}
                            />
                        </div>

                        <div>
                            <Label>Preferred contact</Label>
                            <Controller
                                control={control}
                                name="preferredContact"
                                render={({ field }) => (
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="flex gap-4 mt-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="email"
                                                id="r1"
                                            />
                                            <Label htmlFor="r1">Email</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="phone"
                                                id="r2"
                                            />
                                            <Label htmlFor="r2">Phone</Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Controller
                                control={control}
                                name="acceptPrivacy"
                                render={({ field }) => (
                                    <>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label>
                                            I accept the privacy policy
                                        </Label>
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <div>
                        <Label>About</Label>
                        <Textarea {...register('about')} rows={4} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Address line 1</Label>
                            <Input {...register('address.addr_line.addr1')} />
                        </div>
                        <div>
                            <Label>Address line 2</Label>
                            <Input {...register('address.addr_line.addr2')} />
                        </div>
                        <div>
                            <Label>Locality</Label>
                            <Input {...register('address.locality')} />
                        </div>
                        <div>
                            <Label>Country</Label>
                            <Input {...register('address.country')} />
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            <Label>Default address</Label>
                            <Controller
                                control={control}
                                name="address.isDefault"
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="col-span-2 flex items-center gap-2">
                        <Label>Notifications Enabled</Label>
                        <Controller
                            control={control}
                            name="notificationsEnabled"
                            render={({ field }) => (
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    {notificationsEnabled && (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                                <Label>Email notifications</Label>
                                <Controller
                                    control={control}
                                    name="notificationPreferences.email"
                                    render={({ field }) => (
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                            <div className=" flex items-center gap-2">
                                <Label>SMS notifications</Label>
                                <Controller
                                    control={control}
                                    name="notificationPreferences.sms"
                                    render={({ field }) => (
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label>Push notifications</Label>
                                <Controller
                                    control={control}
                                    name="notificationPreferences.push"
                                    render={({ field }) => (
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <Label>Interests</Label>
                        <Controller
                            control={control}
                            name="interests"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <Select
                                        onValueChange={(val) => {
                                            if (!field.value?.includes(val)) {
                                                field.onChange([
                                                    ...(field.value ?? []),
                                                    val,
                                                ])
                                            }
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select interests" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {interestOptions.map((opt) => (
                                                <SelectItem
                                                    key={opt}
                                                    value={opt}
                                                >
                                                    {opt}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="flex flex-wrap gap-2">
                                        {field.value?.map((val: string) => (
                                            <Badge
                                                key={val}
                                                onClick={() =>
                                                    field.onChange(
                                                        field.value?.filter(
                                                            (v) => v !== val
                                                        )
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                {val} ✕
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <Label>Profile image</Label>
                        <FileInputWithUploader onUploaded={handleUploadedUrl} />
                        {typeof imageValue === 'string' && imageValue && (
                            <div className="mt-2">
                                <img
                                    src={imageValue}
                                    alt="current"
                                    className="w-28 h-28 object-cover rounded-md border"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={isSubmitting}>
                            Save
                        </Button>
                        <Button type="button" variant="ghost">
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
