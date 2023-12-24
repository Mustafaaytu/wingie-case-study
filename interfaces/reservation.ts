import {Activity} from './activity';

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  activity: Activity;
}
