/**
 * category.collection.dev.js
 * 
 * @package   CategoryCollection
 * @category  Collection
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'category_model'
], function(
  Category
){
  /**
   * Init CategoryCollection class
   */
  var CategoryCollection = Backbone.Collection.extend(
  {
    /**
     * Initialize collection
     */
    initialize : function()
    {
      console.log('Backbone.Collection.CategoryCollection has been initialized.');
    },

    /**
     * Set the local storage
     */
    localStorage : new Backbone.LocalStorage('category-collection'),

    /**
     * Set the model
     */
    model : Category,
    
    /**
     * Sort the models by 'order' field in ascending order
     */
    comparator: function(collection)
    {
      return collection.get('order');
    },
            
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
    },
    
    /**
     * Return new order
     */
    newOrder : function()
    {
      return this.length + 1;
    }
  });
  
  return CategoryCollection;
});