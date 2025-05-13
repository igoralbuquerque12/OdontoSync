export interface Patient {
    cpf: string
    name: string
    birth_date: string
    phone: string
    email: string
}

export const defaultPatient = {
    cpf: '',
    name: '',
    birth_date: '',
    phone: '',
    email: ''
}