/**
 * profile.view.dev.js
 *
 * @package   ProfileView
 * @category  View
 * @version   1.0.1
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init ProfileView class
   */
  var ProfileView = Backbone.View.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('Backbone.View.ProfileView has been initialized.');
    },

    /**
     * Target element container
     */
    target :
    {
      profileContent : '#profile-content'
    },

    /**
     * Init template property for EJS container
     */
    template :
    {
      profile : new EJS( {url : I.JsPath + '/modules/profile/template/' + I.JsVersion + '/profile.' + I.JsVersion + '.html'})
    },

    /**
     * Display profile info from EJS template
     */
    renderProfile : function(category, data)
    {
      var extra = this.extraDetails();

      return this.template.profile.render( { category : category, details : data.details, extra : extra } );
    },

    /**
     * Extra details for profile details extension
     */
    extraDetails : function()
    {
      return null;
    }
  });

  return ProfileView;
});
