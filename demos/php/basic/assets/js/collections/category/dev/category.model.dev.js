/**
 * category.model.dev.js
 * 
 * @package   CategoryModel
 * @category  Model
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init CategoryModel class
   */
  var CategoryModel = Backbone.Model.extend(
  {
    /**
     * Initialize model
     */
    initialize : function()
    {
        console.log('Backbone.Model.CategoryModel has been initialized.');
    },
    
    /**
     * Set defaults
     */        
    defaults : function()
    {
      return {
        category_id : 0,
        order       : 0,
        category    : 'Category Title',
        fragment    : 'category-fragment',
        status      : 0
      };
    }
  });
  
  return CategoryModel;
});