import { hash, compare } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; // Adjust this value based on your security requirements
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
};

export const comparePassword = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
    return await compare(plainTextPassword, hashedPassword);
};