/**
 * settings.module.dev.js
 * 
 * @package   SettingsModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// Settings Namespace
I.Settings = {};

define([
  'settings_collection',
  'settings_controller'
],
function(
  SettingsCollection,
  SettingsController
){
  /**
   * Init Settings properties
   */
  I.Settings.Collection = new SettingsCollection;
  I.Settings.Controller = new SettingsController;
  
  /**
   * Init SettingsModule class
   */
  var SettingsModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.SettingsModule has been initialized.');
    }
  });
  
  return SettingsModule;
});