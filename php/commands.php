<?php

$type = $_GET['type'];

if ($type=='servo'){
	if(isset($_GET['servo0'])){$servo0 = $_GET['servo0']; $servo0val = $_GET['servo0val'];}
	if(isset($_GET['servo1'])){$servo1 = $_GET['servo1']; $servo1val = $_GET['servo1val'];}
	echo 'sudo python /var/www/python/servo.py '.$servo0.' '.$servo0val.' '.$servo1.' '.$servo1val;
	exec('sudo python /var/www/python/servo.py '.$servo0.' '.$servo0val.' '.$servo1.' '.$servo1val);
}

elseif ($type=='relay')
{
	$unit = $_GET['unit'];
	$func = $_GET['func'];
	$result = exec('sudo python /var/www/python/relay.py '.$unit.' '.$func);
	echo json_encode($result);
}

elseif ($type=='relay_in')
{
	echo 'sudo python /var/www/python/relay_in.py';
	$result = exec('sudo python /var/www/python/relay_in.py');
	echo $result;
}

?>