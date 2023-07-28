import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private p: PrismaService) {}

  async register(body: RegisterDTO) {
    const { name, password, username } = body;
    const oldUser = await this.p.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });
    if (oldUser) {
      throw new HttpException('Username is already taken', HttpStatus.CONFLICT);
    }
    const user = await this.p.user.create({
      data: {
        name,
        username,
        password: await hash(password, 12),
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });
    const token = sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
    );
    return {
      token,
      user,
    };
  }
  async login(body: LoginDTO) {
    const { password, username } = body;
    const user = await this.p.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
      select: {
        id: true,
        name: true,
        username: true,
        password: true,
        profileUrl: true,
      },
    });

    if (!user) {
      throw new HttpException(
        'No user found with provided username',
        HttpStatus.NOT_FOUND,
      );
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
    }
    const token = sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
    );
    delete user.password; // removing password from user object
    return {
      token,
      user,
    };
  }
  async verify(token: string): Promise<User> {
    try {
      const payload = verify(token, process.env.JWT_SECRET) as { id: string };
      const user: User = await this.p.user.findFirstOrThrow({
        where: { id: payload.id },
      });
      return user;
    } catch {
      throw Error('Invalid Token');
    }
  }
  async hydrateUser(id: string) {
    const user = await this.p.user.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        profileUrl: true,
      },
    });
    return user;
  }
}
