export enum UserGender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Address {
    addr_line: {
        addr1: string // text
        addr2?: string // text
    }
    locality: string // text
    country: string // text
    isDefault: boolean // checkbox
}

export interface UserProfileDetails {
    age: number // number
    gender: UserGender // select dropdown
    phone: string // phone text
    birthDate: Date // date picker
    image: string // file upload
    weight: number // number
    about: string // text area
    address: Address // address object
    notificationsEnabled: boolean //toggle
    notificationPreferences: {
        email: boolean // switch
        sms: boolean // switch
        push: boolean // switch
    }
    interests?: string[] // multi select dropdown
    preferredContact: 'email' | 'phone' // radio buttons
    acceptPrivacy: boolean // checkbox
}
