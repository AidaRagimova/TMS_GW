import React, { useEffect, useState } from "react";
import './App.css';
import OneCard from "./components/OneCard";

const cardImages = [
  { "src": "./pictures/Harry.png", matched: false },
  { "src": "./pictures/mr_crabbs.png", matched: false },
  { "src": "./pictures/patrick.png", matched: false },
  { "src": "./pictures/pearl_crabbs.png", matched: false },
  { "src": "./pictures/plankton.png", matched: false },
  { "src": "./pictures/sandy.png", matched: false },
  { "src": "./pictures/Sponge_bob.png", matched: false },  
  { "src": "./pictures/squiward.png", matched: false },
  { "src": "./pictures/Karen.png", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle
  const shuffleCards = ()=> {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //comparison
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card 
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])


  //reset choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}

//new game
useEffect(() => {
  shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>Welcome to Bikini Bottom!</h1>
      <button onClick={shuffleCards}>Play Again</button>
      <p>Turns: {turns}</p>

      <div className="card-grid">
        {cards.map(card => (
          <OneCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled}
          />
        ))}
        <br></br>
      </div>
    </div>
  );
}

export default App;
