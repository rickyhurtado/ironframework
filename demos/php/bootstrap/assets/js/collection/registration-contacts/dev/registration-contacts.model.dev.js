/**
 * registration-contacts.model.dev.js
 * 
 * @package   RegistrationContactsModel
 * @category  Model
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init RegistrationContactsModel class
   */
  var RegistrationContactsModel = Backbone.Model.extend(
  {
    /**
     * Initialize model
     */
    initialize : function()
    {
      console.log('Backbone.Model.RegistrationContactsModel has been initialized.');
    },
    
    /**
     * Set defaults
     */        
    defaults : function()
    {
      return {
        id                : 0,
        email             : '',
        phone             : '',
        direction_address : ''
      };
    }
  });
  
  return RegistrationContactsModel;
});