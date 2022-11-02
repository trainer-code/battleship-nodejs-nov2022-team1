import * as readline from 'readline';
import { GameBoard, isValidPosition, computerBoard } from './gameboard';
import { ShipLetter, Letter } from './enums';
import { Shot } from './interfaces';


export class Game {
    computerBoard: GameBoard = new GameBoard();
    playerBoard: GameBoard = new GameBoard();

    constructor() {
        this.computerBoard.initialiseBoard(computerBoard);
    }

    askShipInitialisationQuestion(rl: any, shipLetter: ShipLetter, question: string, size: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            rl.question(question, (userEntry: string) => {
                try {
                    this.playerBoard.initialiseShip(shipLetter, userEntry, size);
                    resolve(true);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    async getValidAnswer(rl: any, shipLetter: ShipLetter, question: string, size: number) {
        try {
            const result = await this.askShipInitialisationQuestion(rl, shipLetter, question, size);
            return result;
        } catch (err) {
            console.log(err.message);
            return await this.getValidAnswer(rl, shipLetter, question, size);
        }
    }

    async initialisePlayerBoard() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // initialise Aircraft Carrier',
        await this.getValidAnswer(rl, ShipLetter.A, 'Enter Aircraft Carrier positions (size = 5) (i.e B2, B3): ', 5);
        // initialise  Battleship',
        await this.getValidAnswer(rl, ShipLetter.B, 'Enter Battleship positions (size = 4) (i.e B2, B3): ', 4);
        // initialise Submarine',
        await this.getValidAnswer(rl, ShipLetter.S, 'Enter Submarine positions (size = 3) (i.e B2, B3): ', 3);
        // initialise Destroyer',
        await this.getValidAnswer(rl, ShipLetter.D, 'Enter Destroyer positions (size = 3) (i.e B2, B3): ', 3);
        // initialise PatrolBoat'
        await this.getValidAnswer(rl, ShipLetter.B, 'Enter Patrol boat positions (size = 2) (i.e B2, B3): ', 2);

        console.log('\nPlayer, this is your board:');
        console.log(this.playerBoard.serialiseBoard());

        rl.close();
    }

    showGameSplash() {
        console.log('                                     |__');
        console.log('                                     |\/');
        console.log('                                     ---');
        console.log('                                     / | [');
        console.log('                              !      | |||');
        console.log('                            _/|     _/|-++\\\'');
        console.log('                        +  +--|    |--|--|_ |-');
        console.log('                     { /|__|  |/\\__|  |--- |||__/');
        console.log('                    +---------------___[}-_===_.\\\'____');
        console.log('                ____`-\' ||___-{]_| _[}-  |     |_[___\\==--');
        console.log(' __..._____--==/___]_|__|_____________________________[___\\==--____,--------.7');
        console.log('|                        Welcome to Battleship                        BB-61 /');
        console.log(' \\_________________________________________________________________________|');
        console.log();
    }

    showStartGameSplash() {
        console.log("\n\x1b[34m%s","\'.  \\ | /  ,\'");
        console.log("  `. `.\' ,\'");
        console.log(" ( .`.|,\' .)");
        console.log("%s\x1b[0m"," - ~ -0- ~ -");
    }

    consoleBeep() {
        console.log('\u0007');
    }

    showHit() {
        console.log("\n\x1b[31m%s", "          _ ._  _ , _ ._");
        console.log("        (_ ' ( `  )_  .__)");
        console.log("      ( (  (    )   `)  ) _)");
        console.log("     (__ (_   (_ . _) _) ,__)");
        console.log("         `~~`\\ ' . /`~~`");
        console.log("              ;   ;        ");
        console.log("              /   \\");
        console.log("%s\x1b[0m", "_____________/_ __ \\_____________");
    }

    askShotQuestion(rl: any, question: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            rl.question(question, (userEntry: string) => {
                try {
                    const shotPosition = userEntry.trim();
                    if (isValidPosition(shotPosition)) {
                        resolve(shotPosition);
                    } else {
                        reject('Invalid position!');
                    }
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    async getValidShotAnswer(rl: any, question: string) {
        try {
            const result = await this.askShotQuestion(rl, question);
            return result;
        } catch (err) {
            console.log("Invalid shot");
            return await this.getValidShotAnswer(rl, question);
        }
    }

    createShot(shotPosition: string): Shot {
        const letter = shotPosition[0].toUpperCase() as Letter;
        const index = Number(shotPosition[1]);
        return { letter, index };
    }

    async playGame() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const playerColour = "\x1b[32m";
        const computerColour = "\x1b[31m";

        while (true) {
            console.log(`${playerColour}%s\x1b[0m`, "Player, it's your turn");
            const shotPosition = await this.getValidShotAnswer(rl, 'Enter coordinates for your shot (i.e B3): ');
            
            const isHit = this.computerBoard.tryHitAShip(this.createShot(shotPosition));
            if (isHit) {
                this.showHit();
                console.log(`${playerColour}%s\x1b[0m`, "Yeah ! Nice hit !");
            } else {
                this.showStartGameSplash();
                console.log(`${playerColour}%s\x1b[0m`, "Miss");
            }
            console.log();

            const randomPosition = this.playerBoard.getRandomPosition();
            const isComputerHit = this.playerBoard.tryHitAShip(this.createShot(randomPosition));
            if (isComputerHit) {
                this.showHit();
            } 
            else {
                this.showStartGameSplash();
            }

            console.log(`${computerColour}Computer shot in ${randomPosition} and ${isComputerHit ? 'has hit your ship !' : 'miss'}\x1b[0m`);
            console.log();

            
        }

        rl.close();
    }
}

export async function playBattleFieldGame()  {
    const game = new Game();
    game.showGameSplash();
    await game.initialisePlayerBoard();
    await game.playGame();
}

playBattleFieldGame();


