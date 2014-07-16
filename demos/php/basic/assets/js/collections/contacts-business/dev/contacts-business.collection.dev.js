/**
 * contacts-business.collection.dev.js
 * 
 * @package   ContactsBusinessCollection
 * @category  Collection
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'contacts_business_model'
], function(
  ContactsBusinessModel
){
  /**
   * Extend ContactsBusinessView class
   */
  var ContactsBusinessCollection = Backbone.Collection.extend(
  {
    /**
     * Initialize collection
     */
    initialize : function()
    {
      console.log('Backbone.Module.ContactsBusinessCollection has been initialized.');
    },

    /**
     * Set the local storage
     */
    localStorage : new Backbone.LocalStorage('contacts-business-collection'),

    /**
     * Set the model
     */
    model : ContactsBusinessModel,
    
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
  
  return ContactsBusinessCollection;
});