#!/usr/bin/python

from Adafruit_PWM_Servo_Driver import PWM
import time, sys

pwm = PWM(0x40, debug=True)

def setServoPulse(channel, pulse):
  pulseLength = 1000000                   # 1,000,000 us per second
  pulseLength /= 60                       # 60 Hz
  pulseLength /= 4096                     # 12 bits of resolution
  pulse *= 1000
  pulse /= pulseLength
  pwm.setPWM(channel, 0, pulse)

pwm.setPWMFreq(60)

if len(sys.argv) > 1:
	servo = int(sys.argv[1])
	position = int(sys.argv[2])
	pwm.setPWM(servo, 0, position)
	
if len(sys.argv) > 3:
	servo = int(sys.argv[3])
	position = int(sys.argv[4])
	pwm.setPWM(servo, 0, position)
