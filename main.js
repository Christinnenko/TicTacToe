let player = "X"; // Текущий игрок
let gameOver = false; // Флаг - завершена ли игра

let imgPlayer = document.getElementById("player"); // Изображение текущего игрока
const buttonStart = document.getElementById("start");
const playerText = document.getElementById("winner"); // Элемент для отображения информации о игроке и победителе
const initialPlayerText = playerText.innerHTML; // Сохранение начального текста о игроке

let movesMade = 0; // Счетчик ходов для определения ничьей
let winnerPlayer = ""; // Переменная для хранения информации о победителе

//выигрышные комбинации
let winCombination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Функция запуска игры
function startGame() {
  player = "X"; //первый игрок всегда X
  gameOver = false;
  buttonStart.innerHTML = "Начать заново";
  playerText.innerHTML = initialPlayerText; //убрать строку кто победил, поставить текущего игрока
  playerText.classList.remove("winner"); //убрать мерцание строки

  movesMade = 0; //обнулить кол-во щелчков по полю

  enableClicks();
}

// Функция перезапуска игры
function restartGame() {
  // Очистка поля и удаление классов выигрыша
  for (let i = 1; i <= 9; i++) {
    const cell = document.getElementById(i.toString());
    cell.innerHTML = "";
    cell.classList.remove("tic", "tac", "win-combination");
  }
  startGame();
}

// Функция добавления слушателя событий кнопке старта
function listenerStartButton() {
  buttonStart.addEventListener("click", () => {
    if (gameOver) {
      startGame(); // Если игра не запущена, начать новую игру
    } else {
      restartGame(); // Если игра уже запущена, начать заново
    }
  });
}
listenerStartButton();

// Обработчик клика по ячейке
function cellClick() {
  // Условие: игра идет, ячейка пустая
  if (!gameOver && this.innerHTML === "") {
    // Заполняем ячейку значением текущего игрока (X или O)
    this.innerHTML = player;
    this.classList.add("tic");
    movesMade++; // Увеличиваем счетчик ходов
    checkWin(); // Проверяем условия победы

    // Проверка на ничью
    if (movesMade === 9 && !gameOver) {
      showDraw(); // Выводим сообщение о ничьей
      gameOver = false; //для возможности рестарта
    } else {
      // Смена текущего игрока
      if (player === "X") {
        player = "O";
        this.classList.remove("tac");
        this.classList.add("tic");
        // Обновляем текстовое поле с указанием текущего игрока
        playerText.innerHTML = `Ход игрока: <img src="images/O.png" alt="нолик" />`;
      } else {
        player = "X";
        this.classList.remove("tic");
        this.classList.add("tac");
        // Обновляем текстовое поле с указанием текущего игрока
        playerText.innerHTML = `Ход игрока: <img src="images/X.png" alt="крестик" />`;
      }
    }
  }
}

// Функция разрешения кликов по ячейкам
function enableClicks() {
  // Отключить клики по ячейкам
  for (let i = 1; i <= 9; i++) {
    const cell = document.getElementById(i.toString());
    cell.addEventListener("click", cellClick);
  }
}

// Функция отключения кликов по ячейкам
function disableClicks() {
  // Удалить слушатели кликов по ячейкам
  for (let i = 1; i <= 9; i++) {
    const cell = document.getElementById(i.toString());
    cell.removeEventListener("click", cellClick);
  }
}

// Функция определение победителя
function checkWin() {
  // Итерируем по всем возможным комбинациям победы
  for (let i = 0; i < winCombination.length; i++) {
    if (
      // Проверяем, заполнены ли ячейки текущей комбинации текущим игроком
      document.getElementById(winCombination[i][0]).innerHTML === player &&
      document.getElementById(winCombination[i][1]).innerHTML === player &&
      document.getElementById(winCombination[i][2]).innerHTML === player
    ) {
      document
        .getElementById(winCombination[i][0])
        .classList.add("win-combination");
      document
        .getElementById(winCombination[i][1])
        .classList.add("win-combination");
      document
        .getElementById(winCombination[i][2])
        .classList.add("win-combination");

      gameOver = false; //для возможности рестарта
      winnerPlayer = player; // сохраняем победителя для отображения на экране
      disableClicks();
      showWinner();
    }
  }
}

// Функция вывода победителя на экран
function showWinner() {
  //setTimeout с нулевой задержкой
  //вызов функции только после завершения выполнения текущего кода на столько быстро, на сколько это возможно
  //чтобы изменения DOM, связанные с победителем, выполнялись после всех других синхронных операций
  setTimeout(() => {
    // Получаем путь к картинке в зависимости от победителя
    const imagePath = winnerPlayer === "X" ? "images/X.png" : "images/O.png";
    // Выводим текст и картинку
    playerText.innerHTML = `Победитель: <img src="${imagePath}" alt="${winnerPlayer}" />`;
    playerText.classList.add("winner");
  }, 0);
}

// Функция вывода ничьей на экран
function showDraw() {
  const imagePathX = "images/X.png";
  const imagePathO = "images/O.png";
  playerText.innerHTML = `Ничья <img src="${imagePathX}" alt="X" /> <img src="${imagePathO}" alt="O" />`;
  playerText.classList.add("winner");
  gameOver = true;
}
