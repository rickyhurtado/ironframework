// backbone-extend-1.0.0.js
(function() {
   
  var Backbone = this.Backbone;

  // Events object that we're going to extend in the same way other Backbone classes are...
  var Events = Backbone.Events;
  
  // Module object
  var Module = Backbone.Module = function(attributes, options)
  {
    this.initialize.apply(this, arguments);     
  };
  
  // Controller object
  var Controller = Backbone.Controller = function(attributes, options)
  {
    this.initialize.apply(this, arguments);
  };
  
  // Library object
  var Library = Backbone.Library = function(attributes, options)
  {
    this.initialize.apply(this, arguments);
  };
  
  // Helper object
  var Helper = Backbone.Helper = function(attributes, options)
  {
    this.initialize.apply(this, arguments);       
  };
   
  // Add base methods here
  _.extend(Module.prototype, Events,
  {
    initialize: function(){}
  });
  
  _.extend(Controller.prototype, Events,
  {
    initialize: function(){}
  });
  
  _.extend(Library.prototype, Events,
  {
    initialize: function(){}
  });
  
  _.extend(Helper.prototype, Events,
  {
    initialize: function(){}
  });
   
  /*** The following is pulled straight from Backbone.js ***/
   
  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps)
  {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor'))
    {
      child = protoProps.constructor;
    }
    else
    {
      child = function()
      {
        return parent.apply(this, arguments);
      };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function()
    {
      this.constructor = child;
    };
    
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps)
    {
      _.extend(child.prototype, protoProps);
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };   
   
  /*** END Pulled straight from Backbone.js ***/
  Module.extend     = extend;
  Controller.extend = extend;
  Library.extend    = extend;
  Helper.extend     = extend;
   
}).call(this);