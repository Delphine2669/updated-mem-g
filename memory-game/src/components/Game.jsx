"use client";
import { useState, useEffect } from "react";
import toastr from "toastr";
import Header from "../components/Header.jsx";
import "./Game.css";
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
function Game() {
  const BLANK_CARD = "assets/GoT/throne.jpeg";

  const images = [
    { name: "Arya", image: "assets/GoT/Arya.png" },
    { name: "Cersei", image: "assets/GoT/cersei.png" },
    { name: "Daenerys", image: "assets/GoT/daenerys.png" },
    { name: "Jon Snow", image: "assets/GoT/johnSnow.png" },
    { name: "Khal Drogo", image: "assets/GoT/khaldrogo.png" },
    { name: "Sansa", image: "assets/GoT/sansa.png" },
    { name: "Tyrion", image: "assets/GoT/tyrion.png" },
    { name: "Brienne", image: "assets/GoT/brienne.png" },
  ];
  const [points, setPoints] = useState(0);
  const [chosenCards, setChosenCards] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [chosenCardsIds, setChosenCardsIds] = useState([]);
  const [pairsUncovered, setPairsUncovered] = useState(0);
  const [flips, setFlips] = useState(0);
  const [openCards, setOpenCards] = useState([]);
  function createCardBoard() {
    const imagesGenerated = images?.concat(...images);

    const shuffledArray = shuffleArray(imagesGenerated);
    setImagesArray(shuffledArray);
  }
  function flipImage(image, index) {
    setFlips((flips) => flips + 1);

    if (chosenCardsIds?.length === 1 && chosenCardsIds[0] === index) {
      return;
    }

    if (chosenCards?.length < 2) {
      setChosenCards((Chosen) => chosenCards?.concat(image));
      setChosenCardsIds((chosenCardsIds) => chosenCardsIds?.concat(index));

      if (chosenCards?.length === 1) {
        if (chosenCards[0] === image) {
          setPoints((points) => points + 2);
          setOpenCards((openCards) =>
            openCards?.concat([chosenCards[0], image])
          );
          setPairsUncovered((pairsUncovered) => pairsUncovered + 1);
        }
        if (pairsUncovered + 1 === images.length) {
          let message;
          if (flips % 2 === 0) {
            message = `💪🏾Bravo. Rejoue et essaye de le faire en moins de ${Math.floor(
              flips / 2
            )} coups`;
          } else {
            message = `💪🏾 Bravo. Rejoue et essaye de le faire en moins de ${
              Math.floor(flips / 2) + 1
            } coups`;
          }
          toastr.success(message);
        }
        setTimeout(() => {
          setChosenCardsIds([]);
          setChosenCards([]);
        }, 700);
      }
    }
  }
  function isCardChosen(image, index) {
    return chosenCardsIds?.includes(index) || openCards?.includes(image);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  function startOver() {
    setChosenCardsIds([]);
    setChosenCards([]);
    setPoints(0);
    setOpenCards([]);
    setFlips(0);
    createCardBoard();
  }

  useEffect(() => {
    createCardBoard();
  }, []);

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="game-container">
        <div className="card-header">
          <h4 className="counter">Points:{points}</h4>
          <p className="flip-counter">Coups:{Math.floor(flips / 2)}</p>
          <button onClick={startOver} className="button-start-over">
            Start over
          </button>
        </div>
        <div className="card-container">
          {imagesArray?.map((imageObj, index) => {
            return (
              <div
                className="col-4 col-lg-2"
                key={index}
                onClick={() => flipImage(imageObj.image, index)}
              >
                <div className="card">
                  <div className="card-body">
                    <p className="card-text text-center">
                      {isCardChosen(imageObj.name, index) ? imageObj.name : ""}
                    </p>
                    <img
                      src={
                        isCardChosen(imageObj.image, index)
                          ? imageObj.image
                          : BLANK_CARD
                      }
                      alt={
                        isCardChosen(imageObj.name, index) ? imageObj.name : ""
                      }
                      className={`img-fluid img-fixed`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Game;
