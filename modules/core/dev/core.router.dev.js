/**
 * core.router.dev.js
 *
 * @package   CoreRouter
 * @category  Router
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init CoreRouter class
   */
  var CoreRouter = Backbone.Router.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      // Make the route link clickable
      I.Core.Controller.enableObjectRoute(['main']);

      this.checkPage = I.Core.Controller.checkPage();

      console.log('Backbone.Router.CoreRouter has been initialized.');
    },

    /**
     * Register routes
     */
    routes :
    {
      ''             : 'index',
      ':static_page' : 'staticPage'
    },

    /**
     * Index route function
     */
    index : function()
    {
      console.log('[Route] default');

      clearTimeout(this.checkPage);
      I.Core.View.renderCorePage();
      I.Core.Controller.showContent( { el : '#index-content', rel : '.sub-content[id]' } );
    },

    /**
     * Render and display the static page
     */
    staticPage : function(static_page)
    {
      if (static_page.match(/^sample-static-page|another-static-page$/))
      {
        clearTimeout(this.checkPage);
        console.log('[Route] ' + static_page);
      }
      else
      {
        static_page = 'page-not-found';
      }

      I.Core.View.renderStaticPage(static_page);
      I.Core.Controller.showContent( { el : '#' + static_page + '-content', rel : '.sub-content[id]' } );
    }
  });

  return CoreRouter;
});
