var todoList = {

    taskList: [
        {text: "Ceci est ma première tache", done:false},
        {text: "Ceci est ma seconde tache", done:true},
        {text: "Ceci est ma troisième tache", done:false},
    ],

    showTodos: function () {

        var ul = document.querySelector('ul');
        var id = 0;
        ul.innerHTML = '';

        this.taskList.forEach(todo => {
            let task = document.createElement('li');
            let check = document.createElement('input');
            task.appendChild(check).setAttribute("type", "checkbox");
            check.checked = todo.done;
            task.id = id;
            task.insertAdjacentText('beforeend', todo.text);
            ul.appendChild(task);
            id += 1;
        });

    },

    addTodo: function(text) {
        let task = {text: text, done: false};
        this.taskList.push(task);
        this.showTodos();
    },

    changeTodo: function(position, newText) {
        this.taskList[position].text = newText;
        this.showTodos();
    },

    delTodo: function(id) {
        this.taskList.splice(id, 1);
        this.showTodos();
    }


}

todoList.showTodos();