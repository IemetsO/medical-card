import { nanoid } from "nanoid"
import { Card } from "./types"
import { CardRecord } from "./types"

export function createCard(name: string, dateOfBirth: string, gender: string) {
  const newCard = {
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

export function getCardById(id: string) {
  const cards = getCards()
  return cards.find((e: Card) => e.id === id)
}

export function getCards() {
  const cardsString = localStorage.getItem("cards")
  if (!cardsString) {
    return []
  }

  return JSON.parse(localStorage.getItem("cards"))
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
  card.records.push(record)
  updateCard(cardId, card)
}

export function deleteRecordFromCard(cardId: string, age: number) {
  const card = getCardById(cardId)
  const index = card.records.findIndex((e: CardRecord) => e.age === age)
  card.records.splice(index, 1)
  updateCard(cardId, card)
}

export function calculateBMI(a: number, b: number) {
  return Math.round(a / ((b / 100) * (b / 100)))
}
