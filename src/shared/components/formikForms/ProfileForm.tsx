'use client'

import { useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import Joi from 'joi'
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

const ProfileSchema = Joi.object({
    age: Joi.number().min(0).max(120).required(),
    gender: Joi.string()
        .valid(UserGender.Male, UserGender.Female, UserGender.Other)
        .required(),
    phone: Joi.string().min(4).required(),
    birthDate: Joi.date().required(),
    image: Joi.string().uri().optional(),
    weight: Joi.number().min(0).required(),
    about: Joi.string().max(1000).allow(''),
    address: Joi.object({
        addr_line: Joi.object({
            addr1: Joi.string().required(),
            addr2: Joi.string().allow(''),
        }).required(),
        locality: Joi.string().required(),
        country: Joi.string().required(),
        isDefault: Joi.boolean().required(),
    }),
    notificationsEnabled: Joi.boolean(),
    notificationPreferences: Joi.object({
        email: Joi.boolean(),
        sms: Joi.boolean(),
        push: Joi.boolean(),
    }),
    interests: Joi.array().items(Joi.string()).optional(),
    preferredContact: Joi.string().valid('email', 'phone').required(),
    acceptPrivacy: Joi.boolean().valid(true).required(),
})

export async function defaultUploadFn(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('https://picsum.photos/id/237/200/300')
        }, 1000)
    })
}

const FileInputWithUploader = withFileUploader(RawFileInput, defaultUploadFn)

type ProfileEditFormProps = {
    formData: UserProfileDetails
    onSubmit: (data: UserProfileDetails) => void
    setFormData: (data: UserProfileDetails) => void
}

