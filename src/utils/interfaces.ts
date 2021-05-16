import { Client } from "../entity/Client";

// Addinf property prop to Error
export interface IErrorWithCode extends Error {
  code?: number;
}

export interface IUser {
  id: number;
  client: Client;
  civility: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  function: string;
  role: string;
  date_created: Date;
  date_modified: Date;
  reset_password_token?: string;
  reset_password_expire?: Date;
}
