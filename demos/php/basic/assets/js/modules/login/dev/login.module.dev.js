/**
 * login.module.dev.js
 * 
 * @package   LoginModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// Login Namespace
I.Login = {};

define([
  'login_view',
  'login_controller',
  'login_router'
],
function(
  LoginView,
  LoginController,
  LoginRouter
){
  /**
   * Init Login properties
   */
  I.Login.View       = new LoginView;
  I.Login.Controller = new LoginController;
  I.Login.Router     = new LoginRouter('login');
  
  /**
   * Init LoginModule class
   */
  var LoginModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.LoginModule has been initialized.');
    }
  });
  
  return LoginModule;
});