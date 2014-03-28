/**
 * registration.collection.dev.js
 * 
 * @package   RegistrationCollection
 * @category  Collection
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'registration_model'
], function(
  RegistrationModel
){
  /**
   * Extend RegistrationView class
   */
  var RegistrationCollection = Backbone.Collection.extend(
  {
    /**
     * Initialize collection
     */
    initialize : function()
    {
      console.log('Backbone.Module.RegistrationCollection has been initialized.');
    },

    /**
     * Set the local storage
     */
    localStorage : new Backbone.LocalStorage('registration-collection'),

    /**
     * Set the model
     */
    model : RegistrationModel
  });
  
  return RegistrationCollection;
});