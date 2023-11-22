export type Card = {
    id: string
    name: string
    dateOfBirth: string
    gender: string
  }

  export type CreateCardData = {
    name: string
    dateOfBirth: string
    gender: string
  }
  
  export type UpdateCardData = Partial<CreateCardData>