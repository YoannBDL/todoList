var todoList = {

    todoList: [
        {id: 0, value: "Ceci est ma première tache", done:false},
        {id: 1, value: "Ceci est ma seconde tache", done:true},
        {id: 2, value: "Ceci est ma troisième tache", done:false},
    ],

    showTodos: function () {

        var ul = document.querySelector('ul');
        ul.innerHTML = '';

        this.todoList.forEach(todo => {
            let task = document.createElement('li');
            let check = document.createElement('input');
            task.appendChild(check).setAttribute("type", "checkbox");
            check.checked = todo.done;
            task.id = todo.id;
            task.insertAdjacentText('beforeend', todo.value);
            ul.appendChild(task);
        });

    }



}

document.createElement('input')