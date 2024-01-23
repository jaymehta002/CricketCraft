import { PLAYERS } from "./players.js";

const hero = PLAYERS[0];

const panelItems = [];
function createPanelItem(iconClass, text) {
    const panelItem = document.createElement('div');
    panelItem.classList.add('fixture');
    
    const icon = document.createElement('i');
    icon.classList.add('icon', 'fas', iconClass);
    
    const label = document.createElement('div');
    label.textContent = text;
    panelItem.appendChild(icon);
    panelItem.appendChild(label);
    return panelItem;
}

// Add panel items to the panel
const panel = document.querySelector('.panel');
const entities = ['fa-flag', 'fa-futbol', 'fa-hashtag', 'fa-info-circle'];

for (let i = 0; i < 5; i++) {
    const panelItem = document.createElement('div');
    panelItem.classList.add('fixture' + (i+1));

    entities.forEach(entity => {
        const icon = createPanelItem(entity, 'Type');
        panelItem.appendChild(icon);
    });

    panelItems.push(panelItem); // Add this line to push the panelItem to panelItems
    panel.appendChild(panelItem);
}

console.log(panelItems);



function isPlayerName(input) {
    return input.toLowerCase() === hero.name.toLowerCase();
}

function isPlayerNameAvailable(input) {
    return PLAYERS.some(player => player.name.toLowerCase() === input.toLowerCase());
}

function updatePanel(index, category, value) {
    const panelItem = panelItems[index];
    console.log(panelItem);
    panelItem.querySelector('.icon').classList.remove(entities[index]);
    panelItem.querySelector('.icon').classList.add(value);
    panelItem.querySelector('div').textContent = value;
}


function compareInput(input) {
    const player = PLAYERS.find(player => player.name.toLowerCase() === input.toLowerCase());
    if (player) {
        if(player.jerseyNumber === hero.jerseyNumber) {
            alert("jerseyNumber is correct");
            updatePanel(1, 'Jersey', player.jerseyNumber);
        }
        if(player.team === hero.team) {
            alert("team is correct");
            updatePanel(0, 'Team', player.team);
        }
        if(player.type === hero.type) {
            alert("type is correct");
            updatePanel(2, 'Type', player.type);
        }
    }
    return;
}

function checkInput(event) {
    if (event.key === "Enter") {
        const input = document.getElementById("guess").value.trim(); // Trim to remove leading/trailing whitespaces
        if (!input) {
            alert("Please enter a player name");
            return;
        }

        if (!isPlayerNameAvailable(input)) {
            alert("Player not available");
            document.getElementById("guess").value = "";
        } else {
            if (!isPlayerName(input)) {
                alert("Wrong player name");
                compareInput(input);
                document.getElementById("guess").value = "";
            } else {
                alert("You win!");
            }
        }
    }
}

document.addEventListener("keyup", checkInput);

function checkGuess(){
    let guess = document.getElementById("guess").value;
    if (guess === "Jay") {
        console.log("You win!");
        return "You win!";
    }
}  

document.addEventListener("keyup", (e) => {
//   if (guessesRemaining === 0) {
//     return;
//   }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    // deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    // insertLetter(pressedKey);
  }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});