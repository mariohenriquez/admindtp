export class PaymentInformation {
    id = 0;
    customerID = 0;
    cardNumber = '';
    expirationMonth = '';
    expirationYear = 0;
    cvc = 0;
    fullName = '';
    alias = '';
    type = '';
    isDefault = false;
  
    valid(): boolean {
      return this.cardNumber !== '' && this.expirationMonth !== '' &&
        this.cvc !== 0 && this.expirationYear !== 0 &&
        this.fullName !== '';
    }
  }
  