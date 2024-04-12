
(function(){
    var object = {
        name: '',
        flag: '',
        key: ''
        };
    localStorage.clear;
    function createAppTitle(title)
    {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }
    function createTodoItemForm()
    {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');
        button.disabled = true;

        form.classList.add('input-group','mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn','btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
        
    }
    function createTodoList()
    {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }
    function createToDoItem(name)
    {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn','btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);
        return{
            item,
            doneButton,
            deleteButton,
        }
    }
    
    function createTodoApp (container, title = 'список дел', key)
    {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        for(let i =0;i<localStorage.length;++i)
        {
            object = JSON.parse(localStorage.getItem( localStorage.key(i)));
            if(object.key ==key ){
                let todoItem = createToDoItem(object.name);
                if(object.flag==true){
                    todoItem.item.classList.toggle('list-group-item-success');
                }
                todoItem.doneButton.addEventListener('click',function(){
                    todoItem.item.classList.toggle('list-group-item-success');
                    object.flag=true;
                    localStorage.setItem(object.name, JSON.stringify( object))
                    
                });
                todoItem.deleteButton.addEventListener('click',function(){
                    if(confirm('Вы уверены?')){
                        localStorage.removeItem(object.name);
                        todoItem.item.remove();
                    }
                });
                todoList.append(todoItem.item);
            }
        }

        todoItemForm.form.addEventListener('input',function(){
            if(todoItemForm.input.value!='')
            {
                todoItemForm.button.disabled=false;
            }
            else{
                todoItemForm.button.disabled=true;
            }
        })
        todoItemForm.form.addEventListener('submit',function(e){
            e.preventDefault();// запрещает перезагружать страницу
            if(!todoItemForm.input.value)
            {
                return;
            }

            let todoItem = createToDoItem(todoItemForm.input.value);
            if(key === 'mom')
            {
                object.name = todoItemForm.input.value;
                object.flag= 'false';
                object.key = 'mom';
                localStorage.setItem(object.name, JSON.stringify( object))
            }
            if(key === 'dad')
            {
                object.name = todoItemForm.input.value;
                object.flag= 'false';
                object.key = 'dad';
                localStorage.setItem(object.name, JSON.stringify( object))
            }
            if(key === 'my')
            {
                object.name = todoItemForm.input.value;
                object.flag= 'false';
                object.key = 'my';
                localStorage.setItem(object.name, JSON.stringify( object))
            }

            todoItem.doneButton.addEventListener('click',function(){
                todoItem.item.classList.toggle('list-group-item-success');
                object.flag=true;
                localStorage.setItem(object.name, JSON.stringify( object))
                
            });
            todoItem.deleteButton.addEventListener('click',function(){
                if(confirm('Вы уверены?')){
                    localStorage.removeItem(object.name);
                    todoItem.item.remove();
                }
            });

            todoList.append(todoItem.item);

            todoItemForm.input.value='';
            todoItemForm.button.disabled=true;
        })
    }
    window.createTodoApp = createTodoApp;
    
})();