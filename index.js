const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
// Массив для хранения задач
let tasks = [];

// Разрешить использование JSON в запросах
app.use(express.json());
app.use(cors())
// Получение списка всех задач
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Добавление новой задачи
app.post('/tasks', (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.send('Задача добавлена успешно.');
});

// Отображение задачи по индексу
app.get('/tasks/:index', (req, res) => {
  const index = req.params.index;
  const task = tasks[index];

  if (!task) {
    res.status(404).send('Задача не найдена.');
  } else {
    res.json(task);
  }
});

// Редактирование задачи по индексу
app.put('/tasks/:index', (req, res) => {
  const index = req.params.index;
  const task = req.body.task;

  if (!task) {
    res.status(400).send('Некорректные данные.');
  } else if (!tasks[index]) {
    res.status(404).send('Задача не найдена.');
  } else {
    tasks[index] = task;
    res.send('Задача успешно обновлена.');
  }
});

// Удаление задачи по индексу
app.delete('/tasks/:index', (req, res) => {
  const index = req.params.index;

  if (!tasks[index]) {
    res.status(404).send('Задача не найдена.');
  } else {
    tasks.splice(index, 1);
    res.send('Задача успешно удалена.');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
