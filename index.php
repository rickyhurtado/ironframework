<?php
/**
 * index.php
 * 
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 *
 * Dynamic server page options in loading the application modules
 */

// NOTE for loading the the minified version of JS files (using the config.min JS file)
// Find and replace assets/js/config with assets/js/config.min or scroll down at bottom of this page
// Also find and replace the /Ironframework/ with correct URI absolute path
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <title>Ironframework by Ironcoder</title>
      
    <link rel="stylesheet" href="/Ironframework/assets/css/ironframework.css">
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>

  <body>
    
    <div id="wrapper">
      <h1 class="page-title">
        <a href="https://github.com/rickyhurtado/ironframework"><span class="blue">Iron</span><span class="green">framework</span></a> <small>by</small> <a href="#" onclick="return false;"><span class="blue">Iron</span><span class="orange">coder</span></a>
      </h1>

      <hr />
        
      <ul class="nav">
        <li><a href="/Ironframework/" onclick="return false" data-route="main">Home</a></li>
        <li><a href="/Ironframework/sample-static-page" onclick="return false" data-route="main">Sample Static Page</a></li>
        <li><a href="/Ironframework/router-and-view" onclick="return false" data-route="main">Router and View</a></li>
        <li><a href="/Ironframework/model-and-collection" onclick="return false" data-route="main">Model and Collection</a></li>
        <li><a href="/Ironframework/server-sent-event" onclick="return false" data-route="main">Server-Sent Event</a></li>
        <li><a href="/Ironframework/login" onclick="return false" data-route="main">Log In</a></li>
        <li><a href="/Ironframework/register" onclick="return false" data-route="main">Register</a></li>
      </ul>

      <hr />
        
      <section>
        <div id="main-content">
          <div class="sub-content" id="loading-content">
            <h4>Loading page...</h4>
          </div>
        </div>
        <hr />
        <div>
          <div class="sub-content">
            <header>
              <h3>Google Closure Compiler Service</h3>
              <h4>For online JS code compiler and minifier.</h4>
            </header>
            <p>
              <a href="http://closure-compiler.appspot.com/home" target="_blank">http://closure-compiler.appspot.com/home</a>
            </p>
          </div>
          <hr />
          <div class="sub-content">
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
    </div><!-- END wrapper -->

    <script>
      // Init the Ironframework object
      var I = {};
      
      // Set the Ironframework properties
      I.BaseURL    = '/Ironframework';
      I.Module     = ['init','settings','message','console-log-extend','alert-extend','data','contacts','business','server-sent-event','login','registration'];
      I.BaseModule = ['profile'];
      I.Collection = ['settings','category','contacts','contacts-business','registration','registration-contacts'];
      I.Token      = { "login":"s0m3t0k3nh3r3F0rl0gf0rm","registration":"s0m3t0k3nh3r3f0rr3gf0rm" };
    </script>
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script>
      if (typeof(jQuery) == 'undefined')
      {
        document.write(unescape('%3Cscript src="/Ironframework/assets/js/vendor/jquery/jquery-1.11.0.min.js"%3E%3C/script%3E'));
      }
    </script>
    <script data-main="/Ironframework/assets/js/config.min" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.11/require.min.js"></script>
    <script>
      if (typeof(requirejs) == 'undefined')
      {
        document.write(unescape('%3Cscript data-main="/Ironframework/assets/js/config" src="/Ironframework/assets/js/vendor/require/require-2.1.11.min.js"%3E%3C/script%3E'));
      }
    </script>
  </body>
</html>