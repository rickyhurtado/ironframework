/**
 * contacts-business.model.dev.js
 * 
 * @package   ContactsBusinessModel
 * @category  Model
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init ContactsBusinessModel class
   */
  var ContactsBusinessModel = Backbone.Model.extend(
  {
    /**
     * Initialize model
     */
    initialize : function()
    {
      console.log('Backbone.Model.ContactsBusinessModel has been initialized.');
    },
    
    /**
     * Set defaults
     */        
    defaults : function()
    {
      return {
        business_id : 0,
        person_id   : 0,
        company     : '',
        address     : '',
        contact     : ''
      };
    }
  });
  
  return ContactsBusinessModel;
});