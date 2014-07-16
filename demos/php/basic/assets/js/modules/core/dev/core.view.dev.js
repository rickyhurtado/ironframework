/**
 * core.view.dev.js
 * 
 * @package   CoreView
 * @category  View
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init CoreView class
   */
  var CoreView = Backbone.View.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('Backbone.View.CoreView has been initialized.');
    },
    
    /**
     * Target element container
     */
    target :
    {
      mainContent : '#main-content',
      homePage    : '#indexContent'
    },
    
    /**
     * Init template property for EJS container
     */
    template :
    {
      corePage   : new EJS( {url: I.JsPath + '/module/core/template/' + I.JsVersion + '/core-page.' + I.JsVersion + '.html'} ),
      staticPage : new EJS( {url: I.JsPath + '/module/core/template/' + I.JsVersion + '/static-page.' + I.JsVersion + '.html'} )
    },
    
    /**
     * Render core page
     */
    renderCorePage : function()
    {
      $(this.target.mainContent).append(this.template.corePage.render({}));
    },
    
    /**
     * Render static page
     */
    renderStaticPage : function(static_page)
    {
      $(this.target.mainContent).append(this.template.staticPage.render({ page : static_page }));
    }
  });
  
  return CoreView;
});