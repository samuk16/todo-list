
  let EventManager = {

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

export {EventManager};