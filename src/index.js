import './style.css'
import createElementsDom from './domCreation.js';

import {createPopUpNewProject,menuMobile} from './projects.js';

import {EventManager} from './pubSub.js';
import {popUpTodo,showTodayMobile,showWeekMobile} from './todos.js';
import {init} from './ui.js';



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
        attributes: {class:'outer'},
        appendChild: '.containerTodoCenter',
    },

    {
        elementType: 'div',
        attributes: {class:'containerTodo'},
        appendChild: '.outer',
    },

    
    // child containerTodo

    {
        elementType: 'div',
        attributes: {class:'btnNewTodo'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M20 12L4 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerTodo',
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

    
];

function domElements(arr) {

    arr.forEach(elementObject => {
        
        createElementsDom(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

const arrContainerLeftPhone = [

    {
        elementType: 'div',
        attributes: {class:'containerLeftMobile'},
        appendChild: 'body',
    },

    // child containerLeftMobile

    {
        elementType: 'div',
        attributes: {class:'containerProjectsM'},
        appendChild: '.containerLeftMobile',
    },

    {
        elementType: 'div',
        attributes: {class:'containerTodayM'},
        appendChild: '.containerLeftMobile',
    },

    {
        elementType: 'div',
        attributes: {class:'containerWeekM'},
        appendChild: '.containerLeftMobile',
    },

    // childs containerProjectsM

    
    {
        elementType: 'div',
        attributes: {class:'containerSvgFolder'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="pathSvgProjects" d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerProjectsM',
    },

    {
        elementType: 'p',
        attributes: {class:'titleProjectsM'},
        innerText:'Projects',
        appendChild: '.containerProjectsM',
    },

    // childs containerTodayM

    
    {
        elementType: 'div',
        attributes: {class:'containerSvgToday'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="6" y="10" width="12" height="2" fill="#4A4458"/><rect x="6" y="10" width="3" height="2" rx="1" fill="#D9D9D9"/></svg>' ,
        appendChild: '.containerTodayM',
    },

    {
        elementType: 'p',
        attributes: {class:'titleTodayM'},
        innerText:'Today',
        appendChild: '.containerTodayM',
    },
    // childs containerProjects

    
    {
        elementType: 'div',
        attributes: {class:'containerSvgWeek'},
        innerHTML:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' ,
        appendChild: '.containerWeekM',
    },

    {
        elementType: 'p',
        attributes: {class:'titleWeekM'},
        innerText:'Week',
        appendChild: '.containerWeekM',
    },



]


domElements(arrElementsHome);
init();
createPopUpNewProject();
popUpTodo();

function resizeWindow() {
    

    createMobileMenuIfScreenSizeMatches()

    window.addEventListener('resize', () => {

        createMobileMenuIfScreenSizeMatches()
        
    
    } )

}

function createMobileMenuIfScreenSizeMatches() {
    
    let screenWidthF = window.screen.availWidth;
       
    if (screenWidthF <= 912) {
        let containerLeftMobile = document.querySelector('.containerLeftMobile');

        if (!containerLeftMobile) {
            
            domElements(arrContainerLeftPhone)     
            menuMobile();   
            showTodayMobile();    
            showWeekMobile();

            const containerTodosTodayAndWeek = document.querySelector('.containerTodosTodayAndWeek');

            if (containerTodosTodayAndWeek) {
             
                EventManager.emit('fadeOutAndShrink', containerTodosTodayAndWeek)

                setTimeout(() => {
                    EventManager.emit('deleteElement', containerTodosTodayAndWeek)
                }, 120);   
            }
        }
    }else if(screenWidthF >= 913){

        let containerLeftMobile = document.querySelector('.containerLeftMobile');

        if (containerLeftMobile) {

            EventManager.emit('deleteElement', containerLeftMobile);

        }


        const containerProjects = document.querySelector('.containerProjects');
        containerProjects.style.height = 'auto';
        
    }

}



resizeWindow()