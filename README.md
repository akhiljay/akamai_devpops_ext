# Chrome Dev Tools Extension for Proxying requests & Accessing Terminal

> This extension is a combination of two extensions 
a) NodeJs app that kills the terminal and act as a task runner & 
b) A Chrome proxy that routes all your browser traffic from chrome over to an IP address or hostname of your preference.
It's a powerful tool to have if you need to route traffic over to localhost reverse proxies for testing and running browser automation taks all from within a dev tools extension.

## Installation

* `npm install -g yez` This is the NodeJS app that the extension speaks with to pass the terminal commands you type inside the extension
* Download this repo as a zip file and unzip it

If you are having issues with the npm install, please run this command inside the root of the zip file "sudo find . -type f -name '*.js' -exec sed -i '' -e "s/process.EventEmitter/require('events')/g" {} +" - you will most probably need to run this if you have node 7.0 and above installed in your laptop.

## Usage

1. Install the Yez! module by running `npm install -g yez` or<br />`npm install -g https://registry.npmjs.org/yez/-/yez-2.0.1.tgz`.<br />

2. Run `yez` in your terminal window. You should see the following msg 

mymacbook:~ username$ yez
   info  - socket.io started
Yez! back-end is running. Install the Chrome extension or open http://localhost:9173

3. Open Chrome browser and type in chrome://extensions, turn on developer mode (top right hand corner) and then click on "load unpacked", choose the "chrome" folder within the unzipped akamai-devops folder and click select.

4. Open Chrome's DevTools and find the Devpops tab

(Keep in mind that when you run the backend of Yez! the app is available at http://localhost:9173/)


## Screenshots

Landing Page
![first](https://s3.amazonaws.com/betajam.akamaioc.com/first.png)

Multiple way to configure proxy
![Second](https://s3.amazonaws.com/betajam.akamaioc.com/second.png)

Use terminal right inside your Chrome browser
![Third](https://s3.amazonaws.com/betajam.akamaioc.com/third.png)

Setup Automated browser test tasks within the extension
![Fourth](https://s3.amazonaws.com/betajam.akamaioc.com/fourth.png)