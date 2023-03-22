export class Quote {
  constructor(data: Quote) {
    Object.assign(this, data);
    this.price = this.formatMoney(this.price);
    this.previousClosePrice = this.formatMoney(this.previousClosePrice);
  }

  exchange: string;
  shortName: string;
  symbol: string;
  name: string;
  exchangeDisplayName: string;
  industry: Nullable<string>;
  sector: Nullable<string>;
  price: number;
  previousClosePrice: number;
  currency: string;


  get priceChangeSincePreviousClose() {
    return this.price - this.previousClosePrice;
  }

  get priceChangePercentage() {
    const percentage = +(this.priceChangeSincePreviousClose / this.previousClosePrice * 100).toFixed(2);
    return isNaN(percentage) ? 0 : percentage;
  }

  private formatMoney(value: number): number {
    if(value > 1) {
      return +value.toFixed(2)
    } else {
      return value;
    }
  }
}
