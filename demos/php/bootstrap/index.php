<?php
/**
 * index.php
 *
 * @version   1.0.2
 * @author    Ricky Hurtado <ricky@aelogica.com>
 *
 * Dynamic server page options in loading the application modules
 */

// Load the minified version of JS files
// If set to true, the *.min.js files will be loaded
// Otherwise, load the *.dev.js files instead
$minified = true;

// Base URL to be passed and used for JS paths of files and links
$base_url           = 'http://' . $_SERVER['HTTP_HOST'];

// Default modules must be loaded all through out the application
// Init and Settings modules are required by default
// Login module is optional (for demo only)
$default_module     = array('init','settings','login');

// Default collections must be loaded all through out the application
// For data syncing demo, category, contacts and contacts-business collection
// will be loaded through out the application
$default_collection = array('settings','category','contacts','contacts-business');

// Default token must be loaded all through out the application
// For example, if login form is always available all through out the application
// unless the user has successfully logged in
$default_token      = array('login'=>sha1('login'.time()));

// Inialize app variables
$app_module         = array();
$app_collection     = array();
$app_token          = array();

// For simulation purpose of this application, the first segment of the URI
// represents the module (Backbone) and/or the controller (backend)
$uri = explode('/', $_SERVER['REQUEST_URI']);

// Load and add the modules dynamically based on the first segment of the URI
switch ($uri[1])
{
  // Load the message module (main module)
  // Load the console-log-extend and alert-extend modules - extended modules of message module
  case 'router-and-view':
    // $app_module     = array('message');
    $app_module     = array('message','console-log-extend','alert-extend');
    break;

  // Load the data, contacts and business modules
  // Also load the profile as base module of contacts and business
  // Load the respective collections
  case 'model-and-collection':
    $app_module     = array('data','contacts','business');
    $base_module    = array('profile');
    break;

  // Load the server-sent-event module
  case 'server-sent-event':
    $app_module     = array('server-sent-event');
    break;

  // Load the registration module
  case 'register':
    $app_module     = array('registration');
    $app_collection = array('registration','registration-contacts');
    $app_token      = array('registration'=>sha1('registration' . time()));
    break;
}

// Merge the default and app modules
$module     = array_merge($default_module, $app_module);
$collection = array_merge($default_collection, $app_collection);
$token      = array_merge($default_token, $app_token);
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <title>Ironframework by Ironcoder</title>

    <link rel="stylesheet" href="<?php echo $base_url; ?>/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo $base_url; ?>/assets/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="<?php echo $base_url; ?>/assets/css/ironframework.css">

    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body role="document">

    <div role="navigation" class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle" type="button">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="<?php echo $base_url; ?>/" class="navbar-brand">Ironframework</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="<?php echo $base_url; ?>/">Home</a></li>
            <li><a href="<?php echo $base_url; ?>/sample-static-page">Sample Static Page</a></li>
            <li><a href="<?php echo $base_url; ?>/router-and-view">Router and View</a></li>
            <li><a href="<?php echo $base_url; ?>/model-and-collection">Model and Collection</a></li>
            <li><a href="<?php echo $base_url; ?>/server-sent-event">Server-Sent Event</a></li>
            <li><a href="<?php echo $base_url; ?>/login" onclick="return false" data-route="login">Log In</a></li>
            <li><a href="<?php echo $base_url; ?>/register">Register</a></li>
          </ul>
        </div>
      </div>
    </div><!-- END navigation -->

    <div class="container" id="main-container">
      <section>
        <div id="main-content">
          <div class="mini-layout" id="loading-content">
            <h4>Loading page...</h4>
          </div>
        </div>
        <div class="row-fluid show-grid">
          <div class="mini-layout span6">
            <header>
              <h3>Google Closure Compiler Service</h3>
              <h4>For online JS code compiler and minifier.</h4>
            </header>
            <p>
              <a href="http://closure-compiler.appspot.com/home" target="_blank">http://closure-compiler.appspot.com/home</a>
            </p>
          </div>
          <div class="mini-layout span6">
            <header>
              <h3>HTML Compression Tool</h3>
              <h4>For online HTML minifier.</h4>
            </header>
            <p>
              <a href="http://www.textfixer.com/html/compress-html-compression.php" target="_blank">http://www.textfixer.com/html/compress-html-compression.php</a>
            </p>
          </div>
        </div>
      </section>
    </div><!-- END main-container -->

    <script>
      // Init the Ironframework object
      var I = {};

      // Set the Ironframework properties
      I.BaseURL    = '<?php echo $base_url; ?>';
      I.Module     = ['<?php echo implode($module, "','"); ?>'];
<?php if (isset($base_module)): ?>
      I.BaseModule = ['<?php echo implode($base_module, "','"); ?>'];
<?php endif; ?>
      I.Collection = ['<?php echo implode($collection, "','"); ?>'];
      I.Token      = <?php echo json_encode($token); ?>;
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
    <script>
      if (typeof(jQuery) == 'undefined')
      {
        document.write(unescape('%3Cscript src="' + I.BaseURL + '/assets/js/vendor/jquery/jquery-2.0.2.min.js"%3E%3C/script%3E'));
      }
    </script>
    <script data-main="/assets/js/config<?php if ($minified): echo '.min'; endif; ?>" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.14/require.min.js"></script>
    <script>
      if (typeof(requirejs) == 'undefined')
      {
        document.write(unescape('%3Cscript data-main="/assets/js/config<?php if ($minified): echo '.min'; endif; ?>" src="' + I.BaseURL + '/assets/js/vendor/require/require-2.1.14.min.js"%3E%3C/script%3E'));
      }
    </script>
  </body>
</html>
