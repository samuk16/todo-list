

// function Todo(description, dueDate) {
//     this.description = description;
//     this.dueDate = dueDate;
// }
  
  // Definimos el objeto Project
// function Project(name) {
//     this.name = name;
//     this.todos = [];
// }
  
//   Project.prototype.addTodo = function(todo) {
//     this.todos.push(todo);
//     EventManager.emit('todoAdded', this);
//   }
  
  // Definimos el objeto EventManager
  var EventManager = {

    events: {},

    on: function(event, callback) {

      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);

    },

    off: function(event, callback) {

      if (this.events[event]) {

        for (var i = 0; i < this.events[event].length; i++) {

          if (this.events[event][i] === callback) {

            this.events[event].splice(i, 1);
            break;

          }
        }
      }
    },

    emit: function(event, data) {

      if (this.events[event]) {

        this.events[event].forEach(function(callback) {

          callback(data);

        });
      }
    }
  };
  
  // Creamos un nuevo proyecto
  var myProject = new Project('Mi proyecto');
  
  // Suscribimos una función al evento 'todoAdded'
  EventManager.on('todoAdded', function(project) {
    console.log('Se agregó un todo al proyecto ' + project.name);
  });
  
  // Agregamos un todo al proyecto
  myProject.addTodo(new Todo('Comprar leche', '2022-01-20'));