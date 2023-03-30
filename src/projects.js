
import createElementsDom from './domCreation.js';

import {EventManager} from './pubSub.js';

import {defaultTodo} from './todos.js';


let colorInputColor;
let countChilds = 0;
const projects = [];

let projectIdSelected = 0;

const arrNewProject = [

    {
        elementType: 'div',
        attributes: {class:'containerNewProject'},
        appendChild: '.containerTodoLeft',

    },

    //  childs containerNewProject

    {
        elementType: 'p',
        attributes: {class:'titleNewProject'},
        innerText: 'Name',
        appendChild: '.containerNewProject',

    },

    {
        elementType: 'div',
        attributes: {class:'btnClosePopUp'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M4 4L12 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerNewProject',
    },

    {
        elementType: 'div',
        attributes: {class:'containerInputText'},
        innerHTML: '<input class ="inputText" type="text" name="nameProject" required>',
        appendChild: '.containerNewProject',

    },
    
    {
        elementType: 'div',
        attributes: {class:'btnCreateProject'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00033 2.66666V13.3333M13.3337 7.99999L2.66699 7.99999" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerNewProject',
    },

    // child containerinputText

    {
        elementType: 'div',
        attributes: {class:'containerInputColor'},
        innerHTML: '<input type="color" class="inputColor">',
        appendChild: '.containerInputText',

    },


];

const itemProject = [
    {
        elementType: 'div',
        attributes: {class:'itemProject', 'data-project-id': '0',style:"background-color: #25A7B9;"},
        appendChild: '.containerProjects',
    },
]

function domElements(arr) {

    arr.forEach(elementObject => {
        
        createElementsDom(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

function createObjProject(projectName,projectColor,projectId) {
    
    this.name = projectName;
    this.color = projectColor;
    this.id = projectId;
    this.todo = [];

    this.addTodo = function(obj){

        this.todo.push(obj);
        EventManager.emit('todoCreated', obj);

    }
};

function defaultProject() {
    
    // const containerTodo = document.querySelector('.containerTodo');
    let titleTodoProject = document.querySelector('.titleTodoProject');

    createObjs('default','#25A7B9',0);
     projects[0].addTodo(defaultTodo())
    titleTodoProject.innerText = `To do - ${findNameProjectById(projects[0].id)}`;
    // itemProject[0].attributes.class = `itemProject item${projects[0].id} selected`;

    // domElements(itemProject);
    
    // console.log('defaul creado en projects');
    // console.log(projects);

};

function changeProject() {
    
    let titleTodoProject = document.querySelector('.titleTodoProject');
    const containerProjects = document.querySelector('.containerProjects');


    containerProjects.addEventListener('click', (e) => {

        let projectTarget = e.target;
        let projectId = projectTarget.dataset.projectId;
        projectIdSelected = projectId;


        titleTodoProject.innerText = `To do - ${findNameProjectById(projectId)}`;
        
        const projectObjSelected = projects.find(project => project.id == projectId);
        
        // console.log(projectId);
        // console.log(projects);
        console.log(projectObjSelected);

        EventManager.emit('changeProject',projectObjSelected.todo);

    });


}

function findNameProjectById(projectId) {

    let foundProject = null;

    projects.forEach((project) => {

        if (project.id == projectId) {

            foundProject = project;

        }
    });

    return foundProject.name;
}

function createPopUpNewProject() {

    const btnNewProject = document.querySelector('.btnNewProject');

    defaultProject();
    changeProject()

    btnNewProject.addEventListener('click', () => {

        domElements(arrNewProject);
        closeCreatorProject();
        addNewProject();
        syncInputColor();
        getColorFromInputColor()

    });


}

function addNewProject() {

    const btnAddProject = document.querySelector('.btnCreateProject'); 
    const inputText = document.querySelector('.inputText');
    
    btnAddProject.addEventListener('click', () => {

        countChilds++;
        createObjs(inputText.value,colorInputColor,countChilds);
        // itemProject[0].attributes.class = `itemProject item${countChilds}`;
        // itemProject[0].attributes['data-project-id'] = `${countChilds}`;
        
        // domElements(itemProject);
        // changeColorBgItemProject(countChilds);            

    })
}
function createObjs(projetName,color,projectId) {
    let projectItem;

    if (projetName == '') {

        projectItem = new createObjProject(`Project-${countChilds}`,color,projectId);
        EventManager.emit('projectCreated',projectItem)

    }else{

        projectItem = new createObjProject(projetName,color,projectId);
        EventManager.emit('projectCreated',projectItem)
        // EventManager.on('todoAdded', function(project) {
        //         console.log('Se agregó un todo al proyecto ' + project.name);
            
        // });
    }
    projects.push(projectItem);
    // projects[0].addTodo(new todos('hola', '2023-03-18'))
    // console.log(projects);
    // console.log(projects);
    // console.log(projects[0].name);
}


function syncInputColor() {
    
    const inputColor = document.querySelector('.inputColor');
    inputColor.addEventListener('input', () => {

        document.documentElement.style.setProperty("--divColorInput", inputColor.value);

    })

}

function getColorFromInputColor() {
    
    const inputColor = document.querySelector('.inputColor');
    inputColor.addEventListener('input', () => {

        colorInputColor = inputColor.value;
    })


}

function closeCreatorProject() {

    const containerTodoLeft = document.querySelector('.containerTodoLeft');
    const btnClosePopUp = document.querySelector('.btnClosePopUp');
    const containerNewProject = document.querySelector('.containerNewProject');


    btnClosePopUp.addEventListener('click', () => {

        containerTodoLeft.removeChild(containerNewProject);

    })

};



export {createPopUpNewProject,defaultProject,itemProject,countChilds,projects,projectIdSelected};