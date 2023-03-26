import createElementsDom from './domCreation.js';


const arrPopUpTodo = [

    {
        elementType: 'div',
        attributes: {class:'containerPopUpNewTodo'},
        appendChild: 'body',

    },

    //  childs containerPopUpNewTodo

    {
        elementType: 'div',
        attributes: {class:'btnClosePopUp'},
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
        attributes: {class:'itemTodo'},
        appendChild: '.containerTodo',
    },

    //  childs itemTodo

    {
        elementType: 'div',
        attributes: {class:'svgTodo'},
        innerHTML: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#25A7B9" stroke-width="2"/></svg>',
        appendChild: '.itemTodo1',
    },

    {
        elementType: 'p',
        attributes: {class:'pTodo'},
        appendChild: '.itemTodo1',
    },

    {
        elementType: 'div',
        attributes: {class:'svgTodoMenu'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.itemTodo1',
    },
]

const arrTodos= [];

function todos(name,description,dueDate,priority) {

    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;

}

function domElements(arr) {

    arr.forEach(elementObject => {
        
        createElementsDom(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

function defaultTodo() {
    
    let todoD = new todos('clean','limpiar loco','2023-03-25','rgb(219,118,61)');

    return todoD;
}

function renderTodo(container,todo) {
    
    domElements()    


}

function popUpTodo() {
    const btnPopUpTodo = document.querySelector('.btnNewTodo');

    btnPopUpTodo.addEventListener('click', () => {

        domElements(arrPopUpTodo);
        addTodo();
        popUpPriority();
    })
}

function popUpPriority() {
    
    const containerPriority = document.querySelector('.containerPriority');
    let toggle = false;

    containerPriority.addEventListener('click', (e) => {

        toggle = !toggle;

        if (toggle) {
           
            domElements(arrDropDown);
            choosePriority(e.target)
            
        }else{

            delPopUpPriotity();
            choosePriority(e.target)
            
        }
    })

}

function choosePriority(target) {
    
    const colorPrio = document.querySelector('.prio');
    const arrPriorityColors = ['#DB3D3D','#DB763D','#3D99DB'];

    if (target.classList.contains('itemDd')) {
        


        if (target.classList.contains('ddOp1')) {

            colorPrio.style.fill = arrPriorityColors[0];

        }else if(target.classList.contains('ddOp2')){

            colorPrio.style.fill = arrPriorityColors[1];

            
        }else{

            colorPrio.style.fill = arrPriorityColors[2];
        }
    
    }

}


function delPopUpPriotity() {
    
    const dropDown = document.querySelector('.dropDown');

    dropDown.remove()

}

function addTodo() {
    const btnCreateTodo = document.querySelector('.btnCreateTodo')
    const inputNameTodo = document.querySelector('.name')
    const inputDateTodo = document.querySelector('.date')
    const inputDescriptionTodo = document.querySelector('.description')
    const colorPrio = document.querySelector('.prio');

     

    btnCreateTodo.addEventListener('click', () => {

        console.log(inputNameTodo.value);
        console.log(colorPrio.style.fill);
        console.log(inputDescriptionTodo.value);
        console.log(inputDateTodo.value);

        let todo = new todos(inputNameTodo.value,inputDescriptionTodo.value,inputDateTodo.value,colorPrio.style.fill);

        // arrTodos.push(todo);
        // console.log(arrTodos);
        return todo
    })


}



export {popUpTodo,defaultTodo};