export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: Date;
}

export type CreateUserRequest = Pick<User, 'name' | 'email' | 'role'>;
export type UpdateUserRequest = Partial<CreateUserRequest>;