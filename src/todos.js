import createElementsDom from './domCreation.js';
import {EventManager} from './pubSub.js';
import {countChilds,projects,projectIdSelected,findProjectById} from './projects.js';
import 'tippy.js/animations/scale-subtle.css';
import tippy from 'tippy.js';

import { format, compareAsc, Interval} from 'date-fns';
import { formatDistance, subDays,eachDayOfInterval,add,getDay,getWeek,getWeekOfMonth,setWeek,startOfWeek,lastDayOfWeek,isWithinInterval,isEqual,isSameDay} from 'date-fns'
// import getDay from 'date-fns/fp/getDay'

const arrPopUpTodo = [

    {
        elementType: 'div',
        attributes: {class:'containerPopUpNewTodo'},
        appendChild: 'body',

    },

    //  childs containerPopUpNewTodo

    {
        elementType: 'div',
        attributes: {class:'btnClosePopUpTodo'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M4 4L12 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerPopUpNewTodo',
    },

    {
        elementType: 'div',
        attributes: {class:'containerName'},
        appendChild: '.containerPopUpNewTodo',

    },

    {
        elementType: 'div',
        attributes: {class:'containerDescription'},
        appendChild: '.containerPopUpNewTodo',

    },

    {
        elementType: 'div',
        attributes: {class:'containerDate'},
        appendChild: '.containerPopUpNewTodo',

    },

    {
        elementType: 'div',
        attributes: {class:'btnCreateTodo'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00033 2.66666V13.3333M13.3337 7.99999L2.66699 7.99999" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerPopUpNewTodo',
    },

    //  childs containerName

    {
        elementType: 'p',
        attributes: {class:'titleNewTodoName'},
        innerText: 'Name',
        appendChild: '.containerName',

    },

    {
        elementType: 'div',
        attributes: {class:'containerTextAndPriority'},
        appendChild: '.containerName',

    },

    {
        elementType: 'div',
        attributes: {class:'containerTextTodoName'},
        innerHTML: '<input class ="input name" type="text" name="nameTodo">',
        appendChild: '.containerTextAndPriority',

    },

    // {
    //     elementType: 'div',
    //     attributes: {class:'containerPriority'},
    //     innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9L12 16L5 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    //     appendChild: '.containerTextAndPriority',

    // },
    {
        elementType: 'div',
        attributes: {class:'containerPriority'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="prio" cx="6" cy="6" r="5.5" fill="#3D99DB"/></svg>',
        appendChild: '.containerTextAndPriority',

    },

    //  child containerPriority

    

    // {
    //     elementType: 'option',
    //     attributes: {value:"op1"},
    //     innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#DB3D3D"/></svg>',
    //     appendChild: '.dropDown',

    // },
    
    // {
    //     elementType: 'option',
    //     attributes: {value:"op2"},
    //     innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#DB763D"/></svg>',
    //     appendChild: '.dropDown',

    // },

    // {
    //     elementType: 'option',
    //     attributes: {value:"op3"},
    //     innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#3D99DB"/></svg>',
    //     appendChild: '.dropDown',

    // },
    

    //  childs containerDescription

    {
        elementType: 'p',
        attributes: {class:'titleNewTodoDescription'},
        innerText: 'Description',
        appendChild: '.containerDescription',

    },

    // {
    //     elementType: 'div',
    //     attributes: {class:'containerTextTodoDescription'},
    //     innerHTML: '<input class ="input description" type="text" name="descriptionTodo">',
    //     appendChild: '.containerDescription',

    // },
    {
        elementType: 'div',
        attributes: {class:'containerTextTodoDescription'},
        innerHTML: '<textarea class="description" cols="60">',
        appendChild: '.containerDescription',

    },

    //  childs containerDate



    {
        elementType: 'div',
        attributes: {class:'containerInputDate'},
        innerHTML: '<input class ="input date" type="date" name="dateTodo">',
        appendChild: '.containerDate',

    },
    
    

    // child containerinputText

    // {
    //     elementType: 'div',
    //     attributes: {class:'containerInputColor'},
    //     innerHTML: '<input type="color" class="inputColor">',
    //     appendChild: '.containerInputText',

    // },


];

const arrDropDown = [

    {
        elementType: 'div',
        attributes: {class:'dropDown'},
        appendChild: '.containerPriority',

    },

    //  childs dropDown


    {
        elementType: 'div',
        attributes: {class:'ddOp1 itemDd'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#DB3D3D"/></svg>',
        appendChild: '.dropDown',

    },
    {
        elementType: 'div',
        attributes: {class:'ddOp2 itemDd'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#DB763D"/></svg>',
        appendChild: '.dropDown',

    },
    {
        elementType: 'div',
        attributes: {class:'ddOp3 itemDd'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#3D99DB"/></svg>',
        appendChild: '.dropDown',

    },

]

const arrTodoTemplate= [

    {
        elementType: 'div',
        attributes: {class:'itemTodo todoStyle'},
        appendChild: '.containerTodo',
    },

    //  childs itemTodo

    {
        elementType: 'div',
        attributes: {class:'svgTodo'},
        innerHTML: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#25A7B9" stroke-width="2"/></svg>',
        appendChild: '.itemTodo',
    },

    {
        elementType: 'p',
        attributes: {class:'pTodo'},
        innerText: '',
        appendChild: '.itemTodo',
    },

    {
        elementType: 'div',
        attributes: {class:'svgTodoPriority'},
        innerHTML: '<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="svgPriority" cx="3" cy="3" r="3" fill="#CA1D1D"/></svg>',
        appendChild: '.itemTodo',
    },

    {
        elementType: 'div',
        attributes: {class:'svgTodoMenu'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.itemTodo',
    },
]

const arrTodoMenuTemplate = [

    {
        elementType: 'div',
        attributes: {class:'containerMenuTodo'},
        appendChild: '.todoStyle',
    },

    //  childs containerMenuTodo

    {
        elementType: 'div',
        attributes: {class:'containerSvgEdit'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerMenuTodo',
    },

    {
        elementType: 'div',
        attributes: {class:'containerSvgDelete'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerMenuTodo',
    },


];

const arrTodoEditTemplate = [

    {
        elementType: 'div',
        attributes: {class:'containerTodoEdit'},
        appendChild: 'body',
    },

    //  child containerTodo

    {
        elementType: 'div',
        attributes: {class:'btnClosePopUpTodo'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M4 4L12 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerTodoEdit',
    },

    {
        elementType: 'div',
        attributes: {class:'containerEditName'},
        appendChild: '.containerTodoEdit',
    },
    {
        elementType: 'div',
        attributes: {class:'containerEditDescription'},
        appendChild: '.containerTodoEdit',
    },
    {
        elementType: 'div',
        attributes: {class:'containerEditDateAndPriority'},
        appendChild: '.containerTodoEdit',
    },

    {
        elementType: 'div',
        attributes: {class:'containerBtnsCancelSave'},
        appendChild: '.containerTodoEdit',
    },


    //  child containerEditName

    {
        elementType: 'p',
        attributes: {class:'pTodoEditName'},
        innerText: 'Name',
        appendChild: '.containerEditName',
    },

    {
        elementType: 'div',
        attributes: {class:'containerInputTodoEditName'},
        innerHTML: '<input class ="input editName" type="text" name="editNameTodo">',
        appendChild: '.containerEditName',

    },

    // child containerEditDescription

    {
        elementType: 'p',
        attributes: {class:'pTodoEditName'},
        innerText: 'Description',
        appendChild: '.containerEditDescription',
    },

    {
        elementType: 'div',
        attributes: {class:'containerTodoEditDescription'},
        innerHTML: '<textarea class="editDescription" cols="50">',
        appendChild: '.containerEditDescription',

    },

    //  child containerEditDateAndPriority

    {
        elementType: 'div',
        attributes: {class:'containerTodoEditDate'},
        innerHTML: '<input class ="input editDate" type="date" name="editDateTodo">',
        appendChild: '.containerEditDateAndPriority',

    },

    {
        elementType: 'div',
        attributes: {class:'containerTodoEditPriority'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="prio" cx="6" cy="6" r="5.5" fill="#3D99DB"/></svg>',
        appendChild: '.containerEditDateAndPriority',

    },

    //  child containerBtnsCancelSave

    {
        elementType: 'div',
        attributes: {class:'containerBtnCancel'},
        innerText: 'Cancel',
        appendChild: '.containerBtnsCancelSave',
    },

    {
        elementType: 'div',
        attributes: {class:'containerBtnSave'},
        innerText: 'Save',
        appendChild: '.containerBtnsCancelSave',
    },


];

const arrPopUpDeleteConfirmation = [

    {
        elementType: 'div',
        attributes: {class:'containerDeleteConfirmation'},
        appendChild: 'body',

    },

    //  chlids containerDeleteConfirmation

    {
        elementType: 'p',
        attributes: {class:'titleDelConfirmation'},
        innerText: 'Are you sure?',
        appendChild: '.containerDeleteConfirmation',

    },

    {
        elementType: 'div',
        attributes: {class:'containerBtns'},
        appendChild: '.containerDeleteConfirmation',

    },

    //  childs containerBtns

    {
        elementType: 'div',
        attributes: {class:'containerBtnCancel btnDel'},
        innerText: 'Cancel',
        appendChild: '.containerBtns',

    },

    {
        elementType: 'div',
        attributes: {class:'containerBtnDelete btnDel'},
        innerText:'Delete',
        appendChild: '.containerBtns',

    },


];

const arrTodoTodayAndWeek = [

    {
        elementType: 'div',
        attributes: {class:'containerTodosTodayAndWeek'},
        appendChild: '.containerCenterRight',

    },

    //  childs containerTodosTodayAndWeek

    {
        elementType: 'p',
        attributes: {class:'titleTodayAndWeek'},
        innerText:'test',
        appendChild: '.containerTodosTodayAndWeek',

    },

    {
        elementType: 'div',
        attributes: {class:'todosTodayAndWeek'},
        appendChild: '.containerTodosTodayAndWeek',

    },

    //   child temporal


    // {
    //     elementType: 'div',
    //     attributes: {class:'itemTodo todoStyle test1'},
    //     appendChild: '.todosTodayAndWeek',
    // },

    //  childs itemTodo

    // {
    //     elementType: 'div',
    //     attributes: {class:'svgTodo'},
    //     innerHTML: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#25A7B9" stroke-width="2"/></svg>',
    //     appendChild: '.itemTodo',
    // },

    // {
    //     elementType: 'p',
    //     attributes: {class:'pTodo'},
    //     innerText: 'test',
    //     appendChild: '.itemTodo',
    // },

    // {
    //     elementType: 'div',
    //     attributes: {class:'svgTodoPriority'},
    //     innerHTML: '<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="svgPriority" cx="3" cy="3" r="3" fill="#CA1D1D"/></svg>',
    //     appendChild: '.itemTodo',
    // },

    // {
    //     elementType: 'div',
    //     attributes: {class:'svgTodoMenu'},
    //     innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    //     appendChild: '.itemTodo',
    // },
];

const arrTodos= [];
const arrTodosWeek = [];
const arrTodosToday = [];
let countTodo = 0;

let priorityName;

function todos(name,description,dueDate,priorityColor,priorityName,projectId,todoId) {

    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = [priorityColor,priorityName];
    this.projectId = projectId;
    this.todoId = todoId;
    this.isTipPriority = false;

    this.onHover = function() {
        if (!this.isTipPriority) {

            this.isTipPriority = true;
            
        }
    };


}

function domElements(arr) {

    arr.forEach(elementObject => {
        
        createElementsDom(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

function defaultTodo() {
    
    let todoD = new todos('clean','limpiar loco','2023-03-25','rgb(219,118,61)','Medium',0,0);
    console.log(todoD);
    // EventManager.emit('todoCreated',todoD)
    arrTodos.push(todoD)
    // countTodo++;


    return todoD;
}

function popUpTodo() {
    const btnPopUpTodo = document.querySelector('.btnNewTodo');

    // defaultTodo();
    hoverTodo();
    showMenuTodo();
    showTodayAndWeek();

    btnPopUpTodo.addEventListener('click', () => {

        domElements(arrPopUpTodo);
        createTodoObj();
        popUpPriority();
        delPopUpTodo();
    })
}

function popUpPriority() {
    
    const containerPriority = document.querySelector('.containerPriority');
    const containerTodoEditPriority = document.querySelector('.containerTodoEditPriority');
    let toggle = false;


    if (containerPriority) {

        let toggle1 = false;
        containerPriority.addEventListener('click', (e) => {

            toggle1 = !toggle1;
    
            if (toggle1) {
                
                arrDropDown[0].appendChild = '.containerPriority';
                arrDropDown[0].attributes.class = 'dropDown';

                domElements(arrDropDown);
                choosePriority(e.target)
                // console.log(toggle1);
                // console.log(arrDropDown);
                
            }else{
    
                delPopUpPriotity();
                choosePriority(e.target)
                // console.log(toggle1);   
            }
        })
    }else{

        containerTodoEditPriority.addEventListener('click', (e) => {

            toggle = !toggle;
    
            if (toggle) {
                
                arrDropDown[0].appendChild = '.containerTodoEditPriority';
                arrDropDown[0].attributes.class = 'dropDown editDropDown';

                domElements(arrDropDown);
                choosePriority(e.target)
                
            }else{
    
                delPopUpPriotity();
                choosePriority(e.target)
                
            }
        })
    }
    

}

function choosePriority(target) {
    
    const colorPrio = document.querySelector('.prio');
    const arrPriorityColors = ['#DB3D3D','#DB763D','#3D99DB'];

    if (target.classList.contains('itemDd')) {

        if (target.classList.contains('ddOp1')) {

            colorPrio.style.fill = arrPriorityColors[0];
            priorityName = 'High';

        }else if(target.classList.contains('ddOp2')){

            colorPrio.style.fill = arrPriorityColors[1];
            priorityName = 'Medium';
            
        }else{

            colorPrio.style.fill = arrPriorityColors[2];
            priorityName = 'Low';
        }
    
    }

}


function delPopUpPriotity() {
    
    const dropDown = document.querySelector('.dropDown');

    dropDown.remove()

}

function createTodoObj() {
    const btnCreateTodo = document.querySelector('.btnCreateTodo')
    const inputNameTodo = document.querySelector('.name')
    const inputDateTodo = document.querySelector('.date')
    const inputDescriptionTodo = document.querySelector('.description')
    const colorPrio = document.querySelector('.prio');

     

    btnCreateTodo.addEventListener('click', () => {
        
        
        countTodo++;

        let todo = new todos(inputNameTodo.value,inputDescriptionTodo.value,inputDateTodo.value,colorPrio.style.fill,priorityName,projectIdSelected,countTodo);

        arrTodos.push(todo);

        const project = projects.find(project => project.id == todo.projectId);

        if (project) {

            project.addTodo(todo);
        }
        addTodosToCurrentWeekArr(todo);
        addTodosToCurrentDayArr(todo);
        // console.log(arrTodosWeek);
        // console.log(projects);

    })


}

function delPopUpTodo() {

    
    const containerPopUpNewTodo = document.querySelector('.containerPopUpNewTodo');
    const btnClosePopUpTodo = document.querySelector('.btnClosePopUpTodo');

    btnClosePopUpTodo.addEventListener('click', () => {

        containerPopUpNewTodo.remove();

    })

};

function hoverTodo() {

    const containerTodo = document.querySelector('.containerTodo');

    containerTodo.addEventListener('mouseover', (e) => {

        let hoverTarget = e.target;
        let hoverTodoId = hoverTarget.dataset.todoId;
        let childPriority = hoverTarget.children[2];

        // console.log('hovertodo');

        if (hoverTodoId) {

            let todoFounded = null;

            findProjectById(projectIdSelected).todo.forEach(todo => {

                if (todo.todoId == hoverTodoId) {

                    todoFounded = todo;

                    if (!todoFounded.isTipPriority) {

                        todoFounded.onHover();
                        todoTipNamePriority(childPriority,todoFounded);
                        
                    }                    

                }

            })

        }
        
    })

}

function todoTipNamePriority(div,todo) {

    tippy(div,{

        content: `${todo.priority[1]}`,
        animation:'scale-subtle',
        inertia: true,
        placement:'top',
        theme: 'dark-todo',
    })

}

function restartTodoTipPriority() {
    
    arrTodos.forEach(todo => {

        if (todo.isTipPriority) {
            todo.isTipPriority = false;
        }

    })

    console.log(arrTodos);

}

function resetCountTodo() {
    
    countTodo = 0;
}

function findTodoById(todoId) {
    
    // let hoverTarget = e.target;
    // let hoverTodoId = hoverTarget.dataset.todoId;

    let todoFounded = null;

    findProjectById(projectIdSelected).todo.forEach(todo => {

        if (todo.todoId == todoId) {

            todoFounded = todo;
            // console.log(todo);
        }
    })

    return todoFounded;
}

function showMenuTodo() {
    
    const svgTodoMenu = document.querySelector('.svgTodoMenu');
    const containerTodo = document.querySelector('.containerTodo');
    let toggle = false;

    containerTodo.addEventListener('click', (e) => {
        
        let target = e.target;

        if (target.classList.contains('svgTodoMenu')) {

            let father = target.parentNode;
            let todoId = father.dataset.todoId;
            let divAppendChild = father.classList[0];
            // console.log(divAppendChild);

            toggle = !toggle;

            if (toggle) {

                arrTodoMenuTemplate[0].appendChild =`.${divAppendChild}`;

                EventManager.emit('createElements',arrTodoMenuTemplate)

                showEditTodo();
                showDeleteConfirm();

            }else{

                let containerMenuTodo = document.querySelector('.containerMenuTodo');

                EventManager.emit('deleteElement', containerMenuTodo)                
            }


        }

       

    });

}

function showEditTodo() {
    
    let containerMenuTodo = document.querySelector('.containerMenuTodo');

    containerMenuTodo.addEventListener('click', (e) => {

        let target = e.target;

        let todoId = target.parentNode.parentNode.dataset.todoId;
        let todoItem = target.parentNode.parentNode.children;

        let pTodo = todoItem[1]
        let svgPriority = todoItem[2].children[0].children[0];
        let typpyInstance = todoItem[2];

        if (target.classList.contains('containerSvgEdit')) {
            
            fillEditTodo(findTodoById(todoId));

            EventManager.emit('createElements',arrTodoEditTemplate);


            let textArea = document.querySelector('.editDescription');

            textArea.value = `${findTodoById(todoId).description}`;

            
            fillEditTodoNewInfo(findTodoById(todoId),pTodo,svgPriority,typpyInstance);
            delEditTodo();
            popUpPriority();
        }

    })  

}

function showDeleteConfirm(){
    
    let containerMenuTodo = document.querySelector('.containerMenuTodo');


    containerMenuTodo.addEventListener('click', (e) => {

        let target = e.target;

        let todoId = target.parentNode.parentNode.dataset.todoId;
        let todoItem = target.parentNode.parentNode;



        if (target.classList.contains('containerSvgDelete')) {
            
            EventManager.emit('createElements', arrPopUpDeleteConfirmation);

            let containerDeleteConfirmation = document.querySelector('.containerDeleteConfirmation');

            containerDeleteConfirmation.addEventListener('click', (e) => {

                let targetContainerDel = e.target;

                if (targetContainerDel.classList.contains('containerBtnDelete')) {
                    
                    EventManager.emit('deleteElement', todoItem);

                    let todoIndex = arrTodos.findIndex(todo => todo.id == todoId) ;

                    if (todoIndex !== -1){
                        
                        arrTodos.splice(todoIndex,1);

                    }

                    EventManager.emit('deleteElement', containerDeleteConfirmation);

                }

            })

            


        }

    })

    
}

function fillEditTodo(todoObj) {

    arrTodoEditTemplate[7].innerHTML = `<input class ="input editName" type="text" name="editNameTodo" value="${todoObj.name}">`;
    // arrTodoEditTemplate[9].innerHTML = `<textarea class="editDescription" cols="50" value="${todoObj.description}">`;
    arrTodoEditTemplate[10].innerHTML = `<input class ="input editDate" type="date" name="editDateTodo" value="${todoObj.dueDate}">`;
    arrTodoEditTemplate[11].innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="prio" cx="6" cy="6" r="5.5" fill="${todoObj.priority[0]}"/></svg>`;

    
}

function fillEditTodoNewInfo(todo,pTodo,svgPriority,typpyInstance) {
    
    const containerBtnSave = document.querySelector('.containerBtnSave')

    const inputEditName = document.querySelector('.editName');
    const textAreaDescription = document.querySelector('.editDescription');
    const inputEditDate = document.querySelector('.editDate');
    const editColorPriority = document.querySelector('.prio');

    let arrTodoTitleAndSvg = [todo,pTodo,svgPriority,typpyInstance];

    containerBtnSave.addEventListener('click', () => {

        todo.name = inputEditName.value;
        todo.description = textAreaDescription.value;
        todo.dueDate = inputEditDate.value;
        todo.priority = [editColorPriority.style.fill,priorityName];

        EventManager.emit('todoUpdated',arrTodoTitleAndSvg);
        verifyTodoRequirements();


    })

    
}

function delEditTodo() {
    
    const containerTodoEdit = document.querySelector('.containerTodoEdit')
    const btnClosePopUpTodo = document.querySelector('.btnClosePopUpTodo');

    btnClosePopUpTodo.addEventListener('click', () => {

        EventManager.emit('deleteElement', containerTodoEdit)

    })

}

function showTodayAndWeek() {
    
    const containerTodayAndWeek = document.querySelector('.containerTodayAndWeek');
    const containerCenterRight = document.querySelector('.containerCenterRight');

    containerTodayAndWeek.addEventListener('click', (e) => {

        let target = e.target;
        
        if (containerCenterRight.children[1]) {
            
            let titleTodayAndWeek = document.querySelector('.titleTodayAndWeek');

            verifyTodoRequirements();

            if (target.classList.contains('svgToday')) {
            
                titleTodayAndWeek.textContent = 'Today';
                EventManager.emit('renderTodos',arrTodosToday)
            }
            if (target.classList.contains('svgWeek')) {
                
                titleTodayAndWeek.textContent = 'Week';
                EventManager.emit('renderTodos',arrTodosWeek)
            }


        }else{

            verifyTodoRequirements();
            // verifyAndAddToWeek();

            if (target.classList.contains('svgToday')) {
            
                arrTodoTodayAndWeek[1].innerText = 'Today';
                EventManager.emit('createElements', arrTodoTodayAndWeek);
                EventManager.emit('renderTodos',arrTodosToday)
    
            }
            if (target.classList.contains('svgWeek')) {
                
                arrTodoTodayAndWeek[1].innerText = 'Week';
                EventManager.emit('createElements', arrTodoTodayAndWeek);
                EventManager.emit('renderTodos',arrTodosWeek)
            }

        }

    })

}

function addTodosToCurrentWeekArr(todo) {
    

    // let todoDate = new Date(todo.dueDate);
    let [yearTodo, monthTodo, dayTodo] = todo.dueDate.split('-');
    let todoDate = new Date(parseInt(yearTodo), parseInt(monthTodo) - 1, parseInt(dayTodo));
    let currentDay = new Date();
    let firstDayWeek = startOfWeek(currentDay);
    let lastDayWeek = lastDayOfWeek(currentDay);

    const currentWeek = {

        start: firstDayWeek,
        end: lastDayWeek,

    };

    if (isWithinInterval(todoDate,currentWeek)) {
        arrTodosWeek.push(todo);
        EventManager.emit('renderTodos',arrTodosWeek)


    }
}

function addTodosToCurrentDayArr(todo) {
    
    let currentDay = new Date();
    let [yearTodo, monthTodo, dayTodo] = todo.dueDate.split('-');
    let todoDate = new Date(parseInt(yearTodo), parseInt(monthTodo) - 1, parseInt(dayTodo));

    if (isSameDay(currentDay,todoDate)) {
        arrTodosToday.push(todo);    
        EventManager.emit('renderTodos',arrTodosToday)

    }

}

function verifyTodoRequirements() {

    arrTodos.forEach(todo => {

        verifyAndAddToToday(todo);
        verifyAndAddToWeek(todo);
    });

}
  
function verifyAndAddToWeek(todo) {

    let [yearTodo, monthTodo, dayTodo] = todo.dueDate.split('-');
    let todoDate = new Date(parseInt(yearTodo), parseInt(monthTodo) - 1, parseInt(dayTodo));
    let currentDay = new Date();
    let firstDayWeek = startOfWeek(currentDay);
    let lastDayWeek = lastDayOfWeek(currentDay);

    const currentWeek = {
      start: firstDayWeek,
      end: lastDayWeek,
    };

    if (!isWithinInterval(todoDate,currentWeek)) {

        let todoWeekIndex = arrTodosWeek.findIndex(todoItem => todoItem.todoId == todo.todoId );

        if (todoWeekIndex !== -1){

            arrTodosWeek.splice(todoWeekIndex,1)
            EventManager.emit('delTodosTW',)
            EventManager.emit('renderTodos',arrTodosWeek)
            // console.log('no estaba, se agrego al array week');

        }

    }else{

        if (!arrTodosWeek.some(todoItem => todoItem.todoId === todo.todoId)) {

            arrTodosWeek.push(todo);
            EventManager.emit('renderTodos', arrTodosWeek);
        // console.log('se agrego al array week');

        }
    }
}

function verifyAndAddToToday(todo) {

    
    let currentDay = new Date();
    let [yearTodo, monthTodo, dayTodo] = todo.dueDate.split('-');
    let todoDate = new Date(parseInt(yearTodo), parseInt(monthTodo) - 1, parseInt(dayTodo));

    if (!isSameDay(currentDay,todoDate)) {
            
        let todoTodayIndex = arrTodosToday.findIndex(todoItem => todoItem.todoId == todo.todoId ) ;

        if (todoTodayIndex !== -1){
                
            arrTodosToday.splice(todoTodayIndex,1);
            EventManager.emit('delTodosTW',)
            EventManager.emit('renderTodos',arrTodosToday)
            // console.log('no estaba, se agrego al array today');

        }
            
    }else{

            const todoTodayIndex = arrTodosToday.findIndex(todoItem => todoItem.todoId == todo.todoId );
        
            if (todoTodayIndex === -1) {
              arrTodosToday.push(todo); 
              EventManager.emit('renderTodos', arrTodosToday);
            }
        
            // arrTodosToday.push(todo);
            // EventManager.emit('delTodosTW',)
            // EventManager.emit('renderTodos',arrTodosToday)
            // console.log('ya esta en el array today');

    }
}
  

export {popUpTodo,defaultTodo,arrTodoTemplate,countTodo,restartTodoTipPriority,resetCountTodo};