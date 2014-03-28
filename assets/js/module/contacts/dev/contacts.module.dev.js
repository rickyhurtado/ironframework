/**
 * contacts.module.dev.js
 * 
 * @package   ContactsModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// Contacts Namespace
I.Contacts = {};

define([
  'contacts_view',
  'contacts_router'
],
function(
  ContactsView,
  ContactsRouter
){
  /**
   * Init Contacts properties
   */
  I.Contacts.View   = new ContactsView;
  I.Contacts.Router = new ContactsRouter('model-and-collection');

  /**
   * Init ContactsModule class
   */
  var ContactsModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.ContactsModule has been initialized.');
      
      // Merge routers
      I.Data.Router = I.Contacts.Router;
    }
  });
  
  return ContactsModule;
});