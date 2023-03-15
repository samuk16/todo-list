
import createElementsDom from './domCreation.js';

let colorInputColor;
let countChilds = 1;
const projects = [];

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
        
        projectItem = new createObjProject(`Project-${countChilds}`,color);
    }else{
        projectItem = new createObjProject(text,color);
    }
    projects.push(projectItem)
    // console.log(projects);
    // console.log(projects[0].name);
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



export {createPopUpNewProject};