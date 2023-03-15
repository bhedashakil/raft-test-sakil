
export interface IUser {
  id?: number;
  uid?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  name: string;
  company_id?: number;
  created_at?: string;
  updated_at?: string;
}
