export const getAge = function (birthdate: Date): number {
    birthdate = new Date(birthdate);
    const now: Date = new Date();
    const month: number = now.getMonth() - birthdate.getMonth();
    let age: number = now.getFullYear() - birthdate.getFullYear();
    
    if (month < 0 || (month === 0 && now.getDate() < birthdate.getDate())) {
        age--;
    }
    
    return age;
}