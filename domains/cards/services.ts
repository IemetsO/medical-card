import { nanoid } from "nanoid";
import { Card } from "./types";


export function createCard(name: string, dateOfBirth: string, gender: string) {
  const newCard = {
    id: nanoid(),
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
  }

  saveCard(newCard)

  return newCard}

  export  function deleteCard (id:string) {
    const cards = getCards()
    const index = cards.findIndex((e: Card)=>e.id ===id)
    cards.splice(index, 1) 
    localStorage.setItem("cards", JSON.stringify(cards));
}

export function getCardById (id: string){
  const cards = getCards()
    return cards.find((e: Card)=>e.id ===id);
}


export function getCards() {
  const cardsString = localStorage.getItem('cards')
  if (!cardsString) {
    return []
  }

  return JSON.parse(localStorage.getItem('cards'))
}


export function saveCard(newCard: Card) {
  const cards = getCards()

  localStorage.setItem('cards', JSON.stringify([...cards, newCard]))
}

export function calculateAge(dateOfBirth: string) {
  const today = new Date();
  const years = today.getFullYear() - new Date(dateOfBirth).getFullYear();

  const months = today.getMonth() - new Date(dateOfBirth).getMonth();

  const days = Math.round(
    (today.getTime() - new Date(dateOfBirth).getTime()) / 86400000
  );

  if (years === 0 && months === 0) {
    return `вік ${days} днів`;
  } else {
    return `вік ${years} років ${months} місяців`;
  }
}