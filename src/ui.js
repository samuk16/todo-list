import {EventManager} from './pubSub.js';

import {itemProject,countChilds,projectIdSelected,findColorProjectById,findProjectById} from './projects.js';

import {arrTodoTemplate,countTodo,checkTodoDone} from './todos.js';

import createElementsDom from './domCreation.js';

function domElements(arr) {

    arr.forEach(elementObject => {
        
        createElementsDom(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

function init() {
    

    EventManager.on('projectCreated', addProjectDOM);
    
    EventManager.on('todoCreated', addTodoProjectItemDOM);

    EventManager.on('changeProject', renderTodo);
    
    EventManager.on('createElements', domElements);

    EventManager.on('deleteElement', delElements);

    EventManager.on('todoUpdated', editTodo);
    
    EventManager.on('renderTodos', renderTodosTodayAndWeek);

    EventManager.on('delTodosTW', delTodosTodayAndWeek);

}

function addProjectDOM(project) {    

    itemProject[0].attributes.class = `itemProject item${project.id}`;
    itemProject[0].attributes['data-project-id'] = `${countChilds}`;
    itemProject[0].attributes.style = `background-color: ${project.color}`;

    domElements(itemProject);
    // projectTipName();

}

function addTodoProjectItemDOM(obj) {
    
    // console.log(obj);
    arrTodoTemplate[0].appendChild = `.containerTodo`;
    arrTodoTemplate[0].attributes.class = `itemTodo${countTodo} todoStyle`;
    arrTodoTemplate[0].attributes['data-todo-id'] = `${countTodo}`;


    arrTodoTemplate[1].appendChild = `.itemTodo${countTodo}`;
    arrTodoTemplate[2].appendChild = `.itemTodo${countTodo}`;
    arrTodoTemplate[3].appendChild = `.itemTodo${countTodo}`;
    arrTodoTemplate[4].appendChild = `.itemTodo${countTodo}`;
    
    arrTodoTemplate[1].innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circlePath" cx="10" cy="10" r="9" stroke="${findProjectById(obj.projectId).color}" stroke-width="2"/></svg>`;
    // arrTodoTemplate[1].attributes['data-todo-id-app'] = `${obj.todoId}`;
    arrTodoTemplate[1].attributes.class = `svgTodo svgTodo${obj.todoId}`;

    arrTodoTemplate[3].innerHTML = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="svgPriority" cx="3" cy="3" r="3" fill="${obj.priority[0]}"/></svg>`;
    
    // console.log('todoagregado');
    
    arrTodoTemplate[2].innerText = `${obj.name}`;

    domElements(arrTodoTemplate);

}

function renderTodo(arrTodos) {

    let countClass = 0;

    delTodos();

    arrTodos.forEach(todo => {

        arrTodoTemplate[0].appendChild = `.containerTodo`;
        arrTodoTemplate[0].attributes.class = `itemTodo${countClass} todoStyle`;
        arrTodoTemplate[0].attributes['data-todo-id'] = `${todo.todoId}`;


        arrTodoTemplate[1].appendChild = `.itemTodo${countClass}`;
        arrTodoTemplate[2].appendChild = `.itemTodo${countClass}`;
        arrTodoTemplate[3].appendChild = `.itemTodo${countClass}`;
        arrTodoTemplate[4].appendChild = `.itemTodo${countClass}`;

        checkTodoDone(todo);
        // arrTodoTemplate[1].innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circlePath" cx="10" cy="10" r="9" stroke="${findProjectById(todo.projectId).color}" stroke-width="2"/></svg>`;
        arrTodoTemplate[1].attributes.class = `svgTodo svgTodo${todo.todoId}`;
        arrTodoTemplate[3].innerHTML = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="svgPriority" cx="3" cy="3" r="3" fill="${todo.priority[0]}"/></svg>`;

        // arrTodoTemplate.forEach(item => item.appendChild = `.itemTodo${countTodo}`)

        arrTodoTemplate[2].innerText = `${todo.name}`;
        // console.log('added todo');
        domElements(arrTodoTemplate);
        countClass++;
    })
    // console.log('hechoRenderTodo');
    

}

function renderTodosTodayAndWeek(arrTodos) {
    
    let countClass = 0;

    delTodosTodayAndWeek();

    arrTodos.forEach(todo => {


        arrTodoTemplate[0].appendChild = `.todosTodayAndWeek`;
        arrTodoTemplate[0].attributes.class = `itemTodoTW${countClass} todoStyle`;
        arrTodoTemplate[0].attributes['data-todo-id'] = `${todo.todoId}`;


        arrTodoTemplate[1].appendChild = `.itemTodoTW${countClass}`;
        arrTodoTemplate[2].appendChild = `.itemTodoTW${countClass}`;
        arrTodoTemplate[3].appendChild = `.itemTodoTW${countClass}`;
        arrTodoTemplate[4].appendChild = `.itemTodoTW${countClass}`;


        arrTodoTemplate[1].innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="${findProjectById(todo.projectId).color}" stroke-width="2"/></svg>`;
        arrTodoTemplate[3].innerHTML = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="svgPriority" cx="3" cy="3" r="3" fill="${todo.priority[0]}"/></svg>`;

        // arrTodoTemplate.forEach(item => item.appendChild = `.itemTodo${countTodo}`)

        arrTodoTemplate[2].innerText = `${todo.name}`;
        // console.log('added todo');
        domElements(arrTodoTemplate);
        countClass++;
    })

}

function delTodos() {

    const containerTodo = document.querySelector('.containerTodo');
    const btnNewTodo = document.querySelector('.btnNewTodo');

    // while (containerTodo.firstChild) {
    //     containerTodo.removeChild(containerTodo.firstChild);
    //   }
    while (containerTodo.firstChild !== btnNewTodo) {
        containerTodo.removeChild(containerTodo.firstChild);
    }

    while (containerTodo.lastChild !== btnNewTodo) {
        containerTodo.removeChild(containerTodo.lastChild);
    }

}

function delTodosTodayAndWeek() {
    const containerTodosTodayAndWeek = document.querySelector('.todosTodayAndWeek');


    // if (containerTodosTodayAndWeek.children[2]) {
        
    // }
    // while (containerTodosTodayAndWeek.children[2].firstChild) {
    //     containerTodosTodayAndWeek.removeChild(containerTodosTodayAndWeek.children[2].firstChild);
    // }

    if (containerTodosTodayAndWeek) {

        while (containerTodosTodayAndWeek.firstChild) {
            containerTodosTodayAndWeek.removeChild(containerTodosTodayAndWeek.firstChild);
        }    
    }
    // while (containerTodosTodayAndWeek.firstChild) {
    //     containerTodosTodayAndWeek.removeChild(containerTodosTodayAndWeek.firstChild);
    // }
    
}

function delElements(element) {
    
    element.remove();

}


function editTodo(arr) {
    
    let instance = arr[3]._tippy;
    // console.log(pTodo);
    // console.log(svgPriority);

    arr[1].textContent = arr[0].name;
    arr[2].style.fill = arr[0].priority[0];
    instance.setContent(`${arr[0].priority[1]}`)
}

export {init};