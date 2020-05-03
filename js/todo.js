var todoList = {

    taskList: [
        {text: "Ceci est ma première tache", done:false},
        {text: "Ceci est ma seconde tache", done:false},
        {text: "Ceci est ma troisième tache", done:false},
    ],


    addTodo: function(text) {
        let task = {text: text, done: false};
        this.taskList.unshift(task);
    },

    changeTodo: function(id, newText) {
        this.taskList[id].text = newText;
        view.showTodos();
    },

    delTodo: function(id) {
        this.taskList.splice(id, 1);
    },

    delComplete: function () {
        this.taskList = this.taskList.filter( task => task.done === false);
    },

    toggleCompleted: function(id) {
        this.taskList[id].done = !this.taskList[id].done;
    },

    toggleAll: function() {
        let i = 0;
        this.taskList.forEach(todo => {
            if (todo.done === true){i++}
        });
        this.taskList.forEach(todo => {
            todo.done = i !== this.taskList.length ? true : false;
        });
        view.showTodos();
    }
}

var view = {

    showTodos: function () {
        var ul = document.querySelector('ul');
        ul.innerHTML = '';
        todoList.taskList.forEach(
            function(current, index){
                let task = document.createElement('li');
                let check = document.createElement('input');
                task.appendChild(check).setAttribute("type", "checkbox");
                check.className = 'check-task-button';
                check.checked = current.done;
                task.id = index;
                task.insertAdjacentText('beforeend', current.text);
                task.appendChild(this.createDeleteButton());
                ul.appendChild(task);
            }, this
        );

    },

    createDeleteButton: function() {
        var deleteButton = document.createElement('i');
        deleteButton.className = 'far fa-times-circle';
        deleteButton.setAttribute('data-selector', 'delete-button');
        return deleteButton;

    },

    delComplete: function() {
        let checkAllButton = document.querySelector('.check-all-tasks-button');
        checkAllButton.checked = false;
        todoList.delComplete();
    },

    toggleCheckAll: function() {
        let checkAllButton = document.querySelector('.check-all-tasks-button');
        let isAllChecked = todoList.taskList.map(task => task.done).includes(false);
        checkAllButton.checked = (isAllChecked ? false : true);

        // if (isAllChecked) {
        //     checkAllButton.checked = false;
        // }
        // else {
        //     checkAllButton.checked = true;
        // }
    },

    setUpEventListeners: function() {
        var todosUl = document.querySelector('.main');
        todosUl.addEventListener('click', function(event) {
            // Get the element thas was clicked on
            var elementClicked = event.target;
    
            //Check on class names
            switch (elementClicked.className) {
                case 'check-task-button' :
                    handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
                    break;  
                case 'check-all-tasks-button' :
                    handlers.toggleAll();
                    break;       
            }
            // Check on data-selector values
            switch (elementClicked.dataset.selector) {
                case 'delete-button' :
                    handlers.delTodo(parseInt(elementClicked.parentNode.id));
                    break;
                case 'delete-all-button' :
                    handlers.delComplete();
                break;
                case 'add-task-button' :
                    handlers.addTodo();
                    break
            }
        });

        todosUl.addEventListener('keypress', function(key_pressed){
            if (key_pressed.key === 'Enter'){
                handlers.addTodo();
            }
        });
    }

}

var handlers = {

    addTodo: function(){
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        if (addTodoTextInput.value) {
            todoList.addTodo(addTodoTextInput.value);
            addTodoTextInput.value = '';
            view.showTodos();
        }
    },

    delTodo: function(id){
        todoList.delTodo(id);
        view.showTodos();
    },

    delComplete: function(){
        view.delComplete();
        view.showTodos();
    },

    toggleCompleted: function(id) {
        todoList.toggleCompleted(id);
        view.toggleCheckAll();
        view.showTodos();
    },

    toggleAll: function(){
        todoList.toggleAll();
    }

}

view.showTodos();
view.setUpEventListeners();
