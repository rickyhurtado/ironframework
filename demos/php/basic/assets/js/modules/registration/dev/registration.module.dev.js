/**
 * registration.module.dev.js
 * 
 * @package   RegistrationModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// Registration Namespace
I.Registration             = {};
I.Registration.Collections = {};

define([
  'registration_collection',
  'registration_contacts_collection',
  'registration_controller',
  'registration_view',
  'registration_router'
],
function(
  RegistrationCollection,
  RegistrationContactsCollection,
  RegistrationController,
  RegistrationView,
  RegistrationRouter
){
  /**
   * Init Registration properties
   */
  I.Registration.Collections.Registration = new RegistrationCollection;
  I.Registration.Collections.Contacts     = new RegistrationContactsCollection;
  I.Registration.Controller               = new RegistrationController;
  I.Registration.View                     = new RegistrationView;
  I.Registration.Router                   = new RegistrationRouter('register');
  
  /**
   * Init RegistrationModule class
   */
  var RegistrationModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.RegistrationModule has been initialized.');
    }
  });
  
  return RegistrationModule;
});