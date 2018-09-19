var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    },{}); // enable customisation of search settings on first page hit

    var initialColumnSettings=undefined; // enable customisation of visible columns on first page hit
    if(initialColumnSettings) {
        if(initialColumnSettings.displayTime !==undefined) {
            this.displayTime=!initialColumnSettings.displayTime; // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
        }
        if(initialColumnSettings.displayBrowser !==undefined) {
            this.displayBrowser=!initialColumnSettings.displayBrowser; // same as above
        }
        if(initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId=!initialColumnSettings.displaySessionId; // same as above
        }
        if(initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId=!initialColumnSettings.displaySessionId; // same as above
        }
        if(initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots=initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "988a0b1d581d8bac778de7c420f3f49e",
        "instanceId": 9768,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/f6HqX4fq+irqktCr/c/1534747500224' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534747503950,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/JcF26JcQx+p3Y9Zx/c/1534747500756' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534747503951,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/xkE7PEJjrRk64F9R/c/1534747501311' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534747503952,
                "type": ""
            }
        ],
        "screenShotFile": "001e0022-00cc-0085-0041-004000a000a1.png",
        "timestamp": 1534747497041,
        "duration": 7823
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fc6b3bfd967b6249a722b1ecf974d4f0",
        "instanceId": 2372,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/yTmbqsedPKOlvA5i/c/1534747620528' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534747622253,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/B1ATR0vQXeHkRKIg/c/1534747620977' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534747622254,
                "type": ""
            }
        ],
        "screenShotFile": "0043007f-0034-0082-00ba-00ec0051005b.png",
        "timestamp": 1534747617566,
        "duration": 8236
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "39bd2498a552923e9f5e5894b285c0a1",
        "instanceId": 12304,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/QrQykEe1nrC+Yz2G/c/1534747754561' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534747756527,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/y2DA2Kggej3Dg1b2/c/1534747755293' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534747756527,
                "type": ""
            }
        ],
        "screenShotFile": "001b00aa-004e-005e-006e-000f00d500d7.png",
        "timestamp": 1534747746219,
        "duration": 13595
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "121fcc05aa179d63c36aabf4b908c752",
        "instanceId": 13492,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: by.class is not a function",
        "trace": "TypeError: by.class is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:8:23)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add a todo\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "003e0080-0056-008a-0026-00d900710024.png",
        "timestamp": 1534747978699,
        "duration": 4496
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "071eca843261ad54d97d8950174e6bfa",
        "instanceId": 3116,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/yapthystsSu9sChB/c/1534748056373' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534748058195,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/LEEWehX9pEqkIGf2/c/1534748058195' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534748058526,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/GyQfcr60cqqAKb6l/c/1534748058506' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534748059196,
                "type": ""
            }
        ],
        "screenShotFile": "00630094-00a2-00cf-00b4-004100120058.png",
        "timestamp": 1534748052672,
        "duration": 9338
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "630336961228340fa7ca8c666c36475b",
        "instanceId": 10784,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/PhT2kI1HfhgDgpyv/c/1534748503769' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534748505945,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/4TkqibMa-Pc8ZRmW/c/1534748504587' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534748505945,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/svrUCuQ5jVuMdLdx/c/1534748505277' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534748506602,
                "type": ""
            }
        ],
        "screenShotFile": "0015007c-008e-00d5-0047-00c90060001f.png",
        "timestamp": 1534748500806,
        "duration": 9681
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c3ae6a8d859906735b0660e1b1b72d8d",
        "instanceId": 13792,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected By(css selector, .fontBig.ng-binding) to equal 'Harry Potter'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:13:50)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/dvr7etPvdBPdg-KH/c/1534748727463' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534748729425,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/hbGm6FlCwXsFxR4j/c/1534748728259' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534748729425,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/A3Bziwi04kqhTBPm/c/1534748728654' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534748729426,
                "type": ""
            }
        ],
        "screenShotFile": "00110003-0091-0001-00ea-00c900e50031.png",
        "timestamp": 1534748724131,
        "duration": 10271
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "2b3515d689d8787fad7b6f945f907dbc",
        "instanceId": 4368,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: expect(...).getText is not a function",
        "trace": "TypeError: expect(...).getText is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:13:50)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add a todo\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "007400f1-00fd-00bb-00dc-008f00300083.png",
        "timestamp": 1534748890899,
        "duration": 433
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "bb42749ea3ab541c60228b2ca9988549",
        "instanceId": 11596,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: By(xpath, //button[@type=submit])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //button[@type=submit])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:16:51)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should add a todo\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/QFXr2KKeaOGPby6n/c/1534750246981' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750247447,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/5NCPMJ+0yznGYUI3/c/1534750247394' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750248821,
                "type": ""
            }
        ],
        "screenShotFile": "00de000c-0065-0020-00b3-00d0002d004b.png",
        "timestamp": 1534750243508,
        "duration": 26034
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "2952f734d86b1874046f686f23fbfe99",
        "instanceId": 7224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/DlBIylextOsnmHWf/c/1534750450344' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750451903,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/vugb5aPomz3VCigK/c/1534750450746' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750451904,
                "type": ""
            }
        ],
        "screenShotFile": "00a60020-00cb-007e-0055-003e00de0027.png",
        "timestamp": 1534750447587,
        "duration": 9854
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "94a920cf64ce2b3475d7074518d9094f",
        "instanceId": 11156,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/nzhd8Sz+fD+1dgbA/c/1534750747068' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750748562,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/aLjEsfgan2lVr9mF/c/1534750747943' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750748563,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/-FUXWRRc73jegrgt/c/1534750748267' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750748975,
                "type": ""
            }
        ],
        "screenShotFile": "00230098-000b-0031-002f-000300790053.png",
        "timestamp": 1534750742898,
        "duration": 11759
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "091742a57659c49641f021d39a4b3019",
        "instanceId": 11368,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected 'Hermoine Granger' to equal 'Harry Potter'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:10:29)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/qeADzdPAs6cJXWJq/c/1534750854205' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750856203,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/9Et4xghdun1uVO7Y/c/1534750855458' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750856204,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/ywRX0hf+jCfuHdh2/c/1534750856191' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750857261,
                "type": ""
            }
        ],
        "screenShotFile": "0028004b-004c-00b3-002f-007400ef00a0.png",
        "timestamp": 1534750850480,
        "duration": 11783
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "17786fb7a5981a770df0b2ea11590f67",
        "instanceId": 9028,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected 'Hermoine Granger' to equal 'Harry Potter'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:10:29)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/Z2cH04Zv8oaqPb31/c/1534750936255' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750937786,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/2s8nlQkiWTG8DCxg/c/1534750936620' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534750937787,
                "type": ""
            }
        ],
        "screenShotFile": "001d0011-0042-000c-00c1-009e00e200c5.png",
        "timestamp": 1534750930950,
        "duration": 13772
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ef0c1a141aef2645ce4f664f762c4ca0",
        "instanceId": 13720,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: By(xpath, //option[@value=2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //option[@value=2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:14:19)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/Hkm5xDB9pukmFf36/c/1534751046061' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751047643,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/cetOWeDZU3CUt8ZP/c/1534751046735' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751047643,
                "type": ""
            }
        ],
        "screenShotFile": "00520054-008a-006e-0019-00f600b90012.png",
        "timestamp": 1534751042150,
        "duration": 23729
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3376edd100f5bf5c70ee0bcb51921ec8",
        "instanceId": 14648,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/+UrErz+3gTt73PDF/c/1534751208352' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751209869,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/QliXfPEPdt2y7zKX/c/1534751208992' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751209869,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/em19n1GU-wxp6XCP/c/1534751209243' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751209870,
                "type": ""
            }
        ],
        "screenShotFile": "00f30034-0089-0082-0003-00e500b10050.png",
        "timestamp": 1534751205218,
        "duration": 10688
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7e595b90bef80c438084b93c96cba2e8",
        "instanceId": 13892,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/4gMV00KJjA3Rzymt/c/1534751445644' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751447193,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/9knSeWk3pCZv0tlh/c/1534751446166' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751447194,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/kFTPqmxoThtxpRoO/c/1534751446411' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751447195,
                "type": ""
            }
        ],
        "screenShotFile": "00f100c9-00c8-0074-0005-005200e400ce.png",
        "timestamp": 1534751442708,
        "duration": 10696
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7e595b90bef80c438084b93c96cba2e8",
        "instanceId": 13892,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected 'Deposit Successful' to equal 'Transaction successful'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:39:32)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00e200f6-005a-00e2-00ff-00ed007c0020.png",
        "timestamp": 1534751454131,
        "duration": 3230
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a06448079fe84be0701e0ea3a0fa98dc",
        "instanceId": 11428,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/Z3PD0O42TY94aN2g/c/1534751519134' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751520741,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/-B6e8Z9nsSjuId-J/c/1534751519508' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751520742,
                "type": ""
            }
        ],
        "screenShotFile": "005b009e-0020-00a9-0024-008700d900b7.png",
        "timestamp": 1534751515428,
        "duration": 11399
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a06448079fe84be0701e0ea3a0fa98dc",
        "instanceId": 11428,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "000e0024-00ac-0024-00c1-00eb004f0071.png",
        "timestamp": 1534751527570,
        "duration": 3402
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f85b597b57c7c230071892d30ee7911d",
        "instanceId": 14300,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/Krvtjqhlkael60te/c/1534751967931' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751968252,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/Nnnk+sSfXdHHILH0/c/1534751968251' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751969522,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/eoTxTWGeYRmSxkiG/c/1534751968482' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751969522,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://us36.zopim.com/s/W/ws/w+EUF6WrfDmbLLbE/c/1534751968960' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534751970567,
                "type": ""
            }
        ],
        "screenShotFile": "007a00d7-0087-0066-005d-0031008900b1.png",
        "timestamp": 1534751964566,
        "duration": 11391
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f85b597b57c7c230071892d30ee7911d",
        "instanceId": 14300,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008a008f-006b-001a-00c5-0067005e0078.png",
        "timestamp": 1534751977124,
        "duration": 3737
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f85b597b57c7c230071892d30ee7911d",
        "instanceId": 14300,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.buttonText(\"Transcations\")",
        "trace": "NoSuchElementError: No element found using locator: by.buttonText(\"Transcations\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:47:48)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Transcations History from Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:46:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\HomePage.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00e20074-002e-00f8-0081-00ac008e00e7.png",
        "timestamp": 1534751981345,
        "duration": 656
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "22fe5e4288eee84af59b441005af0634",
        "instanceId": 15040,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/OtiXIFl5q7wvpqqb/c/1534752107246' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534752107568,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/czKfDoKPVDrekIYD/c/1534752107566' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534752108824,
                "type": ""
            }
        ],
        "screenShotFile": "00be00ca-002a-0033-0055-0045009f00cf.png",
        "timestamp": 1534752103178,
        "duration": 16207
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "22fe5e4288eee84af59b441005af0634",
        "instanceId": 15040,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001900ad-005b-0031-0098-005600a1000b.png",
        "timestamp": 1534752120089,
        "duration": 3536
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "22fe5e4288eee84af59b441005af0634",
        "instanceId": 15040,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f700c1-00a5-00c7-00ac-0036005c0056.png",
        "timestamp": 1534752124085,
        "duration": 3294
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "26d6011ff06ccdac41fd1dbb3d85ec3d",
        "instanceId": 16376,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/O4WiI82j2JcmbKCG/c/1534752244733' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534752246306,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/AEbrZqXYVYwNucZV/c/1534752245191' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534752246307,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/j9Jlhz9j3mMOu9Yo/c/1534752245438' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534752246307,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://us22.zopim.com/s/W/ws/P4slhmVApZmTzeDJ/c/1534752245853' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534752248121,
                "type": ""
            }
        ],
        "screenShotFile": "00ff00df-0000-00f7-0025-008e00c2000e.png",
        "timestamp": 1534752240428,
        "duration": 12520
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "26d6011ff06ccdac41fd1dbb3d85ec3d",
        "instanceId": 16376,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005000cf-003f-004a-00c0-0038003500ce.png",
        "timestamp": 1534752253682,
        "duration": 3510
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "26d6011ff06ccdac41fd1dbb3d85ec3d",
        "instanceId": 16376,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b80060-008f-001a-00ab-009000480003.png",
        "timestamp": 1534752257687,
        "duration": 3967
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6f36eff474f0c9b8c1764ade7e5f7841",
        "instanceId": 15384,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/Lq3IIit802Mf3k14/c/1534752365010' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534752366811,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/-VAssJnWOhURMBmq/c/1534752365372' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534752366812,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/oiWsCqd7mArbyMK5/c/1534752365840' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534752366813,
                "type": ""
            }
        ],
        "screenShotFile": "00bd0039-00f3-0096-00b9-006d009d008d.png",
        "timestamp": 1534752362013,
        "duration": 11127
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6f36eff474f0c9b8c1764ade7e5f7841",
        "instanceId": 15384,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a3006f-00e3-008a-0040-0051001300a8.png",
        "timestamp": 1534752373863,
        "duration": 3454
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6f36eff474f0c9b8c1764ade7e5f7841",
        "instanceId": 15384,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001a003d-005b-002d-00b9-00ab006e0096.png",
        "timestamp": 1534752377752,
        "duration": 4350
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1f8c800187e0a0e58fedfb48b5e41df0",
        "instanceId": 14536,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/Rq9sqPgnmJfxouc2/c/1534755036929' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534755038234,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/RueNR353NAHAkUx6/c/1534755038108' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534755040036,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/ccdJpLQ7boUEfpzX/c/1534755040033' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534755040594,
                "type": ""
            }
        ],
        "screenShotFile": "006300f5-003d-00cf-0005-0038001500c8.png",
        "timestamp": 1534755032514,
        "duration": 12359
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1f8c800187e0a0e58fedfb48b5e41df0",
        "instanceId": 14536,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006f0068-00c2-00e3-00fb-00b300740029.png",
        "timestamp": 1534755046134,
        "duration": 2526
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1f8c800187e0a0e58fedfb48b5e41df0",
        "instanceId": 14536,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d00056-0014-00fe-0056-003700c70006.png",
        "timestamp": 1534755049160,
        "duration": 4234
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1f8c800187e0a0e58fedfb48b5e41df0",
        "instanceId": 14536,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b200fc-00eb-003c-006a-00be00860033.png",
        "timestamp": 1534755053880,
        "duration": 4502
    },
    {
        "description": "Bank Manager Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "33efb14642cee228278dda6e02333c08",
        "instanceId": 10584,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: element.get is not a function",
        "trace": "TypeError: element.get is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:4:9)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "003e0039-0054-0041-0004-004100b9003d.png",
        "timestamp": 1534755719798,
        "duration": 535
    },
    {
        "description": "Bank Manager Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1489e102fab34d3dd52c783409426214",
        "instanceId": 6172,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: by.buttonText(...).click is not a function",
        "trace": "TypeError: by.buttonText(...).click is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:7:39)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00190078-0054-0099-00c5-006800e600a0.png",
        "timestamp": 1534755795502,
        "duration": 425
    },
    {
        "description": "Bank Manager Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "0a56f105e4935dbcfeb30a9266d2e00f",
        "instanceId": 14616,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: by.buttonText(...).click is not a function",
        "trace": "TypeError: by.buttonText(...).click is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:7:39)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "0097007c-0007-0062-00b5-00820018004a.png",
        "timestamp": 1534755881368,
        "duration": 438
    },
    {
        "description": "Add Customer|Bank Manager Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "873a073891e049769506418fd10de7aa",
        "instanceId": 15960,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: by.buttonText(...).click is not a function",
        "trace": "TypeError: by.buttonText(...).click is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:9:39)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Add Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "007d0023-00fc-00c3-0060-00a2000900d3.png",
        "timestamp": 1534756018518,
        "duration": 449
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c3cddcd47d1c0d13f2a8b175fb2118e6",
        "instanceId": 14844,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/CrFg-QBSUwaptnf2/c/1534756081567' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534756082378,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/AhdyHKKMnsWSsmLP/c/1534756082225' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534756083703,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/HiJ16J8OksWeNd+h/c/1534756082934' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534756083704,
                "type": ""
            }
        ],
        "screenShotFile": "00610062-00e7-0079-001f-00c200d30077.png",
        "timestamp": 1534756077120,
        "duration": 15007
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c3cddcd47d1c0d13f2a8b175fb2118e6",
        "instanceId": 14844,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00db00c6-001e-00d2-00f2-008100fb002c.png",
        "timestamp": 1534756092929,
        "duration": 3053
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c3cddcd47d1c0d13f2a8b175fb2118e6",
        "instanceId": 14844,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ac00ee-00c3-00b7-00c8-005000bf00f5.png",
        "timestamp": 1534756096444,
        "duration": 3970
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c3cddcd47d1c0d13f2a8b175fb2118e6",
        "instanceId": 14844,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00150030-006b-0044-00c5-00e5008e00cb.png",
        "timestamp": 1534756100964,
        "duration": 4433
    },
    {
        "description": "Add Customer|Bank Manager Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d9c7434fee0a22a47d8e8b9037b4315c",
        "instanceId": 11684,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: by.buttonText(...).click is not a function",
        "trace": "TypeError: by.buttonText(...).click is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:10:39)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Add Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00fe0076-007d-00fa-007a-007d003a006f.png",
        "timestamp": 1534756305357,
        "duration": 448
    },
    {
        "description": "Add Customer|Bank Manager Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7f3a72ec7d4ca4eb7af94f0392c39a38",
        "instanceId": 12608,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Testcustomer1 is not defined",
        "trace": "ReferenceError: Testcustomer1 is not defined\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:13:37)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Add Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "004c00e6-0051-008a-0022-00b8002800e0.png",
        "timestamp": 1534756522713,
        "duration": 455
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7f51e9933a0450f39d57bc22e0acccb6",
        "instanceId": 1568,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/FsjIJfjvisPQ-Pmj/c/1534756672929' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534756673370,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/3Xlwkkon5-cT7MgO/c/1534756673370' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534756675083,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/BWnK9lBAiXEjIYoo/c/1534756673945' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534756675084,
                "type": ""
            }
        ],
        "screenShotFile": "009200fb-0055-0005-00dd-00920044004f.png",
        "timestamp": 1534756669948,
        "duration": 6868
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "743a316a1a80f7764e24ef058225a4d7",
        "instanceId": 16156,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: by.buttonText(...).click is not a function",
        "trace": "TypeError: by.buttonText(...).click is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:10:39)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "0041008b-00b7-0072-0038-006900b800fc.png",
        "timestamp": 1534756741737,
        "duration": 444
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f0be03d7ae69db6f0f20ccecda99b435",
        "instanceId": 13488,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Testcustomer1 is not defined",
        "trace": "ReferenceError: Testcustomer1 is not defined\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:11:37)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "008a002c-00f9-00fa-00f9-00ae00d10040.png",
        "timestamp": 1534756841699,
        "duration": 590
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "75b9dab452ab2d3ef20cb8cbed7579a8",
        "instanceId": 5736,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/alsEun2U63IrUXN0/c/1534756987456' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534756988997,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/n5Bxk5OPBbY9r+FJ/c/1534756988172' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534756988997,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/VFMT5Ig7LZt0zLjO/c/1534756988711' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534756991398,
                "type": ""
            }
        ],
        "screenShotFile": "00e5005a-004f-0080-00a6-00710066000a.png",
        "timestamp": 1534756984886,
        "duration": 6986
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "de3fb93d597dd10ef55e709ac1bde715",
        "instanceId": 14168,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/5MW23308zP7FThQ5/c/1534757071600' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757073105,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/1homFopB9HkqXRQs/c/1534757072292' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757073106,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/Wyapyptw8+vaxGF5/c/1534757072695' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757073106,
                "type": ""
            }
        ],
        "screenShotFile": "003c008e-0036-001a-0069-00c800b50000.png",
        "timestamp": 1534757068750,
        "duration": 9411
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a4f7b82a8ddc60bb32def5110349b14c",
        "instanceId": 17276,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Testcustomer1 is not defined",
        "trace": "ReferenceError: Testcustomer1 is not defined\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:14:37)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00f400b3-0018-004a-00bf-0074008300f1.png",
        "timestamp": 1534757132140,
        "duration": 455
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "11dbb5748292ce5c70aad89d987adb71",
        "instanceId": 10692,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/A78KAeUqO0tEWeZW/c/1534757475130' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757476745,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/88oXztNcBErZBWkK/c/1534757475718' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757476745,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/KwGowieO8oGdAVFX/c/1534757476281' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757479230,
                "type": ""
            }
        ],
        "screenShotFile": "009300ab-00b2-000a-00ae-00b900660036.png",
        "timestamp": 1534757469620,
        "duration": 17734
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1756f52792a8561e10b24d163adbdaaf",
        "instanceId": 14636,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/mIIY3oKMot2awSr7/c/1534757574699' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757576214,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/T1Y2ScR7+Hdu5oyM/c/1534757575393' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757576214,
                "type": ""
            }
        ],
        "screenShotFile": "00c300cf-0016-002b-00e4-003f007a00c7.png",
        "timestamp": 1534757571388,
        "duration": 8035
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d46dd224c7c9e71863a98749d9ce6ef0",
        "instanceId": 11396,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/wkNCK87WUrS183uG/c/1534757846918' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757848428,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/K63E5frR73RGayir/c/1534757847645' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534757848428,
                "type": ""
            }
        ],
        "screenShotFile": "007400fb-0068-005c-00c9-00b200140036.png",
        "timestamp": 1534757840305,
        "duration": 12428
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d46dd224c7c9e71863a98749d9ce6ef0",
        "instanceId": 11396,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0054006d-00e7-005d-006f-0049000f006f.png",
        "timestamp": 1534757853531,
        "duration": 5300
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "bc675e14a9cd5f83afb44ada9bb4b76b",
        "instanceId": 5736,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/TsGJVgKRZB86shja/c/1534758344172' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534758346040,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/un7YzTmsSVVcLgNN/c/1534758344949' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534758346041,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/M6l4ye3TbrxH+oDL/c/1534758345445' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534758346041,
                "type": ""
            }
        ],
        "screenShotFile": "0063007d-0072-0044-00ab-009f0098000b.png",
        "timestamp": 1534758339655,
        "duration": 10979
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "bc675e14a9cd5f83afb44ada9bb4b76b",
        "instanceId": 5736,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: By(xpath, //option[@value=Rupee])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //option[@value=Rupee])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:28:49)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:19:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00eb00f1-0062-00bc-00d1-009a0094006f.png",
        "timestamp": 1534758352780,
        "duration": 20756
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7d3a025bab1e11475016ba34b74e3914",
        "instanceId": 6816,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/KsQmatOsFOUeba9p/c/1534758676037' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534758677673,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/3FEETMwK3oHG+yF6/c/1534758676540' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534758677708,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/pWuhm0RJKspP4aKZ/c/1534758677707' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534758678538,
                "type": ""
            }
        ],
        "screenShotFile": "00ff0093-009d-008c-00fa-004900e20052.png",
        "timestamp": 1534758658776,
        "duration": 25577
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7d3a025bab1e11475016ba34b74e3914",
        "instanceId": 6816,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Select is not defined",
        "trace": "ReferenceError: Select is not defined\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:29:16)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:19:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "001200d9-0065-0061-007f-006700bd0006.png",
        "timestamp": 1534758685852,
        "duration": 459
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a5a55e0e320160ddcda152c765de788d",
        "instanceId": 18068,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/i5R3qUlPJiH6sXE4/c/1534758967240' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534758967881,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/-N4J-Gge5mYcaLpS/c/1534758967882' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534758969318,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/fszpv5rQn6AdkN55/c/1534758969107' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534758969966,
                "type": ""
            }
        ],
        "screenShotFile": "00a3005c-00df-0012-00e3-00c7007200c3.png",
        "timestamp": 1534758963705,
        "duration": 10594
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a69c2583e38ffb5b215e986f9d3f0bd9",
        "instanceId": 15948,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/HU7KmVMkFy3F3zUw/c/1534759097731' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534759099364,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/-A6WXNdVEGH3he3d/c/1534759098139' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534759099364,
                "type": ""
            }
        ],
        "screenShotFile": "004100ed-008a-00ab-00ea-00f200c000a7.png",
        "timestamp": 1534759094648,
        "duration": 8885
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a69c2583e38ffb5b215e986f9d3f0bd9",
        "instanceId": 15948,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ca0094-00a0-003a-00e3-00ef00ab004b.png",
        "timestamp": 1534759104706,
        "duration": 4857
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "167607dc9333aa6e678fc1fe92cb3bbd",
        "instanceId": 16116,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/RQ1bTJWqyyslezxQ/c/1534760403511' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760405634,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/qcGlICf5haKQkl0F/c/1534760404390' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760406405,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/YzRG8t7C6yz-vGEs/c/1534760406406' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760406768,
                "type": ""
            }
        ],
        "screenShotFile": "00b3006e-004f-0008-007c-00d400df00a2.png",
        "timestamp": 1534760397493,
        "duration": 18080
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "167607dc9333aa6e678fc1fe92cb3bbd",
        "instanceId": 16116,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0073006a-005f-00c7-0062-00bc00e60097.png",
        "timestamp": 1534760420981,
        "duration": 6560
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "167607dc9333aa6e678fc1fe92cb3bbd",
        "instanceId": 16116,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: By(xpath, //tbody//tr[7]//td[5]//button[1])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //tbody//tr[7]//td[5]//button[1])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:43:63)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:37:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00070032-0035-0002-0031-00b000d500e5.png",
        "timestamp": 1534760428075,
        "duration": 19252
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "0099069a1e27f75520338a1ef0551308",
        "instanceId": 15532,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/sFcULUbALwpT4cSi/c/1534760595735' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760597364,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/zeAZ8+INHIAS2NAu/c/1534760596534' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760597726,
                "type": ""
            }
        ],
        "screenShotFile": "00e1002c-004f-0089-0027-00140053000a.png",
        "timestamp": 1534760591211,
        "duration": 10414
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "0099069a1e27f75520338a1ef0551308",
        "instanceId": 15532,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006a00c9-0062-0088-00de-00de009900ca.png",
        "timestamp": 1534760603360,
        "duration": 6223
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "0099069a1e27f75520338a1ef0551308",
        "instanceId": 15532,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008a00aa-00bf-00c6-002c-00370055006d.png",
        "timestamp": 1534760610112,
        "duration": 4450
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "896a42b2b37520f78b6e9efbb9b93550",
        "instanceId": 16168,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/GT-6EmbEAr0hNryL/c/1534760844713' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760846214,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/AE562JCYMLqHunBG/c/1534760845315' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760846215,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/uApeLYPszLMyrroQ/c/1534760845555' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760846215,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://us34.zopim.com/s/W/ws/KeLPWSEn7e0WuqzQ/c/1534760845752' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760847302,
                "type": ""
            }
        ],
        "screenShotFile": "00f300b7-0044-00e8-00e7-0075008e0096.png",
        "timestamp": 1534760841142,
        "duration": 9415
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "896a42b2b37520f78b6e9efbb9b93550",
        "instanceId": 16168,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b80034-005c-007f-00ca-002800350033.png",
        "timestamp": 1534760851382,
        "duration": 5986
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "896a42b2b37520f78b6e9efbb9b93550",
        "instanceId": 16168,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "InvalidSelectorError: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(css selector, ng-click=\"deleteCust(cust)\"))\n    at thenableWebDriverProxy.schedule (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at thenableWebDriverProxy.findElements (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:44:55)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:37:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "0051008d-0025-0038-0074-00d7006d009d.png",
        "timestamp": 1534760857854,
        "duration": 3481
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae687bb2c162199f4b0d8dc77415d13c",
        "instanceId": 18884,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/GXtpgUjJBudAQH67/c/1534760983049' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760984578,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/tGxvozbe7XGduX1U/c/1534760983602' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760984579,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/xve8iCJEz+SY9lvE/c/1534760984151' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534760984580,
                "type": ""
            }
        ],
        "screenShotFile": "008200d4-00df-00b5-005f-00d80032001b.png",
        "timestamp": 1534760977001,
        "duration": 11616
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae687bb2c162199f4b0d8dc77415d13c",
        "instanceId": 18884,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f7002c-0095-0063-00e3-005900d30059.png",
        "timestamp": 1534760989560,
        "duration": 6973
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae687bb2c162199f4b0d8dc77415d13c",
        "instanceId": 18884,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "InvalidSelectorError: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(css selector, .ng-click=\"deleteCust(cust)\"))\n    at thenableWebDriverProxy.schedule (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at thenableWebDriverProxy.findElements (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:44:56)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:37:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "009700a1-0081-00a9-00c6-007500cc007a.png",
        "timestamp": 1534760997033,
        "duration": 3633
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a88876d0c4f393e051d80af201d7faee",
        "instanceId": 15564,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/muKgquoUky8vzF8O/c/1534761133131' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761134657,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/AUTx-nnUR+sp5Idy/c/1534761133472' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761134658,
                "type": ""
            }
        ],
        "screenShotFile": "00df00c9-0043-008f-00b9-003c00de00db.png",
        "timestamp": 1534761129693,
        "duration": 9052
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a88876d0c4f393e051d80af201d7faee",
        "instanceId": 15564,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002d0060-0003-00d3-0021-008a004500b4.png",
        "timestamp": 1534761139644,
        "duration": 6029
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a88876d0c4f393e051d80af201d7faee",
        "instanceId": 15564,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: By(css selector, Delete)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, Delete)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:44:34)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:37:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "009a00f2-0026-0081-0054-00ba00830039.png",
        "timestamp": 1534761146172,
        "duration": 18576
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d7c237c22531bf7e1337d5f0df75be6a",
        "instanceId": 14484,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/tArJpuF10iXirATE/c/1534761191976' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761193529,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/ejPrAWcJEbrh27V4/c/1534761193481' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761193739,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/REAA-uxODKaRoIL8/c/1534761193740' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761194284,
                "type": ""
            }
        ],
        "screenShotFile": "0035002c-00ee-00ed-00fc-00d8005e0005.png",
        "timestamp": 1534761187659,
        "duration": 10039
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d7c237c22531bf7e1337d5f0df75be6a",
        "instanceId": 14484,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003b0048-00af-000f-00ae-000a00060033.png",
        "timestamp": 1534761198564,
        "duration": 6479
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d7c237c22531bf7e1337d5f0df75be6a",
        "instanceId": 14484,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed0027-000a-0088-00b6-008900af001c.png",
        "timestamp": 1534761205578,
        "duration": 3906
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1360c85a5e321e41171aca11422ce4b7",
        "instanceId": 18852,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/qKSyn6q10TX2Sk94/c/1534761363169' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761363681,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/r4MOq984mLdAQWnh/c/1534761363684' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761364314,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/mDMzrA-b8tzB60nm/c/1534761364310' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761364813,
                "type": ""
            }
        ],
        "screenShotFile": "00320073-00a7-0071-00b1-00b6008b003b.png",
        "timestamp": 1534761359750,
        "duration": 10235
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1360c85a5e321e41171aca11422ce4b7",
        "instanceId": 18852,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ed0028-00f5-000f-00b0-00630046000e.png",
        "timestamp": 1534761370866,
        "duration": 2744
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1360c85a5e321e41171aca11422ce4b7",
        "instanceId": 18852,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d800cc-000a-0075-0024-008000ab00d8.png",
        "timestamp": 1534761374077,
        "duration": 3548
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1360c85a5e321e41171aca11422ce4b7",
        "instanceId": 18852,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003b0012-007f-00e4-00c2-0097003a0016.png",
        "timestamp": 1534761378136,
        "duration": 4306
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1360c85a5e321e41171aca11422ce4b7",
        "instanceId": 18852,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/jRRspQIB3BjABeJI/c/1534761383816' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761384412,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/sErpyN-DmIoKttZ-/c/1534761384405' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534761385030,
                "type": ""
            }
        ],
        "screenShotFile": "000a004e-00c6-00ff-0014-00b9004f0080.png",
        "timestamp": 1534761382973,
        "duration": 5464
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1360c85a5e321e41171aca11422ce4b7",
        "instanceId": 18852,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00da009d-0061-0021-0090-0062009e0000.png",
        "timestamp": 1534761388927,
        "duration": 6327
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1360c85a5e321e41171aca11422ce4b7",
        "instanceId": 18852,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bb0061-00d5-00b3-00c2-0043008b0077.png",
        "timestamp": 1534761395704,
        "duration": 3884
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7305de5ab267b9f46bf338d13fa01ffd",
        "instanceId": 9028,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: unknown error: failed to change window state to normal, current state is maximized\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "WebDriverError: unknown error: failed to change window state to normal, current state is maximized\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.manage().window().maximize()\n    at thenableWebDriverProxy.schedule (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Window.maximize (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1686:25)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:5:40)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/zRxp4U6-NerPawuP/c/1534763208304' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763210586,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/ucpCGav+k4g+vFrk/c/1534763209602' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763210587,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/-VdcQAUesqBcD5A+/c/1534763210038' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763210613,
                "type": ""
            }
        ],
        "screenShotFile": "00ea000b-00c6-0091-00fd-00f600630055.png",
        "timestamp": 1534763202523,
        "duration": 8789
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7305de5ab267b9f46bf338d13fa01ffd",
        "instanceId": 9028,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.buttonText(\"Open Account\")",
        "trace": "NoSuchElementError: No element found using locator: by.buttonText(\"Open Account\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:22:44)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:19:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00130074-0087-00db-0005-005100d90007.png",
        "timestamp": 1534763214481,
        "duration": 572
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7305de5ab267b9f46bf338d13fa01ffd",
        "instanceId": 9028,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.buttonText(\"Customers\")",
        "trace": "NoSuchElementError: No element found using locator: by.buttonText(\"Customers\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:40:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:37:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00d800e8-0000-005c-0060-00aa006b007e.png",
        "timestamp": 1534763215743,
        "duration": 525
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7305de5ab267b9f46bf338d13fa01ffd",
        "instanceId": 9028,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/XWmLFpmjFjP3UTgF/c/1534763217584' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763217908,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/tpOn8U35rdl6omN1/c/1534763217908' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763218413,
                "type": ""
            }
        ],
        "screenShotFile": "00910076-0067-0028-000d-00a7002600a4.png",
        "timestamp": 1534763216903,
        "duration": 3999
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7305de5ab267b9f46bf338d13fa01ffd",
        "instanceId": 9028,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002f0053-0085-00ea-0086-00fa00c200a5.png",
        "timestamp": 1534763221653,
        "duration": 3102
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7305de5ab267b9f46bf338d13fa01ffd",
        "instanceId": 9028,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0008002b-007b-00cc-007e-000200d900d6.png",
        "timestamp": 1534763225277,
        "duration": 3613
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7305de5ab267b9f46bf338d13fa01ffd",
        "instanceId": 9028,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002d0004-007d-0086-003e-005b00ba0010.png",
        "timestamp": 1534763229386,
        "duration": 6018
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9546ed89175a0581f131cc49e035aeb3",
        "instanceId": 11784,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/T2fILoSfYjQlqObL/c/1534763304226' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763305910,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/NW+0qfgVWxgMu6zX/c/1534763304881' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763305911,
                "type": ""
            }
        ],
        "screenShotFile": "00cb00b1-00f3-00b2-00ae-00be00c700d4.png",
        "timestamp": 1534763298296,
        "duration": 12687
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9546ed89175a0581f131cc49e035aeb3",
        "instanceId": 11784,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002400bc-00e9-00df-008e-004b00f500a7.png",
        "timestamp": 1534763312268,
        "duration": 2659
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9546ed89175a0581f131cc49e035aeb3",
        "instanceId": 11784,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003300bc-00aa-005d-00f8-003d003a0036.png",
        "timestamp": 1534763315404,
        "duration": 3616
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9546ed89175a0581f131cc49e035aeb3",
        "instanceId": 11784,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000100cc-0086-00b5-0011-007c000a0052.png",
        "timestamp": 1534763319546,
        "duration": 4240
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9546ed89175a0581f131cc49e035aeb3",
        "instanceId": 11784,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
        "trace": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4281:23)\n    at ontimeout (timers.js:498:11)\n    at tryOnTimeout (timers.js:323:5)\n    at Timer.listOnTimeout (timers.js:290:5)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/csuonWLDXO5NjPv2/c/1534763329060' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763329495,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/x6uFwzJGStzDKNLK/c/1534763329494' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763329971,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/KatMalWY5V7iCZ1i/c/1534763329973' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763330603,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/lWzJ1lWO6nE9QMJi/c/1534763377775' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763378243,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/Qfr1tj3FHwkgioSY/c/1534763378172' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763379352,
                "type": ""
            }
        ],
        "screenShotFile": "000c0089-00a0-0029-0029-00d100b40088.png",
        "timestamp": 1534763324314,
        "duration": 64393
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9546ed89175a0581f131cc49e035aeb3",
        "instanceId": 11784,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.buttonText(\"Open Account\")",
        "trace": "NoSuchElementError: No element found using locator: by.buttonText(\"Open Account\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:22:44)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:19:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00f20058-007b-00df-004a-00e900a900b0.png",
        "timestamp": 1534763389282,
        "duration": 521
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9546ed89175a0581f131cc49e035aeb3",
        "instanceId": 11784,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.buttonText(\"Customers\")",
        "trace": "NoSuchElementError: No element found using locator: by.buttonText(\"Customers\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:40:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:37:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "006700a7-0098-0053-005d-003700bc00dd.png",
        "timestamp": 1534763390371,
        "duration": 519
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "99e34538c3cce4a7081d8031338eb4cf",
        "instanceId": 18856,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/7+l8Bjpdo6AlGOxI/c/1534763426475' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763428049,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/b-RgZUkrLva0yNIm/c/1534763427087' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763428067,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/bqz88cIWNWsA6JH8/c/1534763428067' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763428825,
                "type": ""
            }
        ],
        "screenShotFile": "00ef00ee-00cb-0037-001e-001e00b9008e.png",
        "timestamp": 1534763422985,
        "duration": 12179
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "99e34538c3cce4a7081d8031338eb4cf",
        "instanceId": 18856,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006a00de-00cd-003b-00aa-0096000d0055.png",
        "timestamp": 1534763436052,
        "duration": 6127
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "99e34538c3cce4a7081d8031338eb4cf",
        "instanceId": 18856,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0060008e-0091-008a-003f-00e5008e00e8.png",
        "timestamp": 1534763442718,
        "duration": 3935
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4597198031d2070e5340f2d63e177146",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/t5x586k8zLejNIO6/c/1534763598503' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763600084,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/OkupzhcD4f3DMR86/c/1534763599939' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763600873,
                "type": ""
            }
        ],
        "screenShotFile": "001700a0-007d-005b-00ed-007f005c002e.png",
        "timestamp": 1534763593325,
        "duration": 11096
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4597198031d2070e5340f2d63e177146",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c10020-0016-00b9-0057-005e009a00b9.png",
        "timestamp": 1534763605212,
        "duration": 6356
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4597198031d2070e5340f2d63e177146",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005e0079-0058-00fd-0045-00e400f500c9.png",
        "timestamp": 1534763612055,
        "duration": 3767
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "41651918dbc13522e9c289b03143a625",
        "instanceId": 17444,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/bzLQsvuuWhOHTgnD/c/1534763700553' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763702216,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/65eZ8uxhgsLxnBN3/c/1534763701522' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763702217,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/zGCB5SOAROPW+dvC/c/1534763702035' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534763703046,
                "type": ""
            }
        ],
        "screenShotFile": "00b7004c-00c1-00a2-00b9-00f400fa0037.png",
        "timestamp": 1534763695005,
        "duration": 12235
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "41651918dbc13522e9c289b03143a625",
        "instanceId": 17444,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ef0018-00a9-0011-00e2-005600a500d5.png",
        "timestamp": 1534763708033,
        "duration": 6454
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "41651918dbc13522e9c289b03143a625",
        "instanceId": 17444,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00be00b3-0015-0067-0034-005b001a00f2.png",
        "timestamp": 1534763715003,
        "duration": 4247
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d086ae8b729e59318f2aeb1901d94303",
        "instanceId": 18052,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected 'Customer added successfully with customer id :6' to equal 'Harry Potter'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:15:13)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/bMfsIKFG+O+UbET2/c/1534764526961' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534764528474,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/QK04qbhUPunSlVRz/c/1534764528012' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534764528849,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/q0wZoXkPJZcfozRa/c/1534764528807' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534764529460,
                "type": ""
            }
        ],
        "screenShotFile": "00150048-0068-0049-0042-005900f40065.png",
        "timestamp": 1534764522285,
        "duration": 10693
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d086ae8b729e59318f2aeb1901d94303",
        "instanceId": 18052,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00820027-00d7-00da-0001-003c008100cc.png",
        "timestamp": 1534764533798,
        "duration": 6443
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d086ae8b729e59318f2aeb1901d94303",
        "instanceId": 18052,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c80010-0063-009d-00d9-00520098003e.png",
        "timestamp": 1534764540858,
        "duration": 4506
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c776f120184b8ba20e6483b6c2855e21",
        "instanceId": 4224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/r7LvIrnMHc0bn+NG/c/1534764626522' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534764628150,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/WhvTsYLc1w07VxJw/c/1534764627257' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534764628151,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/gL4c+++GOzz2mgDH/c/1534764627785' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534764628294,
                "type": ""
            }
        ],
        "screenShotFile": "00c00066-00a6-00f6-00a6-001f004a0016.png",
        "timestamp": 1534764622692,
        "duration": 9887
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c776f120184b8ba20e6483b6c2855e21",
        "instanceId": 4224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected 'Account created successfully with account Number :1016' to equal 'Customer added successfully with customer id :6'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:35:17)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00b10029-000d-0027-0054-004900b8006e.png",
        "timestamp": 1534764633626,
        "duration": 6120
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c776f120184b8ba20e6483b6c2855e21",
        "instanceId": 4224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004800c6-008c-0055-0011-00540014007b.png",
        "timestamp": 1534764640222,
        "duration": 4028
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "90f29dfe63e7df93aa18cedc0f9ac88d",
        "instanceId": 7356,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/MHGjtVYmK7hReOCB/c/1534764787900' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534764789507,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/f1YWgs8+LkC-FOI2/c/1534764788467' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534764789508,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/J97nn3WgJfryJpHa/c/1534764788934' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534764789508,
                "type": ""
            }
        ],
        "screenShotFile": "0006007b-0049-0022-0031-00a400d00004.png",
        "timestamp": 1534764782781,
        "duration": 11514
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "90f29dfe63e7df93aa18cedc0f9ac88d",
        "instanceId": 7356,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b70019-0044-00d9-002b-001d0010009b.png",
        "timestamp": 1534764795170,
        "duration": 6294
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "90f29dfe63e7df93aa18cedc0f9ac88d",
        "instanceId": 7356,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.buttonText(\"Delete\")",
        "trace": "NoSuchElementError: No element found using locator: by.buttonText(\"Delete\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:50:41)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:43:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00a30046-003d-0070-00a2-007300c20014.png",
        "timestamp": 1534764801952,
        "duration": 3465
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c5753e395e2a81e5bc77f078d224d9",
        "instanceId": 16012,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/V34HOsGXucqTAPSH/c/1534767702348' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534767702880,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/X5BdS2E44dic6uXR/c/1534767702878' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534767704227,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/atlkHSHXaZ0YDTpf/c/1534767703584' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534767704228,
                "type": ""
            }
        ],
        "screenShotFile": "007500a8-00d9-005c-0015-004500020037.png",
        "timestamp": 1534767696716,
        "duration": 14659
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c5753e395e2a81e5bc77f078d224d9",
        "instanceId": 16012,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001b003f-00a7-00f8-0017-007e006a0067.png",
        "timestamp": 1534767718624,
        "duration": 7024
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c5753e395e2a81e5bc77f078d224d9",
        "instanceId": 16012,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a000e4-0021-0062-00a8-002d006000ea.png",
        "timestamp": 1534767726161,
        "duration": 9340
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c5753e395e2a81e5bc77f078d224d9",
        "instanceId": 16012,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
        "trace": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4281:23)\n    at ontimeout (timers.js:498:11)\n    at tryOnTimeout (timers.js:323:5)\n    at Timer.listOnTimeout (timers.js:290:5)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/MiWkMJGGkL2aP+zm/c/1534767747959' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534767748722,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/LZNkD2jU2SmbY8me/c/1534767748723' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534767749791,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/lnaUIq1c7kH2xzGC/c/1534767809894' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534767810254,
                "type": ""
            }
        ],
        "screenShotFile": "000b008a-0061-009c-00d1-0098008800fa.png",
        "timestamp": 1534767737238,
        "duration": 73607
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c5753e395e2a81e5bc77f078d224d9",
        "instanceId": 16012,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.buttonText(\"Deposit\")",
        "trace": "NoSuchElementError: No element found using locator: by.buttonText(\"Deposit\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:18:41)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Desposit Money To Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:17:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/2DC15pBYCtuvHuo0/c/1534767810255' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534767810941,
                "type": ""
            }
        ],
        "screenShotFile": "007f0070-0076-0024-00e3-0020007f0007.png",
        "timestamp": 1534767811359,
        "duration": 543
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c5753e395e2a81e5bc77f078d224d9",
        "instanceId": 16012,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.buttonText(\"Withdrawl\")",
        "trace": "NoSuchElementError: No element found using locator: by.buttonText(\"Withdrawl\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:34:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"WithDrawal Money from Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:33:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00700020-00e4-0087-0018-00e5005a0066.png",
        "timestamp": 1534767812433,
        "duration": 660
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c5753e395e2a81e5bc77f078d224d9",
        "instanceId": 16012,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.buttonText(\"Transactions\")",
        "trace": "NoSuchElementError: No element found using locator: by.buttonText(\"Transactions\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:47:48)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Transcations History from Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:46:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00600049-00c0-00f4-0001-004a00be002e.png",
        "timestamp": 1534767813827,
        "duration": 682
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "10de41109af4d45fe839c1593aba0858",
        "instanceId": 24224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/hmvZZPeruP+WMxyH/c/1534767882114' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534767883715,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/8zQz0TXz0LOtjFYf/c/1534767882998' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534767883715,
                "type": ""
            }
        ],
        "screenShotFile": "00ab00a5-0022-0005-00f8-002400b800f6.png",
        "timestamp": 1534767878858,
        "duration": 12045
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "10de41109af4d45fe839c1593aba0858",
        "instanceId": 24224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00fb0024-00d0-00aa-0056-001e003800d4.png",
        "timestamp": 1534767895377,
        "duration": 6154
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "10de41109af4d45fe839c1593aba0858",
        "instanceId": 24224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007500d4-0054-0078-003b-0077004c00ca.png",
        "timestamp": 1534767902023,
        "duration": 5042
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "10de41109af4d45fe839c1593aba0858",
        "instanceId": 24224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a90027-002c-0000-0025-005200d9007c.png",
        "timestamp": 1534767907615,
        "duration": 3812
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "10de41109af4d45fe839c1593aba0858",
        "instanceId": 24224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b20019-00d0-0017-00a4-00f4004900ca.png",
        "timestamp": 1534767911910,
        "duration": 3436
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "10de41109af4d45fe839c1593aba0858",
        "instanceId": 24224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c40085-0044-0085-0032-0007004800e4.png",
        "timestamp": 1534767916270,
        "duration": 3985
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "10de41109af4d45fe839c1593aba0858",
        "instanceId": 24224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005500f2-0085-00b3-0064-00fb00b40070.png",
        "timestamp": 1534767920775,
        "duration": 4857
    },
    {
        "description": "Login as Customer|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ce657f6226d65d2898f5e12a9c132a05",
        "instanceId": 24212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/1ybh7glLxgVG9hNe/c/1534768275202' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534768276830,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/ADKzUnXmoB-EgPvB/c/1534768275867' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534768276831,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/6cUOLmVlaVxK1Klt/c/1534768276315' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534768276831,
                "type": ""
            }
        ],
        "screenShotFile": "00230072-00c5-00b2-00f7-001600030055.png",
        "timestamp": 1534768271467,
        "duration": 12125
    },
    {
        "description": "Open Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ce657f6226d65d2898f5e12a9c132a05",
        "instanceId": 24212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b60080-00c2-0084-003d-005e009000f4.png",
        "timestamp": 1534768284846,
        "duration": 6688
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ce657f6226d65d2898f5e12a9c132a05",
        "instanceId": 24212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009e0032-00b3-0095-0030-000600bd00fe.png",
        "timestamp": 1534768292050,
        "duration": 4154
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ce657f6226d65d2898f5e12a9c132a05",
        "instanceId": 24212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00cd002b-00de-008b-0028-00a400970038.png",
        "timestamp": 1534768296697,
        "duration": 2424
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ce657f6226d65d2898f5e12a9c132a05",
        "instanceId": 24212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ad00e1-0010-00c0-003f-00ff00130001.png",
        "timestamp": 1534768299588,
        "duration": 3550
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ce657f6226d65d2898f5e12a9c132a05",
        "instanceId": 24212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009f009a-008c-0097-0064-002900470080.png",
        "timestamp": 1534768303625,
        "duration": 3578
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ce657f6226d65d2898f5e12a9c132a05",
        "instanceId": 24212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b300f4-00bd-00b7-00d2-005c00690071.png",
        "timestamp": 1534768307684,
        "duration": 4418
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "479bc9159f91f62f04f85fda9cb707a9",
        "instanceId": 19348,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/ZxTSGLE0c5zLZ25e/c/1534827902974' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534827903425,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/VvpFK8NQFLEi2-G9/c/1534827903429' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534827905804,
                "type": ""
            }
        ],
        "screenShotFile": "00eb007a-0051-00f5-00fe-00a8000500e5.png",
        "timestamp": 1534827889440,
        "duration": 25338
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "479bc9159f91f62f04f85fda9cb707a9",
        "instanceId": 19348,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00da0012-004a-0053-0061-00d4004200e6.png",
        "timestamp": 1534827917466,
        "duration": 8371
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "479bc9159f91f62f04f85fda9cb707a9",
        "instanceId": 19348,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0009003c-0086-00cf-00cb-00280031001d.png",
        "timestamp": 1534827926430,
        "duration": 5245
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "479bc9159f91f62f04f85fda9cb707a9",
        "instanceId": 19348,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c90036-003a-009d-004a-00e80087000c.png",
        "timestamp": 1534827932290,
        "duration": 2346
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "479bc9159f91f62f04f85fda9cb707a9",
        "instanceId": 19348,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f3005e-009b-0000-0037-003b004d0064.png",
        "timestamp": 1534827935239,
        "duration": 2933
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "479bc9159f91f62f04f85fda9cb707a9",
        "instanceId": 19348,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f1003b-0074-0068-00ae-001400e60041.png",
        "timestamp": 1534827938776,
        "duration": 4053
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "479bc9159f91f62f04f85fda9cb707a9",
        "instanceId": 19348,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00390041-0005-00d9-003e-00e600ea0098.png",
        "timestamp": 1534827943381,
        "duration": 5251
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9a6be99ea72eecd1ad9ee47cd3c7556c",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/EpZPWCdx676TfZJu/c/1534831243545' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534831244420,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/nUrBBb3uB2jtsC4C/c/1534831244400' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534831246341,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/UsRRr8PWcc5EsQ0X/c/1534831244785' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534831247792,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://us10.zopim.com/s/W/ws/zcjBYqIJlwV4KQ98/c/1534831247769' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534831249316,
                "type": ""
            }
        ],
        "screenShotFile": "001d0016-0026-00a0-00f6-00bf002800bb.png",
        "timestamp": 1534831238404,
        "duration": 24388
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9a6be99ea72eecd1ad9ee47cd3c7556c",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007e000d-00ef-00d0-009e-00b7008b0014.png",
        "timestamp": 1534831269819,
        "duration": 10755
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9a6be99ea72eecd1ad9ee47cd3c7556c",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c00064-0024-00eb-00f2-005300820056.png",
        "timestamp": 1534831281378,
        "duration": 7494
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9a6be99ea72eecd1ad9ee47cd3c7556c",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f80057-00b8-0082-00a2-009400bf00fc.png",
        "timestamp": 1534831289412,
        "duration": 9379
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9a6be99ea72eecd1ad9ee47cd3c7556c",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005b0083-0029-00f7-001a-003900150004.png",
        "timestamp": 1534831299533,
        "duration": 7020
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9a6be99ea72eecd1ad9ee47cd3c7556c",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://sg06.zopim.com/s/W/xdds/EpZPWCdx676TfZJu/p/1534831251434 - Failed to load resource: the server responded with a status of 504 (Connection Timed Out)",
                "timestamp": 1534831312034,
                "type": ""
            }
        ],
        "screenShotFile": "0088005c-0064-0067-00c4-008d0010003f.png",
        "timestamp": 1534831308900,
        "duration": 3596
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9a6be99ea72eecd1ad9ee47cd3c7556c",
        "instanceId": 20284,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b800b7-0014-0062-008f-00cb0047003a.png",
        "timestamp": 1534831313080,
        "duration": 9300
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c1cdea0120a9a75bd4a59f015f839c81",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: invalid element state: Failed to execute 'replace' on 'Location': 'ObjectRo.TestUrl' is not a valid URL.\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "InvalidElementStateError: invalid element state: Failed to execute 'replace' on 'Location': 'ObjectRo.TestUrl' is not a valid URL.\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Protractor.get(ObjectRo.TestUrl) - reset url\n    at thenableWebDriverProxy.schedule (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at ProtractorBrowser.executeScriptWithDescription (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:404:28)\n    at driver.controlFlow.execute.then.then.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:679:25)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00540048-00d2-0052-0078-006700340030.png",
        "timestamp": 1534833392145,
        "duration": 863
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c1cdea0120a9a75bd4a59f015f839c81",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:27:44)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:24:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "008b00a4-003e-0024-00ad-00f50080003e.png",
        "timestamp": 1534833394413,
        "duration": 479
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c1cdea0120a9a75bd4a59f015f839c81",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:48:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:45:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00910095-00e8-0028-006f-0014004f00bc.png",
        "timestamp": 1534833395436,
        "duration": 425
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4f54a406193198b454384fe2ea943da0",
        "instanceId": 22416,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: invalid element state: Failed to execute 'replace' on 'Location': 'object.TestUrl' is not a valid URL.\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "InvalidElementStateError: invalid element state: Failed to execute 'replace' on 'Location': 'object.TestUrl' is not a valid URL.\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Protractor.get(object.TestUrl) - reset url\n    at thenableWebDriverProxy.schedule (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at ProtractorBrowser.executeScriptWithDescription (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:404:28)\n    at driver.controlFlow.execute.then.then.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:679:25)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00e50099-00eb-005a-0056-000500e40021.png",
        "timestamp": 1534833588040,
        "duration": 935
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4f54a406193198b454384fe2ea943da0",
        "instanceId": 22416,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:27:44)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:24:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00ce0091-0028-0028-00e5-00e700df000f.png",
        "timestamp": 1534833589718,
        "duration": 486
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4f54a406193198b454384fe2ea943da0",
        "instanceId": 22416,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:48:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:45:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "007000dd-00c7-0024-00dd-004800720084.png",
        "timestamp": 1534833590723,
        "duration": 419
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9831ded6654f6c84ea073dbaf877c7ed",
        "instanceId": 22628,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: invalid element state: Failed to execute 'replace' on 'Location': 'object.object.TestUrl' is not a valid URL.\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "InvalidElementStateError: invalid element state: Failed to execute 'replace' on 'Location': 'object.object.TestUrl' is not a valid URL.\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Protractor.get(object.object.TestUrl) - reset url\n    at thenableWebDriverProxy.schedule (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at ProtractorBrowser.executeScriptWithDescription (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:404:28)\n    at driver.controlFlow.execute.then.then.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:679:25)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00110025-00fb-000e-0097-00b000d200e9.png",
        "timestamp": 1534834023479,
        "duration": 581
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9831ded6654f6c84ea073dbaf877c7ed",
        "instanceId": 22628,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:27:44)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:24:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "003d0028-0046-00c4-00a9-00b600070024.png",
        "timestamp": 1534834024900,
        "duration": 487
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9831ded6654f6c84ea073dbaf877c7ed",
        "instanceId": 22628,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:48:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:45:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00d100a4-00a4-0032-0061-00c4003f002c.png",
        "timestamp": 1534834025870,
        "duration": 404
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "079f8aa23e6116dd748d315f3f5164f5",
        "instanceId": 18884,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: invalid element state: Failed to execute 'replace' on 'Location': 'object.TestUrl' is not a valid URL.\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "InvalidElementStateError: invalid element state: Failed to execute 'replace' on 'Location': 'object.TestUrl' is not a valid URL.\n  (Session info: chrome=68.0.3440.106)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Protractor.get(object.TestUrl) - reset url\n    at thenableWebDriverProxy.schedule (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at ProtractorBrowser.executeScriptWithDescription (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:404:28)\n    at driver.controlFlow.execute.then.then.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:679:25)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "001d0038-0092-0067-0083-005900ab0000.png",
        "timestamp": 1534834461751,
        "duration": 563
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "079f8aa23e6116dd748d315f3f5164f5",
        "instanceId": 18884,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:28:44)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:25:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00bc0090-008c-00fb-00fa-00d0000c0000.png",
        "timestamp": 1534834463080,
        "duration": 505
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "079f8aa23e6116dd748d315f3f5164f5",
        "instanceId": 18884,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:49:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:46:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "007100b8-0002-0048-0017-005f00310062.png",
        "timestamp": 1534834464106,
        "duration": 418
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "87cead1708e74545285ab569b698d1d1",
        "instanceId": 22892,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/XtjW6VFwblK6QW2x/c/1534835269920' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534835270219,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/poHhD9lvXtqBdNHn/c/1534835270204' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534835271649,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/NGMLv8KT3chYTGkf/c/1534835270459' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534835271649,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://us38.zopim.com/s/W/ws/OOSHDXsahQ0KGlJI/c/1534835271199' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534835273176,
                "type": ""
            }
        ],
        "screenShotFile": "009a0008-00a7-003f-0023-00b100ec0087.png",
        "timestamp": 1534835262919,
        "duration": 14940
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "87cead1708e74545285ab569b698d1d1",
        "instanceId": 22892,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00410071-0014-001f-0056-00c3002f00a4.png",
        "timestamp": 1534835279482,
        "duration": 8489
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "87cead1708e74545285ab569b698d1d1",
        "instanceId": 22892,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e000eb-0056-001d-00aa-00a900da008e.png",
        "timestamp": 1534835288505,
        "duration": 4750
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "815764610940e2b4f35c2d279985806a",
        "instanceId": 22764,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/kGlZo1Qv4Tloty02/c/1534835595148' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534835595647,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/gm-6bKm79FgOYWZm/c/1534835595622' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534835596880,
                "type": ""
            }
        ],
        "screenShotFile": "0000001d-00b8-00d9-00a3-00a100b90009.png",
        "timestamp": 1534835592300,
        "duration": 8595
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "815764610940e2b4f35c2d279985806a",
        "instanceId": 22764,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008f00f7-00ec-00e6-005b-003a00ba0044.png",
        "timestamp": 1534835601842,
        "duration": 8002
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "815764610940e2b4f35c2d279985806a",
        "instanceId": 22764,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ea008c-003e-000c-0049-000400b2004e.png",
        "timestamp": 1534835610437,
        "duration": 4494
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "41f40d47488c803a78237ee50f8ed33d",
        "instanceId": 2968,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/RGBfSGaVNu3C877v/c/1534835987276' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534835987601,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/R6jVIsthYaMHfWtp/c/1534835987577' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534835989068,
                "type": ""
            }
        ],
        "screenShotFile": "000000f0-00a8-00a6-009b-009d00760028.png",
        "timestamp": 1534835983075,
        "duration": 10301
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "41f40d47488c803a78237ee50f8ed33d",
        "instanceId": 2968,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: By(xpath, custId)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, custId)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:30:55)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:24:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "002500a4-0079-000b-00c8-00dc00a20097.png",
        "timestamp": 1534835994182,
        "duration": 18717
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "41f40d47488c803a78237ee50f8ed33d",
        "instanceId": 2968,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007e0041-00f9-004e-00b3-00860062008f.png",
        "timestamp": 1534836013444,
        "duration": 4261
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1a2c9d4e24c267bffa83f557ed693f58",
        "instanceId": 21824,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/JFrVirWNOCicmaWC/c/1534836320891' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534836322589,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/GujmQvi2LLmu9F3Y/c/1534836321663' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534836322589,
                "type": ""
            }
        ],
        "screenShotFile": "003900e6-00c3-004d-0089-00e0004200ba.png",
        "timestamp": 1534836317616,
        "duration": 10128
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1a2c9d4e24c267bffa83f557ed693f58",
        "instanceId": 21824,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: No element found using locator: by.model(\"Open Account\")",
        "trace": "NoSuchElementError: No element found using locator: by.model(\"Open Account\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:28:58)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:24:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "006500e4-00e0-0094-000e-00d200c300e3.png",
        "timestamp": 1534836328714,
        "duration": 1207
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1a2c9d4e24c267bffa83f557ed693f58",
        "instanceId": 21824,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a200b4-002b-0051-003d-001d00a9006c.png",
        "timestamp": 1534836330456,
        "duration": 4467
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3e2887e8ac2b5b4cf62bacd05e21c9ac",
        "instanceId": 7728,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/MtpEZF4en7XLdvRy/c/1534836464643' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534836464980,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/AOf51u5hs36Pay9U/c/1534836464945' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534836466426,
                "type": ""
            }
        ],
        "screenShotFile": "00760087-0059-007a-00c7-007e00cd009f.png",
        "timestamp": 1534836460939,
        "duration": 9923
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3e2887e8ac2b5b4cf62bacd05e21c9ac",
        "instanceId": 7728,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00170037-00bf-0049-00d6-00ee00f00095.png",
        "timestamp": 1534836471799,
        "duration": 6373
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3e2887e8ac2b5b4cf62bacd05e21c9ac",
        "instanceId": 7728,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005a005e-00f1-004e-00f3-008c005e00ed.png",
        "timestamp": 1534836478693,
        "duration": 4247
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "96657cdd8dfcf27c37b18218d12c4483",
        "instanceId": 4368,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/x6PyY42pL4XgGVpR/c/1534842732269' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534842733392,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/UEGo-cOzZFRclLTg/c/1534842733399' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534842734449,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/kTYhmZ0ruRO9z1Ij/c/1534842734355' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534842734862,
                "type": ""
            }
        ],
        "screenShotFile": "001700f9-0080-00b6-0001-004200d6006d.png",
        "timestamp": 1534842725580,
        "duration": 14653
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "58acad9d419c261a2a3a7b27015d3454",
        "instanceId": 23908,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/9CmulfbfM8x0laEi/c/1534843637765' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534843639503,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/XoxT1qEYJguVN-5e/c/1534843638492' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534843639504,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/UwrNOpyt0GaSLE7d/c/1534843639116' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534843639813,
                "type": ""
            }
        ],
        "screenShotFile": "00e900c3-0078-00e5-00df-007600610017.png",
        "timestamp": 1534843632893,
        "duration": 10543
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4da5c2264baa6b3e5e260c8a550825e2",
        "instanceId": 20424,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/ZqNexJfL9Ku8lbhu/c/1534843721040' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534843722803,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/JcpcBtR9lw+A1PVc/c/1534843721574' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534843722804,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/voPAel3fh6wtxGel/c/1534843722000' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534843722804,
                "type": ""
            }
        ],
        "screenShotFile": "000b00af-00b8-002f-008c-006200d00093.png",
        "timestamp": 1534843716542,
        "duration": 9462
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4c32f82535f850f349c4b91353fc9d36",
        "instanceId": 13152,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/M--8ZlMYY4aWyfD4/c/1534847486388' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534847487739,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/j+1AZqfNijV8mwYz/c/1534847487726' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534847488081,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/G2yBpiyBQ13UzlD+/c/1534847487993' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534847488526,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://us40.zopim.com/s/W/ws/z14lOdFw2DKVI8HW/c/1534847488461' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534847490111,
                "type": ""
            }
        ],
        "screenShotFile": "00cf00d0-0090-009f-004a-002100a200bf.png",
        "timestamp": 1534847481703,
        "duration": 15699
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4c32f82535f850f349c4b91353fc9d36",
        "instanceId": 13152,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00810013-00a5-001e-00da-00a8006300d7.png",
        "timestamp": 1534847500661,
        "duration": 3768
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4c32f82535f850f349c4b91353fc9d36",
        "instanceId": 13152,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f40093-0076-00e5-0017-009400450064.png",
        "timestamp": 1534847504946,
        "duration": 3650
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4c32f82535f850f349c4b91353fc9d36",
        "instanceId": 13152,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006000eb-00c7-0067-0022-00aa0031004e.png",
        "timestamp": 1534847510114,
        "duration": 5273
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a6928cf22edde2ec7113949e88e84c80",
        "instanceId": 20100,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/Vsrg0-1BPlfTgC06/c/1534848435819' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534848436634,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/1p-jmHSByPZqh3v7/c/1534848436568' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534848437297,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/7xDGI-djuOr6NEE2/c/1534848437286' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534848438092,
                "type": ""
            }
        ],
        "screenShotFile": "0002003b-0064-00a5-0049-00f000d40065.png",
        "timestamp": 1534848430411,
        "duration": 13056
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a6928cf22edde2ec7113949e88e84c80",
        "instanceId": 20100,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f900ec-0061-00b3-0088-00c400560006.png",
        "timestamp": 1534848450588,
        "duration": 3964
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a6928cf22edde2ec7113949e88e84c80",
        "instanceId": 20100,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002c00f7-007c-004e-0041-0014006d00e4.png",
        "timestamp": 1534848455014,
        "duration": 4087
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a6928cf22edde2ec7113949e88e84c80",
        "instanceId": 20100,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e000ab-0060-008c-00c7-004300440022.png",
        "timestamp": 1534848459580,
        "duration": 5114
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6f2c4d4fc41b6fa8298f5f30dbb83923",
        "instanceId": 20764,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/SPHFgXTL4vIEDnfE/c/1534848629269' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534848629924,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/R8-Hd1t6DMU5azIn/c/1534848629825' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534848630130,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/qHP7fxKm5IYKB03q/c/1534848630127' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534848630613,
                "type": ""
            }
        ],
        "screenShotFile": "007700c5-00ad-0096-009d-00d500e1008a.png",
        "timestamp": 1534848624386,
        "duration": 8872
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6f2c4d4fc41b6fa8298f5f30dbb83923",
        "instanceId": 20764,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c70096-003d-008b-00a9-00b500270023.png",
        "timestamp": 1534848634361,
        "duration": 3532
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6f2c4d4fc41b6fa8298f5f30dbb83923",
        "instanceId": 20764,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007d008d-003a-00d6-004c-009c0027009f.png",
        "timestamp": 1534848638355,
        "duration": 4091
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6f2c4d4fc41b6fa8298f5f30dbb83923",
        "instanceId": 20764,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e400ad-0010-0097-001b-000c008500a4.png",
        "timestamp": 1534848643032,
        "duration": 5121
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9ce8e36f6d024ee0ffc764cfd600e072",
        "instanceId": 22132,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/p9gfxJxVkt5PK5Ve/c/1534850701048' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534850703525,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/00JiGW1bPxhYOWPZ/c/1534850702512' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534850703526,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/dbaJvbE78tf5ttdM/c/1534850703419' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534850704128,
                "type": ""
            }
        ],
        "screenShotFile": "00300064-0082-00b7-0031-00dc005200eb.png",
        "timestamp": 1534850692951,
        "duration": 15500
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9ce8e36f6d024ee0ffc764cfd600e072",
        "instanceId": 22132,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e9000f-00c3-0081-001e-00a000a500a9.png",
        "timestamp": 1534850713141,
        "duration": 3169
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9ce8e36f6d024ee0ffc764cfd600e072",
        "instanceId": 22132,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004d0069-00ed-0085-008c-00d0004700f6.png",
        "timestamp": 1534850717034,
        "duration": 5726
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9ce8e36f6d024ee0ffc764cfd600e072",
        "instanceId": 22132,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009d00f6-009e-0090-0063-0043009a006c.png",
        "timestamp": 1534850723435,
        "duration": 4865
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7628f32567054acf39efbea8ed858599",
        "instanceId": 22304,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/IpXgmXCZ4rTCo6T7/c/1534851301954' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534851304109,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/5JG9HFVaKhr2MW+E/c/1534851303917' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534851304641,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/KnmwddtPboDrAyxW/c/1534851304619' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534851305459,
                "type": ""
            }
        ],
        "screenShotFile": "00e800a2-0024-0005-00cd-0040001f0091.png",
        "timestamp": 1534851296972,
        "duration": 11618
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7628f32567054acf39efbea8ed858599",
        "instanceId": 22304,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00530073-0048-00d2-001f-00d7007100ef.png",
        "timestamp": 1534851316063,
        "duration": 3647
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7628f32567054acf39efbea8ed858599",
        "instanceId": 22304,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006500c4-004a-00e4-00f9-00dd000c0001.png",
        "timestamp": 1534851320303,
        "duration": 6218
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7628f32567054acf39efbea8ed858599",
        "instanceId": 22304,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006c00a0-00dc-0012-0010-00ed00d90065.png",
        "timestamp": 1534851327176,
        "duration": 5684
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6dff6231c628b6a464bcacad58341e94",
        "instanceId": 2816,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/VV7sHluILc6sQEFt/c/1534916011445' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534916013068,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/bFKSAL4wnfIm9wnB/c/1534916011985' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534916013068,
                "type": ""
            }
        ],
        "screenShotFile": "006d00be-003c-00bf-003f-001f00bc0066.png",
        "timestamp": 1534916007864,
        "duration": 7714
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6dff6231c628b6a464bcacad58341e94",
        "instanceId": 2816,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0030006e-001f-0023-000e-00010087005a.png",
        "timestamp": 1534916017448,
        "duration": 2353
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6dff6231c628b6a464bcacad58341e94",
        "instanceId": 2816,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d40030-007c-003d-00ec-007800350070.png",
        "timestamp": 1534916020281,
        "duration": 3466
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6dff6231c628b6a464bcacad58341e94",
        "instanceId": 2816,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000d00af-0051-007b-00a8-00be00c4006d.png",
        "timestamp": 1534916024286,
        "duration": 4111
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "035aa5aefa29a5175d1680e807efd392",
        "instanceId": 7464,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/6ywNWnICdxcvHLcA/c/1534916356576' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534916358374,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/efXEqYn1FsHPG3Ol/c/1534916357097' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534916358374,
                "type": ""
            }
        ],
        "screenShotFile": "00eb0095-00aa-00fb-00dc-001f00740043.png",
        "timestamp": 1534916353080,
        "duration": 8331
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "035aa5aefa29a5175d1680e807efd392",
        "instanceId": 7464,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f20045-00fd-0050-00b6-005a00ce00a3.png",
        "timestamp": 1534916362040,
        "duration": 2611
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "035aa5aefa29a5175d1680e807efd392",
        "instanceId": 7464,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0085007e-00df-007f-0089-007800100021.png",
        "timestamp": 1534916365178,
        "duration": 3416
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "035aa5aefa29a5175d1680e807efd392",
        "instanceId": 7464,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000c0002-009d-00c1-0084-00e800720007.png",
        "timestamp": 1534916369110,
        "duration": 4040
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e57f81228d72aa914252457d633e019b",
        "instanceId": 7244,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/-Ra5j4-rKz0mzr02/c/1534928295258' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534928296278,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/7pRrVh9qyPjkmLF3/c/1534928296280' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534928297725,
                "type": ""
            }
        ],
        "screenShotFile": "00210068-000d-0063-00ec-001a000900db.png",
        "timestamp": 1534928290263,
        "duration": 12935
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e57f81228d72aa914252457d633e019b",
        "instanceId": 7244,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b30048-0073-006d-00e8-00c1001b009b.png",
        "timestamp": 1534928305745,
        "duration": 2651
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e57f81228d72aa914252457d633e019b",
        "instanceId": 7244,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006100e5-001f-00ef-00af-004a00dd0066.png",
        "timestamp": 1534928308926,
        "duration": 3582
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e57f81228d72aa914252457d633e019b",
        "instanceId": 7244,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cd001c-0032-0002-008f-001600b30014.png",
        "timestamp": 1534928313001,
        "duration": 4310
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "84fde0f71f73a40ab906e166f956b82f",
        "instanceId": 7180,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/0buY07E73GKDQeQ3/c/1534930198233' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534930199783,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.259.js 38964 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/KcSOJgK5Oc3wOEWw/c/1534930198625' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1534930199784,
                "type": ""
            }
        ],
        "screenShotFile": "009400cc-0009-00d4-0020-00d500300057.png",
        "timestamp": 1534930191903,
        "duration": 14712
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "84fde0f71f73a40ab906e166f956b82f",
        "instanceId": 7180,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0074005c-009e-0016-00ed-003e00f400c3.png",
        "timestamp": 1534930209327,
        "duration": 7764
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "84fde0f71f73a40ab906e166f956b82f",
        "instanceId": 7180,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00800005-00a4-001b-0016-007700640059.png",
        "timestamp": 1534930217690,
        "duration": 3672
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "84fde0f71f73a40ab906e166f956b82f",
        "instanceId": 7180,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d100e8-0072-0060-00f4-004b00310006.png",
        "timestamp": 1534930221873,
        "duration": 6927
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fe0fd116e47ea33ba2bb586f626e0640",
        "instanceId": 4508,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.260.js 39020 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/Q0WpCWIzd7aYYmOu/c/1535370067065' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1535370069033,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.260.js 39020 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/+iTA8dVkxi0Drizb/c/1535370069030' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1535370070138,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.260.js 39020 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/L3ERXY6rImTmiY6U/c/1535370070131' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1535370073179,
                "type": ""
            }
        ],
        "screenShotFile": "005f004d-0081-00c3-009a-0011003600c9.png",
        "timestamp": 1535370056664,
        "duration": 27975
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fe0fd116e47ea33ba2bb586f626e0640",
        "instanceId": 4508,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006e0095-0093-00a1-0067-001300a300f2.png",
        "timestamp": 1535370089763,
        "duration": 4864
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fe0fd116e47ea33ba2bb586f626e0640",
        "instanceId": 4508,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001c005b-004f-00c9-0022-0025004900b9.png",
        "timestamp": 1535370095341,
        "duration": 3741
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fe0fd116e47ea33ba2bb586f626e0640",
        "instanceId": 4508,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008d0000-00cd-0083-00ae-0082006c0018.png",
        "timestamp": 1535370099672,
        "duration": 4950
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d92cf9f6eed48823a0b6974b8c5e7c29",
        "instanceId": 12188,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.261.js 39020 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/jMKWUT+b-C4AvnbU/c/1536207860241' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1536207860551,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.261.js 39020 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/Lssdj9wSx-+k3T+c/c/1536207860500' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1536207861941,
                "type": ""
            }
        ],
        "screenShotFile": "00c1004a-0079-0059-004a-006b008e0014.png",
        "timestamp": 1536207855709,
        "duration": 14610
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d92cf9f6eed48823a0b6974b8c5e7c29",
        "instanceId": 12188,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d100c9-006a-003b-0088-00f300eb00cb.png",
        "timestamp": 1536207876309,
        "duration": 3154
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d92cf9f6eed48823a0b6974b8c5e7c29",
        "instanceId": 12188,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0036009b-0026-0007-00ba-0078007200b7.png",
        "timestamp": 1536207880012,
        "duration": 3680
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d92cf9f6eed48823a0b6974b8c5e7c29",
        "instanceId": 12188,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004200a5-0028-00b2-0008-00be003d0001.png",
        "timestamp": 1536207884260,
        "duration": 4535
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9e150d6f061d902329846f06069135dc",
        "instanceId": 1352,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003b0039-007b-0082-000e-00cb004d00e2.png",
        "timestamp": 1536987043145,
        "duration": 25875
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9e150d6f061d902329846f06069135dc",
        "instanceId": 1352,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d50096-008a-000f-00e3-00500008005d.png",
        "timestamp": 1536987073615,
        "duration": 3766
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9e150d6f061d902329846f06069135dc",
        "instanceId": 1352,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0021003e-0025-0047-00ad-00ed006e00c2.png",
        "timestamp": 1536987078186,
        "duration": 3993
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9e150d6f061d902329846f06069135dc",
        "instanceId": 1352,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005100b1-0028-0038-00f7-002100a2009b.png",
        "timestamp": 1536987082711,
        "duration": 4197
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ef56204b5b4db1f89e2916c8360b18a8",
        "instanceId": 10484,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while running testForAngular: asynchronous script timeout: result was not received in 11 seconds\n  (Session info: chrome=69.0.3497.92)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "Error: Error while running testForAngular: asynchronous script timeout: result was not received in 11 seconds\n  (Session info: chrome=69.0.3497.92)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at executeAsyncScript_.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:727:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:6:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537269937670,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537269937670,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537269937671,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js 5:36 Uncaught Error: Bootstrap's JavaScript requires jQuery",
                "timestamp": 1537269939701,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/app.js 2:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939711,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/user.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939719,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/account.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939723,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/transaction.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939725,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/mockDataLoadService.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939789,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/customer.data.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939790,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/config.js 2:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939792,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/date.search.filter.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939793,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/accountViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939794,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/addCustomerController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939795,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/customerViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939996,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/bodyController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939997,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/depositController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269939999,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/listCustomerController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269940049,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/mainController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269940050,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/managerViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269940051,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/openAccountController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269940051,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/optionsController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269940052,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/transactionSummaryController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269940058,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/withdrawlController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537269940080,
                "type": ""
            }
        ],
        "screenShotFile": "003d00ae-003b-0032-0024-006b0052006d.png",
        "timestamp": 1537269931620,
        "duration": 26942
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ef56204b5b4db1f89e2916c8360b18a8",
        "instanceId": 10484,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:24:41)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Desposit Money To Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:23:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00e600c2-0010-0058-009e-00990036007c.png",
        "timestamp": 1537269977533,
        "duration": 985
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ef56204b5b4db1f89e2916c8360b18a8",
        "instanceId": 10484,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:42:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"WithDrawal Money from Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:41:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00e70006-00ae-0021-0074-007900a4006b.png",
        "timestamp": 1537269979664,
        "duration": 748
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ef56204b5b4db1f89e2916c8360b18a8",
        "instanceId": 10484,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:57:48)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Transcations History from Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:56:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00490000-00c3-0029-0029-00ee00200069.png",
        "timestamp": 1537269981391,
        "duration": 1461
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e8e888719eed4cc623fd221fc226fb34",
        "instanceId": 7840,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while running testForAngular: asynchronous script timeout: result was not received in 11 seconds\n  (Session info: chrome=69.0.3497.92)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "Error: Error while running testForAngular: asynchronous script timeout: result was not received in 11 seconds\n  (Session info: chrome=69.0.3497.92)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at executeAsyncScript_.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:727:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:6:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537270140749,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537270140749,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537270140750,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js 5:36 Uncaught Error: Bootstrap's JavaScript requires jQuery",
                "timestamp": 1537270143374,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/app.js 2:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143420,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/user.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143421,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/account.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143631,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/transaction.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143632,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/mockDataLoadService.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143632,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/customer.data.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143634,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/config.js 2:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143635,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/date.search.filter.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143638,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/accountViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143643,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/addCustomerController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143669,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/customerViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143736,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/bodyController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143737,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/depositController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143739,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/listCustomerController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143739,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/mainController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143740,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/managerViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143741,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/openAccountController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143756,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/optionsController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143784,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/transactionSummaryController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143785,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/withdrawlController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270143789,
                "type": ""
            }
        ],
        "screenShotFile": "00ee00d9-00f5-00a7-0087-005d00cc00de.png",
        "timestamp": 1537270138461,
        "duration": 20388
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e8e888719eed4cc623fd221fc226fb34",
        "instanceId": 7840,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:24:41)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Desposit Money To Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:23:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "007b00b1-0011-0014-0033-00ea00f800e4.png",
        "timestamp": 1537270166101,
        "duration": 806
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e8e888719eed4cc623fd221fc226fb34",
        "instanceId": 7840,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:42:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"WithDrawal Money from Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:41:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "009200c7-0005-009c-00bb-008e00ce00ba.png",
        "timestamp": 1537270167860,
        "duration": 746
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e8e888719eed4cc623fd221fc226fb34",
        "instanceId": 7840,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:57:48)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Transcations History from Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:56:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "003800e1-003f-001f-0090-0014004800fa.png",
        "timestamp": 1537270170463,
        "duration": 1019
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e8e888719eed4cc623fd221fc226fb34",
        "instanceId": 7840,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Angular could not be found on the page http://www.way2automation.com/angularjs-protractor/banking/#/login. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load",
        "trace": "Error: Angular could not be found on the page http://www.way2automation.com/angularjs-protractor/banking/#/login. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load\n    at executeAsyncScript_.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:720:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537270174801,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537270175101,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537270175102,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js 5:36 Uncaught Error: Bootstrap's JavaScript requires jQuery",
                "timestamp": 1537270175121,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/app.js 2:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175136,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/user.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175154,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/account.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175169,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/transaction.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175170,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/mockDataLoadService.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175180,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/customer.data.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175185,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/config.js 2:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175196,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/date.search.filter.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175213,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/accountViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175248,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/addCustomerController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175249,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/customerViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175249,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/bodyController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175250,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/depositController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175269,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/listCustomerController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175295,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/mainController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175320,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/managerViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175322,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/openAccountController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175338,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/optionsController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175340,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/transactionSummaryController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175348,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/withdrawlController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537270175360,
                "type": ""
            }
        ],
        "screenShotFile": "002000e1-00db-001a-00b7-001d006d00bc.png",
        "timestamp": 1537270173249,
        "duration": 16461
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e8e888719eed4cc623fd221fc226fb34",
        "instanceId": 7840,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:27:63)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:24:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00060062-00d8-00f2-0037-002500ef00df.png",
        "timestamp": 1537270191149,
        "duration": 1434
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e8e888719eed4cc623fd221fc226fb34",
        "instanceId": 7840,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.92"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:48:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Customer Account Tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:45:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\BankManagerLogin.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00130055-0063-009b-00c4-006800ed0006.png",
        "timestamp": 1537270194068,
        "duration": 861
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3389d2f1bef3b5565046e062d8e89bfb",
        "instanceId": 13448,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/hjQhS9Q-LnggWPBs/c/1537274649622' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537274650305,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/Ek5kLZ81tRPyjLN8/c/1537274650287' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537274651816,
                "type": ""
            }
        ],
        "screenShotFile": "00e300f5-00b8-001d-00e9-00c200d60067.png",
        "timestamp": 1537274643322,
        "duration": 17006
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3389d2f1bef3b5565046e062d8e89bfb",
        "instanceId": 13448,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b500e5-002f-00be-0051-006c00bf00de.png",
        "timestamp": 1537274662439,
        "duration": 4642
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3389d2f1bef3b5565046e062d8e89bfb",
        "instanceId": 13448,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00400053-007a-0090-004d-006e001300a8.png",
        "timestamp": 1537274667944,
        "duration": 5898
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3389d2f1bef3b5565046e062d8e89bfb",
        "instanceId": 13448,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004c00d8-0022-0088-00a6-002a00ab0071.png",
        "timestamp": 1537274675296,
        "duration": 7072
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3389d2f1bef3b5565046e062d8e89bfb",
        "instanceId": 13448,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/0Lzw8bpSApmfArwS/c/1537274686292' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537274687451,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/nPJ4bAAPN-nCFCYu/c/1537274687450' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537274687996,
                "type": ""
            }
        ],
        "screenShotFile": "00b9004a-00bb-0024-00e4-00d9008e0020.png",
        "timestamp": 1537274684005,
        "duration": 12010
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3389d2f1bef3b5565046e062d8e89bfb",
        "instanceId": 13448,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009e001b-00cc-0055-00cb-000b00e30052.png",
        "timestamp": 1537274697692,
        "duration": 9960
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3389d2f1bef3b5565046e062d8e89bfb",
        "instanceId": 13448,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003700a5-00c2-00b5-000e-0002005e00df.png",
        "timestamp": 1537274708868,
        "duration": 6019
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "305a1270e0ec108316e2ed6916190145",
        "instanceId": 6824,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/4hg93PmktdubVTlq/c/1537275260937' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275267285,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/2W-afBXuYyMkjfNr/c/1537275263957' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275270557,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/E+FdnygTUH1H2FJU/c/1537275266971' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275273421,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://us16.zopim.com/s/W/ws/l89cRi1y+dEH-qdl/c/1537275269980' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275275569,
                "type": ""
            }
        ],
        "screenShotFile": "005a001f-00ae-002a-0099-004a00090073.png",
        "timestamp": 1537275251071,
        "duration": 25640
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "305a1270e0ec108316e2ed6916190145",
        "instanceId": 6824,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004900c7-000e-00c2-00d3-0071003c006e.png",
        "timestamp": 1537275278184,
        "duration": 4401
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "305a1270e0ec108316e2ed6916190145",
        "instanceId": 6824,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a2005a-0016-0057-00bc-007400b50073.png",
        "timestamp": 1537275283870,
        "duration": 5287
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "305a1270e0ec108316e2ed6916190145",
        "instanceId": 6824,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003c0023-00a7-0047-00a4-0062004d00f4.png",
        "timestamp": 1537275290302,
        "duration": 5792
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "305a1270e0ec108316e2ed6916190145",
        "instanceId": 6824,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/knbn7N-Wgj1+zGYX/c/1537275299927' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275301306,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/qPHC6x6+f2jEUhZ0/c/1537275301306' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275303379,
                "type": ""
            }
        ],
        "screenShotFile": "00b200fe-00d4-0038-0071-008800b70074.png",
        "timestamp": 1537275297488,
        "duration": 11428
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "305a1270e0ec108316e2ed6916190145",
        "instanceId": 6824,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009f0095-0028-0074-00be-00a2009c004a.png",
        "timestamp": 1537275310460,
        "duration": 9455
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "305a1270e0ec108316e2ed6916190145",
        "instanceId": 6824,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00690030-0017-00c6-004e-008d00fe0035.png",
        "timestamp": 1537275320977,
        "duration": 6705
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7685a0df6a01cd5a06384a19a094d51e",
        "instanceId": 8548,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/C+FfZen23IN8x2SJ/c/1537275432572' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275433244,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/O-8LbNZFo0rGm2LK/c/1537275433232' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275434732,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/0HtiE5n3ldH3QqJN/c/1537275433750' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275434735,
                "type": ""
            }
        ],
        "screenShotFile": "005d00a1-007e-00e4-0070-00a500f10011.png",
        "timestamp": 1537275427382,
        "duration": 14007
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7685a0df6a01cd5a06384a19a094d51e",
        "instanceId": 8548,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e00066-009d-009c-0061-00d600cb0071.png",
        "timestamp": 1537275442425,
        "duration": 3428
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7685a0df6a01cd5a06384a19a094d51e",
        "instanceId": 8548,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00280009-00a7-0001-00d5-00e400f100a6.png",
        "timestamp": 1537275446929,
        "duration": 5109
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7685a0df6a01cd5a06384a19a094d51e",
        "instanceId": 8548,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00730001-0018-005a-003c-009b000100e8.png",
        "timestamp": 1537275453763,
        "duration": 7234
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7685a0df6a01cd5a06384a19a094d51e",
        "instanceId": 8548,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/-geJ4UKKwNfwF2zd/c/1537275464775' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275466271,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg16.zopim.com/s/W/ws/nk5BZPlTqhS7ivNz/c/1537275466259' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275466993,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg20.zopim.com/s/W/ws/hz5cI1wDzV6YljGq/c/1537275466976' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275467564,
                "type": ""
            }
        ],
        "screenShotFile": "000f0058-00d5-00fd-00f7-008300e30010.png",
        "timestamp": 1537275462438,
        "duration": 13504
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7685a0df6a01cd5a06384a19a094d51e",
        "instanceId": 8548,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003f009a-0078-0070-000e-00cc00bb003f.png",
        "timestamp": 1537275477481,
        "duration": 26348
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7685a0df6a01cd5a06384a19a094d51e",
        "instanceId": 8548,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008a00de-0088-008b-0009-00aa00f50046.png",
        "timestamp": 1537275505137,
        "duration": 6248
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e5aa27de8b7e9a8f05c8f62afdcdbba2",
        "instanceId": 11004,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/CsISZAeyOYrAnhCQ/c/1537275642378' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275642952,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/oBRUrMqKVR88faxr/c/1537275642919' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275644287,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/g0jkeO-M41YOAl5s/c/1537275643445' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275644288,
                "type": ""
            }
        ],
        "screenShotFile": "00650094-003f-00e3-002b-0041007b00d4.png",
        "timestamp": 1537275638018,
        "duration": 9952
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e5aa27de8b7e9a8f05c8f62afdcdbba2",
        "instanceId": 11004,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "000d0084-0013-005b-00f9-00f4001f009e.png",
        "timestamp": 1537275650182,
        "duration": 4631
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e5aa27de8b7e9a8f05c8f62afdcdbba2",
        "instanceId": 11004,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004c0010-00b2-00e3-0003-00b000bb009b.png",
        "timestamp": 1537275656244,
        "duration": 5405
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e5aa27de8b7e9a8f05c8f62afdcdbba2",
        "instanceId": 11004,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a200b3-005c-00fa-0017-00a70000002a.png",
        "timestamp": 1537275663048,
        "duration": 7282
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e5aa27de8b7e9a8f05c8f62afdcdbba2",
        "instanceId": 11004,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/HQesu3HePlFxHhSt/c/1537275674713' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275676209,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg08.zopim.com/s/W/ws/QpQ-0jANgcgvnoYf/c/1537275676186' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275676469,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/DJI2OYV5tVO+Cpm4/c/1537275676429' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537275676947,
                "type": ""
            }
        ],
        "screenShotFile": "00270030-00be-006c-005d-005400b00087.png",
        "timestamp": 1537275671374,
        "duration": 12564
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e5aa27de8b7e9a8f05c8f62afdcdbba2",
        "instanceId": 11004,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007700e0-0064-005a-0066-00b2005f00fd.png",
        "timestamp": 1537275684788,
        "duration": 8764
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e5aa27de8b7e9a8f05c8f62afdcdbba2",
        "instanceId": 11004,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004f006a-0026-00ee-0008-003000790065.png",
        "timestamp": 1537275694556,
        "duration": 5656
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "75fc490bbc80d25606e6c0669aeba1fe",
        "instanceId": 11208,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg12.zopim.com/s/W/ws/zpXvvoxlrfbWh9hN/c/1537329770897' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537329771648,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/ztUSYcZ6QTepLckp/c/1537329771627' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537329773109,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg14.zopim.com/s/W/ws/Nfc+j-lcbBix2CKg/c/1537329772054' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537329773111,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://us34.zopim.com/s/W/ws/zGnxJEF8KJZh0uj+/c/1537329772614' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537329774064,
                "type": ""
            }
        ],
        "screenShotFile": "00a50059-00da-001f-0060-00ad008800a1.png",
        "timestamp": 1537329765359,
        "duration": 17769
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "75fc490bbc80d25606e6c0669aeba1fe",
        "instanceId": 11208,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002c0015-006d-007e-00f1-003b004b001d.png",
        "timestamp": 1537329785779,
        "duration": 4497
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "75fc490bbc80d25606e6c0669aeba1fe",
        "instanceId": 11208,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007e007e-008b-00bb-008a-002000e7001d.png",
        "timestamp": 1537329791605,
        "duration": 5103
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "75fc490bbc80d25606e6c0669aeba1fe",
        "instanceId": 11208,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bb009b-001b-00c9-0009-00fa004200ad.png",
        "timestamp": 1537329798190,
        "duration": 5902
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "75fc490bbc80d25606e6c0669aeba1fe",
        "instanceId": 11208,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg10.zopim.com/s/W/ws/jcVed3Zh3DPbS8BB/c/1537329807685' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537329808858,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg18.zopim.com/s/W/ws/LX64dZfawAYUQyDI/c/1537329808833' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537329809659,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.264.js 39221 WebSocket connection to 'wss://sg06.zopim.com/s/W/ws/t+PlQck58P5pZF3P/c/1537329809630' failed: Error during WebSocket handshake: Unexpected response code: 200",
                "timestamp": 1537329810332,
                "type": ""
            }
        ],
        "screenShotFile": "000b00aa-001f-0088-00a2-00eb007d0020.png",
        "timestamp": 1537329805605,
        "duration": 12380
    },
    {
        "description": "Open Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "75fc490bbc80d25606e6c0669aeba1fe",
        "instanceId": 11208,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005300eb-00fc-00f1-009f-003a006100c2.png",
        "timestamp": 1537329819094,
        "duration": 8880
    },
    {
        "description": "Customer Account Tab|Banking Application Login Test--AS a Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "75fc490bbc80d25606e6c0669aeba1fe",
        "instanceId": 11208,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00350040-00dd-009e-00ae-0011006e00df.png",
        "timestamp": 1537329829420,
        "duration": 6614
    },
    {
        "description": "Login as Customer|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "af44205e5fa6f2836bda0875068d410e",
        "instanceId": 12308,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: Error while running testForAngular: asynchronous script timeout: result was not received in 11 seconds\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)",
        "trace": "Error: Error while running testForAngular: asynchronous script timeout: result was not received in 11 seconds\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 6.1.7601 SP1 x86_64)\n    at executeAsyncScript_.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:727:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Login as Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:6:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537351256262,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537351256262,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1537351256262,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js 5:36 Uncaught Error: Bootstrap's JavaScript requires jQuery",
                "timestamp": 1537351257896,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/app.js 2:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351257904,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/user.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351257924,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/account.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351257941,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/transaction.service.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351257943,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/mockDataLoadService.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351257945,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/customer.data.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258096,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/config.js 2:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258097,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/date.search.filter.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258097,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/accountViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258098,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/addCustomerController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258098,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/customerViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258099,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/bodyController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258099,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/depositController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258100,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/listCustomerController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258101,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/mainController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258101,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/managerViewController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258102,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/openAccountController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258103,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/optionsController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258103,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/transactionSummaryController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258114,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://www.way2automation.com/angularjs-protractor/banking/withdrawlController.js 2:2 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1537351258115,
                "type": ""
            }
        ],
        "screenShotFile": "00b000d0-000d-003f-00ad-0058000500d8.png",
        "timestamp": 1537351252691,
        "duration": 20604
    },
    {
        "description": "Desposit Money To Account|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "af44205e5fa6f2836bda0875068d410e",
        "instanceId": 12308,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:24:41)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Desposit Money To Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:23:7)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00af0031-002d-002f-00b1-00ca00b700ab.png",
        "timestamp": 1537351277272,
        "duration": 1253
    },
    {
        "description": "WithDrawal Money from Account|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "af44205e5fa6f2836bda0875068d410e",
        "instanceId": 12308,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:42:45)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"WithDrawal Money from Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:41:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "003a006d-0056-0036-00d7-0010007c0024.png",
        "timestamp": 1537351279757,
        "duration": 1245
    },
    {
        "description": "Transcations History from Account|Banking Application Login Test--AS a Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "af44205e5fa6f2836bda0875068d410e",
        "instanceId": 12308,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"",
        "trace": "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:57:48)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Transcations History from Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:56:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\Banking\\CustomerLogin.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00c20087-0035-009f-00d0-008100ec00b8.png",
        "timestamp": 1537351282199,
        "duration": 932
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};