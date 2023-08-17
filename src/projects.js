
import createElementsDom from './domCreation.js';

import {EventManager} from './pubSub.js';

import {defaultTodo,restartTodoTipPriority} from './todos.js';

import tippy from 'tippy.js';

import 'tippy.js/themes/light.css';

import 'tippy.js/animations/scale-subtle.css';

let colorInputColor;
let countChilds = 0;
let projects = [];
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
const arrNewProjectMobile = [

    {
        elementType: 'div',
        attributes: {class:' containerNewProjectM'},
        appendChild: 'body',

    },

    //  childs containerNewProject

    {
        elementType: 'p',
        attributes: {class:'titleNewProject'},
        innerText: 'Name',
        appendChild: '.containerNewProjectM',

    },

    {
        elementType: 'div',
        attributes: {class:'btnClosePopUp'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M4 4L12 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerNewProjectM',
    },

    {
        elementType: 'div',
        attributes: {class:'containerInputText'},
        innerHTML: '<input class ="inputText" type="text" name="nameProject" required>',
        appendChild: '.containerNewProjectM',

    },
    
    {
        elementType: 'div',
        attributes: {class:'btnCreateProject'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00033 2.66666V13.3333M13.3337 7.99999L2.66699 7.99999" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerNewProjectM',
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

const itemProjectMobile = [

    {
        elementType: 'div',
        attributes: {class:'containerItemProjectMobile'},
        appendChild: '.containerItemsProjects',

    },


    {
        elementType: 'div',
        attributes: {class:'colorItemProject',style:"background-color: #25A7B9;"},
        appendChild: '.containerItemProjectMobile',
    },

    {
        elementType: 'p',
        attributes: {class:'titleProjectMobile'},
        innerText: 'Name',
        appendChild: '.containerItemProjectMobile',

    },

    
]

const arrContainerProjectsMobile = [

    {
        elementType: 'div',
        attributes: {class:'containerProjectsMobile',style:'position:absolute; bottom: 50px;'},
        appendChild: 'body',

    },


    {
        elementType: 'div',
        attributes: {class:'outerM'},
        appendChild: '.containerProjectsMobile',

    },
    {
        elementType: 'div',
        attributes: {class:'containerItemsProjects'},
        appendChild: '.outerM',

    },

    {
        elementType: 'div',
        attributes: {class:'btnNewProjectM'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M20 12L4 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerProjectsMobile',
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
    this.isTipName = false;

    this.onHover = function() {
        if (!this.isTipName) {

            this.isTipName = true;
            
        }
    };

    this.addTodo = function(obj){

        this.todo.push(obj);
        EventManager.emit('todoCreated', obj);

    }
};

function defaultProject() {
    

    if (!projects[0]) {

        let titleTodoProject = document.querySelector('.titleTodoProject');

        createObjs('default','#25A7B9',0);

        EventManager.emit('transitionGhostEntryProjects','.itemProject')

        projects[0].addTodo(defaultTodo())

        titleTodoProject.innerText = `To do - ${findProjectById(projects[0].id).name}`;
    }

    
    

};

function changeProject() {
    
    let titleTodoProject = document.querySelector('.titleTodoProject');
    let containerProjects = document.querySelector('.containerProjects');
    let containerProjectsM = document.querySelector('.containerProjectsMobile');

    containerProjects.addEventListener('click', (e) => {

        let projectTarget = e.target;

        if (!projectTarget.classList.contains('containerProjects')) {

            let projectId = projectTarget.dataset.projectId;
            projectIdSelected = projectId;


            EventManager.emit('transitionChangeTitle','.titleTodoProject')

            setTimeout(() => {

                titleTodoProject.innerText = `To do - ${findProjectById(projectId).name}`;

            },200)


            const projectObjSelected = projects.find(project => project.id == projectId);
            
            EventManager.emit('changeProject',projectObjSelected.todo);
            let arrTagets = ['.TP'];
            EventManager.emit('transitionGhostOut',arrTagets)

            findProjectById(projectId).todo.forEach( todo => {
                
                if (todo.isTipPriority == true) {
                    todo.isTipPriority = false;
                }

            } )

            let containerTodo = document.querySelector('.containerTodo');
            let childs = Array.from(containerTodo.children);
            
            childs.forEach((todo) => {
                if (!todo.classList.contains('btnNewTodo')) {

                    let colorBgBtn = getComputedStyle(todo.children[3]).getPropertyValue('--backContainerSecond');
                    let arrColorAndBtn1 = [todo.children[3],colorBgBtn,'#3f3852'];

                    EventManager.emit('transitionBgBtn',arrColorAndBtn1)
                }
            })

         

            restartTodoTipPriority();
        }       

    });


}

function findProjectById(projectId) {

    let foundProject = null;
    projects.forEach((project) => {

        if (project.id == projectId) {

            foundProject = project;

        }
    });

    return foundProject;
}

function createPopUpNewProject() {

    const btnNewProject = document.querySelector('.btnNewProject');

    let colorBgBtn = getComputedStyle(btnNewProject).getPropertyValue('--backgroundMain');

    let arrColorAndBtn = [btnNewProject,colorBgBtn,'#2b2636'];

    EventManager.emit('transitionBgBtn', arrColorAndBtn)
    
    exist();
    defaultProject();
    changeProject()
    hoverProject();
    todayAndWeekTipName();
    projectSelected();
    
    btnNewProject.addEventListener('click', (e) => {

        EventManager.emit('transitionBtnClick',btnNewProject)

        let target = e.target;
        if (!target.parentNode.lastChild.classList.contains('containerNewProject')) {


            domElements(arrNewProject);
            
            let containerNewProject = document.querySelector('.containerNewProject');

            EventManager.emit('animationEntry', containerNewProject)

            closeCreatorProject();
            addNewProject();
            syncInputColor();
            getColorFromInputColor()
        }        

    });

    

}

function addNewProject() {

    const btnAddProject = document.querySelector('.btnCreateProject'); 
    const inputText = document.querySelector('.inputText');
    let containerProjects = document.querySelector('.containerProjects');

    let colorBgBtn = getComputedStyle(btnAddProject).getPropertyValue('--backContainer');

    let arrColorAndBtn1 = [btnAddProject,colorBgBtn,'#2b2636'];

    EventManager.emit('transitionBgBtn',arrColorAndBtn1)


    btnAddProject.addEventListener('click', () => {
        countChilds++;

        EventManager.emit('transitionHeight', containerProjects)

        createObjs(inputText.value,colorInputColor,countChilds);

        EventManager.emit('transitionGhostEntryProjects', containerProjects.lastChild)       
        
        EventManager.emit('projectAddedFlash', colorInputColor)

        const containerNewProject = document.querySelector('.containerNewProject');
        const containerNewProjectM = document.querySelector('.containerNewProjectM');

        containerNewProject ? EventManager.emit('animationOut', containerNewProject) : EventManager.emit('animationOut', containerNewProjectM); 
        setTimeout(() => {

            if (containerNewProject) {
                EventManager.emit('deleteElement', containerNewProject)                
            }else{
                EventManager.emit('deleteElement', containerNewProjectM)
            }

        },100)

    })
}
function createObjs(projetName,color,projectId) {
    let projectItem;
    let containerProjects = document.querySelector('.containerProjects');
    if (projetName == '') {

        projectItem = new createObjProject(`Project-${countChilds}`,color,projectId);
        EventManager.emit('projectCreated',projectItem)
    }else{

        projectItem = new createObjProject(projetName,color,projectId);
        EventManager.emit('projectCreated',projectItem)
      
    }
    projects.push(projectItem);
    populateStorageP();

 
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

    const btnClosePopUp = document.querySelector('.btnClosePopUp');
    const containerNewProject = document.querySelector('.containerNewProject');
    const containerNewProjectM = document.querySelector('.containerNewProjectM');

    let colorBgBtn = getComputedStyle(btnClosePopUp).getPropertyValue('--backContainer');

    let arrColorAndBtn1 = [btnClosePopUp,colorBgBtn,'#2b2636'];

    EventManager.emit('transitionBgBtn',arrColorAndBtn1)

    btnClosePopUp.addEventListener('click', () => {

        containerNewProject ? EventManager.emit('animationOut', containerNewProject) : EventManager.emit('animationOut', containerNewProjectM); 

        setTimeout(() => {

            if (containerNewProject) {
                EventManager.emit('deleteElement', containerNewProject)                
            }else{
                EventManager.emit('deleteElement', containerNewProjectM)
            }

        },100)

    })

};

function hoverProject() {

    const containerProjects = document.querySelector('.containerProjects');

    containerProjects.addEventListener('mouseover', (e) => {

        let hoverTarget = e.target;
        let hoverProjectId = hoverTarget.dataset.projectId;
        
        if (hoverProjectId) {

            if (!findProjectById(hoverProjectId).isTipName) {

                findProjectById(hoverProjectId).onHover();
                projectTipName(hoverTarget,hoverProjectId)
            }
        }
        
    })

}

function projectTipName(div,projectId) {

    tippy(div,{

        content: `${findProjectById(projectId).name}`,
        animation:'scale-subtle',
        inertia: true,
        placement:'right',
        theme: 'dark-project',
    })

}

function todayAndWeekTipName(){
    
    let svgToday = document.querySelector('.svgToday')
    let svgWeek = document.querySelector('.svgWeek')


    tippy(svgToday,{
        content: `Today`,
        animation:'scale-subtle',
        inertia: true,
        placement:'right',
        theme: 'dark-project',

    })
    tippy(svgWeek,{
        content: `Week`,
        animation:'scale-subtle',
        inertia: true,
        placement:'right',
        theme: 'dark-project',

    })
}

function projectSelected() {
    
    const containerProjects = document.querySelector('.containerProjects');

    containerProjects.addEventListener('click', (e) => {

        let clickedTarget = e.target;
        let clickedProjectId = clickedTarget.dataset.projectId;

        if (clickedProjectId) {

            let clicked = document.querySelector('.clicked');

            if (clicked) {
                
                clicked.style.outlineWidth = '0px';
                clicked.classList.remove('clicked')
            }

            let projectClicked = document.querySelector(`.item${clickedProjectId}`);
            projectClicked.classList.add('clicked')

            EventManager.emit('transitionProjectSelected', projectClicked)

        }

    })

}

function populateStorageP() {

    const serializedArray = JSON.stringify(projects, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        }
        return value;
    });

    localStorage.setItem('arrProjects', serializedArray)
    localStorage.setItem('countChilds', countChilds)

}

function setProjects() {
    
    let countChildSaved = localStorage.getItem('countChilds');
  
    
    const storedArray = localStorage.getItem('arrProjects');

    const deserializedArray = JSON.parse(storedArray, (key, value) => {

        if (typeof value === 'string' && value.includes('function')) {

          return eval(`(${value})`);
        }
        return value;
    });

    deserializedArray.forEach(objP => {

        if (objP.isTipName == true) {
            objP.isTipName = false;
        }

        objP.todo.forEach(todo => {

            if (todo.isTipPriority == true) {
                todo.isTipPriority = false;
            }

        })
    })

    projects = deserializedArray;
    countChilds = countChildSaved;
    EventManager.emit('renderProjects',projects)
    EventManager.emit('transitionGhostEntryProjects','.itemProject')

    // localStorage.clear();
    renderLastProject();
}


function exist() {

    if(!localStorage.getItem('countChilds')) {
        populateStorageP();
        
    }else {
        setProjects();
    }
}

function renderLastProject() {
    
    let lastIdProject = localStorage.getItem('lastProjectIdSelected');
    let itemProject = document.querySelector(`.item${lastIdProject}`);
    let titleTodoProject = document.querySelector('.titleTodoProject');

    itemProject.classList.add('clicked')


    EventManager.emit('transitionChangeTitle','.titleTodoProject')

    setTimeout(() => {

                titleTodoProject.innerText = `To do - ${findProjectById(lastIdProject).name}`;

    },200)


    const projectObjSelected = projects.find(project => project.id == lastIdProject);
            
    EventManager.emit('changeProject',projectObjSelected.todo);

    let arrTagets = ['.todoStyle'];

    EventManager.emit('transitionGhostOut',arrTagets)

    let containerTodo = document.querySelector('.containerTodo');

    let childs = Array.from(containerTodo.children);
            
    childs.forEach((todo) => {
        if (!todo.classList.contains('btnNewTodo')) {

            let colorBgBtn = getComputedStyle(todo.children[3]).getPropertyValue('--backContainerSecond');
            let arrColorAndBtn1 = [todo.children[3],colorBgBtn,'#3f3852'];

            EventManager.emit('transitionBgBtn',arrColorAndBtn1)
        }
    })

         

    restartTodoTipPriority();

}

function saveLastProjectSelected() {
    
    window.addEventListener('beforeunload', () => {

        localStorage.setItem('lastProjectIdSelected', projectIdSelected)
        populateStorageP();

    })

}

function menuMobile() {
    
    const btnProjectsM = document.querySelector('.containerProjectsM');

    btnProjectsM.addEventListener('click', () => {  

        const containerProjectsMobile = document.querySelector('.containerProjectsMobile');
        
        if (!containerProjectsMobile) {
            
            const coords = btnProjectsM.getBoundingClientRect();

            arrContainerProjectsMobile[0].attributes.style = `bottom:0px; left:${coords.left - 28.9}px;`;

            EventManager.emit('createElements', arrContainerProjectsMobile)

            EventManager.emit('fadeInAndSlideUp', '.containerProjectsMobile')

            EventManager.emit('renderProjectsMobile', projects)
            popUpNewProjectMobile();
            changeProjectMobile();
            

        }else{

            EventManager.emit('fadeOutAndSlideDown', '.containerProjectsMobile')

            setTimeout(() => {
                EventManager.emit('deleteElement', containerProjectsMobile)                
            }, 175);
        }

    })

}

function popUpNewProjectMobile() {
    
    const btnNewProject = document.querySelector('.btnNewProjectM');
    const containerProjectsMobile = document.querySelector('.containerProjectsMobile');

    btnNewProject.addEventListener('click', () => {

        EventManager.emit('fadeOutAndSlideDown', '.containerProjectsMobile')

        setTimeout(() => {
            EventManager.emit('deleteElement', containerProjectsMobile)                
        }, 175);

        EventManager.emit('createElements', arrNewProjectMobile)

        let containerNewProjectM = document.querySelector('.containerNewProjectM');

        EventManager.emit('animationEntry', containerNewProjectM)

        closeCreatorProject();
        addNewProject();
        syncInputColor();
        getColorFromInputColor()
    })

}

function changeProjectMobile() {
    
    let titleTodoProject = document.querySelector('.titleTodoProject');
    let containerProjects = document.querySelector('.containerProjects');
    let containerProjectsM = document.querySelector('.containerProjectsMobile');

    containerProjectsM.addEventListener('click', (e) => {

        let projectTarget = e.target;

        if (!projectTarget.classList.contains('containerProjectsMobile')) {

            let projectId;

            if (!projectTarget.dataset.projectId) {
                projectId = projectTarget.parentNode.dataset.projectId;
            }else{
                projectId = projectTarget.dataset.projectId;                
            }
            
            if (projectId){

                projectIdSelected = projectId;

                EventManager.emit('fadeOutAndSlideDown', '.containerProjectsMobile')

                setTimeout(() => {
                    EventManager.emit('deleteElement', containerProjectsM)                
                }, 175);

                EventManager.emit('transitionChangeTitle','.titleTodoProject')

                 setTimeout(() => {

                    titleTodoProject.innerText = `To do - ${findProjectById(projectId).name}`;

                 },200)


                const projectObjSelected = projects.find(project => project.id == projectId);
            
                EventManager.emit('changeProject',projectObjSelected.todo);
                let arrTagets = ['.TP'];
                EventManager.emit('transitionGhostOut',arrTagets)

                findProjectById(projectId).todo.forEach( todo => {
                
                    if (todo.isTipPriority == true) {
                         todo.isTipPriority = false;
                    }

                } )

                let containerTodo = document.querySelector('.containerTodo');
                let childs = Array.from(containerTodo.children);
            
                childs.forEach((todo) => {
                    if (!todo.classList.contains('btnNewTodo')) {

                        let colorBgBtn = getComputedStyle(todo.children[3]).getPropertyValue('--backContainerSecond');
                        let arrColorAndBtn1 = [todo.children[3],colorBgBtn,'#3f3852'];

                        EventManager.emit('transitionBgBtn',arrColorAndBtn1)
                    }
                })

         

                restartTodoTipPriority();
            }

            
        }       

    });
}

saveLastProjectSelected();
export {createPopUpNewProject,defaultProject,itemProject,countChilds,projects,projectIdSelected,findProjectById,populateStorageP,menuMobile,itemProjectMobile};