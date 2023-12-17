export type Rate = {
  currency: string;
  rate: number;
};

export type Country = {
  fullName: string;
  population: number;
  currencies: object;
  rate: Rate[];
};
