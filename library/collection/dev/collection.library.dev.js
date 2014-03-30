/**
 * collection.library.dev.js
 * 
 * @category  Library
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

I.Library.Collection = 
{
  /**
   * Init properties
   */
  models      : null,
  collections : null,
  url         : null,
  type        : 'post',
  data        : {},
  success     : function(data){},
  error       : function(){},
  
  /**
   * Set options
   */
  sync : function(opt)
  {
    this.models      = opt.models;
    this.collections = opt.collections;
    this.url         = opt.url;
    this.data        = opt.data;
    
    // Set the success callback function
    if (opt.success != undefined)
    {
      this.success = opt.success;
    }
    
    // Set the error callback function
    if (opt.error != undefined)
    {
      this.error = opt.error;
    }
    
    // Fetch data from server via AJAX request
    this.fetch();
  },
  
  /**
   * fetch data via AJAX request
   */
  fetch : function()
  {
    // Init var
    var self = this;
    
    // Request data via AJAX request
    Backbone.ajax({
      url      : self.url,
      type     : self.type,
      data     : self.data,
      dataType : 'json',
      cache    : false,
      success  : function(json)
      {
        _.map(json, function(d, i)
        {
          // Init var
          var data = [];
          
          // Set the properties
          self.model      = self.models[i];
          self.collection = self.collections[i];
          
          // Extract the json data
          _.map(d, function(model, i)
          {
              // Add id property to attribute with unique value
              model.id = i + 1;
              data.push(model);
          });
          
          // Reset the local storage
          self.reset(self.collections[i]);
          
          // Store the data as model to collection
          self.storeModel(data);
        });
        
        // Call the success function
        self.success(json);
      },
      error    : function()
      {
        // Call the error function
        self.error();
      }
    });
  },
  
  /**
   * Reset the collection
   */
  reset : function(collection)
  {
    // Init var
    var models = [];
    
    // Push the models in modal array
    collection.each(function(model)
    {
      models.push(model);
    });
    
    // Destroy each models from array
    for (var i=0; i < models.length; i++)
    {
      models[i].destroy();
    }
  },

  /**
   * Store model data from server data to local storage
   */
  storeModel : function(data)
  {
    // Init var
    var self = this;
    
    // Create and save the model to local storage
    for (var i=0; i < data.length; i++)
    {
      self.collection.create( new self.model(data[i]) );
    }
  }
};