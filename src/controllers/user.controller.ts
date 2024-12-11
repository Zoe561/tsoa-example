import { Body, Controller, Get, Path, Post, Put, Route, Tags } from 'tsoa';
import { User, CreateUserRequest, UpdateUserRequest } from '../types/user';

@Route('users')
@Tags('User Management')
export class UserController extends Controller {
    private users: User[] = [
        {
            id: 1,
            name: '張三',
            email: 'zhang@example.com',
            role: 'user',
            createdAt: new Date()
        }
    ];

    /**
     * Retrieve all users from the system
     */
    @Get()
    public async getUsers(): Promise<User[]> {
        return this.users;
    }

    /**
     * Retrieve a specific user by id
     */
    @Get('{userId}')
    public async getUser(@Path() userId: number): Promise<User> {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
            this.setStatus(404);
            throw new Error('User not found');
        }
        return user;
    }

    /**
     * Create a new user
     */
    @Post()
    public async createUser(@Body() requestBody: CreateUserRequest): Promise<User> {
        const newUser: User = {
            ...requestBody,
            id: this.users.length + 1,
            createdAt: new Date()
        };

        this.users.push(newUser);
        this.setStatus(201);
        return newUser;
    }

    /**
     * Update an existing user
     */
    @Put('{userId}')
    public async updateUser(
        @Path() userId: number,
        @Body() requestBody: UpdateUserRequest
    ): Promise<User> {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            this.setStatus(404);
            throw new Error('User not found');
        }

        const updatedUser = {
            ...this.users[userIndex],
            ...requestBody
        };

        this.users[userIndex] = updatedUser;
        return updatedUser;
    }
}