/**
 * registration.model.dev.js
 * 
 * @package   RegistrationModel
 * @category  Model
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init RegistrationModel class
   */
  var RegistrationModel = Backbone.Model.extend(
  {
    /**
     * Initialize model
     */
    initialize : function()
    {
      console.log('Backbone.Model.RegistrationModel has been initialized.');
    },
    
    /**
     * Set defaults
     */        
    defaults : function()
    {        
      return {
        id           : 0,
        firstname    : '',
        lastname     : '',
        nickname     : '',
        gender       : 'Male',
        birth_day    : 'select-title',
        birth_month  : 'select-title',
        birth_year   : 'select-title',
        subscription : { newsletter : true, event_schedule : true, other_request : '', suggestion : '' },
        confirmed    : ''
      };
    }
  });
  
  return RegistrationModel;
});