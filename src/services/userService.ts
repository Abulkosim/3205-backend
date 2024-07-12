import path from 'path';
import fs from 'fs';

let users: { email: string, number: string }[] = [];

try {
    const data = fs.readFileSync(path.join(__dirname, '../users.json'), 'utf-8');
    users = JSON.parse(data);
} catch (error) {
    console.error(error);
}

export const findUsers = (email: string, number?: string) => {
    return users.filter(user => {
        return user.email.includes(email) && (!number || user.number.includes(number));
    });
};