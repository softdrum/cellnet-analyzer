# Cellnet Analizer software

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Cellnet Analizer is a hardware and software system created for mobile network benchmarking. It is made as a part of my masters project.
Software can be installed on any computer (f.e. raspberry pi) which can be connected to simcom sim7600 modem via uart.

# Features!

  - WEB-interface
  - realtime signal quality charts (signal level, bit error rate, etc.)
  - Heatmaps
  - Beautiful UI
  - Dark and Light theme

### Tech

Cellnet Analyzer uses a number of open source projects to work properly:

* VueJS with Vuetify as a UI framework
* Node js - backend server
* Express] - node.js network app framework
* Socket IO - communication with web-interface users
* Serialport - to get data from usb modem
* MongoDB - to store measurements and user data

