# Chrome Dev Tools Extension for Proxying requests & Accessing Terminal

> This chrome dev tool extension is a combination of two open sourced exts <br />
a) NodeJs app that kills the terminal and act as a task runner & <br />
b) A Chrome proxy that routes all your browser traffic from chrome over to an IP address or hostname of your preference. <br />
It's a powerful tool to have if you need to route traffic over to localhost reverse proxies for testing and running browser automation taks all from within a dev tools extension.

## Installation

* `npm install -g yez` This is the NodeJS app that the extension speaks with to pass the terminal commands you type inside the extension
* Download this repo as a zip file and unzip it

> if you get the error below 
/usr/local/lib/node_modules/devtools-terminal/node_modules/socket.io/lib/store.js:35
Store.prototype.__proto__ = EventEmitter.prototype;
                                          ^
Then please visit the socket.io./lib folder via terminal and run the command below. This will replace "EventEmitter" usage with the "require event", use of EventEmitter has been deprecated since Node 7
* `sudo find . -type f -name '*.js' -exec sed -i '' -e "s/process.EventEmitter/require('events')/g" {} +`

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

I: Landing Page
![first](https://s3.amazonaws.com/betajam.akamaioc.com/first.png)
<br />




II: Multiple way to configure proxy settings
![Second](https://s3.amazonaws.com/betajam.akamaioc.com/second.png)

<br />




III: Use terminal right inside your Chrome browser
![Third](https://s3.amazonaws.com/betajam.akamaioc.com/third.png)

<br />




IV: Setup Automated browser test tasks within the extension
![Fourth](https://s3.amazonaws.com/betajam.akamaioc.com/fourth.png)