import {EventManager} from './pubSub.js';

import {itemProject,countChilds} from './projects.js';

import {arrTodoTemplate,countTodo} from './todos.js';

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


}

function addProjectDOM(project) {    

    itemProject[0].attributes.class = `itemProject item${project.id}`;
    itemProject[0].attributes['data-project-id'] = `${countChilds}`;
    itemProject[0].attributes.style = `background-color: ${project.color}`;

    domElements(itemProject);


}

function addTodoProjectItemDOM(obj) {

    console.log(obj);
    
    arrTodoTemplate[0].attributes.class = `itemTodo${countTodo} todoStyle`;

    arrTodoTemplate[1].appendChild = `.itemTodo${countTodo}`;
    arrTodoTemplate[2].appendChild = `.itemTodo${countTodo}`;
    arrTodoTemplate[3].appendChild = `.itemTodo${countTodo}`;

    // arrTodoTemplate.forEach(item => item.appendChild = `.itemTodo${countTodo}`)

    arrTodoTemplate[2].innerText = `${obj.name}`;
    // console.log('added todo');
    domElements(arrTodoTemplate);

}

function renderTodo(arrProjects) {
    

    

}

export {init};