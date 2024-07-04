import { useState, useEffect } from "react";
import cards from "./cards";

function Game() {
  const [deck, setDeck] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    newDeck();
  }, []);

  function newDeck() {
    let xDeck = [...cards];
    let nd = [];

    while (nd.length < 5 && xDeck.length > 0) {
      const randomIndex = Math.floor(Math.random() * xDeck.length);
      const randomColor = xDeck[randomIndex];

      nd.push(randomColor);
      xDeck.splice(randomIndex, 1);
    }

    for (let i = 0; i < 5; i++) {
      let copy = true;
      for (let j = 0; j < clickedCards.length; j++) {
        if (nd[i] === clickedCards[j]) {
          copy = false;
          break;
        }
      }
      if (!copy) {
        newDeck();
        return;
      }
    }

    setDeck(nd);
  }

  function handleClick(color) {
    if (!clickedCards.includes(color)) {
      setClickedCards((prevClickedCards) => [...prevClickedCards, color]);
      setPoints(points + 1);
      newDeck();
    } else {
      gameOver();
    }
  }

  function gameOver() {
    setDeck([]);
    setClickedCards([]);
    alert("Game over. Refresh for a new Game");
  }

  return (
    <>
      <div style={{ fontSize: "2rem" }}>Points: {points}</div>
      <div id="gameBoard">
        {" "}
        {deck.map((clr, index) => (
          <div
            key={index}
            onClick={() => handleClick(clr)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: clr,
              margin: "5px",
              border: "2px solid black",
              color: clr,
              textAlign: "center",
              lineHeight: "100px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {clr}
          </div>
        ))}
      </div>
    </>
  );
}

export default Game;
