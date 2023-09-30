import { nanoid } from "nanoid";
import { Card } from "./types";


 function createCard(name: string, dateOfBirth: string, gender: string) {
    let newCard: Card
  
    return (newCard = {
      id: nanoid(),
      name: name,
      dateOfBirth: dateOfBirth,
      gender: gender,
    });
  }

  function deleteCard (id:string) {
    let allCardsData = JSON.parse(localStorage.getItem("cards"));
    const deleteCardWithId = allCardsData.find((e: Card)=>e.id ===id)
    let index = allCardsData.indexOf(deleteCardWithId)
    allCardsData.splice(index, 1) 
    localStorage.setItem("cards", JSON.stringify(allCardsData));
}

function showCard (id: string){
    let allCardsData = JSON.parse(localStorage.getItem("cards"));
    const CardWithId = allCardsData.find((e: Card)=>e.id ===id);
     return CardWithId
}

 export {createCard, deleteCard, showCard}