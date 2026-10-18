import readline from 'node:readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Выберите задачу:");
console.log("1 — билетная касса");
console.log("2 — доставка заказа");
console.log("3 — лестница");

let choice = await rl.question("Ваш выбор: ");

async function taskOne() {
    let category = await rl.question("Категория билета: ");
    let budget = Number(await rl.question("Бюджет: "));

    printTicketResult(category, budget);
}

function ticketPrice(category) {
    switch (category) {
        case "1":
            return 300;
        case "2":
            return 500;
        case "3":
            return 900;
        default:
            return 0;
    }
}

function maxTickets(budget, price) {
    let num = 0;

    while (budget >= price) {
        budget -= price;
        num++;
    }

    return num;
}

function printTicketResult(category, budget) {
    let price = ticketPrice(category);

    if (price === 0) {
        console.log("неизвестная категория");
        return;
    }

    let canBuyCount = maxTickets(budget, price);

    console.log(
        `Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${canBuyCount} шт.`
    );
}

async function taskTwo() {
    let distance = Number(await rl.question("Расстояние: "));
    let total = Number(await rl.question("Сумма заказа: "));

    printDelivery(distance, total);
}

function deliveryPrice(distance, total) {
    if (total >= 3000) {
        return 0;
    }

    if (distance <= 3) {
        return 0;
    }

    if (distance <= 10) {
        return 200;
    }

    return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
    let price = deliveryPrice(distance, total);

    console.log(
        `Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`
    );
}


async function taskThree() {
    let height = Number(await rl.question("Высота лестницы: "));

    printSteps(height);
}

function printSteps(height) {
    let count = 0;

    for (let i = 1; i <= height; i++) {

        if (i === 4) {
            continue;
        }

        if (i > 10) {
            console.log("Дальше лестница не построена");
            break;
        }

        console.log(`Ступень ${i}`);
        count++;
    }

    console.log(`Всего построено: ${count}`);
}

switch (choice) {
    case "1":
        await taskOne();
        break;

    case "2":
        await taskTwo();
        break;

    case "3":
        await taskThree();
        break;

    default:
        console.log("такой задачи нет");
}

rl.close();