export default interface User {
    id: number
    name: string
    surname: string
    email: string
    password: string
    rfid_card: string
    admin: boolean
    level_authorization: number
}