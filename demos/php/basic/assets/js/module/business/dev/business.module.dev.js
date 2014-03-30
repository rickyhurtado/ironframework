/**
 * business.module.dev.js
 * 
 * @package   BusinessModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// Business Namespace
I.Business = {};

define([
  'business_view',
  'business_router'
],
function(
  BusinessView,
  BusinessRouter
){
  /**
   * Init Business properties
   */
  I.Business.View   = new BusinessView;
  I.Business.Router = new BusinessRouter('model-and-collection');

  /**
   * Init BusinessModule class
   */
  var BusinessModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.BusinessModule has been initialized.');
      
      // Merge routers
      I.Data.Router = I.Business.Router;
    }
  });
  
  return BusinessModule;
});