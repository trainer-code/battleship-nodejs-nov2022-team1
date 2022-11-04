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

        console.log('Player, this is your board:');
        console.log(this.playerBoard.serialiseBoard());

        rl.close();
    }

    showGameSplash() {
        console.log('                                     |__');
        console.log('                                     |\/');
        console.log('                                     ---');
        console.log('                                     / | [');
        console.log('                              !      | |||');
        console.log('                            _/|     _/|-++\'');
        console.log('                        +  +--|    |--|--|_ |-');
        console.log('                     { /|__|  |/\__|  |--- |||__/');
        console.log('                    +---------------___[}-_===_.\'____                 /\"');
        console.log('                ____`-\' ||___-{]_| _[}-  |     |_[___\==--            \/   _');
        console.log(' __..._____--==/___]_|__|_____________________________[___\==--____,------\' .7');
        console.log('|                        Welcome to Battleship                         BB-61/');
        console.log(' \\_________________________________________________________________________|');
        console.log();
    }

    showStartGameSplash() {
        console.log('                  __');
        console.log('                 /  \"');
        console.log('           .-.  |    |');
        console.log('   *    _.-\'  \  \__/');
        console.log('    \.-\'       \"');
        console.log('   /          _/');
        console.log('  |      _  /\"\"');
        console.log('  |     /_\'');
        console.log('   \    \_/');
        console.log('    """"""""');
    }

    consoleBeep() {
        console.log('\u0007');
    }

    showHit() {
        console.log('                \         .  ./');
        console.log('              \      .:"";\'.:..""   /');
        console.log('                  (M^^.^~~:.\'"").');
        console.log('            -   (/  .    . . \ \)  -');
        console.log('               ((| :. ~ ^  :. .|))');
        console.log('            -   (\- |  \ /  |  /)  -');
        console.log('                 -\  \     /  /-');
        console.log('                   \  \   /  /');
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
            if (rl == '?') {
                // if (bolPB) {
                //     console.log("Patrol Boat")
                // }

            }
            return result;
        } catch (err) {
            console.log("Invalid shot");
            return await this.getValidShotAnswer(rl, question)
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

        let playerShotArray = [];
        let controlPatrolCounter = 0;
        let controlDestroyer = 0;
        let controlSubmarine = 0;
        let controlAircraft = 0;
        let controlBattleship = 0;
        let totalHits = 0;
        let totalComputerHits = 0;
        let aliveBoats = ["Patrol Boat", "Submarine", "Aircraft Carrier", "Battleship", "Destroyer"];

        while (true) {
            console.log("Player, it's your turn");
            
            const shotPosition = await this.getValidShotAnswer(rl, 'Enter coordinates for your shot (i.e B3): ');
            const isHit = this.computerBoard.tryHitAShip(this.createShot(shotPosition));

            
            playerShotArray.push(shotPosition);
            if (isHit) {
                const pos = this.computerBoard.getAllShipParts().find(l => l.letter == this.createShot(shotPosition).letter && l.index == this.createShot(shotPosition).index)
                this.showHit();

                totalHits++         //Increment game hits

                console.log('Yeah! Nice hit!');

                //Case Statement to increment ship hit counter, and print sink if satisfied
                switch (pos.shipLetter) {
                    case 'P':
                        controlPatrolCounter ++;
                        if (controlPatrolCounter == 2) {
                            console.log("Patrol Boat Sunk!!!! BOOOMMMMMMMMM")
                            const validNamesPB = aliveBoats.indexOf("Patrol Boat")
                            aliveBoats.splice(validNamesPB, 1)
                            console.log("Remaining Ships: ", aliveBoats)
                        }
                        break;
                    case 'D':
                        controlDestroyer ++;
                        if (controlDestroyer == 3) {
                            console.log("Destroyer Sunk!!!! BOOOMMMMMMMMM")
                            const validNamesPB = aliveBoats.indexOf("Destroyer")
                            aliveBoats.splice(validNamesPB, 1)
                            console.log("Remaining Ships: ", aliveBoats)
                        }
                        break;
                    case 'S':
                        controlSubmarine ++;
                        if (controlSubmarine == 3) {
                            console.log("Submarine Sunk!!!! BOOOMMMMMMMMM")
                            const validNamesPB = aliveBoats.indexOf("Submarine")
                            aliveBoats.splice(validNamesPB, 1)
                            console.log("Remaining Ships: ", aliveBoats)
                        }
                        break;
                    case 'A':
                        controlAircraft ++;
                        if (controlAircraft == 5) {
                            console.log("Aircraft Carrier Sunk!!!! BOOOMMMMMMMMM")
                            const validNamesPB = aliveBoats.indexOf("Aircraft Carrier")
                            aliveBoats.splice(validNamesPB, 1)
                            console.log("Remaining Ships: ", aliveBoats)
                        }
                        break;
                    case 'B':
                        controlBattleship ++;
                        if (controlBattleship == 4) {
                            console.log("Battleship Sunk!!!! BOOOMMMMMMMMM")
                            const validNamesPB = aliveBoats.indexOf("Battleship")
                            aliveBoats.splice(validNamesPB, 1)
                            console.log("Remaining Ships: ", aliveBoats)
                        }
                        break;
                }                
            } 
            else {
                console.log('Miss');
            }
            if (totalHits == 17) {
                console.log("YOU WIN \n\n***********CONGRATULATIONS!***************\n\n")
                process.exit();
            }


            const randomPosition = this.playerBoard.getRandomPosition();
            const isComputerHit = this.playerBoard.tryHitAShip(this.createShot(randomPosition));
            if (isComputerHit) {
                this.showHit();
            } 

            // console.log(`Computer shot in ${randomPosition} and ${isComputerHit ? 'has hit your ship !' : 'miss'}`);   
            
            if (randomPosition && isComputerHit) {
                totalComputerHits++
                console.log("Computer has hit your ship!")
                if (totalComputerHits == 17) {
                    console.log("YOU LOSE \n\n***********GAME OVER***************\n\n")
                    process.exit();
                } 
            }
        }

        rl.close();
    }

}

export async function playBattleFieldGame()  {
    const game = new Game();
    game.showGameSplash();
    await game.initialisePlayerBoard();
    game.showStartGameSplash();
    await game.playGame();
}

playBattleFieldGame();


