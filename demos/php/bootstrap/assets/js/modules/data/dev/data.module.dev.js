/**
 * data.module.dev.js
 * 
 * @package   DataModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// Data Namespace
I.Data = {};

define([
  'data_controller',
  'data_view',
  'data_router'
],
function(
  DataController,
  DataView,
  DataRouter
){
  /**
   * Init Data properties
   */
  I.Data.Controller = new DataController;
  I.Data.View       = new DataView;
  I.Data.Router     = new DataRouter('model-and-collection');

  /**
   * Init DataModule class
   */
  var DataModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.DataModule has been initialized.');
    }
  });
  
  return DataModule;
});