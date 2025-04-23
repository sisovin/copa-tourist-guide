import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto';
import { Argon2Service } from './argon2.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly argon2Service: Argon2Service,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password } = registerDto;
    const hashedPassword = await this.argon2Service.hash(password);
    return this.prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role: 'USER',
      },
    });
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await this.argon2Service.verify(user.passwordHash, password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { refreshToken } });

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async logout(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
}
