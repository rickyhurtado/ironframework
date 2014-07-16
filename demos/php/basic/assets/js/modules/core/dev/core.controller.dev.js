/**
 * core.controller.dev.js
 * 
 * @package   CoreController
 * @category  Controller
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init CoreController class
   */
  var CoreController = Backbone.Controller.extend(
  {
    /**
     * Initialize controller
     */
    initialize : function()
    {
      console.log('Backbone.Controller.CoreController has been initialized.');
    },
    
    /**
     * enableObjectRoute
     * 
     * Add data-route-on attribute to make the element clickable
     */
    enableObjectRoute : function(data_route)
    {
      _.map(data_route, function(route)
      {
        $('[data-route="' + route + '"]').each(function()
        {
          // Init var
          $(this).removeAttr('onclick').attr('data-route-on', true);
        });
      });
    },
    
    /**
     * Show content
     */
    showContent : function(opt)
    {
      // Hide the related elements
      $(opt.rel).each(function()
      {
        if (!$(this).hasClass('hide'))
        {
          $(opt.rel).addClass('hide');
        }
      });
      
      // Show the selected element
      if ($(opt.el).hasClass('hide'))
      {
        $(opt.el).removeClass('hide');
      }
    },
    
    /**
     * Check page if not found
     */
    checkPage : function()
    {
      return setTimeout(function()
      {
        I.Core.Router.staticPage('');
      }, 1000);
    }
  });
  
  return CoreController;
});