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
  'init_controller'
],
function(
  InitController
){
  /**
   * Init properties
   */
  I.Init.Controller = new InitController;
    
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
    }
  });
  
  return InitModule;
});