/**
 * boilerplate.model.dev.js
 * 
 * @package   BoilerplateModel
 * @category  Model
 * @version   0.0
 * @author    Firstname Lastname <firstname.lastname@email.com>
 */

define([], function()
{
  /**
   * Init BoilerplateModel class
   */
  var BoilerplateModel = Backbone.Model.extend(
  {
    /**
     * Initialize model
     */
    initialize : function()
    {
      console.log('Backbone.Model.BoilerplateModel has been initialized.');
    },
    
    /**
     * Set defaults
     */        
    defaults : function()
    {
      return {
      };
    }
  });
  
  return BoilerplateModel;
});