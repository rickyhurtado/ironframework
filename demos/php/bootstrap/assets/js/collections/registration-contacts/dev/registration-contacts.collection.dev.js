/**
 * registration-contacts.collection.dev.js
 * 
 * @package   RegistrationContactsCollection
 * @category  Collection
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'registration_contacts_model'
], function(
  RegistrationContactsModel
){
  /**
   * Extend RegistrationContactsView class
   */
  var RegistrationContactsCollection = Backbone.Collection.extend(
  {
    /**
     * Initialize collection
     */
    initialize : function()
    {
      console.log('Backbone.Module.RegistrationContactsCollection has been initialized.');
    },

    /**
     * Set the local storage
     */
    localStorage : new Backbone.LocalStorage('registration-contacts-collection'),

    /**
     * Set the model
     */
    model : RegistrationContactsModel
  });
  
  return RegistrationContactsCollection;
});