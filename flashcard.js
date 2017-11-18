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
var cards = []; // dynamic storage for all the cards, existing and new


//=============================================================
// cards[] init function 
//=============================================================
function init()
{
    try
    {
        // The JSON file may not exist yet, so catch the error and continue
        var data = fs.readFileSync('cards.json');
        cards = JSON.parse(data);
    }
    catch(err)
    {
        console.log("cards.JSON will be created");
        return;
    }
 
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
          choices: ["Create Flashcard", "Play Random Card", "Display All", "Exit"],
          name: "selectedChoice"												
      }
  ]).then(function (answer) {											

    switch (answer.selectedChoice) {

        case 'Create Flashcard':
            createCard();
            break;

        case 'Play Random Card':
            playRandomCard();
            break;

        case 'Display All':
            showAllCards();
            break;

        case 'Exit':
            console.log(colors.cyan("\nThanks for playing!!!"));
            return;

        default:
            console.log(colors.cyan("\nInvalid Choice!"));
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

        if (cardType === "Basic Card") 
        {

            // Create a Basic Card
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please enter the question to go on the front: ",
                    name: "front"
                },
                {
                    type: "input",
                    message: "Please enter the answer to go on the back: ",
                    name: "back"
                }

            ]).then(function (card) {

                var basicCard = null; 
                try 
                {
                    basicCard = new BasicCard(card.front, card.back);
                }
                catch(err)
                {
                    console.log(err.message);
                }

                if (basicCard)
                {
                    cards.push(basicCard);          
                    fs.writeFile("cards.json", JSON.stringify(cards, null, 2));
                }
                 
                inquirer.prompt([					
                    {
                        type: "list",
                        message: "\nDo you want to create another card?",
                        choices: ["Yes", "No"],
                        name: "anotherCard"
                    }

                ]).then(function (answer) {				
                    if (answer.anotherCard === "Yes") 
                    {	
                        createCard();						
                    } 
                    else 
                    {								
                        mainMenu();			
                    }
                });
            });

        } 
        else 
        {			
            // Create a Cloze Card			
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please enter the full text of your statement: ",
                    name: "text"
                },
                {
                    type: "input",
                    message: "Please enter the Cloze statement: ",
                    name: "cloze"
                }

            ]).then(function (card) { 

                var clozeCard = null; 
                try 
                {
                    clozeCard = new ClozeCard(card.text, card.cloze);
                }
                catch(err)
                {
                    console.log("Sorry, the Cloze string must be included in the full text.");
                }   

                if (clozeCard)
                {
                    cards.push(clozeCard);                        
                    fs.writeFile("cards.json", JSON.stringify(cards, null, 2)); 
                }
  
                inquirer.prompt([					
                    {
                        type: "list",
                        message: "\nDo you want to create another card?",
                        choices: ["Yes", "No"],
                        name: "anotherCard"
                    }

                ]).then(function (answer) {				
                    if (answer.anotherCard === "Yes") 
                    {	
                        createCard();						
                    } 
                    else 
                    {								
                        mainMenu();		
                    }
                });
            });

        }//if cardType

    });
}

//===============================================================
// getQuestion() returns the Front or the Partial Text of a card
//===============================================================
function getQuestion(card)
{
    if (card.type == "BasicCard")
        return card.front;
    else if (card.type == "ClozeCard")
        return (card.partialText);
    else
        throw "Encountered invalid card!";
}

//=============================================================
// getAnswer() returns the Back or the Cloze part of a card
//=============================================================
function getAnswer(card)
{
    if (card.type == "BasicCard")
        return card.back;
    else if (card.type == "ClozeCard")
        return card.cloze;
    else
        throw "Encountered invalid card!";
}

//=============================================================
// playRandomCard() plays a random card from cards[]
//=============================================================
function playRandomCard()
{
    var randomIndex = Math.floor(Math.random() * cards.length);

    var cardFront = null;
    var cardBack = null;

    try
    {
        cardFront = getQuestion(cards[randomIndex]);  
        cardBack = getAnswer(cards[randomIndex]);
    }
    catch(err)
    {
        console.log(err.message);
    }

    if (cardFront && cardBack)
    {
        inquirer.prompt([                           
                {
                    type: "input",
                    message: cardFront,
                    name: "question"
                }
            ]).then(function (answer) {  

                if (answer.question === cardBack)
                {
                    console.log(colors.green("You are correct!"));
                    setTimeout(mainMenu, 2000);
                } 
                else 
                {
                    console.log(colors.yellow("Sorry the correct answer is: "+cardBack));
                    setTimeout(mainMenu, 2000);
                }
            });  
    }
    else
    {
        setTimeout(mainMenu, 2000);
    }
}


//=============================================================
// showAllCards() displays all the cards in the stack
//=============================================================
function showAllCards()
{
    for (var i=0; i < cards.length; i++)
    {
        if (cards[i].type === "BasicCard")
        {
            console.log(colors.yellow("\n=================== Basic Card =================="));
            console.log("Front: " + cards[i].front); 
            console.log(colors.yellow("-------------------------------------------------"));
            console.log("Back: " + cards[i].back);
            console.log(colors.yellow("=================================================\n"));
        }
        else if (cards[i].type === "ClozeCard")
        {
            console.log(colors.green("\n=================== Cloze Card =================="));
            console.log("Full Text: " + cards[i].fullText); 
            console.log(colors.green("-------------------------------------------------"));
            console.log("Cloze: " + cards[i].cloze);
            console.log(colors.green("=================================================\n"));
        }
    }
    mainMenu();
}
