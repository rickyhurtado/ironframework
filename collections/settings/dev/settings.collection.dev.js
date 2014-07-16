/**
 * settings.collection.dev.js
 * 
 * @package   SettingsCollection
 * @category  Collection
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'settings_model'
], function(
  SettingsModel
){
  /**
   * Extend SettingsView class
   */
  var SettingsCollection = Backbone.Collection.extend(
  {
    /**
     * Initialize collection
     */
    initialize : function()
    {
      console.log('Backbone.Module.SettingsCollection has been initialized.');
    },

    /**
     * Set the local storage
     */
    localStorage : new Backbone.LocalStorage('settings-collection'),

    /**
     * Set the model
     */
    model : SettingsModel
  });
  
  return SettingsCollection;
});