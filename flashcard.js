//=============================================================
// Imports
//=============================================================
var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js")
var ClozeCard = require("./ClozeCard.js")
var colors = require('colors');
var fs = require("fs");

//=============================================================
// Global Variables
//=============================================================
var cards = []; // holds all the cards, existing and new


//=============================================================
// cards[] init function 
//=============================================================
function init()
{
    var data = fs.readFileSync('cards.json');
    cards = JSON.parse(data);
}

//=============================================================
// The Main Menu driver function
//=============================================================
function mainMenu() 
{
  inquirer.prompt([															
      {
          type: "list",														
          message: "\nPlease choose an option from the list below:",
          choices: ["Create Flashcard", "Play All", "Pick Random", "Display All", "Exit"],
          name: "userChoice"												
      }
  ]).then(function (answer) {											

    switch (answer.userChoice) {

        case 'Create Flashcard':
            console.log("Making a new Flashcard  ");
            createCard();
            break;

        case 'Play All':
            console.log("Using all Flashcards  ");
            useAllCards();
            break;

        case 'Random':
            console.log("Using a random Flashcard  ");
            useRandomCard();
            break;

        case 'Display All':
            console.log("Displaying all Flashcards ");
            showCards();
            break;

        case 'Exit':
            console.log("Thanks for playing!!!")
            return;

        default:
            console.log("\nInvalid Choice! \n");
            break;
    }
  });
}

//=============================================================
// Run init() to initialize cards[], and then display the Main
// Menu.
//=============================================================
init();
mainMenu();


//=============================================================
// Create a new Flashcard
//=============================================================
function createCard() {
    inquirer.prompt([
        {
            type: "list",
            message: "Please choose the card type",
            choices: ["Basic Card", "Cloze Card"],
            name: "cardType"
        }

    ]).then(function (answer) {

        var cardType = answer.cardType;  			
        console.log(cardType);			  		

        if (cardType === "Basic Card") {

            // Create a Basic Card
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please enter the question to go on the front ",
                    name: "front"
                },
                {
                    type: "input",
                    message: "Please enter the answer to go on the back ",
                    name: "back"
                }

            ]).then(function (card) {

                var basicCard; 
                try {
                    basicCard = new BasicCard(card.front, card.back);
                }
                catch(error)
                {
                    console.log(error.message);
                    return;
                }
                
                cards.push(basicCard);			
                fs.writeFile("cards.json", JSON.stringify(cards, null, 2)); 

                inquirer.prompt([					
                    {
                        type: "list",
                        message: "Do you want to create another card?",
                        choices: ["Yes", "No"],
                        name: "anotherCard"
                    }

                ]).then(function (answer) {				
                    if (answer.anotherCard === "Yes") {	
                        createCard();						
                    } else {								
                        setTimeout(mainMenu, 1000);			
                    }
                });
            });

        } else {			

            // Create a Cloze Card			
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please enter the full text of your statement",
                    name: "text"
                },
                {
                    type: "input",
                    message: "Please enter the Cloze statement ",
                    name: "cloze"
                }

            ]).then(function (card) { 

                var clozeCard; 
                try {
                    clozeCard = new ClozeCard(card.text, card.cloze);
                }
                catch(error)
                {
                    console.log(error.message);
                    return;
                }   

                cards.push(clozeCard);						
                fs.writeFile("cards.json", JSON.stringify(cards, null, 2)); 
            
                inquirer.prompt([					
                    {
                        type: "list",
                        message: "Do you want to create another card?",
                        choices: ["Yes", "No"],
                        name: "anotherCard"
                    }

                ]).then(function (answer) {				
                    if (answer.anotherCard === "Yes") {	
                        createCard();						
                    } else {								
                        setTimeout(mainMenu, 1000);		
                    }
                });
            });
        }

    });
}

//=============================================================
// To be completed ...
//=============================================================
function useAllCards()
{

}

function useRandomCard()
{

}

function showCards()
{

}

