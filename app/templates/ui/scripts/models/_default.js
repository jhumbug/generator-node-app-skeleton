var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    defaults: {
        <%= camelCasedAppname %>: 'WHOA'
    },

    initialize: function() {
        
    },

    url: '',

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
        return response;
    }
});