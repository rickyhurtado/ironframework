/**
 * boilerplate.module.dev.js
 * 
 * @package   BoilerplateModule
 * @category  Module
 * @version   0.0
 * @author    Firstname Lastname <firstname.lastname@email.com>
 */

// Boilerplate Namespace
I.Boilerplate = {};

define([
  'boilerplate_view',
  'boilerplate_controller',
  'boilerplate_router'
],
function(
  BoilerplateView,
  BoilerplateController,
  BoilerplateRouter
){
  /**
   * Init Boilerplate properties
   */
  I.Boilerplate.View       = new BoilerplateView;
  I.Boilerplate.Controller = new BoilerplateController;
  I.Boilerplate.Router     = new BoilerplateRouter('subroute-fragment');
  
  /**
   * Init BoilerplateModule class
   */
  var BoilerplateModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.BoilerplateModule has been initialized.');
    }
  });
  
  return BoilerplateModule;
});