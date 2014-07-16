/**
 * registration.router.dev.js
 * 
 * @package   RegistrationRouter
 * @category  Router
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'core_module'
], function()
{
  /**
   * Init RegistrationRouter class
   */
  var RegistrationRouter = Backbone.SubRoute.extend(
  {
      /**
       * Initialize router
       */
      initialize : function()
      {
        I.Registration.View.renderResultPage();
        this.checkPage = I.Core.Router.checkPage;
        console.log('Backbone.SubRoute.RegistrationRouter has been initialized.');
      },
      
      /**
       * Register routes
       */
      routes:
      {
        ''                : 'index',
        'contacts'        : 'contacts',
        'success'         : 'success',
        'session-expired' : 'expired',
        'cancelled'       : 'cancelled',
        ':step'           : 'goToStep'
      },
      
      /**
       * Load the page function
       */
      loadPage : function(page)
      {
        console.log('[Route] registration' + (page != '' ? '/' + page : ''));
        
        clearTimeout(this.checkPage);
        
        // Insert new data role page
        I.Registration.View.renderRegistrationPage(page);
        I.Core.Controller.showContent( { el : '#registration-' + page + '-content', rel : '.sub-content[id]' } );
      },
      
      /**
       * Index route function
       */
      index : function()
      {
        this.loadPage('main');
        
        $('html, body').animate(
        {
          scrollTop : $('#wrapper').offset().top - 65
        }, 'slow');
      },
      
      /**
       * Contacts route function
       */
      contacts : function()
      {
        this.loadPage('main');
      },
      
      /**
       * Scroll to step
       */
      goToStep : function(step)
      {
        if (!step.match(/step-1|step-2/))
        {
          return true;
        }
        
        this.loadPage('main');
        
        $('html, body').animate(
        {
          scrollTop : $('#registration-' + step).offset().top - 65
        }, 'slow');
      },
      
      /**
       * Success route function
       */
      success : function()
      {
        this.loadPage('success');
      },
      
      /**
       * Session expired route function
       */
      expired : function()
      {
        this.loadPage('expired');
      },
      
      /**
       * Cancelled route function
       */
      cancelled : function()
      {
        this.loadPage('cancelled');
      }
  });
  
  return RegistrationRouter;
});