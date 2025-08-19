export enum UserGender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Address {
    addr_line: {
        addr1: string
        addr2?: string
    }
    locality: string
    country: string
}

export interface University {
    name: string
    address: Address
    establishedYear: number
}
export interface UserProfileDetails {
    age: number
    gender: UserGender
    phone: string
    birthDate: Date
    image: string
    bloodGroup: string
    height: number
    weight: number
    eyeColor: string
    university: string
    about: string
    address: Address
}
