#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log("advanture game");
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.fuel -= 25;
    }
    increaseHealth() {
        this.fuel += 30;
        if (this.fuel > 100) {
            this.fuel = 100;
        }
    }
}
class enemy {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.fuel -= 25;
    }
    increaseHealth() {
        this.fuel = 100;
    }
}
const answer = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "player name:",
    },
    {
        name: "enemies",
        type: "list",
        message: "select enemie to fight",
        choices: ["zombie", "sekeleton", "worrier", "assasian"]
    }
]);
let player = new Player(answer.name);
let enemies = new enemy(answer.enemies);
console.log(chalk.bold.yellowBright(`${answer.name} vs ${answer.enemies}`));
let condition = true;
while (condition) {
    let option = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "select action",
        choices: ["attack", "health potion", "run"]
    });
    switch (option.action) {
        case "attack":
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                player.decreaseHealth();
                console.log(chalk.bold.blueBright(`${answer.name} fuel is ${player.fuel}`));
                console.log(chalk.bold.bgBlue(`${answer.enemies} fuel is ${enemies.fuel}`));
                if (player.fuel <= 0) {
                    console.log(chalk.bold.redBright(`${answer.name} lost better luck next time`));
                    condition = false;
                }
            }
            else if (num <= 0) {
                enemies.decreaseHealth();
                console.log(chalk.bold.blueBright(`${answer.name} fuel is ${player.fuel}`));
                console.log(chalk.bold.bgBlue(`${answer.enemies} fuel is ${enemies.fuel}`));
                if (enemies.fuel <= 0) {
                    console.log(chalk.bold.red(`${answer.enemies} has dead ! game over`));
                    condition = false;
                }
            }
            break;
        case "health potion":
            player.increaseHealth();
            console.log(chalk.italic.yellow(`${answer.name} used a health potion`));
            console.log(chalk.bold.green(`${answer.name} fuel is ${player.fuel}`));
            break;
        case "run":
            console.log(chalk.bold.redBright(`${answer.name} run away ......`));
            condition = false;
            break;
    }
}
