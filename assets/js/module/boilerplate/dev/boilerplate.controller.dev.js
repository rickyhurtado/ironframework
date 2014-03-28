/**
 * boilerplate.controller.dev.js
 * 
 * @package   BoilerplateController
 * @category  Controller
 * @version   0.0
 * @author    Firstname Lastname <firstname.lastname@email.com>
 */

define([], function()
{
  /**
   * Init BoilerplateModule class
   */
  var BoilerplateController = Backbone.Controller.extend(
  {
    /**
     * Initialize controller
     */
    initialize : function()
    {
      console.log('Backbone.Controller.BoilerplateController has been initialized.');
    }
  });
  
  return BoilerplateController;
});