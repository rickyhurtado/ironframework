/**
 * init.module.dev.js
 * 
 * @package   InitModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// Init Namespaces
I.Init             = {};
I.Init.Collections = {};

define([
  'category_collection',
  'contacts_collection',
  'contacts_business_collection',
  'init_controller'
],
function(
  CategoryCollection,
  ContactsCollection,
  ContactsBusinessCollection,
  InitController
){
  /**
   * Init properties
   */
  I.Init.Collections.Category         = new CategoryCollection;
  I.Init.Collections.Contacts         = new ContactsCollection;
  I.Init.Collections.ContactsBusiness = new ContactsBusinessCollection;
  I.Init.Controller                   = new InitController;
    
  /**
   * Init InitModule class
   */
  var InitModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.InitModule has been initialized.');
      
      // Sync local storage
      I.Init.Controller.syncData();
      
      // Sample data to be pushed to the server
      I.Init.Controller.options.json_data =
      {
        deleted :
        {
          invoice  : [1, 4],
          contacts : [7]
        },
        draft :
        {
          invoice :
          [
            {
              name : 'Ricky Hurtado',
              bill : '$19.95'
            }
          ],
          contacts :
          [
            {
              name    : 'Ricky Hurtado',
              address : 'Malate, Manila, Philippines'
            }
          ]
        }
      };
    }
  });
  
  return InitModule;
});