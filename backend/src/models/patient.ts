export interface Patient {
    id: number,
    firstName: string,
    lastName: string,
    birthdate: Date,
    sex: string
}

export let patients: Array<Patient> = [
    {
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        birthdate: new Date(1982, 6, 29),
        sex: 'f'
    },
    {
        id: 2,
        firstName: 'John',
        lastName: 'Smith',
        birthdate: new Date(1994, 5, 18),
        sex: 'm'
    }
];