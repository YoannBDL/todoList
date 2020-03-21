var todoList = {

    taskList: [
        {text: "Ceci est ma première tache", done:false},
        {text: "Ceci est ma seconde tache", done:false},
        {text: "Ceci est ma troisième tache", done:false},
    ],

    showTodos: function () {
        var ul = document.querySelector('ul');
        ul.innerHTML = '';
        for (let i=0; i<this.taskList.length; i++){
            let task = document.createElement('li');
            let check = document.createElement('input');
            task.appendChild(check).setAttribute("type", "checkbox");
            check.checked = this.taskList[i].done;
            task.id = i;
            task.insertAdjacentText('beforeend', this.taskList[i].text);
            ul.appendChild(task);
        };
    },

    addTodo: function(text) {
        let task = {text: text, done: false};
        this.taskList.push(task);
        this.showTodos();
    },

    changeTodo: function(id, newText) {
        this.taskList[id].text = newText;
        this.showTodos();
    },

    delTodo: function(id) {
        this.taskList.splice(id, 1);
        this.showTodos();
    },

    toggleCompleted: function(id) {
        this.taskList[id].done = !this.taskList[id].done;
        this.showTodos();
    },

    toggleAll: function() {

        let i = 0;
        this.taskList.forEach(todo => {
            if (todo.done === true){i++}
        });
        this.taskList.forEach(todo => {
            todo.done = i !== this.taskList.length ? true : false;
        });
        this.showTodos();
    }


}

var handlers = {

    addTodo: function(){
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        if (addTodoTextInput.value) {
            todoList.addTodo(addTodoTextInput.value);
            addTodoTextInput.value = '';
        }
    },

    toggleCompleted: function(){
        var tasks = document.querySelector('ul');
        tasks.addEventListener('click', function(todo){
            if (todo.target.tagName === 'li'){
                alert('ok!');
            }
        }, false)
    },


    toggleAll: function(){
        todoList.toggleAll();
    }



}


todoList.showTodos();