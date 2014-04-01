/**
 * contacts.collection.dev.js
 * 
 * @package   ContactsCollection
 * @category  Collection
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'contacts_model'
], function(
  ContactsModel
){
  /**
   * Extend ContactsView class
   */
  var ContactsCollection = Backbone.Collection.extend(
  {
    /**
     * Initialize collection
     */
    initialize : function()
    {
      console.log('Backbone.Module.ContactsCollection has been initialized.');
    },

    /**
     * Set the local storage
     */
    localStorage : new Backbone.LocalStorage('contacts-collection'),

    /**
     * Set the model
     */
    model : ContactsModel,
    
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
  
  return ContactsCollection;
});