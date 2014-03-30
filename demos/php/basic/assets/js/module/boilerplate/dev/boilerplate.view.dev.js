/**
 * boilerplate.view.dev.js
 * 
 * @package   BoilerplateView
 * @category  View
 * @version   0.0
 * @author    Firstname Lastname <firstname.lastname@email.com>
 */

define([], function()
{
  /**
   * Init BoilerplateView class
   */
  var BoilerplateView = Backbone.View.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('Backbone.View.BoilerplateView has been initialized.');
    },
    
    /**
     * Default options
     */
    options :
    {
    },
    
    /**
     * Init template property fpr EJS container
     */
    template :
    {
      boilerplatePage : new EJS( {url: I.JsPath + '/module/boilerplate/template/' + I.JsVersion + '/boilerplate-page.' + I.JsVersion + '.html'} )
    },
    
    /**
     * Target element container
     */
    target :
    {
      mainContent        : '#main-content',
      boilerplateContent : '#boilerplate-content'
    },
    
    /**
     * Set the el property
     */
    el : $('body'),
    
    /**
     * Attach events to elements
     */
    events :
    {
    },
    
    /**
     * Render boilerplate page
     */
    renderBoilerplatePage : function()
    {
      $(this.target.mainContent).append(this.template.boilerplatePage.render({}));
    }
  });
  
  return BoilerplateView;
});