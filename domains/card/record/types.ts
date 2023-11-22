export type CardRecord = {
    id: string
    age: number
    height: number
    weight: number
  }
  
  export type CreateCardRecordData = Omit<CardRecord, "id">
  
  export type UpdateCardRecordData = Partial<CardRecord>