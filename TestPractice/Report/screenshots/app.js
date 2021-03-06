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
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4e11420ff104c9e7b1dc4281416e7b95",
        "instanceId": 11152,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Angular could not be found on the page https://angularjs.org/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load",
        "trace": "Error: Angular could not be found on the page https://angularjs.org/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load\n    at executeAsyncScript_.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:720:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Functionality Check\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159149686,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://fonts.googleapis.com/css?family=Roboto:400,300,500,400italic,700 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159149688,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159149704,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-animate.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159149712,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 416:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151362,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 507:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151364,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 619:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151365,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 796:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151384,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 848:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151390,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 852:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151392,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/js/homepage.js 0:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151419,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/js/download-data.js 0:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151422,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-resource.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159151424,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.1.2/ui-bootstrap-tpls.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159151426,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-route.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159151428,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ssl.gstatic.com/images/icons/gplus-32.png - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159151430,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/libs/angularfire/0.9.0/angularfire.min.js 11:26 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151942,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://code.angularjs.org/1.7.2/i18n/angular-locale_sk.js 1:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151946,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 942:4 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151947,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://code.angularjs.org/1.7.2/i18n/angular-locale_en-us.js 1:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151956,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 946:4 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534159151997,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ssl.google-analytics.com/ga.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159152293,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?callback=__twttr.setFollowersCountAndFollowing&lang=en&screen_names=angular - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534159153126,
                "type": ""
            }
        ],
        "screenShotFile": "00f400b1-00c4-00b8-005e-0025009c009f.png",
        "timestamp": 1534159148319,
        "duration": 15515
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "8947e712bad1084ab9cc0878eb505dd0",
        "instanceId": 3256,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534159212512,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-240.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=8rjUsHaV6MpxsLm4r1Fman75Yer25Eki' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534159213916,
                "type": ""
            }
        ],
        "screenShotFile": "009d00af-002d-0068-003c-00fe0079006e.png",
        "timestamp": 1534159199824,
        "duration": 20286
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f3b1a22253ebf2ced7b86971a28f1d4d",
        "instanceId": 14236,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Angular could not be found on the page https://angularjs.org/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load",
        "trace": "Error: Angular could not be found on the page https://angularjs.org/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load\n    at executeAsyncScript_.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:720:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Functionality Check\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160117120,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://fonts.googleapis.com/css?family=Roboto:400,300,500,400italic,700 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160117121,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160117121,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-animate.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160117121,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 416:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160118040,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 507:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160118045,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 619:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160118046,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 796:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160118049,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 848:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160118050,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 852:6 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160118052,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/js/homepage.js 0:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160118158,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/js/download-data.js 0:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160118159,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-resource.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160119545,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-route.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160119545,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.1.2/ui-bootstrap-tpls.min.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160119806,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ssl.gstatic.com/images/icons/gplus-32.png - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160119813,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://platform.twitter.com/widgets.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160119813,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/libs/angularfire/0.9.0/angularfire.min.js 11:26 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160120674,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://code.angularjs.org/1.7.2/i18n/angular-locale_sk.js 1:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160120677,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 942:4 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160120679,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://code.angularjs.org/1.7.2/i18n/angular-locale_en-us.js 1:0 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160120681,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://angularjs.org/ 946:4 Uncaught ReferenceError: angular is not defined",
                "timestamp": 1534160120683,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ssl.google-analytics.com/ga.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1534160121033,
                "type": ""
            }
        ],
        "screenShotFile": "00cb00f8-0020-00b2-00f2-0047005700fa.png",
        "timestamp": 1534160115254,
        "duration": 16506
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a9436e38ec9384fd8caca647ffbda14e",
        "instanceId": 9368,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534160202148,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-240.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=fgUkuEuFW1fzPw3z7Bo7Dz5SDuMoFnxJ' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534160204115,
                "type": ""
            }
        ],
        "screenShotFile": "00470094-0022-0018-0074-001c004a0077.png",
        "timestamp": 1534160189655,
        "duration": 20238
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "906ca06c64690922d26250108f5541f8",
        "instanceId": 14596,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: logger is not defined",
        "trace": "ReferenceError: logger is not defined\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:5:7)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Functionality Check\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "006e00db-0098-0096-004a-006d003e009b.png",
        "timestamp": 1534162952835,
        "duration": 405
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "2eab7fa8216cd53ca9cdb8230bd8e382",
        "instanceId": 8828,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534164697426,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-240.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=SOqvC5isT4VpPIg8n5GdmM8JNPmrwlh4' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534164698322,
                "type": ""
            }
        ],
        "screenShotFile": "00c2009f-00cf-0081-0080-00f600c00069.png",
        "timestamp": 1534164685163,
        "duration": 18674
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "da2293e1cdb2d39d7c041ae5f4f70d48",
        "instanceId": 9560,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534222537258,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-239.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=y6fiCo9cWlJYNERz70SbfxLAax4bpxIZ' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534222537702,
                "type": ""
            }
        ],
        "screenShotFile": "00ce001a-0032-007e-0027-005300970033.png",
        "timestamp": 1534222521195,
        "duration": 22907
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ceae7a6cd8e218a008f8e4ce5eb9c340",
        "instanceId": 11924,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534223945790,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-239.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=8bYinpLpBSmtc7GVic2VMlN2V4yNtfvc' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534223948655,
                "type": ""
            }
        ],
        "screenShotFile": "00e900c7-00f5-00dc-00f1-0074008500a5.png",
        "timestamp": 1534223931902,
        "duration": 21694
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ceae7a6cd8e218a008f8e4ce5eb9c340",
        "instanceId": 11924,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://s-usc1c-nss-239.firebaseio.com/.lp?dframe=t&id=200060&pw=QkLv8dXfpX&ns=ng-projects-list 4 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1534223955524,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-239.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=2spk93klTSVOD7LzRnAmyzZx5MleMlVB' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534223964841,
                "type": ""
            }
        ],
        "screenShotFile": "006900d0-00a6-007b-0082-003800570026.png",
        "timestamp": 1534223955434,
        "duration": 14292
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "68319a3ba35cd1422640cdf1d08e3fe4",
        "instanceId": 9588,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: logger.info is not a function",
        "trace": "TypeError: logger.info is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:5:14)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Functionality Check\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "002f00f8-00da-00e3-00a5-003d003c0075.png",
        "timestamp": 1534229045995,
        "duration": 702
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3ea55b51fecf6810395d2b247d1c7dd3",
        "instanceId": 17128,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534229200244,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-239.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=tJNHHoDCMzKY83ntsHSe1J89z0EL9aiT' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534229200816,
                "type": ""
            }
        ],
        "screenShotFile": "00a600ce-0055-00f6-0008-00b3008000a8.png",
        "timestamp": 1534229185019,
        "duration": 21423
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b5c80cd4fec8b39838889b505b0ad1b3",
        "instanceId": 1812,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534229345132,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-239.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=4E09ARWZTo1fJsWLr93GmgnDd2NKmRsH' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534229345404,
                "type": ""
            }
        ],
        "screenShotFile": "006d0082-00f8-0083-005a-00d100080010.png",
        "timestamp": 1534229334124,
        "duration": 16355
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "2059a9003851fb6d2bff6809648476c1",
        "instanceId": 15548,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: logger.info is not a function",
        "trace": "TypeError: logger.info is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:5:14)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Functionality Check\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "006e00e1-00d1-005d-00be-001d00880091.png",
        "timestamp": 1534229379152,
        "duration": 449
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "0d329b82fe260a0209c43d02225893cd",
        "instanceId": 11188,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: logger.info is not a function",
        "trace": "TypeError: logger.info is not a function\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:6:14)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Functionality Check\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\SecondTest.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "001d00d2-0060-007e-00e8-006400ce00e3.png",
        "timestamp": 1534487155412,
        "duration": 1791
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a37972896f9f2a93da6347ee6f1f73a5",
        "instanceId": 4648,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
        "trace": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4281:23)\n    at ontimeout (timers.js:498:11)\n    at tryOnTimeout (timers.js:323:5)\n    at Timer.listOnTimeout (timers.js:290:5)",
        "browserLogs": [],
        "screenShotFile": "003b0065-000b-002f-0042-000b0096005a.png",
        "timestamp": 1534487233985,
        "duration": 73999
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5926cfb351c39e41b0aea7faec1de42e",
        "instanceId": 11868,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
        "trace": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4281:23)\n    at ontimeout (timers.js:498:11)\n    at tryOnTimeout (timers.js:323:5)\n    at Timer.listOnTimeout (timers.js:290:5)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534487571972,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-238.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=2jzT9qycuCptE0bIuXd8CKMjyRZiIN07' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534487572421,
                "type": ""
            }
        ],
        "screenShotFile": "005300dc-0078-00b1-00be-005000610051.png",
        "timestamp": 1534487544452,
        "duration": 34966
    },
    {
        "description": "should have a title|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fa74731f8de64024b6cb2b12076ac184",
        "instanceId": 10840,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://juliemr.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1534487751790,
                "type": ""
            }
        ],
        "screenShotFile": "00150071-0094-00ce-0032-001e004700ec.png",
        "timestamp": 1534487748370,
        "duration": 6375
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "cdef7b139f59b61fa3e528409080016a",
        "instanceId": 3892,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534487831570,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-238.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=AIk33HOXGBPh8Zws8nOaxGiyMHWv8Of2' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534487831570,
                "type": ""
            }
        ],
        "screenShotFile": "006b002c-0070-00ef-00f3-0069004a00d9.png",
        "timestamp": 1534487812374,
        "duration": 26939
    },
    {
        "description": "should have a title|Googel Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9b698ea3ef04249cd38537e20ca5b163",
        "instanceId": 11700,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c40050-009b-007e-00fa-0083009b000c.png",
        "timestamp": 1534489811102,
        "duration": 11074
    },
    {
        "description": "should have a title|Googel Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "24b6f759ee7604234b5139ad00a9e493",
        "instanceId": 10840,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Angular could not be found on the page https://www.google.co.in/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load",
        "trace": "Error: Angular could not be found on the page https://www.google.co.in/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load\n    at executeAsyncScript_.then (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:720:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"should have a title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\Googel.js:2:5)\n    at addSpecsToSuite (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ankur.jain\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\ankur.jain\\eclipse-workspace\\Angular_New\\TestPractice\\Googel.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "0067003f-00c0-0039-00a0-008400a70081.png",
        "timestamp": 1534489881049,
        "duration": 15617
    },
    {
        "description": "should have a title|Googel Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "400c8e0ea96879fa1648c810be348313",
        "instanceId": 12764,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c600d8-008d-00f8-009b-004300920059.png",
        "timestamp": 1534489950907,
        "duration": 7647
    },
    {
        "description": "should have a title|Googel Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "edd25aacdb0506c9495bf01bf4107a20",
        "instanceId": 9064,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00bc00ee-00dc-007e-001b-006800bd00f0.png",
        "timestamp": 1534741532486,
        "duration": 7296
    },
    {
        "description": "should have a title|Googel Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "622eee248eed5473e22b08a0ca2fcecd",
        "instanceId": 4652,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006b0080-0068-0099-00f2-006000840066.png",
        "timestamp": 1534742099154,
        "duration": 4980
    },
    {
        "description": "should have a title|Googel Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fba3edc982e4358289036ce987ba7aab",
        "instanceId": 13248,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00fe00bf-0073-00a5-008b-008300da000e.png",
        "timestamp": 1534742313853,
        "duration": 7436
    },
    {
        "description": "should have a title|Googel Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fd57ae4cbf041f45e0cbccfe34bc5d87",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f00096-0038-0008-0044-009700a3007b.png",
        "timestamp": 1534742443249,
        "duration": 8026
    },
    {
        "description": "Functionality Check|angularjs homepage Functionality Check",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f704ed95221c9cdba05b97b7d603574c",
        "instanceId": 10992,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://ng-projects-list.firebaseio.com/.ws?v=5' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534744617352,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.firebase.com/js/client/2.0.4/firebase.js 92 WebSocket connection to 'wss://s-usc1c-nss-238.firebaseio.com/.ws?v=5&ns=ng-projects-list&s=bpBUMIm4kHKyo5KwJWSA6jkM8NjpJLsV' failed: Error during WebSocket handshake: 'Upgrade' header is missing",
                "timestamp": 1534744617501,
                "type": ""
            }
        ],
        "screenShotFile": "009c001a-0013-00cd-0083-006b00310051.png",
        "timestamp": 1534744603426,
        "duration": 19530
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