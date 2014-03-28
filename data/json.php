<?php
// Init var
$json = array();

// Select process from get AJAX URL
if (isset($_GET['data']) && $_GET['data'] == 'sync')
{
  // Category data update
  $json['category'] = array(
    array(
      'category_id' => 1,
      'order'       => 2,
      'category'    => 'Friends',
      'fragment'    => 'friends',
      'status'      => 1
    ),
    array(
      'category_id' => 3,
      'order'       => 3,
      'category'    => 'Business',
      'fragment'    => 'business',
      'status'      => 0
    ),
    array(
      'category_id' => 7,
      'order'       => 1,
      'category'    => 'Family',
      'fragment'    => 'family',
      'status'      => 1
    )
  );
  
  // Contacts data update
  $json['contacts'] = array(
    array(
      'person_id'   => 1,
      'category_id' => 7,
      'firstname'   => 'Rowena',
      'lastname'    => 'Hurtado',
      'email'       => 'weng@ironcoder.ph',
      'contact'     => '1234 567 891'
    ),
    array(
      'person_id'   => 2,
      'category_id' => 1,
      'firstname'   => 'Rendell Anderson',
      'lastname'    => 'Hurtado',
      'email'       => 'awesome@ironcoder.ph',
      'contact'     => '1234 567 892'
    ),
    array(
      'person_id'   => 3,
      'category_id' => 1,
      'firstname'   => 'Ralph Azriel',
      'lastname'    => 'Hurtado',
      'email'       => 'azry@ironcoder.ph',
      'contact'     => '1234 567 893'
    ),
    array(
      'person_id'   => 4,
      'category_id' => 3,
      'firstname'   => 'Ricky',
      'lastname'    => 'Hurtado',
      'email'       => 'ricky@aelogica.com',
      'contact'     => '1234 567 890'
    )
  );
  
  // Contacts business data update
  $json['contacts_business'] = array(
    array(
      'business_id' => 1,
      'person_id'   => 4,
      'company'     => 'Aelogica (Philippines) Inc.',
      'address'     => 'Philippines',
      'contact'     => '1234 567 890'
    )
  );
  
  // Reset data
  // $json['category'] = array();
  // $json['contacts'] = array();
  // $json['contacts_business'] = array();
}


if (isset($_GET['process']) && $_GET['process'] == 'register')
{
  $json['success']   = true;
  $json['person']    = $_POST['person'];
  $json['contacts']  = $_POST['contacts'];
  $json['confirmed'] = $_POST['confirmed'];
  $json['token']     = sha1('register' . time());
  
  if ($_POST['subscription'])
  {
    $json['subscription'] = $_POST['subscription'];
  }
}


if (isset($_GET['process']) && $_GET['process'] == 'sse')
{
  $json['date_time'] = date('Y-m-d H:i:s', time());
  
  if (isset($_GET['with-id']))
  {
    $json['newId'] = 7;
  }
  
  if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
  {
    // Return the JSON data as AJAX response
    $json['request'] = 'AJAX';
    echo json_encode($json);
  }
  else
  {
    $json['request'] = 'Event Source';
    
    // Return the JSON data as SSE response
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');
    echo "data: " . json_encode($json) . PHP_EOL;
    echo "retry: " . ($_GET['refresh'] * 1000) . PHP_EOL;
    echo PHP_EOL;
    ob_flush();
    flush();
  }
}

// Return the JSON data
if (isset($_GET['process']) && $_GET['process'] != 'sse' || isset($_GET['data']) && $_GET['data'] == 'sync')
{
  // JSON response
  echo json_encode($json);
}
?>