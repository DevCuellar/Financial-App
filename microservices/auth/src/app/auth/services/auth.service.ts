import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/authuser.entity';
import { RegisterDto, LoginDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly client: ClientProxy
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const validationToken = await this.generateValidationToken(email);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      emailValidationToken: validationToken,
    });

    await this.userRepository.save(newUser);

    const confirmationLink = `http://localhost:4200/validateEmail?token=${validationToken}`;
    this.client.emit('user_registered', {
      email: newUser.email,
      confirmationLink: confirmationLink,
    });
    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    if (user.emailVerified == 'N') {
      throw new UnauthorizedException('Email no verificado');
    }

    const tokens = await this.generateTokens(user);
    return tokens;
  }

  async refreshTokens(userId: number): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    const tokens = await this.generateTokens(user);
    return tokens;
  }

  async verifyEmail(token: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { emailValidationToken: token } });
    if (!user) {
        throw new UnauthorizedException('Invalid token');
    }
    await this.jwtService.verify(token);
    user.emailVerified = 'Y';
    user.emailValidationToken = null;
    await this.userRepository.save(user);
    return true;
}

  private async generateValidationToken(email: string): Promise<string> {
    const payload = { email: email };
    const validationEmailToken = this.jwtService.sign(payload, {
      expiresIn: '12h',
    });

    return validationEmailToken;
  }

  private async generateTokens(user: User): Promise<AuthResponseDto> {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    return { accessToken, refreshToken };
  }
}
