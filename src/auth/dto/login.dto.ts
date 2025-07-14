import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class VerifyAccessDto {
  token: string;
}

export class VerifyRefreshDto {
  username: string;
  token: string;
}

export class RefreshDto {
  username: string;
  refreshToken: string;
}
