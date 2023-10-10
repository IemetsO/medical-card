

  export type CardRecord = {
    age: number
    height: number
    weight: number
  }
  
  export type Card = {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    records: CardRecord[]
  }