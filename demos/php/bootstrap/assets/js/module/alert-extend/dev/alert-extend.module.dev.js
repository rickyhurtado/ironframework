/**
 * alert-extend.module.js
 * 
 * @package   AlertExtendModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// AlertExtend Namespace
I.AlertExtend = {};

define([
  'alert_extend_view',
  'alert_extend_router'
],
function(
  AlertExtendView,
  AlertExtendRouter
){
  /**
   * Init AlertExtend properties
   */
  I.AlertExtend.View   = new AlertExtendView;
  I.AlertExtend.Router = new AlertExtendRouter('router-and-view');
  
  /**
   * Init AlertExtendModule class
   */
  var AlertExtendModule = Backbone.Module.extend(
  {
    /**
     * Initialize model
     */
    initialize : function()
    {
      console.log('Backbone.Module.AlertExtendModule has been initialized.');
      
      // Merge routers
      I.Message.Router = I.AlertExtend.Router;
    }
  });
  
  return AlertExtendModule;
});