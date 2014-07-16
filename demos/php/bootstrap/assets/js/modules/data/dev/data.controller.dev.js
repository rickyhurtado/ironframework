/**
 * data.controller.dev.js
 * 
 * @package   DataController
 * @category  Controller
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'core_module'
], function()
{
  /**
   * Init DataController class
   */
  var DataController = Backbone.Controller.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.DataController has been initialized.');
    },
            
    /**
     * Show data container content
     */
    showContent : function(el)
    {
      I.Core.Controller.showContent({
        el  : I.Data.View.target.dataContent + ',' + el,
        rel : '.mini-layout[id], .data-content'
      });
    }
  });
  
  return DataController;
});