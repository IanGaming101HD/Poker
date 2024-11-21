class Game {
  constructor() {
    this.deck = this.createDeck();
    this.hands = this.setupHands(6);
    this.table = [];
    this.betAmount = 0;

    this.startGame();
  }

  createDeck() {
    let deck = [];
    let suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    let cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

    suits.forEach((suit) => {
      cardValues.forEach((cardValue) => {
        deck.push(`${cardValue}-${suit}`);
      });
    });
    return deck;
  }

  formatString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  formatCard(string) {
    return `${this.formatString(string.split('-')[0])} of ${this.formatString(string.split('-')[1])}`;
  }

  getNumberValue(cardValue) {
    let cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    return isNaN(cardValue) ? cardValues.indexOf(cardValue) + 2 : parseInt(cardValue);
  }

  sortCardsValue(array) {
    for (let x = 0; x < array.length; x++) {
      for (let y = 0; y < array.length - x - 1; y++) {
        if (this.getNumberValue(array[y]) > this.getNumberValue(array[y + 1])) {
          [array[y], array[y + 1]] = [array[y + 1], array[y]];
        }
      }
    }
    return array;
  }

  deal() {
    let dealtCard = this.deck[Math.floor(Math.random() * this.deck.length)];
    this.deck.splice(this.deck.indexOf(dealtCard), 1);
    return dealtCard;
  }

  setupHands(playerNums) {
    let hands = {};
    for (let x = 1; x <= playerNums; x++) {
      hands[x === 1 ? `player` : `player-${x}`] = [];
    }
    return hands;
  }

  resetDecks() {
    this.deck = this.createDeck();
    this.hands = this.setupHands(6);
  }

  call() {
    console.log('Player calls.');
  }

  raiseBet() {
    let validResponse = false;
    while (!validResponse) {
      let userInput = parseInt(prompt('What would you like to raise to? > '));
      if (!isNaN(userInput) && userInput > this.betAmount) {
        this.betAmount = userInput;
        validResponse = true;
      } else {
        console.log('Enter a valid response!');
      }
    }
  }

  fold(player) {
    console.log(`${player} has folded.`);
  }

  playAgain() {
    let userInput = prompt('Would you like to play again? [Yes/No] > ').toLowerCase();
    if (['yes', 'y'].includes(userInput)) {
      this.startGame();
    } else if (['no', 'n'].includes(userInput)) {
      console.log('Thanks for playing!');
    } else {
      console.log('Enter a valid response!');
      this.playAgain();
    }
  }

  startGame() {
    this.resetDecks();

    Object.keys(this.hands).forEach((player) => {
      for (let i = 0; i < 2; i++) {
        let card = this.deal();
        this.hands[player].push(card);

        let cardElement = document.createElement('img');
        cardElement.classList.add('card');

        if (player === 'player') {
          cardElement.src = `./public/main/images/cards/${card}.png`;
        } else {
          cardElement.src = './public/main/images/cards/card-back.png';
        }

        let handElement = document.getElementById(`${player}-hand`);
        handElement.appendChild(cardElement);
      }
    });

    for (let i = 0; i < 5; i++) {
      let card = this.deal();
      this.table.push(card);

      let cardElement = document.createElement('img');
      cardElement.classList.add('card');
      cardElement.src = './public/main/images/cards/card-back.png';

      let tableElement = document.getElementById('table');
      tableElement.appendChild(cardElement);
    }

    initEvents();
  }

  initEvents() {
    let callButton = document.getElementById('call-button');
    let raiseButton = document.getElementById('raise-button');
    let foldButton = document.getElementById('fold-button');

    callButton.addEventListener('click', (event) => {
      this.call();
    });

    raiseButton.addEventListener('click', (event) => {
      this.raise();
    });

    foldButton.addEventListener('click', (event) => {
      this.fold();
    });
  }
}

const game = new Game();
