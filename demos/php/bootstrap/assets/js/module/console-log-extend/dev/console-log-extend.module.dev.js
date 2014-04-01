/**
 * console-log-extend.module.js
 * 
 * @package   ConsoleLogExtendModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// ConsoleLogExtend Namespace
I.ConsoleLogExtend = {};

define([
  'console_log_extend_view',
  'console_log_extend_router'
],
function(
  ConsoleLogExtendView,
  ConsoleLogExtendRouter
){
  /**
   * Init ConsoleLogExtend properties
   */
  I.ConsoleLogExtend.View   = new ConsoleLogExtendView;
  I.ConsoleLogExtend.Router = new ConsoleLogExtendRouter('router-and-view');
  
  /**
   * Init ConsoleLogExtendModule class
   */
  var ConsoleLogExtendModule = Backbone.Module.extend(
  {
    /**
     * Initialize model
     */
    initialize : function()
    {
      console.log('Backbone.Module.ConsoleLogExtendModule has been initialized.');
      
      // Merge sub routers
      I.Message.Router = I.ConsoleLogExtend.Router;
    }
  });
  
  return ConsoleLogExtendModule;
});