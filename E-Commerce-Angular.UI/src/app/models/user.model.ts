export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    createdDate: Date;
    updatedDate: Date;
    isActive: boolean;
    isEmailConfirmed: boolean;
    isLocked: boolean;
    lastLoginDate: Date;
    loginAttemptCounter: number;
    loginCoolDown: Date;
}