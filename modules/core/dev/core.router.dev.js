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
      ''                     : 'index',
      'router-and-view'      : 'message',
      'model-and-collection' : 'data',
      'login'                : 'login',
      'register'             : 'register',
      'server-sent-event'    : 'sse',
      ':static_page'         : 'staticPage'
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
     * Message subroute function
     */
    message : function()
    {
      if (!I.Core.Router.Message && I.Message)
      {
        I.Core.Router.Message = I.Message.Router;
      }
    },
    
    /**
     * Data subroute function
     */
    data : function()
    {
      if (!I.Core.Router.Data && I.Data)
      {
        I.Core.Router.Data = I.Data.Router;
      }
    },
    
    /**
     * Login subroute function
     */
    login : function()
    {
      if (!I.Core.Router.Login && I.Login)
      {
        I.Core.Router.Login = I.Login.Router;
      }
    },
    
    /**
     * Register subroute function
     */
    register : function()
    {
      if (!I.Core.Router.Login && I.Registration)
      {
        I.Core.Router.Login = I.Registration.Router;
      }
    },
    
    /**
     * Server-Sent Event subroute function
     */
    sse : function()
    {
      if (!I.Core.Router.SSE && I.ServerSentEvent)
      {
        I.Core.Router.SSE = I.ServerSentEvent.Router;
      }
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