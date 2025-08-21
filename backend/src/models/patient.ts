export interface Patient {
    id: number,
    firstName: string,
    lastName: string,
    birthdate: Date,
    sex: string
}

export const initPrimaryKey: number = 7810;

export let patients: Array<Patient> = [
    {
        id: 7804,
        firstName: 'Robert',
        lastName: 'Paulson',
        birthdate: new Date(1986, 10, 27),
        sex: 'm'
    },
    {
        id: 7805,
        firstName: 'Jack',
        lastName: 'Rupert',
        birthdate: new Date(1979, 7, 18),
        sex: 'm'
    },
    {
        id: 7806,
        firstName: 'Marla',
        lastName: 'Singer',
        birthdate: new Date(1990, 4, 26),
        sex: 'f'
    },
    {
        id: 7807,
        firstName: 'Tyler',
        lastName: 'Durden',
        birthdate: new Date(1999, 9, 15),
        sex: 'm'
    },
    {
        id: 7808,
        firstName: 'Chloe',
        lastName: 'Streep',
        birthdate: new Date(2009, 5, 22),
        sex: 'f'
    },
    {
        id: 7809,
        firstName: 'Richard',
        lastName: 'Chesler',
        birthdate: new Date(2016, 5, 8),
        sex: 'm'
    }
];