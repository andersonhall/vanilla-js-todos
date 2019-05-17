function getTodos() {
  let todos = [];
  const storedTodos = localStorage.getItem('todo');
  if (storedTodos !== null) {
    todos = JSON.parse(storedTodos);
  }
  return todos;
}

function add(e) {
  e.preventDefault();
  let task = document.getElementById('task').value;
  const todos = getTodos();

  if (task !== '') {
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));
    document.getElementById('task').value = '';
  }

  show();
  return false;
}

function edit() {
  const taskInput = document.getElementById('task');
  const id = this.getAttribute('id');
  const todos = getTodos();

  taskInput.value = todos[id];
  taskInput.focus();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();
  return false;
}

function remove() {
  const id = this.getAttribute('id');
  const todos = getTodos();

  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();
  return false;
}

function show() {
  const todos = getTodos();

  let html = '<ul>';
  for (let i = 0; i < todos.length; i++) {
    html +=
      '<li>' +
      todos[i] +
      '<div class="buttons"><button class="edit" id="' +
      i +
      '"><i class="fas fa-pencil-alt"></i></button><button class="remove" id="' +
      i +
      '"><i class="fas fa-trash-alt"></i></button></div></li>';
  }
  html += '</ul>';

  document.getElementById('todos').innerHTML = html;

  const removeBtns = document.getElementsByClassName('remove');
  for (let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener('click', remove);
  }

  const editBtns = document.getElementsByClassName('edit');
  for (let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener('click', edit);
  }
}

document.getElementById('add').addEventListener('click', add);
show();
