#!/usr/bin/python

import RPi.GPIO as GPIO
import time, sys

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(17, GPIO.OUT)
GPIO.setup(27, GPIO.OUT)

if len(sys.argv) > 1:
	relay = int(sys.argv[1])
	func = sys.argv[2]


	if func=='on':
		GPIO.output(relay,GPIO.LOW)
		time.sleep(0.5)
	elif func=='off':
		GPIO.output(relay,GPIO.HIGH)
		time.sleep(0.5)

list = []

if GPIO.input(17) == 1:
  list.append(17)
	
if GPIO.input(27) == 1:
  list.append(27)
	
print list