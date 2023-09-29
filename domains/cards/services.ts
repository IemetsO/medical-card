import { nanoid } from "nanoid";
import { Card } from "./types";


 function createCard(name: string, age: number, gender: string) {
    let newCard: Card
    return (newCard = {
      id: nanoid(),
      name: name,
      age: age,
      gender: gender,
    });
  }

  function deleteCard (id:string) {
    let allCardsData = JSON.parse(localStorage.getItem("cards"));
    const deleteCardWithId = allCardsData.map((e: Card)=>e.id ===id)
    let index = allCardsData.indexOf(deleteCardWithId)
    allCardsData.splice(index, 1) 
    localStorage.setItem("cards", JSON.stringify(allCardsData));

 }

 export {createCard, deleteCard}