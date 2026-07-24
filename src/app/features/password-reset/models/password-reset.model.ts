


export interface PasswordReset{

  id: number;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  user: boolean;
  userInt: number;

}
