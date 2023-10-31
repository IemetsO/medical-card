import { nanoid } from "nanoid"
import { Card } from "./types"
import { CardRecord } from "./types"

export function createCard(name: string, dateOfBirth: string, gender: string) {
  const newCard: Card = {
    id: nanoid(),
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    records: [],
  }

  saveCard(newCard)

  return newCard
}

export function deleteCard(id: string) {
  const cards = getCards()
  const index = cards.findIndex((e: Card) => e.id === id)
  cards.splice(index, 1)
  localStorage.setItem("cards", JSON.stringify(cards))
}

export function getCardById(id: string): Card | undefined  {
  const cards = getCards()
  return cards.find((e: Card) => e.id === id)
}

export function getCards(): Card[]{
  const cardsString = localStorage.getItem("cards")
  if (!cardsString) {
    return []
  }

  return JSON.parse(cardsString)
}

export function saveCard(newCard: Card) {
  const cards = getCards()

  localStorage.setItem("cards", JSON.stringify([...cards, newCard]))
}

export function calculateAge(dateOfBirth: string) {
  const today = new Date()
  const years = today.getFullYear() - new Date(dateOfBirth).getFullYear()

  const months = today.getMonth() - new Date(dateOfBirth).getMonth()

  const days = Math.round(
    (today.getTime() - new Date(dateOfBirth).getTime()) / 86400000,
  )

  if (years === 0 && months === 0) {
    return `вік ${days} днів`
  } else {
    return `вік ${years} років ${months} місяців`
  }
}

export function updateCard(id: string, updatedCard: Card) {
  const cards = getCards()
  const index = cards.findIndex((e: Card) => e.id === id)
  cards.splice(index, 1, updatedCard)
  // cards[index]={...cards[index], updatedCard}
  localStorage.setItem("cards", JSON.stringify(cards))
}

export function addRecordToCard(cardId: string, record: CardRecord) {
  const card = getCardById(cardId)
  if (!card) {
    return
  }
  card.records.push(record)
  card.records.sort((r1, r2) => (r1.age < r2.age) ?-1 : (r1.age > r2.age) ? 1 : 0);
  updateCard(cardId, card)
}

export function deleteRecordFromCard(cardId: string, age: number) {
  const card = getCardById(cardId)
  if (!card) {
    return
  }
  const index = card.records.findIndex((e: CardRecord) => e.age === age)
  card.records.splice(index, 1)
  updateCard(cardId, card)
}

export function calculateBMI(a: number, b: number) {
  return Math.round(a / ((b / 100) * (b / 100)))
}
