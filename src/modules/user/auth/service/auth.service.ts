import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly users = [
        {
          id: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          id: 2,
          username: 'maria',
          password: 'guess',
        },
    ];

    constructor(
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = this.users.find(user => user.username === username);
        
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}