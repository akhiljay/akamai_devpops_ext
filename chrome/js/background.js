var debug_headers = "akamai-x-get-clientip, akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key, akamai-x-get-extracted-values, akamai-x-get-nonces, akamai-x-get-ssl-client-session-id, akamai-x-get-true-cache-key, akamai-x-serial-no, akamai-x-feo-trace, akamai-x-get-request-id"
var akamai_header = { "name":"Pragma", "value":debug_headers}


var TabCompleteNotifier = {
    tabs: {},
    add: function(tabId, callback) {
        if(!callback) return;
        if(!this.tabs["tab" + tabId]) this.tabs["tab" + tabId] = [];
        this.tabs["tab" + tabId].push(callback);
    },
    notify: function(tabId) {
        if(this.tabs["tab" + tabId]) {
            var tabs = this.tabs["tab" + tabId];
            for(var i=0; i<tabs.length; i++) {
                tabs[i]();
            }
            this.tabs["tab" + tabId] = [];
        }
    }
}
var onMessageListener = function(command, sender, sendResponse) {
    var cb = function(res) {
        return function(data) {
            sendResponse(data || res)
        }
    }
    switch(command.type) {
        case "open": 
            chrome.tabs.getSelected(null, function (tab) {
                if(command.data.indexOf('http') == -1) {
                    command.data = 'http://' + command.data;
                }
                TabCompleteNotifier.add(tab.id, cb('"' + command.data + '" opened.'));
                chrome.tabs.update(tab.id, {url: command.data});
            });
        break;
        case "refresh":
            chrome.tabs.getSelected(null, function (tab) {
                TabCompleteNotifier.add(tab.id, cb('Current tab refreshed.'));
                chrome.tabs.reload(tab.id);
            });
        break;
        case "newtab":
            if(command.data.indexOf('http') == -1) {
                command.data = 'http://' + command.data;
            }
            chrome.tabs.create({ active: true, url: command.data }, function(tab) {
                TabCompleteNotifier.add(tab.id, cb('"' + command.data + '" opened.'));
            });
        break;
        case "screenshot":
            chrome.windows.getCurrent(function (win) {    
                chrome.tabs.captureVisibleTab(win.id, {quality: 100}, function(image) {
                    chrome.tabs.create({ active: false, url: image }, function(tab) {
                        TabCompleteNotifier.add(tab.id, cb('Screenshot made.'));
                    });
                });    
              });
        break;
        case "click-and-wait":
            chrome.tabs.getSelected(null, function (tab) {
                var clickResponse = null;
                TabCompleteNotifier.add(tab.id, function() {
                    sendResponse(clickResponse);
                });
                chrome.tabs.sendMessage(tab.id, command, function(response) {
                    clickResponse = response;
                });
            });
        break;
        case "click":
            chrome.tabs.getSelected(null, function (tab) {
                var clickResponse = null;
                command.type = 'click';
                command.data = jsCodeUtilities(command.data);
                chrome.tabs.sendMessage(tab.id, command, function(response) {
                    sendResponse(clickResponse);
                });
            });
        break;
        case "js-and-wait":
            chrome.tabs.getSelected(null, function (tab) {
                var clickResponse = null;
                TabCompleteNotifier.add(tab.id, function() {
                    sendResponse(sendResponse(clickResponse ? JSON.stringify(clickResponse) : null));
                });
                command.data = jsCodeUtilities(command.data);
                chrome.tabs.executeScript(tab.id, {code: command.data}, function(response) {
                    clickResponse = response;
                });
            });
        break;
        case "js":
            chrome.tabs.getSelected(null, function(tab){
                command.data = jsCodeUtilities(command.data);
                chrome.tabs.executeScript(tab.id, {code: command.data}, function(response) {
                    sendResponse(response ? JSON.stringify(response) : null);
                });
            });
        break;
        case "wait":
            setTimeout(function() {
                sendResponse(true);
            }, parseInt(command.data));
        break;
    }
    return true;
}
var onUpdatedListener = function(tabId, info, tab) {
    if(info.status == "complete") {
        TabCompleteNotifier.notify(tabId);
    }
}
var jsCodeUtilities = function(code) {
    code = code.replace(/&quot;/g, '"');
    code = code.replace(/qs/g, 'document.querySelector');
    code = code.replace(/qsa/g, 'document.querySelectorAll');
    return code;
}

chrome.runtime.onMessage.addListener(onMessageListener);
chrome.tabs.onUpdated.addListener(onUpdatedListener);


chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    console.log("Akamai headers added to: " + details.url);
    var pragma_exists = false
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'Pragma') {
        details.requestHeaders[i].value = details.requestHeaders[i].value.concat(", ",debug_headers)
        pragma_exists = true
        break;
      }
    }
    if(!pragma_exists) {
      details.requestHeaders.push(akamai_header)
    }
    return {requestHeaders: details.requestHeaders};
  },
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]);
