import './style.css'

import createElementsDom from './domCreation.js';


const arrElementsHome = [

    //  childs body

    {
        elementType: 'div',
        attributes: {class:'containerTodoLeft'},
        appendChild: 'body',
    },

    {
        elementType: 'div',
        attributes: {class:'miniP'},
        appendChild: 'body',
    },

    {
        elementType: 'div',
        attributes: {class:'containerCenterRight'},
        appendChild: 'body',
    },
        
    {
        elementType: 'div',
        attributes: {class:'containerTodoCenter'},
        appendChild: '.containerCenterRight',
    },
    // {
    //     elementType: 'div',
    //     attributes: {class:'containerTodoRight'},
    //     appendChild: '.containerCenterRight',
    // },



    //  childs containerTodoLeft

    {
        elementType: 'p',
        attributes: {class:'titleProjects'},
        innerText: 'Projects',
        appendChild: '.containerTodoLeft',
    },

    {
        elementType: 'div',
        attributes: {class:'containerProjects'},
        appendChild: '.containerTodoLeft',
    },

    {
        elementType: 'div',
        attributes: {class:'btnNewProject'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M20 12L4 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerTodoLeft',
    },

    {
        elementType: 'div',
        attributes: {class:'containerTodayAndWeek'},
        appendChild: '.containerTodoLeft',
    },

    //  childs containerTodoCenter

    {
        elementType: 'p',
        attributes: {class:'titleTodoProject'},
        innerText: 'To do',
        appendChild: '.containerTodoCenter',
    },

    {
        elementType: 'div',
        attributes: {class:'containerTodo'},
        appendChild: '.containerTodoCenter',
    },

    
    // child containerTodo

    {
        elementType: 'div',
        attributes: {class:'btnNewTodo'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M20 12L4 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerTodo',
    },

    //  childs containerTodoRight

    // {
    //     elementType: 'p',
    //     attributes: {class:'titleTodoDay'},
    //     innerText: 'To do - Today',
    //     appendChild: '.containerTodoRight',
    // },

    // {
    //     elementType: 'div',
    //     attributes: {class:'containerTodoDay'},
    //     appendChild: '.containerTodoRight',
    // },

    // childs containerProjects

    
    {
        elementType: 'div',
        attributes: {class:'itemProject'},
        appendChild: '.containerProjects',
    },

    // containerTodayAndWeek

    {
        elementType: 'div',
        attributes: {class:'itemSvg svgToday'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="6" y="10" width="12" height="2" fill="#4A4458"/><rect x="6" y="10" width="3" height="2" rx="1" fill="#D9D9D9"/></svg>' ,
        appendChild: '.containerTodayAndWeek',
    },
    {
        elementType: 'div',
        attributes: {class:'itemSvg svgWeek'},
        innerHTML:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' ,
        appendChild: '.containerTodayAndWeek',
    },

    //  childs containerTodo

    {
        elementType: 'div',
        attributes: {class:'itemTodo1'},
        appendChild: '.containerTodo',
    },

    //  childs itemTodo1

    {
        elementType: 'div',
        attributes: {class:'svgTodo'},
        innerHTML: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#25A7B9" stroke-width="2"/></svg>',
        appendChild: '.itemTodo1',
    },

    {
        elementType: 'p',
        attributes: {class:'pTodo'},
        innerText: 'eat',
        appendChild: '.itemTodo1',
    },

    //  childs containerTodoDay

    // {
    //     elementType: 'div',
    //     attributes: {class:'itemTodoDay1'},
    //     appendChild: '.containerTodoDay',
    // },

    // {
    //     elementType: 'div',
    //     attributes: {class:'svgTodo'},
    //     innerHTML: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#25A7B9" stroke-width="2"/></svg>',
    //     appendChild: '.itemTodoDay1',
    // },

    // {
    //     elementType: 'p',
    //     attributes: {class:'pTodoDay'},
    //     innerText: 'eat',
    //     appendChild: '.itemTodoDay1',
    // },




    
];

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
        attributes: {class:'itemProject'},
        appendChild: '.containerProjects',
    },
]


function domElements(arr) {

    arr.forEach(elementObject => {
        
        createElementsDom(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

const newProject = (function(){

    let colorInputColor;
    let countChilds = 1;
    const projects = [];


    function createObjProject(name,color) {
        
        this.name = name;
        this.color = color;

    };

    function createPopUpNewProject() {
    
        const btnNewProject = document.querySelector('.btnNewProject');
    
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
            itemProject[0].attributes.class = `itemProject item${countChilds}`;
            createObjs(inputText.value,colorInputColor)
            domElements(itemProject);
            changeColorBgItemProject(countChilds);            
    
        })
    }

    function createObjs(text,color) {

        let projectItem;
        if (text == '') {
            
            projectItem = new createObjProject(`Project${countChilds}`,color);

        }else{

            projectItem = new createObjProject(text,color);

        }

        projects.push(projectItem)

        console.log(projects);
        console.log(projects[0].name);

    }
    
    function changeColorBgItemProject(count) {
    
        let itemProject = document.querySelector(`.item${count}`);

        itemProject.style.setProperty("background-color", colorInputColor);
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
    
    return{createPopUpNewProject};

})();







domElements(arrElementsHome);
newProject.createPopUpNewProject();
