/**
 * login.controller.dev.js
 * 
 * @package   LoginController
 * @category  Controller
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init LoginModule class
   */
  var LoginController = Backbone.Controller.extend(
  {
    /**
     * Initialize controller
     */
    initialize : function()
    {
      console.log('Backbone.Controller.LoginController has been initialized.');
    },
    
    /**
     * AJAX process request
     */
    processRequest : function(opt)
    {
    },
    
    /**
     * Submit the login form
     */
    createLoginData : function()
    {
      // Init vars
      var username = I.Helper.Sha1($('#username').val());
      var password = I.Helper.Sha1($('#password').val());
      
      $('#login-form [name=data]').val(username + password);
    }
  });
  
  return LoginController;
});