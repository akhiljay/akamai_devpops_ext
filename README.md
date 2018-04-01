# Chrome Dev Tools Extension for Proxying requests & Accessing Terminal

> This chrome dev tool extension is a combination of three open sourced exts <br />

1. A NodeJs app that enabled terminal access within chrome dev tools, so you can invoke PAPI and other Akamai APIs directly from the terminal. <br />
2. A Chrome proxy that routes all your browser traffic from chrome over to an IP address or hostname of your preference. It's a powerful tool to have if you need to route traffic over to localhost reverse proxies for testing and running browser automation taks all from within a dev tools extension.<br/>
3. Adds Akamai pragma headers automatically to all the requests so it can help you debug your issues.

## Installation

1. `npm install -g devpops_ext` This is the NodeJS app that the extension speaks with to pass the terminal commands you type inside the extension



2. Run `devpops_ext` in your terminal window. You should see the following msg 

> if you get the error below <br />
/usr/local/lib/node_modules/devpops_ext/node_modules/socket.io/lib/store.js:35 <br />
Store.prototype.__proto__ = EventEmitter.prototype; <br />
                                          ^ <br />
Then please visit the "/usr/local/lib/node_modules/devpops_ext/node_modules/socket.io/lib/" folder via terminal and run the command below. This will replace "EventEmitter" usage with the "require event", use of EventEmitter has been deprecated since Node 7 <br />
`sudo find . -type f -name '*.js' -exec sed -i '' -e "s/process.EventEmitter/require('events')/g" {} +`

>if everything goes well, you will get the message below <br />
mymacbook:~ username$ devpops_ext<br />
   info  - socket.io started<br />
Devpops_ext! back-end is running. Install the Chrome extension or open http://localhost:9173<br />

3. Open Chrome browser and type in chrome://extensions, turn on developer mode (top right hand corner) and then click on "load unpacked", choose the "chrome" folder within the unzipped akamai-devops folder and click select.

4. Open Chrome's DevTools and find the Devpops tab

(Keep in mind that when you run the backend of Devpops_ext! the app is available at http://localhost:9173/)


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