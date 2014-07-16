/**
 * boilerplate.collection.dev.js
 * 
 * @package   BoilerplateCollection
 * @category  Collection
 * @version   0.0
 * @author    Firstname Lastname <firstname.lastname@email.com>
 */

define([
  'boilerplate_model'
], function(
  BoilerplateModel
){
  /**
   * Extend BoilerplateView class
   */
  var BoilerplateCollection = Backbone.Collection.extend(
  {
    /**
     * Initialize collection
     */
    initialize : function()
    {
      console.log('Backbone.Module.BoilerplateCollection has been initialized.');
    },

    /**
     * Set the local storage
     */
    localStorage : new Backbone.LocalStorage('boilerplate-collection'),

    /**
     * Set the model
     */
    model : BoilerplateModel,
    
    /**
     * Return new ID
     */
    newId : function()
    {
      // Init vars
      var model   = this.last();
      var last_id = 1;
      
      if (model != undefined)
      {
          last_id = model.get('id') + 1;
      }
      
      return last_id;
    }
  });
  
  return BoilerplateCollection;
});