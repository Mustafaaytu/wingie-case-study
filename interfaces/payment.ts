export interface Payment {
  cardHolder: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  expirationDate?: string;
  reservationId: string;
  amount: number;
}
