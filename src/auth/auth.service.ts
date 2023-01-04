import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { UserLoginDTO } from 'src/users/dto/userLogin.dto';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<UserEntity>,

    private jwtService: JwtService,
  ) {}

  async signUp(userDTO: CreateUserDTO) {
    return new Promise(async (resolve) => {
      const { fullName, photoUrl, email, password, phone, address } = userDTO;
      const user = this.userRepository.create();
      user.salt = await bcrypt.genSalt();
      user.fullName = fullName;
      user.photoUrl = photoUrl;
      user.email = email;
      user.password = await this.hashpassword(password, user.salt);
      user.phone = phone;
      // user.address = address;
      const userCreated = this.userRepository.save(user);

      delete user.password;
      delete user.salt;

      resolve(userCreated);
    });
  }

  async signIn(credentials: UserLoginDTO) {
    const user = await this.checkCredentials(credentials);
    if (user === null) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    const firstName = user.fullName.split(' ');
    const jwtPayload = {
      id: user._id,
      name: firstName[0],
      photoUrl: user.photoUrl,
      email: user.email,
    };

    const token = this.jwtService.sign(jwtPayload);
    return { token };
  }

  async checkCredentials(credentials: UserLoginDTO) {
    const { email, password } = credentials;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }

  validateToken(jwtToken: string) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          this.jwtService.verifyAsync(jwtToken, {
            ignoreExpiration: false,
          }),
        );
      } catch (error) {
        reject({
          code: 401,
          detail: 'Token expirado!',
        });
      }
    });
  }

  private async hashpassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
