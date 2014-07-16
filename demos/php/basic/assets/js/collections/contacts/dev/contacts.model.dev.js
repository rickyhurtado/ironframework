/**
 * contacts.model.dev.js
 * 
 * @package   ContactsModel
 * @category  Model
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init ContactsModel class
   */
  var ContactsModel = Backbone.Model.extend(
  {
    /**
     * Initialize model
     */
    initialize : function()
    {
      console.log('Backbone.Model.ContactsModel has been initialized.');
    },
    
    /**
     * Set defaults
     */        
    defaults : function()
    {
      return {
        person_id   : 0,
        firstname   : '',
        lastname    : '',
        email       : '',
        contact     : '',
        category_id : 1
      };
    }
  });
  
  return ContactsModel;
});