export default function ProfileEditForm({
    formData,
    onSubmit,
    setFormData,
}: ProfileEditFormProps) {
    const interestOptions = useMemo(
        () => ['sports', 'music', 'travel', 'programming', 'reading'],
        []
    )

    const formik = useFormik<UserProfileDetails>({
        initialValues: {
            age: formData?.age ?? 0,
            gender: formData?.gender ?? UserGender.Other,
            phone: formData?.phone ?? '',
            birthDate: formData?.birthDate ?? '',
            image: formData?.image ?? '',
            weight: formData?.weight ?? 0,
            about: formData?.about ?? '',
            address: {
                addr_line: {
                    addr1: formData?.address?.addr_line?.addr1 ?? '',
                    addr2: formData?.address?.addr_line?.addr2 ?? '',
                },
                locality: formData?.address?.locality ?? '',
                country: formData?.address?.country ?? '',
                isDefault: formData?.address?.isDefault ?? false,
            },
            notificationsEnabled: formData?.notificationsEnabled ?? false,
            notificationPreferences: {
                email: formData?.notificationPreferences?.email ?? false,
                sms: formData?.notificationPreferences?.sms ?? false,
                push: formData?.notificationPreferences?.push ?? false,
            },
            interests: formData?.interests ?? [],
            preferredContact: formData?.preferredContact ?? 'email',
            acceptPrivacy: formData?.acceptPrivacy ?? false,
        },
        validate: (values) => {
            const errors: Record<string, string> = {}
            const { error } = ProfileSchema.validate(values, {
                abortEarly: false,
            })
            if (error) {
                error.details.forEach((d) => {
                    errors[d.path.join('.')] = d.message
                })
            }
            return errors
        },
        onSubmit: (values) => {
            try {
                onSubmit(values)
                alert('Profile updated successfully!')
            } catch (error) {
                console.error('Error updating profile:', error)
                alert('Failed to update profile. Please try again.')
            }
        },
    })

    useEffect(() => {
        setFormData(formik.values)
    }, [formik.values, setFormData])

    const {
        values,
        errors,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting,
    } = formik

    function handleUploadedUrl(url: string) {
        setFieldValue('image', url)
    }

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Edit profile with Formik forms and Joi</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Age</Label>
                            <Input
                                type="number"
                                name="age"
                                value={values?.age}
                                onChange={handleChange}
                            />
                            {errors.age && (
                                <p className="text-sm text-destructive">
                                    {errors.age}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Gender</Label>
                            <select
                                name="gender"
                                value={values?.gender}
                                onChange={handleChange}
                                className="block w-full rounded-md border px-2 py-2"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="text-sm text-destructive">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Phone</Label>
                            <Input
                                name="phone"
                                value={values?.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && (
                                <p className="text-sm text-destructive">
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Birth date</Label>
                            <Input
                                type="date"
                                name="birthDate"
                                value={values?.birthDate as unknown as string}
                                onChange={handleChange}
                            />
                            {typeof errors.birthDate === 'string' && (
                                <p className="text-sm text-destructive">
                                    {errors.birthDate}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Weight (kg)</Label>
                            <Input
                                type="number"
                                name="weight"
                                value={values?.weight}
                                onChange={handleChange}
                            />
                            {errors.weight && (
                                <p className="text-sm text-destructive">
                                    {errors.weight}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Preferred contact</Label>
                            <RadioGroup
                                value={values?.preferredContact}
                                onValueChange={(val) =>
                                    setFieldValue('preferredContact', val)
                                }
                                className="flex gap-4 mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="email" id="r1" />
                                    <Label htmlFor="r1">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="phone" id="r2" />
                                    <Label htmlFor="r2">Phone</Label>
                                </div>
                            </RadioGroup>
                            {errors.preferredContact && (
                                <p className="text-sm text-destructive">
                                    {errors.preferredContact}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                            <Checkbox
                                checked={values?.acceptPrivacy}
                                onCheckedChange={(val) =>
                                    setFieldValue('acceptPrivacy', val)
                                }
                            />
                            <Label>I accept the privacy policy</Label>
                            {errors.acceptPrivacy && (
                                <p className="text-sm text-destructive">
                                    {errors.acceptPrivacy}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Label>About</Label>
                        <Textarea
                            name="about"
                            value={values?.about}
                            onChange={handleChange}
                            rows={4}
                        />
                        {errors.about && (
                            <p className="text-sm text-destructive">
                                {errors.about}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Address line 1</Label>
                            <Input
                                name="address.addr_line.addr1"
                                value={values?.address.addr_line.addr1}
                                onChange={handleChange}
                            />
                            {errors?.address?.addr_line?.addr1 && (
                                <p className="text-sm text-destructive">
                                    {errors.address.addr_line.addr1}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Address line 2</Label>
                            <Input
                                name="address.addr_line.addr2"
                                value={values?.address.addr_line.addr2}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label>Locality</Label>
                            <Input
                                name="address.locality"
                                value={values?.address.locality}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label>Country</Label>
                            <Input
                                name="address.country"
                                value={values?.address.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            <Label>Default address</Label>
                            <Switch
                                checked={values?.address.isDefault}
                                onCheckedChange={(val) =>
                                    setFieldValue('address.isDefault', val)
                                }
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                        <Label>Notifications Enabled</Label>
                        <Switch
                            checked={values?.notificationsEnabled}
                            onCheckedChange={(val) =>
                                setFieldValue('notificationsEnabled', val)
                            }
                        />
                    </div>
                    {values?.notificationsEnabled && (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                                <Label>Email notifications</Label>
                                <Switch
                                    checked={
                                        values?.notificationPreferences.email
                                    }
                                    onCheckedChange={(val) =>
                                        setFieldValue(
                                            'notificationPreferences.email',
                                            val
                                        )
                                    }
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label>SMS notifications</Label>
                                <Switch
                                    checked={
                                        values?.notificationPreferences.sms
                                    }
                                    onCheckedChange={(val) =>
                                        setFieldValue(
                                            'notificationPreferences.sms',
                                            val
                                        )
                                    }
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label>Push notifications</Label>
                                <Switch
                                    checked={
                                        values?.notificationPreferences.push
                                    }
                                    onCheckedChange={(val) =>
                                        setFieldValue(
                                            'notificationPreferences.push',
                                            val
                                        )
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        <Label>Interests</Label>
                        <Select
                            onValueChange={(val) => {
                                if (!values.interests?.includes(val)) {
                                    setFieldValue('interests', [
                                        ...(values.interests ?? []),
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
                                    <SelectItem key={opt} value={opt}>
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 mt-2"></div>
                        {values?.interests?.map((val) => (
                            <Badge
                                key={val}
                                onClick={() =>
                                    setFieldValue(
                                        'interests',
                                        values.interests?.filter(
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

                    <div>
                        <Label>Profile image</Label>
                        <FileInputWithUploader onUploaded={handleUploadedUrl} />
                        {values?.image && (
                            <div className="mt-2">
                                <img
                                    src={values.image}
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
