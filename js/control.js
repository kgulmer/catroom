var relay_assoc = {'laser':17, 'twirl':27};
var wiggle_bool = false;
var randInterval = 2000;
var wiggleInterval;

$('#xyaxis').click(function(e) {
	if($('#laser').attr('class')=='relay_off'){
		var offset = $(this).offset(); 
		var x = parseInt($('#x_axis_min').val())+parseInt(($('#x_axis_max').val()-$('#x_axis_min').val())*(e.clientX - offset.left)/960); 
		var y = parseInt($('#y_axis_min').val())+parseInt(($('#y_axis_max').val()-$('#y_axis_min').val())*(e.clientY - offset.top)/540); 
		$.ajax({type: "GET", url: "php/commands.php", data: "type=servo&servo0=0&servo0val="+y+"&servo1=1&servo1val="+x});
	}
});

$('#laser').click(function(){
	if($(this).attr('class')=='relay_off'){relay_off($(this).attr('id'));} 
	else{relay_on($(this).attr('id'));}
});

$('#twirl').click(function(){
	if($(this).attr('class')=='relay_off'){relay_off($(this).attr('id'));} 
	else{relay_on($(this).attr('id'));}
});

$('#wiggle').click(function(){	
	if(wiggle_bool==false){
		$('#wiggle').attr('class', 'relay_off');
		wiggle_bool = true;
		wiggle();
	}
	else{
		clearInterval(wiggleInterval);
		$('#wiggle').attr('class', 'relay_on');
		wiggle_bool = false;	
	}
});

$('#laser_calibrate').click(function(){ 
	relay_on('laser'); calibration();
});

function relay_on(relay){var num = relay_assoc[relay]; $.ajax({type: "GET", url: "php/commands.php", data: "type=relay&unit="+num+"&func=on"});}
function relay_off(relay){var num = relay_assoc[relay]; $.ajax({type: "GET", url: "php/commands.php", data: "type=relay&unit="+num+"&func=off"});}
function wiggle(){

	wiggleInterval = setInterval(function(){
		var wigglePos = randomIntFromInterval(300,500);
		randInterval = randomIntFromInterval(100,5000);
		$.ajax({type: "GET", url: "php/commands.php", data: "type=servo&servo0=2&servo0val="+wigglePos});
	},randInterval);

}
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function calibration(){
	$('#dialog').dialog({title: "Laser Calibration", 
	buttons: {
		"Center Servos": function() {$.ajax({type: "GET", url: "php/commands.php", data: "type=servo&servo0=0&servo0val="+$('#y_axis_center').val()+"&servo1=1&servo1val="+$('#x_axis_center').val()});}, 
		"Exit": function() {relay_off('laser'); $(this).dialog("close");}
		}
	}).css("font-size", "11px");
	$('#dialog').dialog("open" );
}

setInterval(update, 1000);

function update(){
	$.ajax({type: "GET", url: "php/commands.php", data: "type=relay", dataType: 'json', success: function(data){
		if(data.indexOf('17') > -1){$('#laser').attr('class', 'relay_on');} else{$('#laser').attr('class', 'relay_off');}
		if(data.indexOf('27') > -1){$('#twirl').attr('class', 'relay_on');} else{$('#twirl').attr('class', 'relay_off');}
	}});
}