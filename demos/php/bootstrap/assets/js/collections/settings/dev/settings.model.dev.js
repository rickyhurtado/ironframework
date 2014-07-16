/**
 * settings.model.dev.js
 * 
 * @package   SettingsModel
 * @category  Model
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init SettingsModel class
   */
  var SettingsModel = Backbone.Model.extend(
  {
    /**
     * Initialize model
     */
    initialize : function()
    {
      console.log('Backbone.Model.SettingsModel has been initialized.');
    },
    
    /**
     * Set defaults
     * 
     * @returns {object}
     */        
    defaults : function()
    {
      return {
        setting     : 'setting_parameter',
        value       : 'Value',
        title       : 'Setting Title',
        description : 'No available description'
      };
    }
  });
  
  return SettingsModel;
});