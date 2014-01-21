window.tf_callFunctionIBV20 = function (id, flashId, functionName) {
    var obj = window["tf_inBannerVideo" + id];
    if(typeof(obj.tempVars) === "undefined"){
        obj.tempVars = {};
    }
    obj.tempVars.callFromFlashId = flashId;

    if (arguments.length < 3) {
    } else if (arguments.length > 3) {
        var arr = Array.prototype.slice.call(arguments);
        obj[functionName].apply(obj, arr.slice(3, arr.length));
    } else {
        obj[functionName]();
    }
};

window.tf_mozResizeFunction20 = function (id) {
    var object = window["tf_inBannerVideo" + id];
    var videoDiv = document.getElementById(object.inBanner.videoDivId);
    videoDiv.style.width = '0px';
    videoDiv.style.height = '0px';
    window.setTimeout(function (obj) {
        return function () {
            var dimensions = obj.IBVFloatingGetDimensions();
            var videoDiv = document.getElementById(obj.inBanner.videoDivId);
            videoDiv.style.width = dimensions[0] + 'px';
            videoDiv.style.height = dimensions[1] + 'px';
        }
    }(object), 100)
};

window.tf_IBVWinResizeFunction20 = function (id) {
    var obj = window["tf_inBannerVideo" + id];
    if (obj.inBanner.state.current != "floating" && obj.inBanner.state.current != "floatingFF") return;
    if (typeof(obj.tempVars.isFloatingPositioned) == "undefined" || !obj.tempVars.isFloatingPositioned) return;
    obj.finalizeFloatingUnit();
};

window.tf_keyDownIBVFloating20 = function (e, id) {
    if (e.keyCode == 27) {
        try {
            var obj = window["tf_inBannerVideo" + id];
            var flash_object = obj.getFlashObject(obj.inBanner.flashId, top);
            if (flash_object) {
                flash_object.goBack();
            }
        } catch (ex) {
        }
    }
};

window.tf_IBVAdjustForZoom20 = function (id, factor) {
    if (factor == 0 || factor == 1) {
        return;
    }

    var obj = top["tf_inBannerVideo" + id];
    if (obj.browserProperties.browser.zoomFactor) {
        var oldFactor = 100 / obj.browserProperties.browser.zoomFactor;
    } else {
        oldFactor = 100 / factor;
    }
    obj.browserProperties.browser.zoomFactor = factor;
    factor = 100 / factor;
	
	var browser = obj.browserProperties.browser;
	var videoDiv = top.document.getElementById(obj.inBanner.videoDivId);
	if(obj.tempVars.isExpansionHandle){
		if (obj.isFloatNeeded && obj.tempVars.initLoad && obj.inBanner.state.current != "floating" && obj.inBanner.state.current != "floatingFF") {
			obj.floatAdObj.reSizeAd();
		} else if (obj.inBanner.state.current == "floating" && browser.isOldIE && videoDiv) {
			videoDiv.style.width = Math.max(top.document.body.offsetWidth, screen.width) * factor + "px";
			videoDiv.style.height = Math.max(top.document.body.offsetHeight, screen.height) * factor + "px";
		}
		return;
	}
	
    top.tf_callFunctionIBV20(obj.id, 'JS', 'resizeWindow');
    var dynamicDiv = obj.windowObj.document.getElementById(obj.inBanner.dynamicDivId);
    var bannerLogoDiv = obj.windowObj.document.getElementById(obj.bannerLogo.dynamicDivId);
    var flashObject = obj.getFlashObject(obj.inBanner.flashId, obj.windowObj);
    var flashObject1 = obj.getFlashObject(obj.bannerLogo.flashId, obj.windowObj);
    var inBannerOffsetX = obj.inBanner.bannerOffsetX;
    var inBannerOffsetY = obj.inBanner.bannerOffsetY;
    var viewPort = obj.getViewPort(obj.windowObj);
    var inBannerAlignX = obj.inBanner.alignX;
    var inBannerAlignY = obj.inBanner.alignY;
    var clip = obj.inBanner.clip.current;
    if (clip) {
        if(obj.currentState !== "hide"){
            dynamicDiv.style.clip = "rect(" + clip.top * factor + "px " + clip.right * factor + "px " + clip.bottom * factor + "px " + clip.left * factor + "px)";
        }
    }

    clip = obj.bannerLogo.clip.current;
    if (clip) {
        if(obj.currentState !== "hide"){
            bannerLogoDiv.style.clip = "rect(" + clip.top * factor + "px " + clip.right * factor + "px " + clip.bottom * factor + "px " + clip.left * factor + "px)";
        }
    }
    dynamicDiv.style.width = obj.inBanner.flashWidth * factor + "px";
    dynamicDiv.style.height = obj.inBanner.flashHeight * factor + "px";

    bannerLogoDiv.style.width = obj.bannerLogo.flashWidth * factor + "px";
    bannerLogoDiv.style.height = obj.bannerLogo.flashHeight * factor + "px";

    var arr = ["left", "top", "right", "bottom"];
    for (var i = 0; i < arr.length; i++) {
        var prop = arr[i];
        if (dynamicDiv.style[prop] != "") {
            if (obj.windowObj.document.defaultView) {
                var cs = obj.windowObj.document.defaultView.getComputedStyle(dynamicDiv, "");
                dynamicDiv.style[prop] = obj.convertToPX(cs.getPropertyValue(prop), cs.getPropertyValue("font-size")) + "px";
            }
            else {
                dynamicDiv.style[prop] = obj.convertToPX(dynamicDiv.currentStyle[prop], dynamicDiv.currentStyle.fontSize) + "px";
            }
        }

        if (bannerLogoDiv.style[prop] != "") {
            if (obj.windowObj.document.defaultView) {
                cs = obj.windowObj.document.defaultView.getComputedStyle(bannerLogoDiv, "");
                bannerLogoDiv.style[prop] = obj.convertToPX(cs.getPropertyValue(prop), cs.getPropertyValue("font-size")) + "px";
            }
            else {
                bannerLogoDiv.style[prop] = obj.convertToPX(bannerLogoDiv.currentStyle[prop], bannerLogoDiv.currentStyle.fontSize) + "px";
            }
        }
    }
    if (browser.isOldIE) {
        if (videoDiv) {
            videoDiv.style.width = Math.max(top.document.body.offsetWidth, screen.width) + "px";
            videoDiv.style.height = Math.max(top.document.body.offsetHeight, screen.height) + "px";
        }
    } else {
        if (browser.isIE7 && videoDiv) {
            videoDiv.style.width = Math.max(top.document.body.offsetWidth, screen.width) * factor + "px";
            videoDiv.style.height = Math.max(top.document.body.offsetHeight, screen.height) * factor + "px";
        }
    }

    flashObject.width = obj.inBanner.flashWidth * factor;
    flashObject.height = obj.inBanner.flashHeight * factor;

    flashObject1.width = obj.bannerLogo.flashWidth * factor;
    flashObject1.height = obj.bannerLogo.flashHeight * factor;

    var frames = obj.tempVars.iWins;
    for (var frame in frames) {
        if (frame.x != undefined) {
            var d = obj.windowObj.document.getElementById(frame.id);
            var f = obj.windowObj.document.getElementById(frame.id + "_f");
            var d2 = obj.windowObj.document.getElementById(frame.id + "_d");
            obj.setIWinProp(frame.id, frame.x * factor, frame.y * factor, frame.w * factor, frame.h * factor, (frame.t == -1) ? -1 : frame.t, (frame.r == -1) ? -1 : frame.r * factor, (frame.b == -1) ? -1 : frame.b * factor, (frame.l == -1) ? -1 : frame.l, false, frame.scrollValue, null, d, f, d2, factor);
        }
    }
    top.tf_callFunctionIBV20(obj.id, 'JS', 'resizeWindow');
};

window.tf_adChoiceMoveOut = function (id, divId) {
    var obj = window["tf_inBannerVideo" + id];
    obj.adChoiceMoveOut(divId);
};

window.tf_inBannerVideoAd20 = function (id) {
    try {
        try {
            var tf_crossDomain = false;
            var dummy = top.location.href;
            if (typeof(dummy) == "undefined") {
                tf_crossDomain = true;
            }
        } catch (ex) {
            tf_crossDomain = true;
        }
        if (!tf_crossDomain) {
            if (window.parent != null && window.parent != top) {
                tf_crossDomain = true;
            }
        }

        this.isCrossDomain = tf_crossDomain;
        this.isFramed = (top != window);
        if (!tf_crossDomain && this.isFramed) {
            this.windowObj = top.window;
            top["tf_inBannerVideo" + id] = this;
            top.tf_callFunctionIBV20 = function(){
                return window.tf_callFunctionIBV20.apply({}, arguments);
            }
        } else {
            this.windowObj = window;
        }


        var that = this;
        var required = ["tf_adModel", "tf_adType", "tf_commonLocation", "tf_cookieFlash", "tf_banner", "tf_commonConfig"];
        for (var i = 0; i < required.length; i++) {
            if (typeof(window[required[i]]) == "undefined") {
                throw required[i];
            }
        }

        if (window.tf_adModel == "TF") {
            required = ["tf_banner.flag", "tf_banner.width", "tf_banner.height", "tf_banner.widthExpanded", "tf_banner.heightExpanded", "tf_banner.flashFile", "tf_banner.imageFile", "tf_banner.clickTag"];
        } else if (window.tf_adModel == "FEV") {
            required = ["tf_banner.flag", "tf_banner.width", "tf_banner.height", "tf_banner.widthExpanded", "tf_banner.heightExpanded", "tf_banner.widthFloating", "tf_banner.heightFloating", "tf_banner.flashFile", "tf_banner.imageFile", "tf_banner.clickTag", "tf_commonConfig.engagementPixel"];
        }

        for (var i = 0; i < required.length; i++) {
            if (typeof(eval("window." + required[i])) == "undefined") {
                throw required[i];
            }
        }

        this.systemProperties = new Object();
        this.browserProperties = new Object();
        this.inBanner = new Object();
        this.tempVars = new Object();
        this.functionMaps = {
            "tf_flashLoaded":"init",
            "tf_flashExpand":"show",
            "tf_getDirectionData":"calculateExpandData",
            "tf_flashCollapse":"hide",
            "tf_firePixel":"firePixel",
            "tf_startIBVFloating":"startIBVFloating",
            "tf_showIBVFloating":"showIBVFloating",
            "tf_hideIBVFloating":"hideIBVFloating",
            "tf_showIWin":"showIWin",
			"tf_listenFlashEvent":"listenFlashEvents",
            "tf_hideIWin":"hideIWin"
        };
        this.systemProperties.flashVersion = {"major":8, "minor":0, "revision":0};
        this.systemProperties.OS = {
            "isWindows":eval("(navigator.userAgent.indexOf('Win') != -1) ? true : false;"),
            "isMac":eval("(navigator.userAgent.indexOf('Mac') != -1) ? true : false;"),
            "isUnix":eval("(navigator.userAgent.indexOf('X11') != -1) ? true : false;"),
            "isLinux":eval("(navigator.userAgent.indexOf('Linux') != -1) ? true : false;")
        };
        this.browserProperties.browser = {
            "isIE":eval("(navigator.appVersion.indexOf('MSIE') != -1) ? true : false;"),
            "isWin":eval("(navigator.appVersion.indexOf('Win') != -1) ? true : false;"),
            "isOpera":eval("(navigator.userAgent.indexOf('Opera') != -1) ? true : false;"),
            "isFirefox":eval("(navigator.userAgent.indexOf('Firefox') != -1) ? true : false;"),
            "isChrome":eval("(navigator.userAgent.indexOf('Chrome') != -1) ? true : false;"),
            "isSafari":eval("navigator.vendor && (navigator.vendor.indexOf('Apple') != -1) ? true : false;")
        };

        this.id = id;
        this.zoomFlashFile = window.tf_zoomFlash;
        this.adModel = window.tf_adModel;
        this.adType = window.tf_adType;
        this.tweenLocation = window.tf_commonLocation;
        this.inBanner.flashId = "TFIBVFlashCollapsed" + id;
        this.inBanner.staticDivId = "TFIBVstaticDiv" + id;
        this.inBanner.dynamicDivId = "TFIBVDynamicDiv" + id;
        this.inBanner.videoDivId = "TFIBVSemiTransDiv" + id;
        this.inBanner.imageFile = "";
        this.inBanner.clickTag = "";
        this.tempVars.clickTag = window.tf_banner.clickTag;

        this.tempVars.adHosting = window.tf_adHosting;
        this.tempVars.isAdHosting = (window.tf_isAdHosting) ? window.tf_isAdHosting : false;

        if (typeof(window.tf_replacementRegEx) != "undefined") {
            this.replacementRegEx = window.tf_replacementRegEx;
        }

        if (typeof(window.tf_animDurationOpacity) != "undefined") {
            this.inBanner.opacityAnimDuration = window.tf_animDurationOpacity;
        } else {
            this.inBanner.opacityAnimDuration = 2;
        }

        if (typeof(window.tf_animDurationFloating) != "undefined") {
            this.inBanner.floatingAnimDuration = window.tf_animDurationFloating;
        } else {
            this.inBanner.floatingAnimDuration = 2;
        }

        i = 0;
        this.bannerFlags = [];
        while (typeof(window["tf_banner" + ((i == 0) ? "" : i)]) != "undefined") {
            var obj = window["tf_banner" + ((i == 0) ? "" : i)];
            this.addConfiguration(this, obj);

            var flag = obj.flag;
            this.bannerFlags.push(flag);
            if (this[flag].imageFile == "") {
                this[flag].imageFile = obj.imageFile;
            }
            if (this[flag].clickTag == "") {
                this[flag].clickTag = obj.clickTag;
            }

            this.impressions = [];
            var j = 0;
            while (typeof(obj["bannerImpression" + ((j == 0) ? "" : j)]) != "undefined") {
                this.impressions.push(obj["bannerImpression" + ((j == 0) ? "" : j)]);
                this.firePixel({url:obj["bannerImpression" + ((j == 0) ? "" : j)]});
                j++;
            }

            this[flag].flashVars = this.getFlashVars(this[flag], this[flag].extraFlashVars);
            window["tf_banner" + i] = undefined;
            i++;
        }

        if (window.tf_adType !== "toolbarAd") {
            if (!this.isCrossDomain && this.isFramed) {
                var tf_winLoadFun = new Function("top.tf_callFunctionIBV20('" + id + "', 'JS', 'load');");
                if (window.attachEvent) {
                    window.attachEvent("onload", tf_winLoadFun);
                } else {
                    window.addEventListener("load", tf_winLoadFun, false);
                }
            } else {
                tf_winLoadFun = new Function("window.tf_callFunctionIBV20('" + id + "', 'JS', 'load');");
                if (window.attachEvent) {
                    window.attachEvent("onload", tf_winLoadFun);
                } else {
                    window.addEventListener("load", tf_winLoadFun, false);
                }
            }
        }
        this.printAd();
    } catch (tf_exception) {
        if (document.location.protocol == "file:" || document.location.hostname.toLowerCase().indexOf("tribalfusion") != -1) {
            if (typeof(tf_exception) == "string") {
                if (tf_exception.indexOf(" ") == -1) {
                    alert(tf_exception + " variable not defined.");
                } else {
                    alert(tf_exception);
                }
            } else {
                alert(tf_exception.message);
            }
        }
    }

};

tf_inBannerVideoAd20.prototype.getFlashVars = function (banner, extraVars) {
    var that = this;
    var flashVars = "tf_callJS=tf_callFunctionIBV20";
    for (var key in that.functionMaps) {
        flashVars += "&" + key + "=" + that.functionMaps[key];
    }

    flashVars += "&tf_bannerId=" + banner.flashId;
    flashVars += "&tf_bannerAdWidth=" + banner.widthExpanded;
    flashVars += "&tf_bannerAdHeight=" + banner.heightExpanded;
    flashVars += "&tf_flash=" + banner.flashFile + ".swf";
    flashVars += "&tf_state=" + window.tf_state;
    flashVars += "&tf_city=" + window.tf_city;
    flashVars += "&tf_zipcode=" + window.tf_zipcode;
    flashVars += "&tf_gender=" + window.tf_gender;
    flashVars += "&tf_location=" + window.tf_location;
    flashVars += "&tf_id=" + window.tf_id;

    if (typeof(extraVars) == "object") {
        for (i in extraVars) {
            flashVars += "&" + i + "=" + extraVars[i];
        }
    } else if (typeof(extraVars) == "string" && extraVars != "") {
        flashVars += "&" + extraVars;
    }
    return flashVars;
};

tf_inBannerVideoAd20.prototype.printAd = function () {
    var that = this;
		createBanner();
        var tempHTML = "";
        if (that.systemProperties.requiredFlashExists) {
            tempHTML = "<!--[if IE 7]><div id='tf_ie7Tag' style='width:1px;height:1px;visibility:hidden'></div><![endif]-->";
            tempHTML += "<!--[if gte IE 5]><div id='tf_oldIETag' style='width:1px;height:1px;visibility:hidden'></div><![endif]-->";
            tempHTML += "<!--[if gt IE 6]><div style='width:2px;height:2px;position:absolute;visibility:hidden;top:-100px;left:-100px' id='dummyIBVAbsDiv" + that.id + "'><div style='width:1px;height:1px'></div><div style='width:1px;height:1px;top:10px;left:10px;position:fixed' id='dummyIBVFixedDiv" + that.id + "'></div></div><![endif]-->";
        }
		writeAdHTML(tempHTML + that.inBanner.html);
    

    function writeAdHTML(html) {
        if (!that.isCrossDomain && that.isFramed) {
            var topDiv = top.document.createElement("div");
            topDiv.id = "topdiv" + that.id;
            topDiv.style.width = that.inBanner.width + "px";
            topDiv.style.height = that.inBanner.height + "px";

            var style = top.document.createElement('style');
            var cssClassName = "TFIBVCssClassName" + (that.id).replace(/\$/g, "");
            style.setAttribute("type", "text/css");
            var def = "." + cssClassName + "{display:none !important;width:1px !important;height:1px !important;}";
            if (style.styleSheet) {
                style.styleSheet.cssText = def;
            } else {
                style.appendChild(top.document.createTextNode(def));
            }
            top.document.getElementsByTagName('head')[0].appendChild(style);

            window.frameElement.className = cssClassName;
            window.frameElement.parentNode.insertBefore(topDiv, window.frameElement);

            var adChoiceDiv = document.getElementById("tfac_" + that.inBanner.width + that.inBanner.height + that.id);
            if (adChoiceDiv) {
                if (that.browserProperties.browser.isSafari) {
                    var acInnerHTML = adChoiceDiv.innerHTML;
                    if (acInnerHTML.indexOf("<img") != -1 || acInnerHTML.indexOf("<IMG") != -1) {
                        that.adChoiceMoveOut("tfac_" + that.inBanner.width + that.inBanner.height + that.id);
                    }
                } else {
                    var acImg = adChoiceDiv.getElementsByTagName("img");
                    if (acImg && acImg.length != 0) {
                        that.adChoiceMoveOut("tfac_" + that.inBanner.width + that.inBanner.height + that.id);
                    }
                }
            }

            var jscript = "";
            for (var m in window) {
                if (typeof(window[m]) == "function" && typeof(top[m]) != "function") {
                    jscript += "window." + m + "=" + window[m].toString() + ";\n";
                }
            }
            var scr = top.document.createElement("script");
            scr.type = "text/javascript";
            scr.text = jscript;
            top.document.body.appendChild(scr);
            top["tf_inBannerVideo" + that.id] = that;
            topDiv.innerHTML += html;
        } else {
            that.windowObj.document.write(html);
        }
    }

    function createBanner() {
        var html = "";
        var flashHTML = that.createFlashObject("inBanner");
        that.systemProperties.requiredFlashExists = true;
        if (flashHTML == null) {
            html = createBackupImage(that.inBanner);
            that.systemProperties.requiredFlashExists = false;
        } else {
            html = getAdHTML(flashHTML);
        }
        that.inBanner.html = html;
    }

    function createBackupImage(banner) {
        var str = '<a href="' + banner.clickTag + '" target="_blank">';
        str += '<img src="' + banner.imageFile + '" style="width:' + banner.width + 'px;height:' + banner.height + 'px;" border="0px"></a>';
        return str;
    }

    function getAdHTML(flashHTML) {
        var html = "";
        html += "<div id='" + that.inBanner.staticDivId + "' style='width:" + that.inBanner.width + "px;height:" + that.inBanner.height + "px;position:relative;z-index:0;padding:0px;'>";
        html += "<div id='" + that.inBanner.dynamicDivId + "' style='background-color:transparent;z-index:1;position:absolute;overflow:hidden;width:1px;height:1px;padding:0px;'>";
        html += flashHTML;
        html += "</div></div>";
        return html;
    }
};

tf_inBannerVideoAd20.prototype.adChoiceMoveOut = function (divId) {
    if (!this.isCrossDomain && this.isFramed) {
        var adChoiceDiv = document.getElementById(divId);
        var topDiv = top.document.getElementById("topdiv" + this.id);
        if (topDiv) {
            var ad = top.document.getElementById(this.inBanner.staticDivId);
            if (ad != null) {
                if (this.browserProperties.browser.isSafari) {
                    var newDiv = adChoiceDiv.cloneNode(true);
                    topDiv.insertBefore(newDiv, ad);
                } else {
                    topDiv.insertBefore(adChoiceDiv, ad);
                }
            } else {
                topDiv.appendChild(adChoiceDiv);
            }
            top.tf_e9AdChoice = tf_e9AdChoice;
        }
    }
};

tf_inBannerVideoAd20.prototype.adChoiceHide = function (divId) {
    var div_adChoice = top.document.getElementById(divId);
    if (div_adChoice) {
        div_adChoice.style.display = "none";
    }
};

tf_inBannerVideoAd20.prototype.adChoiceShow = function (divId) {
    var div_adChoice = top.document.getElementById(divId);
    if (div_adChoice) {
        div_adChoice.style.display = "";
    }
};

tf_inBannerVideoAd20.prototype.initOpacityTweenLibrary = function () {
    OpacityTween.prototype = new top.Tween();
    OpacityTween.prototype.constructor = top.Tween;
    OpacityTween.superclass = top.Tween.prototype;

    function OpacityTween(obj, func, fromOpacity, toOpacity, duration) {
        this.targetObject = obj;
        this.init(new Object(), 'x', func, fromOpacity, toOpacity, duration);
    }

    var o = OpacityTween.prototype;
    o.targetObject = {};
    o.onMotionChanged = function (evt) {
        var v = evt.target._pos;
        var t = this.targetObject;
        t.style['opacity'] = v / 100;
        t.style['-moz-opacity'] = v / 100;
        if (t.filters) t.style['filter'] = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + v + ")";
    };
    top.TF_OpacityTween = OpacityTween;
};

tf_inBannerVideoAd20.prototype.makeElementFloating = function () {
    var dynamicDiv = top.document.getElementById(this.inBanner.dynamicDivId);
    var position = this.getElementPosition(top.document.getElementById(this.inBanner.staticDivId), top);
    var viewPort = this.getViewPort(top);
    dynamicDiv.style.left = parseInt(viewPort.width / 2 - this.inBanner.widthFloating / 2) + (viewPort.left - position.left) + "px";
    dynamicDiv.style.top = parseInt(viewPort.height / 2 - this.inBanner.heightFloating / 2) + (viewPort.top - position.top) + "px";
};

tf_inBannerVideoAd20.prototype.finalizeFloatingUnit = function () {
    var browser = this.browserProperties.browser;
    var position = this.getElementPosition(top.document.getElementById(this.inBanner.staticDivId), top);
    var viewPort = this.getViewPort(top);
    var dynamicDiv = top.document.getElementById(this.inBanner.dynamicDivId, top);

    var finalLeftCord = parseInt(viewPort.width / 2 - this.inBanner.widthFloating / 2);
    var finalTopCord = parseInt(viewPort.height / 2 - this.inBanner.heightFloating / 2);

    if (browser.isOldIE) {
        if (!this.isFloatNeeded) {
			finalLeftCord -= position.left;
			finalTopCord -= position.top;
		}
        dynamicDiv.className = this.getNewCss(this.id + "2", "l", "t", false, finalLeftCord, finalTopCord, "update");
    } else {
        if (browser.isFirefox) {
            finalLeftCord = parseInt(viewPort.width / 2 - this.inBanner.widthFloating / 2) + (viewPort.left - position.left);
            finalTopCord = parseInt(viewPort.height / 2 - this.inBanner.heightFloating / 2) + (viewPort.top - position.top);
			if (this.isFloatNeeded) {
				finalLeftCord += position.left;
				finalTopCord += position.top;
			}
        }
        dynamicDiv.style.left = finalLeftCord + "px";
        dynamicDiv.style.top = finalTopCord + "px";
    }
};

tf_inBannerVideoAd20.prototype.initFloatingTweenLibrary = function () {
    FloatTween.prototype = new top.Tween();
    FloatTween.prototype.constructor = top.Tween;
    FloatTween.superclass = top.Tween.prototype;

    function FloatTween(obj, property, func, fromValue, toValue, duration) {
        this.targetObject = obj;
        this.property = property;
        this.currentValue = fromValue;
        this.init(new Object(), 'x', func, fromValue, toValue, duration);
        this.counter = 0;
    }

    FloatTween.prototype.getObject = function () {
        return this;
    };

    var o = FloatTween.prototype;
    o.targetObject = {};
    o.onMotionChanged = function (evt) {
        temp(evt, this);
    };

    function temp(evt, currObj) {
        currObj.counter += 1;
        var v = evt.target._pos;
        var t = currObj.targetObject;
        var that = currObj.otherTweenObject;
        var obj = currObj.parentObject;
        if (currObj.property == "left") {
            if (typeof(currObj.currentY) == "undefined") {
                currObj.currentY = that.currentValue;
            }
            currObj.currentX = v;
            if (currObj.counter == 1) {
                t.className = obj.getNewCss(obj.id + "2", "l", "t", false, v, currObj.currentY);
            } else {
                t.className = obj.getNewCss(obj.id + "2", "l", "t", false, v, currObj.currentY, "update");
            }
        } else if (currObj.property == "top") {
            that.currentY = v;
        }
    }

    o.onMotionStarted = function () {
        if (this.property == "left") {
            var obj = this.parentObject;
            var flashObj = obj.getFlashObject(obj.inBanner.flashId, top);
            var dynamicDiv = top.document.getElementById(obj.inBanner.dynamicDivId);
            try {
                if (typeof(top.tf_FEVPubShowCallback) == "function") {
                    top.tf_FEVPubShowCallback();
                }
                if (flashObj) {
                    flashObj.startAnimatingFlash(obj.inBanner.floatingAnimDuration);
                }
            } catch (ex) {
            }
            var clip = obj.inBanner.floatingClip;
            dynamicDiv.style.clip = "rect(" + clip.top + "px " + clip.right + "px " + clip.bottom + "px " + clip.left + "px)";
            dynamicDiv.style.height = obj.inBanner.heightFloating + "px";
            dynamicDiv.style.width = obj.inBanner.widthFloating + "px";
        }
    };

    o.onMotionFinished = function () {
        if (this.property == "left") {
            var obj = this.parentObject;
            var flashObj = obj.getFlashObject(obj.inBanner.flashId, top);
            obj.tempVars.isFloatingPositioned = true;
            obj.finalizeFloatingUnit();
            try {
                if (flashObj) {
                    flashObj.showFloatingContent();
                }
            } catch (ex) {
            }
        }
    };

    top.TF_FloatTween = FloatTween;
};

tf_inBannerVideoAd20.prototype.startIBVFloating = function () {
    var dynamicDiv = top.document.getElementById(this.inBanner.dynamicDivId);

    if (typeof(this.tempVars.isFramesRender) == "undefined") {
        this.tempVars.isFramesRender = true;
        var frames = this.tempVars.iWins;
        for (var i = 0; i < frames.length; i++) {
            var f = top.document.createElement("iframe");
            f.width = "1";
            f.height = "1";
            f.scrolling = "no";
            f.frameBorder = "0";
            f.border = "0";
            f.hSpace = "0";
            f.vSpace = "0";
            f.marginHeight = "0";
            f.marginWidth = "0";
            f.src = "about:blank";
            f.id = frames[i].id + "_f";
            f.style.position = "absolute";
            var d = top.document.createElement("div");
            d.id = frames[i].id;
            d.style.position = "absolute";
            d.style.overflow = "hidden";
            d.style.zIndex = 11;
            d.style.width = "1px";
            d.style.height = "1px";
            d.style.visibility = "hidden";
            dynamicDiv.appendChild(d);
            var d2 = top.document.createElement("div");
            d2.id = frames[i].id + "_d";
            d2.style.position = "absolute";
            d2.style.left = "0px";
            d2.style.top = "0px";
            d.appendChild(d2);
            d2.appendChild(f);
        }
    }

    var videoDiv = top.document.getElementById(this.inBanner.videoDivId);
    videoDiv.style.display = "";
    this.tweenObjOpacity = new top.TF_OpacityTween(videoDiv, top.Tween.regularEaseOut, 0, 80, this.inBanner.opacityAnimDuration);
    this.tweenObjOpacity.start();
};

tf_inBannerVideoAd20.prototype.showIBVFloating = function (l, t, r, b) {
    var browser = this.browserProperties.browser;
    var dynamicDiv = top.document.getElementById(this.inBanner.dynamicDivId);

    var position = this.getElementPosition(top.document.getElementById(this.inBanner.staticDivId), top);
    var viewPort = this.getViewPort(top);

    var floatingClip = new Object();
    floatingClip.left = 0;
    floatingClip.top = 0;
    floatingClip.right = this.inBanner.widthFloating;
    floatingClip.bottom = this.inBanner.heightFloating;
    this.inBanner.floatingClip = floatingClip;

    var clip = this.inBanner.collapsedClip;

    //position of dynamic div relative to view port
    var leftCord = position.left - clip.left - viewPort.left;
    var topCord = position.top - clip.top - viewPort.top;

    var finalLeftCord = parseInt(viewPort.width / 2 - this.inBanner.widthFloating / 2);
    var finalTopCord = parseInt(viewPort.height / 2 - this.inBanner.heightFloating / 2);

    var flashObj = this.getFlashObject(this.inBanner.flashId, top);
    if (browser.isOldIE) {
        this.initFloatingTweenLibrary();
        if (!this.isFloatNeeded) {
			leftCord = -1 * clip.left - viewPort.left;
			topCord = -1 * clip.top - viewPort.top;
			finalLeftCord -= position.left;
			finalTopCord -= position.top;
		}
        this.TweenObjFloatX = new top.TF_FloatTween(dynamicDiv, "left", top.Tween.regularEaseOut, leftCord, finalLeftCord, this.inBanner.floatingAnimDuration);
        this.TweenObjFloatY = new top.TF_FloatTween(dynamicDiv, "top", top.Tween.regularEaseOut, topCord, finalTopCord, this.inBanner.floatingAnimDuration);
        this.TweenObjFloatY.otherTweenObject = this.TweenObjFloatX.getObject();
        this.TweenObjFloatX.otherTweenObject = this.TweenObjFloatY.getObject();
        this.TweenObjFloatX.parentObject = this;
        this.TweenObjFloatY.parentObject = this;
        this.inBanner.state.current = "floating";
    } else {
        if (browser.isFirefox) {
            leftCord = dynamicDiv.offsetLeft;
            topCord = dynamicDiv.offsetTop;

            finalLeftCord = parseInt(viewPort.width / 2 - this.inBanner.widthFloating / 2) + (viewPort.left - position.left);
            finalTopCord = parseInt(viewPort.height / 2 - this.inBanner.heightFloating / 2) + (viewPort.top - position.top);
			if (this.isFloatNeeded) {
				finalLeftCord += position.left;
				finalTopCord += position.top;
			}
        }

        this.TweenObjFloatX = new top.Tween(dynamicDiv.style, "left", top.Tween.regularEaseOut, leftCord, finalLeftCord, this.inBanner.floatingAnimDuration, "px");
        this.TweenObjFloatY = new top.Tween(dynamicDiv.style, "top", top.Tween.regularEaseOut, topCord, finalTopCord, this.inBanner.floatingAnimDuration, "px");
        var event = new Object();
        event.onMotionStarted = (function (obj, dynamicDiv, flashObj) {
            return function () {
                if (typeof(top.tf_FEVPubShowCallback) == "function") {
                    top.tf_FEVPubShowCallback();
                }
                try {
                    if (flashObj) {
                        flashObj.startAnimatingFlash(obj.inBanner.floatingAnimDuration);
                    }
                } catch (ex) {
                }
                var clip = obj.inBanner.floatingClip;
                dynamicDiv.style.clip = "rect(" + clip.top + "px " + clip.right + "px " + clip.bottom + "px " + clip.left + "px)";
            }
        }(this, dynamicDiv, flashObj));
        event.onMotionFinished = (function (obj, flashObj) {
            return function () {
                obj.tempVars.isFloatingPositioned = true;

                top.setTimeout(function (o) {
                    return function () {
                        o.finalizeFloatingUnit();
                    }
                }(obj), 200);

                try {
                    if (flashObj) {
                        flashObj.showFloatingContent();
                    }
                } catch (ex) {
                }

                if (obj.browserProperties.browser.isFirefox) {
                    var tf_onScrollFun = new Function("top.tf_callFunctionIBV20('" + obj.id + "', 'JS', 'makeElementFloating');");
                    obj.tempVars.scrollEventListener = tf_onScrollFun;
                    if (top.attachEvent) {
                        top.attachEvent("onscroll", tf_onScrollFun);
                    } else {
                        top.addEventListener("scroll", tf_onScrollFun, false);
                    }
                }
            };
        })(this, flashObj);

        this.TweenObjFloatX.addListener(event);
        if (!this.browserProperties.browser.isFirefox) {
            dynamicDiv.style.position = "fixed";
            dynamicDiv.style.left = leftCord;
            dynamicDiv.style.top = topCord;
            this.inBanner.state.current = "floating";
        } else {
            this.inBanner.state.current = "floatingFF";
        }
    }

    var tf_winResizeFun = new Function("tf_IBVWinResizeFunction20('" + this.id + "')");
    if (top.attachEvent) {
        top.attachEvent("onresize", tf_winResizeFun);
    } else {
        top.addEventListener("resize", tf_winResizeFun, false);
    }

    dynamicDiv.style.clip = "rect(" + t + "px " + r + "px " + b + "px " + l + "px )";
    this.TweenObjFloatX.start();
    this.TweenObjFloatY.start();
};

tf_inBannerVideoAd20.prototype.hideIBVFloating = function () {
    this.TweenObjFloatX.stop();
    this.TweenObjFloatY.stop();
    var videoDiv = top.document.getElementById(this.inBanner.videoDivId);
    var dynamicDiv = top.document.getElementById(this.inBanner.dynamicDivId);
    var staticDiv = top.document.getElementById(this.inBanner.staticDivId);
    var clip = this.inBanner.collapsedClip;
    var browser = this.browserProperties.browser;

    if (browser.isOldIE) {
        dynamicDiv.className = this.inBanner.collapsedClassName;
    } else {
        dynamicDiv.style.left = -1 * clip.left + "px";
        dynamicDiv.style.top = -1 * clip.top + "px";
        dynamicDiv.style.position = "absolute";
    }
    dynamicDiv.style.width = this.inBanner.flashWidth + "px";
    dynamicDiv.style.height = this.inBanner.flashHeight + "px";
    dynamicDiv.style.clip = "rect(" + clip.top + "px " + clip.right + "px " + clip.bottom + "px " + clip.left + "px)";
    videoDiv.style.display = "none";
    if (browser.isFirefox) {
        if (top.detachEvent) {
            top.detachEvent("onscroll", this.tempVars.scrollEventListener);
        } else {
            top.removeEventListener("scroll", this.tempVars.scrollEventListener, false);
        }
    }

    var frames = this.tempVars.iWins;
    for (var i = 0; i < frames.length; i++) {
        this.hideIWin(frames[i].id, true);
    }

    if (typeof(top.tf_FEVPubHideCallback) == "function") {
        top.tf_FEVPubHideCallback();
    }
};

tf_inBannerVideoAd20.prototype.listenFlashEvents = function(event_name, param)
{

	var that = this;
	this.inBanner.isFlashLoaded = true;
	
	 switch(event_name){
	  case "expansionComplete":
	   if (typeof(this.tempVars.flashLoadedTime) == 'undefined') {
		this.tempVars.flashLoadedTime = new Date().getTime();
		this.tempVars.glowExpansionTime = Number(param)*1000;
		break;
	   }
	 default:
	 break;
 
	}

};

tf_inBannerVideoAd20.prototype.getNewCss = function (id, x, y, isArabicPage, offSetX, offSetY, action) {
    if (typeof(offSetX) == "undefined") {
        offSetX = 0;
    }

    if (typeof(offSetY) == "undefined") {
        offSetY = 0;
    }

    if (typeof(action) == "undefined") {
        action = "create";
    }

    var left = x;
    var topCord = y;
    if (!isArabicPage) {
        if (x == "l") {
            left = "expression((" + offSetX + "+(ignoreMe=document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft))+'px')";
        } else if (x == "r") {
            left = "expression((" + offSetX + "-this.offsetWidth+(document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth)+(ignoreMe=document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft))+'px')";
        } else if (x == "c") {
            left = "expression((" + offSetX + "+((document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth)-this.offsetWidth)/2+(ignoreMe=document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft))+'px')";
        }
    } else {
        if (x == "l") {
            left = "expression((" + offSetX + "+(ignoreMe=document.body.scrollWidth-(document.body.scrollLeft + document.body.clientWidth))+'px')";
        } else if (x == "r") {
            left = "expression((" + offSetX + "-this.offsetWidth+(document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth)-(ignoreMe=document.body.scrollWidth-(document.body.scrollLeft + document.body.clientWidth)))+'px')";
        } else if (x == "c") {
            left = "expression((" + offSetX + "+((document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth)-this.offsetWidth)/2-(ignoreMe=document.body.scrollWidth-(document.body.scrollLeft + document.body.clientWidth)))+'px')";
        }
    }

    if (y == "t") {
        topCord = "expression((" + offSetY + "+(ignoreMe=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop))+'px');";
    } else if (y == "b") {
        topCord = "expression((" + offSetY + "-this.offsetHeight+(document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight)+(ignoreMe=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop))+'px')";
    } else if (y == "c") {
        topCord = "expression((" + offSetY + "+((document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight)-this.offsetHeight)/2+(ignoreMe=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop))+'px')";
    }

    if (action == "create") {
        var style = this.windowObj.document.createElement('style');
        var cssClassName = "TFIBVFloatingCSSClassName" + id.replace(/\$/g, "");
        style.setAttribute("type", "text/css");
        var def = "." + cssClassName + "{position: absolute;top:" + topCord + ";left:" + left + "}";
        if (style.styleSheet) {
            style.styleSheet.cssText = def;
        } else {
            this.tempVars[cssClassName + "_TextNode"] = this.windowObj.document.createTextNode(def);
            style.appendChild(this.tempVars[cssClassName + "_TextNode"]);
        }
        this.windowObj.document.getElementsByTagName('head')[0].appendChild(style);
        this.tempVars[cssClassName] = style;
    } else if (action == "update") {
        cssClassName = "TFIBVFloatingCSSClassName" + id.replace(/\$/g, "");
        style = this.tempVars[cssClassName];
        def = "." + cssClassName + "{position: absolute;top:" + topCord + ";left:" + left + "}";
        if (style.styleSheet) {
            style.styleSheet.cssText = def;
        } else {
            style.removeChild(this.tempVars[cssClassName + "_TextNode"]);
            this.tempVars[cssClassName + "_TextNode"] = this.windowObj.document.createTextNode(def);
            style.appendChild(this.tempVars[cssClassName + "_TextNode"]);
        }
    }
    return cssClassName;
};

tf_inBannerVideoAd20.prototype.IBVFloatingGetDimensions = function () {
    var w = Math.max(top.document.body.scrollWidth, top.document.documentElement.scrollWidth);
    var h = Math.max(top.document.body.scrollHeight, top.document.documentElement.scrollHeight);
    var myWidth = Math.max(w, top.innerWidth);
    var myHeight = Math.max(h, top.innerHeight);
    return [myWidth, myHeight];
};

tf_inBannerVideoAd20.prototype.init = function (l, t) {
    var that = this;
    var flag = "";
    var remainingFlags = [];
    for (var i = 0; i < that.bannerFlags.length; i++) {
        if (that[that.bannerFlags[i]].flashId === that.tempVars.callFromFlashId) {
            flag = that.bannerFlags[i];
        } else {
            remainingFlags.push(that.bannerFlags[i]);
        }
    }

    that[flag].isFlashLoaded = true;
    /*if (typeof(this.tempVars.flashLoadedTime) == "undefined") {
        this.tempVars.flashLoadedTime = new Date().getTime();
    }*/

    var flashObj = this.getFlashObject(this.tempVars.callFromFlashId, this.windowObj);
    try {
        if (flashObj) {
            flashObj.sendXMLData(this.customXml);
        }
    } catch (ex) {
    }

    this[flag].collapsedClip = {left:l, top:t, right:Number(l) + this[flag].width, bottom:Number(t) + this[flag].height};

    if (!this[flag].clip) {
        this[flag].clip = {};
    }
    this[flag].clip.current = this[flag].collapsedClip;
    var allFlashLoaded = true;
    for (i = 0; i < remainingFlags.length; i++) {
        if (!that[remainingFlags[i]].isFlashLoaded) {
            allFlashLoaded = false;
        }
    }
    if (typeof(this.tempVars.load) != "undefined" && this.tempVars.load && allFlashLoaded) {
        this.performInitLoad();
    }

    var dynamicDiv = this.windowObj.document.getElementById(this.inBanner.dynamicDivId);
    dynamicDiv.onmouseout = function () {
        that.tempVars.mouseOut = true;
    };
};

tf_inBannerVideoAd20.prototype.show = function () {
    if (this.isCrossDomain) return;
    if (this.inBanner.state.current == "expanded") return;
    if (new Date().getTime() - this.tempVars.hideCounter < 300) return;

    this.tempVars.mouseOut = false;
    this.inBanner.state.current = "scrolling";

    var root = top.document.compatMode == 'BackCompat' ? top.document.body : top.document.documentElement;
    this.browserProperties.browser.isVerticalScrollbar = root.scrollHeight > root.clientHeight;
    this.browserProperties.browser.isHorizontalScrollbar = root.scrollWidth > root.clientWidth;

    this.processExpand();
};

tf_inBannerVideoAd20.prototype.hide = function () {
    if (this.isCrossDomain) return;
    if (this.inBanner.state.current == "collapsed") return;
    var staticDiv = top.document.getElementById(this.inBanner.staticDivId);
    var dynamicDiv = top.document.getElementById(this.inBanner.dynamicDivId);
    staticDiv.style.zIndex = 0;
    var clip = this.inBanner.collapsedClip;
    dynamicDiv.style.clip = "rect(" + clip.top + "px " + clip.right + "px " + clip.bottom + "px " + clip.left + "px)";
    this.adChoiceShow("tfac_" + this.inBanner.width + this.inBanner.height + this.id);
    this.inBanner.state.current = "collapsed";
    this.tempVars.hideCounter = new Date().getTime();
};

tf_inBannerVideoAd20.prototype.load = function () {
    if (this.tempVars.load) return;
    if (!this.systemProperties.requiredFlashExists) return;

    this.tempVars.isTweenLoaded = false;
    var ie7Div = this.windowObj.document.getElementById("tf_ie7Tag");
    if (ie7Div) {
        this.browserProperties.browser.isIE7 = true;
    } else {
        this.browserProperties.browser.isIE7 = false;
    }

    if (!this.isCrossDomain) {
        this.loadScript(this.tweenLocation + "TF_Tween.js", this.windowObj.document.body);
    }

    var allFlashLoaded = true;
    for(var i = 0; i < this.bannerFlags.length; i++){
        if(!this[this.bannerFlags[i]].isFlashLoaded){
            allFlashLoaded = false;
        }
    }

    if (allFlashLoaded) {
        this.performInitLoad();
    }
    this.tempVars.load = true;

    if (!this.isCrossDomain) {
        var tf_keyDown = new Function("event", "window.tf_keyDownIBVFloating20(event, '" + this.id + "');");
        if (top.attachEvent) {
            top.document.body.attachEvent("onkeydown", tf_keyDown);
        } else {
            top.addEventListener("keydown", tf_keyDown, false);
        }
    }
};

tf_inBannerVideoAd20.prototype.performInitLoad = function () {
    var that = this;
    var dynamicDiv = this.windowObj.document.getElementById(this.inBanner.dynamicDivId);
    if (!this.isCrossDomain) {
        this.prepareIBVFloating();
    } else {
        dynamicDiv.onclick = function () {
            window.open(that.tempVars.clickTag, "_blank");
        }
    }
    var browser = this.browserProperties.browser;
    var clip = this.inBanner.collapsedClip;
    if (browser.isOldIE) {
        var className = this.getNewCss(this.id + "1", -1 * clip.left, -1 * clip.top, false);
        dynamicDiv.className = className;
        this.inBanner.collapsedClassName = className;
    } else {
        dynamicDiv.style.left = -1 * clip.left + "px";
        dynamicDiv.style.top = -1 * clip.top + "px";
    }
    dynamicDiv.style.display = "";
    dynamicDiv.style.width = this.inBanner.flashWidth + "px";
    dynamicDiv.style.height = this.inBanner.flashHeight + "px";
    dynamicDiv.style.clip = "rect(" + clip.top + "px " + clip.right + "px " + clip.bottom + "px " + clip.left + "px)";
    this.inBanner.state = new Object();
    this.inBanner.state.current = "collapsed";
	if (this.tempVars.isExpansionHandle) {
		var zoomDiv = getZoomDivBanner();
		top.document.body.appendChild(zoomDiv);
	}
	function getZoomDivBanner() {
		var zoomDiv = that.windowObj.document.createElement("div");
		zoomDiv.id = "tf_zoomDiv" + that.id;
		zoomDiv.style.zIndex = 2147483647;
		zoomDiv.style.overflow = "hidden";
		zoomDiv.style.clip = "rect(40px 48px 48px 40px)";
		zoomDiv.style.visibility = "visible";
		zoomDiv.style.width = "100px";
		zoomDiv.style.height = "100px";
		zoomDiv.style.position = "fixed";
		zoomDiv.style.left = "-40px";
		zoomDiv.style.top = "-40px";

		var zoomFlash = new Object();
		zoomFlash.flashId = that.inBanner.flashId + "1";
		zoomFlash.flashFile = that.zoomFlashFile;
		zoomFlash.flashVars = "tf_id=" + that.id + "&tf_zoomFunction=tf_IBVAdjustForZoom20";

		that["zoomFlash"] = zoomFlash;

		zoomDiv.innerHTML = that.createFlashObject("zoomFlash", true);
		return zoomDiv;
	}
};

tf_inBannerVideoAd20.prototype.prepareIBVFloating = function () {
    var browser = this.browserProperties.browser;

    var oldIEDiv = this.windowObj.document.getElementById("tf_oldIETag");
    if (oldIEDiv) {
        this.windowObj.tf_oldIE = true;
		oldIEDiv.style.display = "none";
    }
    if (this.windowObj.document.getElementById("dummyIBVFixedDiv" + this.id)) {
        if (this.windowObj.document.getElementById("dummyIBVAbsDiv" + this.id).parentNode != this.windowObj.document.body) {
            this.windowObj.document.body.appendChild(this.windowObj.document.getElementById("dummyIBVAbsDiv" + this.id));
        }
        if (this.windowObj.document.getElementById("dummyIBVFixedDiv" + this.id).offsetTop == 10 || this.windowObj.document.getElementById("dummyIBVFixedDiv" + this.id).offsetTop == 110) {
            this.windowObj.tf_oldIE = false;
        }
        this.windowObj.document.getElementById("dummyIBVFixedDiv" + this.id).style.display = "none";
        this.windowObj.document.getElementById("dummyIBVAbsDiv" + this.id).style.display = "none";
    }
    this.browserProperties.browser.isOldIE = (typeof(this.windowObj.tf_oldIE) != "undefined") ? this.windowObj.tf_oldIE : false;

    var videoDiv = this.windowObj.document.createElement("div");
    videoDiv.id = this.inBanner.videoDivId;
    if (browser.isOpera) {
        videoDiv.style.zIndex = 3575;
    } else if (browser.isSafari) {
        videoDiv.style.zIndex = 16777255;
    } else {
        videoDiv.style.zIndex = 2147483635;
    }

    if (browser.isOldIE) {
        videoDiv.className = this.getNewCss(this.id, "r", "b", false);
        videoDiv.style.width = Math.max(this.windowObj.document.body.offsetWidth, this.windowObj.screen.width) + "px";
        videoDiv.style.height = Math.max(this.windowObj.document.body.offsetHeight, this.windowObj.screen.height) + "px";
    } else {
        if (browser.isFirefox) {
            videoDiv.style.position = "absolute";
            videoDiv.style.left = "0px";
            videoDiv.style.top = "0px";
            var dim = this.IBVFloatingGetDimensions();
            videoDiv.style.width = dim[0] + "px";
            videoDiv.style.height = dim[1] + "px";
            this.tempVars.mozResize = new Function("top.tf_mozResizeFunction20('" + this.id + "')");
            top.addEventListener("resize", this.tempVars.mozResize, false);
        } else {
            videoDiv.style.position = "fixed";
            videoDiv.style.left = "0px";
            videoDiv.style.top = "0px";
            if (browser.isIE7) {
                videoDiv.style.width = Math.max(top.document.body.offsetWidth, top.screen.width) + "px";
                videoDiv.style.height = Math.max(top.document.body.offsetHeight, top.screen.height) + "px";
            } else {
                videoDiv.style.width = "100%";
                videoDiv.style.height = "100%";
            }
        }
    }
    videoDiv.style.backgroundColor = "#000000";
    videoDiv.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
    videoDiv.style.opacity = 0;
    videoDiv.style.MozOpacity = 0;
    videoDiv.style.display = "none";
    this.windowObj.document.body.appendChild(videoDiv);
};

tf_inBannerVideoAd20.prototype.loadScript = function (fileSrc, container) {
    var that = this;
    var scr = this.windowObj.document.createElement("script");
    scr.type = "text/javascript";
    scr.src = fileSrc;

    if (scr.readyState) {  //IE
        scr.onreadystatechange = function () {
            if (scr.readyState == "loaded" || scr.readyState == "complete") {
                scr.onreadystatechange = null;
                that.tempVars.isTweenLoaded = true;
                that.initOpacityTweenLibrary();
            }
        };
    } else { //other browsers
        scr.onload = function () {
            that.tempVars.isTweenLoaded = true;
            that.initOpacityTweenLibrary();
        };
    }
    container.appendChild(scr);
};

tf_inBannerVideoAd20.prototype.processExpand = function () {
    var pos = this.getElementPosition(top.document.getElementById(this.inBanner.staticDivId), top);
    var viewPort = this.getViewPort(top);

    if (this.browserProperties.browser.isVerticalScrollBar) {
        viewPort.width -= 17;
    }
    if (this.browserProperties.browser.isHorizontalScrollBar) {
        viewPort.height -= 17;
    }

    var x = viewPort.left;
    var y = viewPort.top;
    if (pos.left < viewPort.left) {
        x = pos.left;
    } else if (pos.left + this.inBanner.width > viewPort.left + viewPort.width) {
        x = pos.left + this.inBanner.width - viewPort.width;
    }

    if (pos.top < viewPort.top) {
        y = pos.top;
    } else if (pos.top + this.inBanner.height > viewPort.top + viewPort.height) {
        y = pos.top + this.inBanner.height - viewPort.height;
    }

    this.smoothScroll(x, y, viewPort.left, viewPort.top, top.window);
};

tf_inBannerVideoAd20.prototype.finishExpandProcess = function () {
    var staticDiv = top.document.getElementById(this.inBanner.staticDivId);
    var dynamicDiv = top.document.getElementById(this.inBanner.dynamicDivId);
    staticDiv.style.zIndex = 2147483647;
    var clip = this.inBanner.expandedClip;
    dynamicDiv.style.clip = "rect(" + clip.top + "px " + clip.right + "px " + clip.bottom + "px " + clip.left + "px)";
    this.adChoiceHide("tfac_" + this.inBanner.width + this.inBanner.height + this.id);
    var flashObj = this.getFlashObject(this.tempVars.callFromFlashId, top);
    try {
        if (flashObj) {
            flashObj.sendDirectionData(clip.left, clip.top, clip.right, clip.bottom);
        }
    } catch (e) {
    }
    this.inBanner.state.current = "expanded";
};

tf_inBannerVideoAd20.prototype.calculateExpandData = function () {
    var viewPort = this.getViewPort(top);
    var adPosition = this.getElementPosition(top.document.getElementById(this.inBanner.staticDivId), top);
    var widthDiff = this.inBanner.widthExpanded - this.inBanner.width;
    var heightDiff = this.inBanner.heightExpanded - this.inBanner.height;
    var collapsedClip = this.inBanner.collapsedClip;

    if (this.browserProperties.browser.isVerticalScrollBar) {
        viewPort.width -= 17;
    }
    if (this.browserProperties.browser.isHorizontalScrollBar) {
        viewPort.height -= 17;
    }
    var isLeftPossible = viewPort.left < adPosition.left - widthDiff / 2;
    var isRightPossible = viewPort.left + viewPort.width > adPosition.left + this.inBanner.widthExpanded - widthDiff / 2;
    var isTopPossible = viewPort.top < adPosition.top - heightDiff / 2;
    var isBottomPossible = viewPort.top + viewPort.height > adPosition.top + this.inBanner.heightExpanded - heightDiff / 2;

    var pos = this.getElementPosition(top.document.getElementById(this.inBanner.dynamicDivId), top.window, collapsedClip.left - widthDiff / 2, collapsedClip.top - heightDiff / 2);
    if (pos.left <= 0) {
        isRightPossible = true;
        isLeftPossible = false;
    } else if (Number(pos.left) + Number(widthDiff / 2) >= Math.max(top.document.body.scrollWidth, top.document.documentElement.scrollWidth)) {
        isLeftPossible = true;
        isRightPossible = false;
    }

    if (pos.top <= 0) {
        isBottomPossible = true;
        isTopPossible = false;
    } else if (Number(pos.top) + Number(heightDiff / 2) >= Math.max(top.document.body.scrollHeight, top.document.documentElement.scrollHeight)) {
        isTopPossible = true;
        isBottomPossible = false;
    }

    if (isLeftPossible && isRightPossible) {
        var leftCord = adPosition.left - widthDiff / 2;
    } else if (!isLeftPossible && isRightPossible) {
        leftCord = viewPort.left;
    } else if (isLeftPossible && !isRightPossible) {
        leftCord = viewPort.left + viewPort.width - this.inBanner.widthExpanded;
    } else {
        leftCord = adPosition.left - widthDiff / 2;
    }

    if (isTopPossible && isBottomPossible) {
        var topCord = adPosition.top - heightDiff / 2;
    } else if (!isTopPossible && isBottomPossible) {
        topCord = viewPort.top;
    } else if (isTopPossible && !isBottomPossible) {
        topCord = viewPort.top + viewPort.height - this.inBanner.heightExpanded;
    } else {
        topCord = adPosition.top - heightDiff / 2;
    }

    var expandedClip = new Object();
    expandedClip.left = Number(collapsedClip.left + leftCord - adPosition.left);
    expandedClip.top = Number(collapsedClip.top + topCord - adPosition.top);
    expandedClip.right = expandedClip.left + this.inBanner.widthExpanded;
    expandedClip.bottom = expandedClip.top + this.inBanner.heightExpanded;
    this.inBanner.expandedClip = expandedClip;
    this.finishExpandProcess();
};

tf_inBannerVideoAd20.prototype.smoothScroll = function (targetXCoord, targetYCoord, currentXCoord, currentYCoord, window) {
    //parameters
    this.tempVars.stepIncrementY = (targetYCoord == currentYCoord) ? 0 : 10;
    this.tempVars.stepIncrementX = (targetXCoord == currentXCoord) ? 0 : 10;
    this.tempVars.stepDelay = 10;
    this.tempVars.timeLimit = 10000;   //in milli seconds

    //variables
    var runningX = true;
    var runningY = true;
    var down = true;
    var right = true;

    var stepIncrementX = this.tempVars.stepIncrementX;
    var stepIncrementY = this.tempVars.stepIncrementY;
    var browser = this.browserProperties.browser;

    if (currentYCoord >= targetYCoord) {
        stepIncrementY *= (-1);
        down = false;
    } else {
        if (!browser.isIE) {
            targetYCoord += 17;
        }
    }

    if (currentXCoord >= targetXCoord) {
        stepIncrementX *= (-1);
        right = false;
    } else {
        if (!browser.isIE) {
            targetXCoord += 17;
        }
    }

    var that = this;
    this.tempVars.killTimeout = window.setTimeout(killScroll, this.tempVars.timeLimit);
    scrollStep(currentYCoord + stepIncrementY, targetYCoord, down, currentXCoord + stepIncrementX, targetXCoord, right);

    function scrollStep(toY, destY, down, toX, destX, right) {
        if ((down && toY >= (destY - (2 * stepIncrementY))) ||
            (!down && toY <= (destY - (2 * stepIncrementY)))) {
            stepIncrementY *= .55;
        }
        if ((right && toX >= (destX - (2 * stepIncrementX))) ||
            (!right && toX <= (destX - (2 * stepIncrementX)))) {
            stepIncrementX *= .55;
        }

        if ((down && toY >= destY) || (!down && toY <= destY)) {
            runningY = false;
        }
        if ((right && toX >= destX) || (!right && toX <= destX)) {
            runningX = false;
        }

        var stepDelay = that.tempVars.stepDelay;
        if (!runningY && !runningX) {
            killScroll();
        } else if (runningY && !runningX) {
            var viewPort = that.getViewPort(window);
            window.scrollTo(viewPort.left, toY);
            window.setTimeout(function () {
                callNextScroll(toY + stepIncrementY, destY, down, 0, destX, right);
            }, stepDelay);
        } else if (!runningY && runningX) {
            viewPort = that.getViewPort(window);
            window.scrollTo(toX, viewPort.top);
            window.setTimeout(function () {
                callNextScroll(0, destY, down, +toX + stepIncrementX, destX, right);
            }, stepDelay);
        } else {
            window.scrollTo(toX, toY);
            window.setTimeout(function () {
                callNextScroll(toY + stepIncrementY, destY, down, +toX + stepIncrementX, destX, right);
            }, stepDelay);
        }
    }

    function callNextScroll(toY, destY, down, toX, destX, right) {
        scrollStep(toY, destY, down, toX, destX, right);
    }

    function killScroll() {
        window.clearTimeout(that.tempVars.killTimeout);
        runningX = false;
        runningY = false;
        stepIncrementX = 10;
        stepIncrementY = 10;
        that.tempVars.scrollComplete = true;
        var flashObj = that.getFlashObject(that.inBanner.flashId, window);
        try {
            if (flashObj) {
                top.setTimeout(function (obj, flashObj) {
                    return function () {
                        if (obj.systemProperties.OS.isMac && obj.browserProperties.browser.isFirefox) {
                            obj.tempVars.mouseOut = undefined;
                        }
                        flashObj.sendEventData("scrollComplete", obj.tempVars.mouseOut);
                    }
                }(that, flashObj), 100);
            }
        } catch (e) {
        }
    }
};

tf_inBannerVideoAd20.prototype.getViewPort = function (window) {
    var left;
    var topCord;
    var width;
    var height;
    var body = window.document.body;
    var docElem = window.document.documentElement;
    if(typeof(window.pageYOffset) !== "undefined"){
        var scrollTop = window.pageYOffset;
    } else if(typeof(docElem.scrollTop) !== "undefined"){
        scrollTop = docElem.scrollTop;
    } else if(typeof(body.scrollTop) !== "undefined"){
        scrollTop = body.scrollTop;
    }
    if(typeof(window.pageXOffset) !== "undefined"){
        var scrollLeft = window.pageXOffset;
    } else if(typeof(docElem.scrollLeft) !== "undefined"){
        scrollLeft = docElem.scrollLeft;
    } else if(typeof(body.scrollLeft) !== "undefined"){
        scrollLeft = body.scrollLeft;
    }

    topCord = scrollTop;
    left = scrollLeft;
    if (typeof window.innerWidth != 'undefined') {
        width = window.innerWidth;
        height = window.innerHeight;
    } else if (typeof docElem != 'undefined' && typeof docElem.clientWidth != 'undefined' && docElem.clientWidth != 0) {
        width = docElem.clientWidth;
        height = docElem.clientHeight
    } else {
        width = body.clientWidth;
        height = body.clientHeight;
    }

    return {left:left, top:topCord, width:width, height:height};
};

tf_inBannerVideoAd20.prototype.getElementPosition = function (element, window) {
    var offsetX = 0;
    var offsetY = 0;
    if (arguments.length > 2) {
        offsetX = arguments[2];
        offsetY = arguments[3];
    }
    var elementX = 0;
    var elementY = 0;
    var currentObj = element;
    if (currentObj.offsetParent) {
        elementX += currentObj.offsetLeft;
        elementY += currentObj.offsetTop;
        while (currentObj = currentObj.offsetParent) {
            elementX += currentObj.offsetLeft;
            elementY += currentObj.offsetTop;
            if (getPosition(currentObj) == 'relative' || getPosition(currentObj) == 'absolute') {
                var border = getBorder(currentObj);
                elementX += border.height;
                elementY += border.width;
            }
        }
    }
    elementX = (elementX + offsetX < 0) ? 0 : elementX + offsetX;
    elementY = (elementY + offsetY < 0) ? 0 : elementY + offsetY;
    return {"left":elementX, "top":elementY};

    function getPosition(el) {
        var position;
        if (window.document.defaultView) {
            position = window.document.defaultView.getComputedStyle(el, "").getPropertyValue("position");
        }
        else {
            position = el.currentStyle.position;
        }
        return position;
    }

    function getBorder(el) {
        var elementBorder = {left:0, top:0};
        if (window.document.defaultView) {
            var cs = window.document.defaultView.getComputedStyle(el, "");
            elementBorder.width = convertToPX(cs.getPropertyValue("border-left-width"), cs.getPropertyValue("font-size"));
            elementBorder.height = convertToPX(cs.getPropertyValue("border-top-width"), cs.getPropertyValue("font-size"));
        }
        else {
            elementBorder.width = convertToPX(el.currentStyle.borderLeftWidth, el.currentStyle.fontSize);
            elementBorder.height = convertToPX(el.currentStyle.borderTopWidth, el.currentStyle.fontSize);
        }
        return elementBorder;
    }

    function convertToPX(width, fontSize) {
        if (width == "medium")
            return 0;

        if (width.indexOf("in") != -1)
            return 96 * parseInt(width);

        if (width.indexOf("cm") != -1)
            return 37.8 * parseInt(width);

        if (width.indexOf("mm") != -1)
            return 3.78 * parseInt(width);

        if (width.indexOf("pt") != -1)
            return 1.33 * parseInt(width);

        if (width.indexOf("pc") != -1)
            return 16 * parseInt(width);

        if (width.indexOf("em") != -1) {
            if (fontSize == -1)
                return 16 * parseInt(width);
            return convertToPX(fontSize, -1) * parseInt(width);
        }

        if (width.indexOf("ex") != -1) {
            if (fontSize == -1)
                return 0.5 * parseInt(width);
            return convertToPX(fontSize, -1) * parseInt(width);
        }

        if (width.indexOf("%") != -1) {
            if (fontSize == -1)
                return 16 * parseInt(width) / 100;
            return convertToPX(fontSize, -1) * parseInt(width) / 100;
        }

        return parseInt(width);
    }
};

tf_inBannerVideoAd20.prototype.getFlashObject = function (movieName, windowObj) {
    var isIE = this.browserProperties.browser.isIE;
    if (isIE) {
        var temp = windowObj[movieName];
        if (temp == undefined) {
            var frms = windowObj.document.getElementsByTagName("form");
            for (var i = 0; i < frms.length; i++) {
                if (frms[i][movieName] != undefined) {
                    temp = frms[i][movieName];
                    break;
                }
            }
        }
        return temp;
    } else {
        return windowObj.document[movieName];
    }
};

tf_inBannerVideoAd20.prototype.createFlashObject = function (bannerType, isZoomFlash) {
    if (typeof(isZoomFlash) == "undefined") {
        isZoomFlash = false;
    }
    var flashVersion = this.systemProperties.flashVersion;
    var browser = this.browserProperties.browser;
    var isIE = browser.isIE;
    var isWin = browser.isWin;
    var isOpera = browser.isOpera;
    if (!TF_DetectFlashVer(flashVersion.major, flashVersion.minor, flashVersion.revision)) return null;

    var banner = this[bannerType];

    if (!isZoomFlash) {
        return TF_AC_FL_RunContent(
            'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
            'width', (banner.flashWidth) ? banner.flashWidth : banner.width,
            'height', (banner.flashHeight) ? banner.flashHeight : banner.height,
            'src', 'banner',
            'quality', 'high',
            'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
            'align', 'middle',
            'play', 'true',
            'loop', 'true',
            'scale', 'showall',
            'wmode', banner.wmode,
            'devicefont', 'false',
            'id', banner.flashId,
            'bgcolor', banner.bgcolor,
            'name', banner.flashId,
            'menu', 'false',
            'allowFullScreen', 'true',
            'allowScriptAccess', banner.allowScriptAccess,
            'movie', banner.flashFile,
            'salign', banner.salign,
            'flashVars', banner.flashVars
        );
    } else {
        return TF_AC_FL_RunContent(
            'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
            'width', '100',
            'height', '100',
            'src', banner.flashFile,
            'quality', 'high',
            'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
            'play', 'true',
            'loop', 'true',
            'scale', 'noorder',
            'wmode', 'transparent',
            'devicefont', 'false',
            'id', banner.flashId,
            'bgcolor', '#ffffff',
            'name', banner.flashId,
            'menu', 'false',
            'allowFullScreen', false,
            'allowScriptAccess', "always",
            'movie', banner.flashFile,
            'flashVars', banner.flashVars
        );
    }

    function TF_ControlVersion() {
        var version;
        var axo;
        var e;

        // NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

        try {
            // version will be set for 7.X or greater players
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            version = axo.GetVariable("$version");
        } catch (e) {
        }

        if (!version) {
            try {
                // version will be set for 6.X players only
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

                // installed player is some revision of 6.0
                // GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
                // so we have to be careful.

                // default to the first public version
                version = "WIN 6,0,21,0";

                // throws if AllowScripAccess does not exist (introduced in 6.0r47)
                axo.AllowScriptAccess = "always";

                // safe to call for 6.0r47 or greater
                version = axo.GetVariable("$version");

            } catch (e) {
            }
        }

        if (!version) {
            try {
                // version will be set for 4.X or 5.X player
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                version = axo.GetVariable("$version");
            } catch (e) {
            }
        }

        if (!version) {
            try {
                // version will be set for 3.X player
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                version = "WIN 3,0,18,0";
            } catch (e) {
            }
        }

        if (!version) {
            try {
                // version will be set for 2.X player
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                version = "WIN 2,0,0,11";
            } catch (e) {
                version = -1;
            }
        }

        return version;
    }

    // JavaScript helper required to detect Flash Player PlugIn version information
    function TF_GetSwfVer() {
        // NS/Opera version >= 3 check for Flash plugin in plugin array
        var flashVer = -1;

        if (navigator.plugins != null && navigator.plugins.length > 0) {
            if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
                var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
                var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
                var descArray = flashDescription.split(" ");
                var tempArrayMajor = descArray[2].split(".");
                var versionMajor = tempArrayMajor[0];
                var versionMinor = tempArrayMajor[1];
                var versionRevision = descArray[3];
                if (versionRevision == "") {
                    versionRevision = descArray[4];
                }
                if (versionRevision[0] == "d") {
                    versionRevision = versionRevision.substring(1);
                } else if (versionRevision[0] == "r") {
                    versionRevision = versionRevision.substring(1);
                    if (versionRevision.indexOf("d") > 0) {
                        versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
                    }
                }
                var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
            }
        }
        // MSN/WebTV 2.6 supports Flash 4
        else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
        // WebTV 2.5 supports Flash 3
        else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
        // older WebTV supports Flash 2
        else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
        else if (isIE && isWin && !isOpera) {
            flashVer = TF_ControlVersion();
        }
        return flashVer;
    }

    // When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
    function TF_DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) {
        versionStr = TF_GetSwfVer();
        if (versionStr == -1) {
            return false;
        } else if (versionStr != 0) {
            if (isIE && isWin && !isOpera) {
                // Given "WIN 2,0,0,11"
                tempArray = versionStr.split(" ");
                // ["WIN", "2,0,0,11"]
                tempString = tempArray[1];
                // "2,0,0,11"
                versionArray = tempString.split(",");
                // ['2', '0', '0', '11']
            } else {
                versionArray = versionStr.split(".");
            }
            var versionMajor = versionArray[0];
            var versionMinor = versionArray[1];
            var versionRevision = versionArray[2];

            // is the major.revision >= requested major.revision AND the minor version >= requested minor
            if (versionMajor > parseFloat(reqMajorVer)) {
                return true;
            } else if (versionMajor == parseFloat(reqMajorVer)) {
                if (versionMinor > parseFloat(reqMinorVer))
                    return true;
                else if (versionMinor == parseFloat(reqMinorVer)) {
                    if (versionRevision >= parseFloat(reqRevision))
                        return true;
                }
            }
            return false;
        }
    }

    function TF_AC_AddExtension(src, ext) {
        if (src.indexOf('?') != -1)
            return src.replace(/\?/, ext + '?');
        else
            return src + ext;
    }

    function TF_AC_Generateobj(objAttrs, params, embedAttrs) {
        var str = '';
        if (isIE && isWin && !isOpera) {
            str += '<object ';
            for (var i in objAttrs) {
                str += i + '="' + objAttrs[i] + '" ';
            }
            str += '>';
            for (var i in params) {
                str += '<param name="' + i + '" value="' + params[i] + '" /> ';
            }
            str += '</object>';
        }
        else {
            str += '<embed ';
            for (var i in embedAttrs) {
                str += i + '="' + embedAttrs[i] + '" ';
            }
            str += '> </embed>';
        }

        return str;
    }

    function TF_AC_FL_RunContent() {
        var ret =
            TF_AC_GetArgs
                (arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
                    , "application/x-shockwave-flash"
                );
        return TF_AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
    }

    function TF_AC_SW_RunContent() {
        var ret =
            TF_AC_GetArgs
                (arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
                    , null
                );
        return TF_AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
    }

    function TF_AC_GetArgs(args, ext, srcParamName, classid, mimeType) {
        var ret = new Object();
        ret.embedAttrs = new Object();
        ret.params = new Object();
        ret.objAttrs = new Object();
        for (var i = 0; i < args.length; i = i + 2) {
            var currArg = args[i].toLowerCase();

            switch (currArg) {
                case "classid":
                    break;
                case "pluginspage":
                    ret.embedAttrs[args[i]] = args[i + 1];
                    break;
                case "src":
                case "movie":
                    args[i + 1] = TF_AC_AddExtension(args[i + 1], ext);
                    ret.embedAttrs["src"] = args[i + 1];
                    ret.params[srcParamName] = args[i + 1];
                    break;
                case "onafterupdate":
                case "onbeforeupdate":
                case "onblur":
                case "oncellchange":
                case "onclick":
                case "ondblclick":
                case "ondrag":
                case "ondragend":
                case "ondragenter":
                case "ondragleave":
                case "ondragover":
                case "ondrop":
                case "onfinish":
                case "onfocus":
                case "onhelp":
                case "onmousedown":
                case "onmouseup":
                case "onmouseover":
                case "onmousemove":
                case "onmouseout":
                case "onkeypress":
                case "onkeydown":
                case "onkeyup":
                case "onload":
                case "onlosecapture":
                case "onpropertychange":
                case "onreadystatechange":
                case "onrowsdelete":
                case "onrowenter":
                case "onrowexit":
                case "onrowsinserted":
                case "onstart":
                case "onscroll":
                case "onbeforeeditfocus":
                case "onactivate":
                case "onbeforedeactivate":
                case "ondeactivate":
                case "type":
                case "codebase":
                case "id":
                    ret.objAttrs[args[i]] = args[i + 1];
                    break;
                case "width":
                case "height":
                case "align":
                case "vspace":
                case "hspace":
                case "class":
                case "title":
                case "accesskey":
                case "name":
                case "tabindex":
                    ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i + 1];
                    break;
                default:
                    ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i + 1];
            }
        }
        ret.objAttrs["classid"] = classid;
        if (mimeType) ret.embedAttrs["type"] = mimeType;
        return ret;
    }
};

tf_inBannerVideoAd20.prototype.addConfiguration = function (toObj, fromObj) {
    var flag = fromObj.flag;
    toObj.viewPort = toObj.getViewPort(toObj.windowObj);
    toObj[flag].width = (typeof(fromObj.width) != "undefined") ? fromObj.width : null;
    toObj[flag].height = (typeof(fromObj.height) != "undefined") ? fromObj.height : null;
    toObj[flag].widthExpanded = (typeof(fromObj.widthExpanded) != "undefined") ? fromObj.widthExpanded : null;
    toObj[flag].heightExpanded = (typeof(fromObj.heightExpanded) != "undefined") ? fromObj.heightExpanded : null;
    toObj[flag].widthFloating = (typeof(fromObj.widthFloating) != "undefined") ? fromObj.widthFloating : null;
    toObj[flag].heightFloating = (typeof(fromObj.heightFloating) != "undefined") ? fromObj.heightFloating : null;
    toObj[flag].flashFile = (typeof(fromObj.flashFile) != "undefined") ? fromObj.flashFile : null;
    toObj[flag].flashWidth = (typeof(fromObj.widthFloating) != "undefined" && typeof(fromObj.widthExpanded) != "undefined") ? Math.max(2 * toObj[flag].widthExpanded - toObj[flag].width, fromObj.widthFloating) : ((typeof(fromObj.widthExpanded) != "undefined") ? 2 * toObj[flag].widthExpanded - toObj[flag].width : toObj[flag].width);
    toObj[flag].flashHeight = (typeof(fromObj.heightFloating) != "undefined" && typeof(fromObj.heightExpanded) != "undefined") ? Math.max(2 * toObj[flag].heightExpanded - toObj[flag].height, fromObj.heightFloating) : ((typeof(fromObj.heightExpanded) != "undefined") ? 2 * toObj[flag].heightExpanded - toObj[flag].height : toObj[flag].height);
    toObj[flag].extraFlashVars = (typeof(fromObj.extraFlashVars) != "undefined") ? fromObj.extraFlashVars : "";
    toObj[flag].allowScriptAccess = (typeof(fromObj.allowScriptAccess) != "undefined") ? fromObj.allowScriptAccess : "always";
    toObj[flag].salign = (typeof(fromObj.salign) != "undefined") ? fromObj.salign : "lt";
    toObj[flag].bgcolor = (typeof(fromObj.bgcolor) != "undefined") ? fromObj.bgcolor : "#ffffff";
    toObj[flag].wmode = (typeof(fromObj.wmode) != "undefined") ? fromObj.wmode : "transparent";
    this.prepareXmlObj(toObj, fromObj);
};

tf_inBannerVideoAd20.prototype.prepareXmlObj = function (toObj, fromObj) {
    var that = this;
    var tempArr = fromObj.flag.split("");
    tempArr[0] = tempArr[0].toString().toUpperCase().split("")[0];
    var flag = tempArr.join("");
    if (!toObj.customObj) {
        toObj.customObj = new Object();
        toObj.customObj.Ad = new Object();
        toObj.customObj.Ad.model = toObj.adModel;
        toObj.customObj.Ad.type = toObj.adType;
        toObj.customObj.Ad.Root = new Object();
        toObj.customObj.Ad.Root.Banner = new Array();
    }
    var banner = new Object();
    banner.type = flag;
    banner.CookieFlash = {"#text":window.tf_cookieFlash + ".swf"};
    banner.StreamingServer = {"#text":"video.fireflyvideo.com"};
    toObj.customObj.Ad.Root.Banner.push(banner);

    //iFrames
    if(fromObj.flag === "inBanner" && fromObj.iWin){
        var iWins = new Array();
        i = 0;
        while (typeof(fromObj["iWin" + ((i == 0) ? "" : i)]) != "undefined") {
            var iWin = new Object();
            iWin.id = "iWin" + that.id + "_" + i;
            iWin.src = new Object();
            iWin.src["#text"] = fromObj["iWin" + ((i == 0) ? "" : i)];
            iWins.push(iWin);
            i++;
        }
        this.tempVars.iWins = iWins;
    }

    //video events and tracking
    var videoEvents = ["creativeView", "start", "midpoint", "firstQuartile", "thirdQuartile", "complete", "mute", "unmute", "pause", "rewind", "resume", "replay", "fullscreen", "expand", "collapse", "acceptInvitation", "close"];
    var videos = new Array();
    var i = 0;
    while (typeof(fromObj["video" + ((i == 0) ? "" : i)]) != "undefined") {
        var video = new Object();
        video.id = i + 1 + "";
        video.Tracking = new Object();
        videos.push(video);
        this.insertTextNode(video, "LocationUrl", that.getVariableValue(fromObj["video" + ((i == 0) ? "" : i)], that.tempVars.pixelIndex));
        for (var k = 0; k < videoEvents.length; k++) {
            j = 0;
            while (true) {
                var varName = "video" + ((i != 0) ? i : "") + "_" + videoEvents[k] + ((j != 0) ? j : "");
                if (typeof(fromObj[varName]) != "undefined") {
                    var parts = videoEvents[k].split("");
                    parts[0] = parts[0].toString().toUpperCase().split("")[0];
                    var myEvent = parts.join("");
                    this.insertTextNode(video.Tracking, myEvent + ".URL", that.getVariableValue(fromObj[varName], that.tempVars.pixelIndex));
                } else {
                    break;
                }
                j++;
            }
        }
        i++;
    }

    var videosExpand = new Array();
    i = 0;
    while (typeof(fromObj["video" + ((i == 0) ? "" : i) + "_expand"]) != "undefined") {
        var videoExpand = new Object();
        videoExpand.id = i + 1 + "";
        videoExpand.Tracking = new Object();
        videosExpand.push(videoExpand);
        this.insertTextNode(videoExpand, "LocationUrl", that.getVariableValue(fromObj["video" + ((i == 0) ? "" : i)], that.tempVars.pixelIndex));
        for (var k = 0; k < videoEvents.length; k++) {
            j = 0;
            while (true) {
                varName = "video" + ((i != 0) ? i : "") + "_expand" + "_" + videoEvents[k] + ((j != 0) ? j : "");
                if (typeof(fromObj[varName]) != "undefined") {
                    parts = videoEvents[k].split("");
                    parts[0] = parts[0].toString().toUpperCase().split("")[0];
                    myEvent = parts.join("");
                    this.insertTextNode(videoExpand.Tracking, myEvent + ".URL", that.getVariableValue(fromObj[varName], that.tempVars.pixelIndex));
                } else {
                    break;
                }
                j++;
            }
        }
        i++;
    }

    //click tags and tracking
    var clicks = new Array();
    i = 0;
    while (typeof(fromObj["clickTag" + ((i == 0) ? "" : i)]) != "undefined") {
        var click = new Object();
        click.id = i + 1 + "";
        clicks.push(click);
        this.insertTextNode(click, "URL", that.getVariableValue(fromObj["clickTag" + ((i == 0) ? "" : i)], that.tempVars.pixelIndex));
        var j = 0;
        while (true) {
            varName = "clickTag" + ((i == 0) ? "" : i) + "_" + "tracking" + ((j == 0) ? "" : j);
            if (typeof(fromObj[varName]) != "undefined") {
                this.insertTextNode(click, "Track", that.getVariableValue(fromObj[varName], that.tempVars.pixelIndex));
            } else {
                break;
            }
            j++;
        }
        i++;
    }

    //Expanded banner element's impression tracking
    var impTagTracking = new Array();
    i = 0;
    while (true) {
        j = 0;
        if (typeof(fromObj["element_impression" + ((i == 0) ? "" : i) + "_tracking"]) == "undefined") {
            break;
        }
        var impTracker = new Object();
        impTracker.id = i + 1 + "";
        impTagTracking.push(impTracker);
        while (true) {
            varName = "element_impression" + ((i == 0) ? "" : i) + "_tracking" + ((j == 0) ? "" : j);
            if (typeof(fromObj[varName]) != "undefined") {
                this.insertTextNode(impTracker, "Track", that.getVariableValue(fromObj[varName], that.tempVars.pixelIndex));
            } else {
                break;
            }
            j++;
        }
        i++;
    }

    //social networking and tracking
    if (typeof(fromObj["socialNetworks"]) != "undefined") {
        var hosting = new Object();
        hosting.enabled = (that.tempVars.isAdHosting).toString();
        if (that.tempVars.adHosting) {
            that.insertTextNode(hosting, "URL", that.getVariableValue(that.tempVars.adHosting, that.tempVars.pixelIndex));
        }
        hosting.SocialNetworks = new Object();
        var networks = new Array();
        hosting.SocialNetworks.Network = networks;
        for (var i = 0; i < fromObj["socialNetworks"].length; i++) {
            var networkName = fromObj["socialNetworks"][i];
            var network = new Object();
            networks.push(network);
            that.insertTextNode(network, "Name", that.getVariableValue(networkName, that.tempVars.pixelIndex));
            that.insertTextNode(network, "FilePath", that.getVariableValue(fromObj[networkName + "_FilePath"], that.tempVars.pixelIndex) + ".swf");
            for (var fieldName in fromObj[networkName + "_Fields"]) {
                that.insertTextNode(network, "Field", that.getVariableValue(fromObj[networkName + "_Fields"][fieldName], that.tempVars.pixelIndex)).type = fieldName;
            }
            k = 0;
            while (true) {
                varName = networkName + "_tracking" + ((k == 0) ? "" : k);
                if (typeof(fromObj[varName]) == "undefined") {
                    break;
                } else {
                    that.insertTextNode(network, "Track", that.getVariableValue(fromObj[varName], that.tempVars.pixelIndex));
                }
                k++;
            }
        }
        banner.Hosting = hosting;
    }

    //Survey
    var survey = new Object();
    if (typeof(fromObj.isSurveyEnabled) == "undefined") {
        fromObj.isSurveyEnabled = false;
    }
    survey.enabled = fromObj.isSurveyEnabled.toString();

    if (fromObj.isSurveyEnabled == true) {
        if (typeof(fromObj.survey.type) == "undefined") {
            fromObj.survey.type = "TF";
        }
        if (typeof(fromObj.survey.minPlayedForSurvey) == "undefined") {
            fromObj.survey.minPlayedForSurvey = "FirstQuartile";
        }
        if (typeof(fromObj.survey.surveyOnCompletion) == "undefined") {
            fromObj.survey.surveyOnCompletion = true;
        }
        if (typeof(fromObj.survey.buttonYesText) == "undefined") {
            fromObj.survey.buttonYesText = "Yes";
        }
        if (typeof(fromObj.survey.buttonNoText) == "undefined") {
            fromObj.survey.buttonNoText = "No";
        }
        if (typeof(fromObj.survey.buttonSubmitText) == "undefined") {
            fromObj.survey.buttonSubmitText = "Submit";
        }
        survey.type = fromObj.survey.type;
        survey[fromObj.survey.type] = new Object();
        that.insertTextNode(survey, "ButtonText.Yes", fromObj.survey.buttonYesText);
        that.insertTextNode(survey, "ButtonText.No", fromObj.survey.buttonNoText);
        that.insertTextNode(survey, "ButtonText.Submit", fromObj.survey.buttonSubmitText);
        if (typeof(fromObj.survey.isPermissionEnabled) == "undefined") {
            fromObj.survey.isPermissionEnabled = true;
        }
        survey.permissionEnabled = fromObj.survey.isPermissionEnabled.toString();
        if (fromObj.survey.type != "TF" && typeof(fromObj.survey.id) == "undefined") {
            fromObj.survey.id = new Date().getTime();
        }
        if (typeof(fromObj.survey.id) == "undefined") {
            throw fromObj.flag + ".survey.id";
        }
        survey.id = fromObj.survey.id.toString();
        if (typeof(fromObj.survey.peelOff) == "undefined") {
            fromObj.survey.peelOff = true;
        }
        survey.peelOffSurvey = fromObj.survey.peelOff.toString();
        if (fromObj.survey.type == "TF") {
            if (typeof(fromObj.survey.title) == "undefined") {
                throw fromObj.flag + ".survey.title";
            }
            that.insertTextNode(survey, "Title", fromObj.survey.title);
            if (fromObj.survey.isPermissionEnabled == true && fromObj.survey.peelOff == false) {
                if (typeof(fromObj.survey.permissionWinTitle) == "undefined") {
                    throw fromObj.flag + ".permissionWinTitle";
                }
                that.insertTextNode(survey, "PermissionWinTitle", fromObj.survey.permissionWinTitle);
            }
        }
        if (typeof(fromObj.survey.parameter) == "undefined") {
            fromObj.survey.parameter = "@ANSWER@";
        }
        survey.surveyParameter = fromObj.survey.parameter;
        if (typeof(fromObj.survey.filePath) == "undefined") {
            throw fromObj.flag + ".survey.filePath";
        }
        if (typeof(fromObj.survey.filePathOld) == "undefined") {
            throw fromObj.flag + ".survey.filePathOld";
        }
        if (fromObj.survey.peelOff == false) {
            fromObj.survey.filePath = fromObj.survey.filePathOld;
        }
        if (fromObj.survey.type == "TF" || fromObj.survey.peelOff == true) {
            fromObj.survey.filePath = fromObj.survey.filePath + ".swf";
        }
        if (fromObj.survey.type == "VIZU" && fromObj.survey.peelOff == true) {
            if (fromObj.survey.data.SurveyFlash.indexOf("timer=0") == -1) {
                throw "'timer=0' parameter is adbsent from VIZU survey path.";
            }
        }

        if (typeof(fromObj.survey.data) != "undefined") {
            var tempVar = fromObj.survey.data;
            for (var m in tempVar) {
                that.insertTextNode(survey[fromObj.survey.type], m, tempVar[m]);
            }
        }
        that.insertTextNode(survey, "FilePath", fromObj.survey.filePath);
        i = 0;
        while (true) {
            var varname = "permissionPixel";
            varname += ((i != 0) ? i : "");
            if (typeof(fromObj.survey[varname]) != "undefined") {
                that.insertTextNode(survey, "Tracking.Permission.URL", that.getVariableValue(fromObj.survey[varname], that.tempVars.pixelIndex));
            } else {
                break;
            }
            i++;
        }

        i = 0;
        while (true) {
            var varname = "rejectPixel";
            varname += ((i != 0) ? i : "");
            if (typeof(fromObj.survey[varname]) != "undefined") {
                that.insertTextNode(survey, "Tracking.Reject.URL", that.getVariableValue(fromObj.survey[varname], that.tempVars.pixelIndex));
            } else {
                break;
            }
            i++;
        }

        i = 0;
        while (true) {
            var varname = "openPixel";
            varname += ((i != 0) ? i : "");
            if (typeof(fromObj.survey[varname]) != "undefined") {
                that.insertTextNode(survey, "Tracking.Open.URL", that.getVariableValue(fromObj.survey[varname], that.tempVars.pixelIndex));
            } else {
                break;
            }
            i++;
        }

        i = 0;
        while (true) {
            var varname = "closePixel";
            varname += ((i != 0) ? i : "");
            if (typeof(fromObj.survey[varname]) != "undefined") {
                that.insertTextNode(survey, "Tracking.Close.URL", that.getVariableValue(fromObj.survey[varname], that.tempVars.pixelIndex));
            } else {
                break;
            }
            i++;
        }

        if (typeof(fromObj.survey.submitPixel) == "undefined") {
            throw fromObj.flag + ".submitPixel";
        }
        that.insertTextNode(survey, "Tracking.Submit.URL", that.getVariableValue(fromObj.survey.submitPixel, that.tempVars.pixelIndex));
        i = 1;
        while (true) {
            var varname = "submitPixel";
            varname += ((i != 0) ? i : "");
            if (typeof(fromObj.survey[varname]) != "undefined") {
                that.insertTextNode(survey, "Tracking.Submit.URL", that.getVariableValue(fromObj.survey[varname], that.tempVars.pixelIndex));
            } else {
                break;
            }
            i++;
        }

        var questions = new Object();
        if (typeof(fromObj.survey.questionCount) != "undefined") {
            questions.count = fromObj.survey.questionCount.toString();
        }
        survey.Questions = questions;
        i = 0;
        while (true) {
            var varname = "question";
            varname += ((i != 0) ? i : "");
            if (typeof(fromObj.survey[varname]) != "undefined") {
                var question = new Object();
                if (i == 0) {
                    questions.Question = question;
                } else if (i == 1) {
                    questions.Question = [questions.Question, question];
                } else {
                    questions.Question.push(question);
                }
                that.insertTextNode(question, "Text", fromObj.survey[varname]);
                question.Type = fromObj.survey[varname + "Type"];
                question.Id = fromObj.survey[varname + "Id"].toString();
                var j = 0;
                while (true) {
                    var varname2 = varname + "_Answer";
                    varname2 += ((j != 0) ? j : "");
                    if (typeof(fromObj.survey[varname2]) != "undefined") {
                        var tf_answer = that.insertTextNode(question, "Answer", fromObj.survey[varname2]);
                        tf_answer.Id = (fromObj.survey[varname2 + "Id"]).toString();
                    } else {
                        break;
                    }
                    j++;
                }
            } else {
                break;
            }
            i++;
        }
        banner.Survey = survey;
    }

    banner.Common = new Object();
    if (window.tf_commonConfig) {
        this.addCommonConfig(banner.Common, window.tf_commonConfig);
    }

    banner.iWins = new Object();
    banner.iWins.iWin = iWins;
    banner.Video = videos;
    banner.VideoExp = videosExpand;
    banner.ClickTag = clicks;
    banner.ImpressionTag = impTagTracking;
    banner.Custom = fromObj.custom;
    toObj.customXml = objectToXml(toObj.customObj);

    function objectToXml(obj, nodeName) {
        var xml = "";
        if (typeof(obj.tf_ignore) != "undefined" && obj.tf_ignore == 1) {
            return xml;
        }
        var text = null;
        if (typeof(nodeName) != "undefined") {
            xml = "<" + nodeName;
            for (var m in obj) {
                if (typeof(obj[m]) == "string") {
                    if (m == "#text") {
                        text = obj[m];
                        if (text != "") {
                            text = "<![CDATA[" + text + "]]>";
                        }
                    } else {
                        xml += " " + m + "='" + obj[m] + "'";
                    }
                }
            }
            xml += ">";
        } else {
            xml += "<?xml version='1.0' encoding='UTF-8'?>";
        }

        if (text == null) {
            for (var m in obj) {
                if (typeof(obj[m]) == "object") {
                    if (typeof(obj[m].length) == "number") {
                        for (var i = 0; i < obj[m].length; i++) {
                            xml += objectToXml(obj[m][i], m);
                        }
                    } else {
                        xml += objectToXml(obj[m], m);
                    }
                }
            }
        } else {
            xml += text;
        }

        if (typeof(nodeName) != "undefined") {
            xml += "</" + nodeName + ">";
        }
        return xml;
    }
};

tf_inBannerVideoAd20.prototype.insertTextNode = function (obj, property, fromObj) {
    var value = "";
    if (fromObj != null) {
        if (typeof(fromObj) == "string") {
            value = fromObj;
        } else {
            value = fromObj["#text"];
        }
    }
    if (typeof(this.replacementRegEx) != "undefined") {
        value = value.replace(this.replacementRegEx, this.id);
    } else {
        value = value.replace(/\[timestamp\]/g, this.id);
    }
    var parts = property.split(".");
    var tempObj = obj;
    var parent, current;
    for (var i = 0; i < parts.length; i++) {
        current = parts[i];
        if (typeof(tempObj[current]) == "undefined") {
            tempObj[current] = new Object();
        }
        parent = tempObj;
        tempObj = tempObj[current];
    }

    if (typeof(tempObj.length) == "number") {
        var temp = new Object();
        temp["#text"] = value;
        tempObj.push(temp);
        return temp;
    } else if (typeof(tempObj["#text"]) != "undefined") {
        var temp = tempObj;
        tempObj = new Array();
        tempObj.push(temp);
        temp = new Object();
        temp["#text"] = value;
        tempObj.push(temp);
        parent[current] = tempObj;
        return temp;
    }
    tempObj["#text"] = value;
    return tempObj;
};

tf_inBannerVideoAd20.prototype.addCommonConfig = function (toObj, fromObj) {
    var expandTrackPixels = new Object();
    var i = 0;
    while (typeof(fromObj["expandPixel" + ((i == 0) ? "" : i)]) != "undefined") {
        this.insertTextNode(expandTrackPixels, "Track", fromObj["expandPixel" + ((i == 0) ? "" : i)]);
        i++;
    }

    var collapseTrackPixels = new Object();
    i = 0;
    while (typeof(fromObj["collapsePixel" + ((i == 0) ? "" : i)]) != "undefined") {
        this.insertTextNode(collapseTrackPixels, "Track", fromObj["collapsePixel" + ((i == 0) ? "" : i)]);
        i++;
    }

    var engagementPixels = new Object();
    i = 0;
    while (typeof(fromObj["engagementPixel" + ((i == 0) ? "" : i)]) != "undefined") {
        this.insertTextNode(engagementPixels, "Track", fromObj["engagementPixel" + ((i == 0) ? "" : i)]);
        i++;
    }

    var illuminateStartPixels = new Object();
    i = 0;
    while (typeof(fromObj["illuminateStartPixel" + ((i == 0) ? "" : i)]) != "undefined") {
        this.insertTextNode(illuminateStartPixels, "Track", fromObj["illuminateStartPixel" + ((i == 0) ? "" : i)]);
        i++;
    }

    var illuminateEndPixels = new Object();
    i = 0;
    while (typeof(fromObj["illuminateEndPixel" + ((i == 0) ? "" : i)]) != "undefined") {
        this.insertTextNode(illuminateEndPixels, "Track", fromObj["illuminateEndPixel" + ((i == 0) ? "" : i)]);
        i++;
    }

    var mouseInPixels = new Object();
    i = 0;
    while (typeof(fromObj["mouseInPixel" + ((i == 0) ? "" : i)]) != "undefined") {
        this.insertTextNode(mouseInPixels, "Track", fromObj["mouseInPixel" + ((i == 0) ? "" : i)]);
        i++;
    }

    var mouseOutPixels = new Object();
    i = 0;
    while (typeof(fromObj["mouseOutPixel" + ((i == 0) ? "" : i)]) != "undefined") {
        this.insertTextNode(mouseOutPixels, "Track", fromObj["mouseOutPixel" + ((i == 0) ? "" : i)]);
        i++;
    }

    toObj.ExpandPixel = expandTrackPixels;
    toObj.MouseInPixel = mouseInPixels;
    toObj.MouseOutPixel = mouseOutPixels;
    toObj.CollapsePixel = collapseTrackPixels;
    toObj.EngagementPixel = engagementPixels;
    toObj.IlluminateStartPixel = illuminateStartPixels;
    toObj.IlluminateEndPixel = illuminateEndPixels;
};

tf_inBannerVideoAd20.prototype.showIWin = function (htmlId, x, y, w, h, time, t, r, b, l, scrollValue, transparent) {
    if (typeof(htmlId) == "undefined") {
        return;
    }
    var factor = 1;

    if (t == undefined) {
        t = -1;
    }
    if (r == undefined) {
        r = -1;
    }
    if (b == undefined) {
        b = -1;
    }
    if (l == undefined) {
        l = -1;
    }

    if (transparent == undefined) {
        transparent = false;
    }

    if (scrollValue == undefined || scrollValue == null) {
        scrollValue = "";
    } else {
        scrollValue = scrollValue.toLowerCase().split("").sort().join("");
    }

    var frames = this.tempVars.iWins;
    for (var i = 0; i < frames.length; i++) {
        if (frames[i].id == htmlId) {
            frames[i].x = x;
            frames[i].y = y;
            frames[i].w = w;
            frames[i].h = h;
            frames[i].t = t;
            frames[i].r = r;
            frames[i].b = b;
            frames[i].l = l;
            frames[i].scrollValue = scrollValue;
            break;
        }
    }

    this.tempVars[htmlId + "_shown"] = true;

    if (r != -1) {
        r *= factor;
    }
    if (b != -1) {
        b *= factor;
    }
    var d = top.document.getElementById(htmlId);
    var f = top.document.getElementById(htmlId + "_f");
    var d2 = top.document.getElementById(htmlId + "_d");

    if (time > 0) {
        top.setTimeout(function (obj, htmlId, x, y, w, h, time, t, r, b, l, scrollValue, transparent, d, f, d2, factor) {
            return function () {
                obj.setIWinProp(htmlId, x * factor, y * factor, w * factor, h * factor, t, r, b, l, true, scrollValue, transparent, d, f, d2, factor);
            }
        }(this, htmlId, x, y, w, h, time, t, r, b, l, scrollValue, transparent, d, f, d2, factor), time);
    } else {
        this.setIWinProp(htmlId, x * factor, y * factor, w * factor, h * factor, t, r, b, l, true, scrollValue, transparent, d, f, d2, factor);
    }
};

tf_inBannerVideoAd20.prototype.setIWinProp = function (htmlId, x, y, w, h, t, r, b, l, changeVisiblity, scrollValue, transparent, d, f, d2, factor) {
    factor = parseFloat(factor, 10);
    x = Number(x);
    y = Number(y);
    w = Number(w);
    h = Number(h);
    t = Number(t);
    r = Number(r);
    b = Number(b);
    l = Number(l);
    if (transparent != null) {
        if (transparent == true) {
            d.style.backgroundColor = "transparent";
        } else {
            d.style.backgroundColor = "white";
        }
        f.allowTransparency = transparent.toString();
    }

    if (changeVisiblity) {
        if (typeof(this.tempVars.reload) == "undefined") {
            this.tempVars.reload = true;
        }
        if (this.tempVars.reload) {
            var frames = this.tempVars.iWins;
            for (var i = 0; i < frames.length; i++) {
                if (frames[i].id == htmlId) {
                    f.src = frames[i].src["#text"];
                    break;
                }
            }
        }
        this.tempVars[htmlId] = false;
    }

    f.width = (w + ((r != -1) ? r : 0)) / factor + ((l != -1) ? l : 0);
    f.height = (h + ((b != -1) ? b : 0)) / factor + ((t != -1) ? t : 0);
    if (t != -1) {
        f.style.left = (-1 * l) + "px";
        f.style.top = (-1 * t) + "px";
    } else {
        f.style.left = "0px";
        f.style.top = "0px";
    }

    d2.style.width = (w + ((r != -1) ? r : 0)) / factor + "px";
    d2.style.height = (h + ((b != -1) ? b : 0)) / factor + "px";

    d.style.left = x + "px";
    d.style.top = y + "px";
    d.style.width = w + "px";
    d.style.height = h + "px";
    if (changeVisiblity) {
        d.style.visibility = "visible";
    }

    if (scrollValue == "hv" || (factor < 1 && scrollValue != "none")) {
        d.style.overflowX = "scroll";
        d.style.overflowY = "scroll";
    } else if (scrollValue == "h") {
        d.style.overflowX = "scroll";
        d.style.overflowY = "hidden";
    } else if (scrollValue == "v") {
        d.style.overflowX = "hidden";
        d.style.overflowY = "scroll";
    } else {
        d.style.overflowX = "hidden";
        d.style.overflowY = "hidden";
    }
};

tf_inBannerVideoAd20.prototype.hideIWin = function (htmlId, reload) {
    if (typeof(this.tempVars[htmlId + "_shown"]) == "undefined") {
        return;
    }

    var tf_frames = this.tempVars.iWins;
    for (var i = 0; i < tf_frames.length; i++) {
        if (tf_frames[i].id == htmlId) {
            tf_frames[i].x = undefined;
            break;
        }
    }

    if (reload == undefined) {
        reload = false;
    }
    this.tempVars[htmlId] = reload;
    var d = top.document.getElementById(htmlId);
    d.style.visibility = "hidden";
    if (reload) {
        top.setTimeout("var f = document.getElementById('" + htmlId + "_f');f.src = 'about:blank';", 100);
    }
};

tf_inBannerVideoAd20.prototype.getVariableValue = function (variable, index) {
    if (typeof(index) == "undefined") index = 0;
    if (typeof(variable) == "string") {
        return variable;
    }
    return variable[index];
};

tf_inBannerVideoAd20.prototype.firePixel = function (track_object, timeDifference, isLoading) {
    var url = track_object.url;
    var multipleFire = track_object.invoke;
    var video_ord = track_object.video_order;
    var phase = track_object.phase;
    if (typeof(url) == "undefined" || url == "") {
        return;
    }

    if (typeof(timeDifference) == "undefined") {
        if (typeof(this.tempVars.flashLoadedTime) == "undefined") {
            timeDifference = 0;
        } else {
            timeDifference = new Date().getTime() - this.tempVars.flashLoadedTime + this.tempVars.glowExpansionTime;
        }
    }

    if (typeof(isLoading) == "undefined") {
        isLoading = false;
    }

    if(typeof(video_ord) !== "undefined"){
        url = url.replace(/@video_order@/g, video_ord);
    }

    if(typeof(phase) !== "undefined"){
        url = url.replace(/@phase@/g, phase);
    }

    if (typeof(multipleFire) != "undefined" && multipleFire == true) {
        url = url.replace(/@TIMEDIFFERENCE@/g, timeDifference);
        if (typeof(this.browserProperties.browser.isIE7) != "undefined" && this.browserProperties.browser.isIE7) {
            if (top.document.body) {
                var img = top.document.createElement("img");
                img.src = url;
                img.style.width = "1px";
                img.style.height = "1px";
                img.style.display = "none";
                top.document.body.appendChild(img);
            } else if (isLoading) {
                top.document.write("<img src='" + url + "' style='width:1px;height:1px;display:none'>");
            }
        } else {
            img = new Image();
            img.src = url;
        }
        return;
    }

    var hash = 0;
    for (var i = 0; i < url.length; i++) {
        hash = 31 * hash + url.charCodeAt(i);
        while (hash > 2147483647) {
            hash -= 4294967296;
        }

        while (hash < -2147483648) {
            hash += 4294967296;
        }
    }
    hash = "hash" + hash;
    hash = hash.replace("-", "k");

    var cancelFire = false;
    if (typeof(this.tempVars[hash]) == "undefined") {
        this.tempVars[hash] = [url];
    } else {
        for (var i = 0; i < this.tempVars[hash].length; i++) {
            if (this.tempVars[hash][i] == url) {
                cancelFire = true;
                break;
            }
        }
        if (!cancelFire) {
            this.tempVars[hash].push(url);
        }
    }

    if (!cancelFire) {
        url = url.replace(/@TIMEDIFFERENCE@/g, timeDifference);
        if (typeof(this.browserProperties.browser.isIE7) != "undefined" && this.browserProperties.browser.isIE7) {
            if (top.document.body) {
                img = top.document.createElement("img");
                img.src = url;
                img.style.width = "1px";
                img.style.height = "1px";
                img.style.display = "none";
                top.document.body.appendChild(img);
            } else if (isLoading) {
                top.document.write("<img src='" + url + "' style='width:1px;height:1px;display:none'>");
            }
        } else {
            img = new Image();
            img.src = url;
        }
    }
};

// Support for toolbar

function TF_toolbarIBV(id) {
    var that = this;

    tf_inBannerVideoAd20.call(that, id);

    that.toolbarExpObj = window.tf_functionMapForAd;
    window.tf_functionMapForAd = undefined;

    var transitDurationsDefault = {
        initToCollapse:2,
        collapseToGlow:3,
        GlowToCollapse:1,
        glowToIlluminate:1,
        illuminateToGlow:1
    };
    var animDurations = {};
    animDurations.initialStateDuration = typeof(window.tf_initialStateDuration) != "undefined" ? window.tf_initialStateDuration : 5;
    animDurations.slideDuration = typeof(window.tf_slideDuration) != "undefined" ? window.tf_slideDuration : 1;
    animDurations.transitDuration = typeof(window.tf_transitDuration) != "undefined" ? window.tf_transitDuration : transitDurationsDefault;

    for (var key in transitDurationsDefault) {
        if (typeof(animDurations.transitDuration[key]) == "undefined") {
            animDurations.transitDuration[key] = transitDurationsDefault[key];
        }
    }

    that.animDurations = animDurations;
    window.anim = animDurations;
    var extendedFlashVars = objToStr(animDurations);
    for (var i = 0; i < that.bannerFlags.length; i++) {
        var flag = that.bannerFlags[i];
        extendedFlashVars += "&tf_normalWidth=" + that[flag].width;
        extendedFlashVars += "&tf_normalHeight=" + that[flag].height;
        extendedFlashVars += "&tf_preExpandWidth=" + that[flag].widthInit;
        extendedFlashVars += "&tf_preExpandHeight=" + that[flag].heightInit;
        that[flag].flashVars += "&" + extendedFlashVars;
    }

    var functionMaps = {
        "tf_callJS":"tf_callFunctionIBV20",
        "tf_setAdProperties":"setAdContainerProperties",
        "tf_listenFlashEvent":"listenFlashEvents",
        "tf_callToolbar":"passCallsToToolbar",
        "tf_slideTeaser":"toolbarSlideAd",
        "tf_adjustZoomForAd":"adjustBrowserZoom",
        "tf_flashCallback":"flashCallback"
    };

    for (key in functionMaps) {
        that.functionMaps[key] = functionMaps[key];
        for (i = 0; i < that.bannerFlags.length; i++) {
            that[that.bannerFlags[i]].flashVars += "&" + key + "=" + functionMaps[key];
        }
    }
    that.printAd();
    that.callToolbarFunction(that.toolbarExpObj.tf_adCallBack, that.functionMaps);

    function objToStr(obj, prefix) { // recursive
        var str = "";
        if (typeof(prefix) == "undefined") {
            prefix = "";
        }
        for (var key in obj) {
            if (typeof(obj[key]) != "object") {
                str += prefix + key + "=" + obj[key];
            } else {
                str += objToStr(obj[key], key + "_");
            }
            str += "&";
        }
        return str.length > 0 ? str.substr(0, str.length - 1) : str;
    }
}
if (window.tf_adType === "toolbarAd"){
TF_toolbarIBV.prototype = tf_inBannerVideoAd20.prototype;
TF_toolbarIBV.prototype.constructor = TF_toolbarIBV;

TF_toolbarIBV.prototype.resizeWindow = function () {
    var that = this;
    var viewPort = that.getViewPort(that.windowObj);
    if (that.browserProperties.browser.zoomFactor) {
        var factor = that.browserProperties.browser.zoomFactor;
    } else {
        factor = 100;
    }
    factor = 100 / factor;
    for (var i = 0; i < that.bannerFlags.length; i++) {
        var flag = that.bannerFlags[i];
        var dynamicDiv = that.windowObj.document.getElementById(that[flag].dynamicDivId);
        var alignX = that[flag].alignX;
        var alignY = that[flag].alignY;
        var offsetX = that[flag].bannerOffsetX;
        var offsetY = that[flag].bannerOffsetY;
        if(typeof(offsetX) === "undefined"){
            offsetX = 0;
        }
        if(typeof(offsetY) === "undefined"){
            offsetY = 0;
        }

        var clip = that[flag].clip.current;

        if(!clip){
            clip = {top:0,right:0, bottom:0, left:0};
        }

        if (alignX = "r") {
            if(that.currentState === "show" || that.currentState === "slideBack"){
                dynamicDiv.style.left = Number(viewPort.width - (offsetX + clip.right) * factor) + "px";
            } else if((that.currentState === "hide" && flag === "bannerLogo") || (!that.isInitFlag && flag === "inBanner")){
                dynamicDiv.style.left = Number(viewPort.width - (offsetX + clip.right) * factor) + "px";
            } else {
                dynamicDiv.style.left = Number(viewPort.width + that.inBanner.width * factor - (offsetX + clip.right) * factor) + "px";
            }
        }

        if (alignY = "b") {
            if(that.currentState !== "hide" || flag === "inBanner"){
                dynamicDiv.style.top = Number(viewPort.height - (offsetY + clip.bottom) * factor) + "px";
            } else if(flag === "bannerLogo"){
                dynamicDiv.style.top = Number(viewPort.height + that.bannerLogo.height * factor - (offsetY + clip.bottom) * factor) + "px";
            }
        }
        if(that.currentState === "show"){
            dynamicDiv.style.clip = "rect(" + clip.top * factor + "px " + clip.right * factor + "px " + clip.bottom * factor + "px " + clip.left * factor + "px)";
        }
    }
};

TF_toolbarIBV.prototype.flashCallback = function (type, functionName) {
    var that = this;
    var field = type.split("")[0];
    field = field.toLowerCase();
    type = field + type.substring(1);

    if (arguments.length > 2) {
        var arr = Array.prototype.slice.call(arguments);
        arr = arr.slice(2, arr.length);
    }

    var flashObj = that.getFlashObject(that[type].flashId, that.windowObj);
    try {
        if (flashObj) {
            if (arr.length > 1) {
                flashObj[functionName](arr[0], arr.slice(1));
            } else {
                flashObj[functionName](arr[0]);
            }
        }
    } catch (e) {
    }
};

TF_toolbarIBV.prototype.convertToPX = function (width, fontSize) {
    if (width == "medium")
        return 0;

    if (width.indexOf("in") != -1)
        return 96 * parseFloat(width);

    if (width.indexOf("cm") != -1)
        return 37.8 * parseFloat(width);

    if (width.indexOf("mm") != -1)
        return 3.78 * parseFloat(width);

    if (width.indexOf("pt") != -1)
        return 1.33 * parseFloat(width);

    if (width.indexOf("pc") != -1)
        return 16 * parseFloat(width);

    if (width.indexOf("em") != -1) {
        if (fontSize == -1)
            return 16 * parseFloat(width);
        return this.convertToPX(fontSize, -1) * parseFloat(width);
    }

    if (width.indexOf("ex") != -1) {
        if (fontSize == -1)
            return 0.5 * parseFloat(width);
        return this.convertToPX(fontSize, -1) * parseFloat(width);
    }

    if (width.indexOf("%") != -1) {
        if (fontSize == -1)
            return 16 * parseFloat(width) / 100;
        return this.convertToPX(fontSize, -1) * parseFloat(width) / 100;
    }

    return parseFloat(width);
};

TF_toolbarIBV.prototype.passCallsToToolbar = function (type, functionName) {
    if (typeof(functionName) == "undefined") {
        return;
    }
    var arr = Array.prototype.slice.call(arguments);
    arr = [this.toolbarExpObj.tf_callFlashFunction].concat(arr);
    this.callToolbarFunction.apply(this, arr);
};

TF_toolbarIBV.prototype.toolbarSlideAd = function (action, isInit) {
    var that = this;
    that.currentState = action;
    that.isInitFlag = true;

    if (that.browserProperties.browser.zoomFactor) {
        var factor = that.browserProperties.browser.zoomFactor;
    } else {
        factor = 100;
    }
    factor = 100 / factor;
    var dynamicDiv = that.windowObj.document.getElementById(that.inBanner.dynamicDivId);
    var adLogo = that.windowObj.document.getElementById(that.bannerLogo.dynamicDivId);
    var toolbarAdOffsetX = that.inBanner.bannerOffsetX;
    var toolbarAdOffsetY = that.inBanner.bannerOffsetY;
    var logoOffsetX = that.bannerLogo.bannerOffsetX;
    var logoOffsetY = that.bannerLogo.bannerOffsetY;
    var animDuration = that.animDurations.slideDuration;
    var isAnimateTeaser = true;

    if (action == "slide") {
        var initTeaserPropValue = dynamicDiv.offsetLeft;
        var finalTeaserPropValue = Number(dynamicDiv.offsetLeft + (toolbarAdOffsetX + this.inBanner.width) * factor);
        var initLogoPropValue = adLogo.offsetLeft;
        var finalLogoPropValue = adLogo.offsetLeft + logoOffsetX * factor;
        var teaserProp = "left";
        var logoProp = "left";
        var easing = "regularEaseIn";
        that.tempVars.isSlided = true;
    } else if (action == "slideBack") {
        initTeaserPropValue = dynamicDiv.offsetLeft;
        finalTeaserPropValue = Number(dynamicDiv.offsetLeft - (toolbarAdOffsetX + this.inBanner.width) * factor);
        initLogoPropValue = adLogo.offsetLeft;
        finalLogoPropValue = adLogo.offsetLeft - logoOffsetX * factor;
        teaserProp = "left";
        logoProp = "left";
        easing = "regularEaseOut";
        that.tempVars.isSlided = false;
    } else if (action == "hide") {
        initTeaserPropValue = dynamicDiv.offsetLeft;
        finalTeaserPropValue = Number(dynamicDiv.offsetLeft + (toolbarAdOffsetX + this.inBanner.width) * factor);
        initLogoPropValue = adLogo.offsetTop;
        finalLogoPropValue = adLogo.offsetTop + that.bannerLogo.height * factor;
        teaserProp = "left";
        logoProp = "top";
        easing = "regularEaseIn";
        if (that.tempVars.isSlided) {
            isAnimateTeaser = false;
        }
        animDuration = that.toolbarExpObj.tf_panelAnimDuration;
    } else if (action == "show") {
        if (isInit) {
            var flashObj = that.getFlashObject(that.inBanner.flashId, that.windowObj);
            try {
                if (flashObj) {
                    flashObj.showPreExpandBanner();
                }
            } catch (e) {
            }
        } else {
            initTeaserPropValue = dynamicDiv.offsetLeft;
            finalTeaserPropValue = Number(dynamicDiv.offsetLeft - (toolbarAdOffsetX + this.inBanner.width) * factor);
            initLogoPropValue = adLogo.offsetTop;
            finalLogoPropValue = adLogo.offsetTop - that.bannerLogo.height * factor;
            teaserProp = "left";
            logoProp = "top";
            easing = "regularEaseOut";
            if (that.tempVars.isSlided) {
                isAnimateTeaser = false;
            }
            animDuration = that.toolbarExpObj.tf_panelAnimDuration;
        }
    }
    if (!isInit) {
        this.teaserTweenObj = new top.Tween(dynamicDiv.style, teaserProp, top.Tween[easing], initTeaserPropValue, finalTeaserPropValue, animDuration, "px");
        this.logoTweenObj = new top.Tween(adLogo.style, logoProp, top.Tween[easing], initLogoPropValue, finalLogoPropValue, animDuration, "px");
        if (isAnimateTeaser) {
            this.teaserTweenObj.start();
        }
        this.logoTweenObj.start();
    }
};

TF_toolbarIBV.prototype.setAdContainerProperties = function (divId, alignX, alignY, posAttr, toolbarMaxZIndex) {
    var that = this;
    that.currentState = "hide";
    var browser = that.browserProperties.browser;
    if (typeof(that.adContainersReady) === "undefined") {
        that.adContainersReady = 0;
    }
    that.adContainersReady += 1;

    var viewPort = that.getViewPort(that.windowObj);
    var dynamicDiv = that.windowObj.document.getElementById(divId);
    if (that.browserProperties.browser.zoomFactor) {
        var factor = that.browserProperties.browser.zoomFactor;
    } else {
        factor = 100;
    }
    factor = 100 / factor;

    if(!that.panelReloaded){
        that.callToolbarFunction(that.toolbarExpObj.tf_reloadPanel, Number(that.bannerLogo.flashWidth + that.bannerLogo.offsetX[alignX])*factor);
        that.panelReloaded = true;
    }

    for (var i = 0; i < that.bannerFlags.length; i++) {
        var flag = that.bannerFlags[i];
        if (that[flag].dynamicDivId === divId) {
            var clip = that[flag].collapsedClip;
            that[flag].clip.current = that[flag].collapsedClip;
            dynamicDiv.style.width = that[flag].flashWidth * factor + "px";
            dynamicDiv.style.height = that[flag].flashHeight * factor + "px";

            dynamicDiv.style.clip = "rect(" + clip.top*factor + "px " + (clip.left + 1)*factor + "px " + Number(clip.top + 1)*factor + "px " + clip.left*factor + "px)";
            dynamicDiv.style.overflow = "hidden";
            dynamicDiv.style.zIndex = (flag == "inBanner") ? Number(toolbarMaxZIndex) + 4 : Number(toolbarMaxZIndex) + 2;

            var offsetX = that[flag].offsetX[alignX];
            var offsetY = that[flag].offsetY[alignY];

            that[flag].bannerOffsetX = offsetX;
            that[flag].bannerOffsetY = offsetY;

            that[flag].alignX = alignX;
            that[flag].alignY = alignY;

            if (browser.isOldIE && posAttr === "fixed") {
                if (alignX = "r") {
                    offsetX = -1 * (offsetX - (that[flag].flashWidth - clip.right)) * factor;
                } else {     // "l" and "c"
                    offsetX -= clip.left * factor;
                }

                if (alignY = "b") {
                    offsetY = -1 * (offsetY - (that[flag].flashHeight - clip.bottom)) * factor;
                } else {  // "t" and "m"
                    offsetY -= clip.top * factor;
                }

                var className = that.getNewCss(that.id + "_" + flag, alignX, alignY, false, offsetX-1, offsetY-1);
                dynamicDiv.className = className;
                that[flag].collapsedClassName = className;
            } else {
                dynamicDiv.style.position = posAttr;
                if (alignX == "l") {
                    dynamicDiv.style.left = Number(offsetX - clip.left) * factor + "px";
                } else if (alignX = "r") { // define style.left always as it dominates over style.right property
                    dynamicDiv.style.left = Number(viewPort.width - (offsetX + clip.right) * factor) + "px";
                } else {
                    dynamicDiv.style.left = "50%";
                    dynamicDiv.style.marginLeft = -1 * Number(clip.left + parseInt(that[flag].width / 2) - offsetX) * factor + "px";
                }

                if (alignY == "t") {
                    dynamicDiv.style.top = Number(offsetY - clip.top) * factor + "px";
                } else if (alignY = "b") {  // define style.top always as it dominates over style.bottom peoperty
                    dynamicDiv.style.top = Number(viewPort.height - (offsetY + clip.bottom) * factor) + "px";
                } else {
                    dynamicDiv.style.top = "50%";
                    dynamicDiv.style.marginTop = -1 * Number(clip.top + parseInt(that[flag].height / 2) - offsetY) * factor + "px";
                }
            }
        }
    }

    if (!browser.isOldIE) {
        var tf_winResizeFun = new Function("top.tf_callFunctionIBV20('" + that.id + "', 'JS', 'resizeWindow');");
        if (that.windowObj.attachEvent) {
            that.windowObj.attachEvent("onresize", tf_winResizeFun);
        } else {
            that.windowObj.addEventListener("resize", tf_winResizeFun, false);
        }
    }
};

TF_toolbarIBV.prototype.printAd = function () {
    var that = this;

    if (window.frameElement) {
        window.frameElement.style.position =  "absolute";
        window.frameElement.style.top = "-15000px";
        window.frameElement.style.left = "-15000px";
        window.frameElement.style.display = "none";
    }

    if (typeof(that.toolbarExpObj) == "undefined") {
        return;
    }
    for (var i = 0; i < that.bannerFlags.length; i++) {
        var flag = that.bannerFlags[i];
        that[flag].flashHTML = that.createFlashObject(flag);
        if (!that.systemProperties.requiredFlashExists) {
            that.systemProperties.requiredFlashExists = that[flag].flashHTML != null;
        }
        that[flag].dynamicDivId = createAdContainer(that[flag].flashHTML, flag);
    }


    //Removing window.onload dependency
    if(!that.isAdPrinted){
        that.isAdPrinted = true;
        if (!that.isCrossDomain) {
            that.load();
        }
    }


    function createAdContainer(innerHTML) {
        if(that.browserProperties.browser.isIE){
            var adDivId = that.callToolbarFunction(that.toolbarExpObj.tf_createAdContainer, "", flag);
            top.document.getElementById(adDivId).innerHTML = innerHTML;
            return adDivId;
        } else {
            return that.callToolbarFunction(that.toolbarExpObj.tf_createAdContainer, innerHTML, flag);
        }
    }
};

TF_toolbarIBV.prototype.performInitLoad = function () {
    var that = this;
    var dynamicDiv = this.windowObj.document.getElementById(this.inBanner.dynamicDivId);
    if (!that.isCrossDomain) {
        that.prepareIBVFloating();
    } else {
        dynamicDiv.onclick = function () {
            window.open(that.tempVars.clickTag, "_blank");
        }
    }

    that.inBanner.clip = {};
    that.bannerLogo.clip = {};
    that.inBanner.state = {};
    that.inBanner.state.current = "collapsed";
    that.callToolbarFunction(that.toolbarExpObj.tf_initializeAdLoading);
    that.callToolbarFunction(that.toolbarExpObj.tf_initializeZoomAdjust);
};

TF_toolbarIBV.prototype.show = function (isInitToolbar) {
    var that = this;
    if (that.isCrossDomain) return;
    if (that.inBanner.state.current == "expanded") return;

    that.tempVars.mouseOut = false;
    that.inBanner.state.current = "scrolling";

    var root = that.windowObj.document.compatMode == 'BackCompat' ? that.windowObj.document.body : that.windowObj.document.documentElement;
    that.browserProperties.browser.isVerticalScrollbar = root.scrollHeight > root.clientHeight;
    that.browserProperties.browser.isHorizontalScrollbar = root.scrollWidth > root.clientWidth;

    that.calculateExpandData(isInitToolbar);
};

TF_toolbarIBV.prototype.calculateExpandData = function (isInitToolbar) {
    var that = this;

    var factor = 100;
    if (that.browserProperties.browser.zoomFactor) {
        factor = that.browserProperties.browser.zoomFactor;
    }
    factor = 100 / factor;

    if (isInitToolbar) {
        var widthDiff = that.inBanner.widthInit - that.inBanner.width;
        var heightDiff = that.inBanner.heightInit - that.inBanner.height;
    } else {
        widthDiff = that.inBanner.widthExpanded - that.inBanner.width;
        heightDiff = that.inBanner.heightExpanded - that.inBanner.height;
    }
    var collapsedClip = that.inBanner.collapsedClip;
    var expandedClip = new Object();
    expandedClip.left = collapsedClip.left - widthDiff;
    expandedClip.top = collapsedClip.top - heightDiff;
    expandedClip.right = collapsedClip.right;
    expandedClip.bottom = collapsedClip.bottom;
    that.inBanner.expandedClip = expandedClip;

    var dynamicDiv = that.windowObj.document.getElementById(that.inBanner.dynamicDivId);
    if (!isInitToolbar) {
        dynamicDiv.style.clip = "rect(" + expandedClip.top * factor + "px " + expandedClip.right * factor + "px " + expandedClip.bottom * factor + "px " + expandedClip.left * factor + "px)";
        that.inBanner.clip.current = expandedClip;
    }
    var flashObj = that.getFlashObject(that.inBanner.flashId, that.windowObj);
    try {
        if (flashObj) {
            flashObj.sendDirectionData(expandedClip.left, expandedClip.top, expandedClip.right, expandedClip.bottom);
        }
    } catch (e) {
    }
};

TF_toolbarIBV.prototype.hide = function () {
    var that = this;
    if (that.isCrossDomain) return;
    if (that.inBanner.state.current == "collapsed") return;
    var factor = 100;
    if (that.browserProperties.browser.zoomFactor) {
        factor = that.browserProperties.browser.zoomFactor;
    }
    factor = 100 / factor;

    var dynamicDiv = top.document.getElementById(that.inBanner.dynamicDivId);
    var clip = that.inBanner.collapsedClip;
    dynamicDiv.style.clip = "rect(" + clip.top * factor + "px " + clip.right * factor + "px " + clip.bottom * factor + "px " + clip.left * factor + "px)";
    that.inBanner.state.current = "collapsed";
    that.listenFlashEvents("collapseComplete", false);
};

TF_toolbarIBV.prototype.listenFlashEvents = function (event, isInitToolbar, param) {
    var that = this;

    if(param && event === "expansionComplete"){
        if(typeof(this.tempVars.flashLoadedTime) === "undefined"){
            this.tempVars.flashLoadedTime = new Date().getTime();
        }
        this.tempVars.glowExpansionTime = Number(param)*1000;
    }

    var factor = 100;
    if (that.browserProperties.browser.zoomFactor) {
        factor = that.browserProperties.browser.zoomFactor;
    }
    factor = 100 / factor;

    var viewPort = that.getViewPort(that.windowObj);
    var offsetY = that.bannerLogo.offsetY[that.bannerLogo.alignY];
    if(typeof(offsetY) === "undefined"){
        offsetY = 0;
    }

    if (event === "expansionComplete") {
        that.callToolbarFunction(that.toolbarExpObj.tf_hideIWin);
        that.callToolbarFunction(that.toolbarExpObj.tf_toolbarHidePopup);
        that.callToolbarFunction(that.toolbarExpObj.tf_disablePanel);
    } else if (event === "expansionStart") {
        if (isInitToolbar) {
            var dynamicDiv = that.windowObj.document.getElementById(that.inBanner.dynamicDivId);
            var logoDiv = that.windowObj.document.getElementById(that.bannerLogo.dynamicDivId);
            var expandedClip = that.inBanner.expandedClip;
            var clip = that.bannerLogo.collapsedClip;
            dynamicDiv.style.clip = "rect(" + expandedClip.top * factor + "px " + expandedClip.right * factor + "px " + expandedClip.bottom * factor + "px " + expandedClip.left * factor + "px)";
            logoDiv.style.clip = "rect(" + clip.top * factor + "px " + clip.right * factor + "px " + clip.bottom * factor + "px " + clip.left * factor + "px)";
            that.inBanner.clip.current = that.inBanner.expandedClip;
            that.bannerLogo.clip.current = that.bannerLogo.collapsedClip;
            logoDiv.style.top = Number(viewPort.height - (offsetY + clip.bottom) * factor) + "px";
        }
        that.callToolbarFunction(that.toolbarExpObj.tf_hideIWin);
        that.callToolbarFunction(that.toolbarExpObj.tf_toolbarHidePopup);
        that.callToolbarFunction(that.toolbarExpObj.tf_disablePanel);

        var flashObject = that.getFlashObject(that.inBanner.flashId, that.windowObj);
        var flashObject1 = that.getFlashObject(that.bannerLogo.flashId, that.windowObj);

        if(flashObject){
            flashObject.width = parseInt(flashObject.width)+1;
        }
        if(flashObject1){
            flashObject1.width = parseInt(flashObject1.width)+1;
        }

    } else if (event === "collapseComplete") {
        that.callToolbarFunction(that.toolbarExpObj.tf_enablePanel);
    }
};

TF_toolbarIBV.prototype.adjustBrowserZoom = function (factor) {
    window.tf_IBVAdjustForZoom20(this.id, factor);
};

TF_toolbarIBV.prototype.callToolbarFunction = function (functionName) {
    var that = this;
    if (arguments.length < 1) {
    } else if (arguments.length > 1) {
        var arr = Array.prototype.slice.call(arguments);
        arr = [that.id, 'AdJS', functionName].concat(arr.slice(1));
        return that.windowObj[that.toolbarExpObj.tf_callJS].apply(null, arr);
    } else {
        return that.windowObj[that.toolbarExpObj.tf_callJS](that.id, 'AdJS', functionName);
    }
};

TF_toolbarIBV.prototype.startIBVFloating = function () {
    var that = this;

    var dynamicDiv = top.document.getElementById(that.inBanner.dynamicDivId);
    if (typeof(that.tempVars.isFramesRender) == "undefined") {
        that.tempVars.isFramesRender = true;
        var frames = that.tempVars.iWins;
        for (var i = 0; i < frames.length; i++) {
            var f = top.document.createElement("iframe");
            f.width = "1";
            f.height = "1";
            f.scrolling = "no";
            f.frameBorder = "0";
            f.border = "0";
            f.hSpace = "0";
            f.vSpace = "0";
            f.marginHeight = "0";
            f.marginWidth = "0";
            f.src = "about:blank";
            f.id = frames[i].id + "_f";
            f.style.position = "absolute";
            var d = top.document.createElement("div");
            d.id = frames[i].id;
            d.style.position = "absolute";
            d.style.overflow = "hidden";
            d.style.zIndex = 11;
            d.style.width = "1px";
            d.style.height = "1px";
            d.style.visibility = "hidden";
            dynamicDiv.appendChild(d);
            var d2 = top.document.createElement("div");
            d2.id = frames[i].id + "_d";
            d2.style.position = "absolute";
            d2.style.left = "0px";
            d2.style.top = "0px";
            d.appendChild(d2);
            d2.appendChild(f);
        }
    }

    var videoDiv = top.document.getElementById(that.inBanner.videoDivId);
    videoDiv.style.display = "";
    that.tweenObjOpacity = new top.TF_OpacityTween(videoDiv, top.Tween.regularEaseOut, 0, 80, that.inBanner.opacityAnimDuration);
    that.tweenObjOpacity.start();
};

TF_toolbarIBV.prototype.showIBVFloating = function (l, t, r, b) {
    var that = this;
    var factor = 100;
    if (that.browserProperties.browser.zoomFactor) {
        factor = that.browserProperties.browser.zoomFactor;
    }
    factor = 100 / factor;
    var browser = that.browserProperties.browser;
    var dynamicDiv = top.document.getElementById(that.inBanner.dynamicDivId);

    var viewPort = that.getViewPort(top);

    var floatingClip = new Object();
    floatingClip.left = 0;
    floatingClip.top = 0;
    floatingClip.right = that.inBanner.widthFloating;
    floatingClip.bottom = that.inBanner.heightFloating;
    that.inBanner.floatingClip = floatingClip;
    var clip = that.inBanner.expandedClip;

    var leftCord = (viewPort.width - (clip.right + that.inBanner.bannerOffsetX) * factor);
    var topCord = (viewPort.height - (clip.bottom + that.inBanner.bannerOffsetY) * factor);

    var finalLeftCord = parseInt(viewPort.width / 2 - that.inBanner.widthFloating * factor / 2);
    var finalTopCord = parseInt(viewPort.height / 2 - that.inBanner.heightFloating * factor / 2);

    var flashObj = that.getFlashObject(that.inBanner.flashId, top);
    if (browser.isOldIE) {
        that.initFloatingTweenLibrary();
        leftCord = (-1 * clip.left - viewPort.left) * factor;
        topCord = (-1 * clip.top - viewPort.top) * factor;
        finalLeftCord -= position.left;
        finalTopCord -= position.top;
        that.TweenObjFloatX = new top.TF_FloatTween(dynamicDiv, "left", top.Tween.regularEaseOut, leftCord, finalLeftCord * factor, that.inBanner.floatingAnimDuration);
        that.TweenObjFloatY = new top.TF_FloatTween(dynamicDiv, "top", top.Tween.regularEaseOut, topCord, finalTopCord * factor, that.inBanner.floatingAnimDuration);
        that.TweenObjFloatY.otherTweenObject = that.TweenObjFloatX.getObject();
        that.TweenObjFloatX.otherTweenObject = that.TweenObjFloatY.getObject();
        that.TweenObjFloatX.parentObject = that;
        that.TweenObjFloatY.parentObject = that;
        that.inBanner.state.current = "floating";
    } else {
        if (browser.isFirefox) {
            leftCord = dynamicDiv.offsetLeft;
            topCord = dynamicDiv.offsetTop;

            finalLeftCord = parseInt(viewPort.width / 2 - that.inBanner.widthFloating * factor / 2) + (viewPort.left);
            finalTopCord = parseInt(viewPort.height / 2 - that.inBanner.heightFloating * factor / 2) + (viewPort.top);
        }
        that.TweenObjFloatX = new top.Tween(dynamicDiv.style, "left", top.Tween.regularEaseOut, leftCord, finalLeftCord, that.inBanner.floatingAnimDuration, "px");
        that.TweenObjFloatY = new top.Tween(dynamicDiv.style, "top", top.Tween.regularEaseOut, topCord, finalTopCord, that.inBanner.floatingAnimDuration, "px");
        var event = new Object();
        event.onMotionStarted = (function (obj, dynamicDiv, flashObj) {
            return function () {
                if (typeof(top.tf_FEVPubShowCallback) == "function") {
                    top.tf_FEVPubShowCallback();
                }
                try {
                    if (flashObj) {
                        flashObj.startAnimatingFlash(obj.inBanner.floatingAnimDuration);
                    }
                } catch (ex) {
                }
                var clip = obj.inBanner.floatingClip;
                dynamicDiv.style.clip = "rect(" + clip.top * factor + "px " + clip.right * factor + "px " + clip.bottom * factor + "px " + clip.left * factor + "px)";
                obj.inBanner.clip.current = clip;
            }
        }(that, dynamicDiv, flashObj));
        event.onMotionFinished = (function (obj, flashObj) {
            return function () {
                obj.tempVars.isFloatingPositioned = true;

                top.setTimeout(function (o) {
                    return function () {
                        o.finalizeFloatingUnit();
                    }
                }(obj), 200);

                try {
                    if (flashObj) {
                        flashObj.showFloatingContent();
                    }
                } catch (ex) {
                }

                if (obj.browserProperties.browser.isFirefox) {
                    var tf_onScrollFun = new Function("top.tf_callFunctionIBV20('" + obj.id + "', 'JS', 'makeElementFloating');");
                    obj.tempVars.scrollEventListener = tf_onScrollFun;
                    if (top.attachEvent) {
                        top.attachEvent("onscroll", tf_onScrollFun);
                    } else {
                        top.addEventListener("scroll", tf_onScrollFun, false);
                    }
                }
            };
        })(that, flashObj);

        that.TweenObjFloatX.addListener(event);
        if (!that.browserProperties.browser.isFirefox) {
            dynamicDiv.style.position = "fixed";
            dynamicDiv.style.left = leftCord;
            dynamicDiv.style.top = topCord;
            that.inBanner.state.current = "floating";
        } else {
            that.inBanner.state.current = "floatingFF";
        }
    }

    var tf_winResizeFun = new Function("tf_IBVWinResizeFunction20('" + that.id + "')");
    if (top.attachEvent) {
        top.attachEvent("onresize", tf_winResizeFun);
    } else {
        top.addEventListener("resize", tf_winResizeFun, false);
    }
    dynamicDiv.style.clip = "rect(" + t + "px " + r + "px " + b + "px " + l + "px )";

    that.TweenObjFloatX.start();
    that.TweenObjFloatY.start();
};

TF_toolbarIBV.prototype.hideIBVFloating = function () {
    var that = this;

    var flashObj = that.getFlashObject(that.inBanner.flashId, top);
    if (flashObj) {
        flashObj.resetAnimatingFlash(0.1);
    }

    var factor = 100;
    if (that.browserProperties.browser.zoomFactor) {
        factor = that.browserProperties.browser.zoomFactor;
    }
    factor = 100 / factor;

    that.TweenObjFloatX.stop();
    that.TweenObjFloatY.stop();
    var videoDiv = top.document.getElementById(that.inBanner.videoDivId);
    var dynamicDiv = top.document.getElementById(that.inBanner.dynamicDivId);
    var staticDiv = top.document.getElementById(that.inBanner.staticDivId);
    var clip = that.inBanner.expandedClip;
    var browser = that.browserProperties.browser;
    var viewPort = that.getViewPort(top);

    if (browser.isOldIE) {
        dynamicDiv.className = that.inBanner.expandedClassName;
    } else {
        dynamicDiv.style.left = (viewPort.width - (clip.right + that.inBanner.bannerOffsetX) * factor) + "px";
        dynamicDiv.style.top = (viewPort.height - (clip.bottom + that.inBanner.bannerOffsetY) * factor) + "px";
        dynamicDiv.style.position = "fixed";
    }
    dynamicDiv.style.width = that.inBanner.flashWidth * factor + "px";
    dynamicDiv.style.height = that.inBanner.flashHeight* factor + "px";
    dynamicDiv.style.clip = "rect(" + clip.top * factor + "px " + clip.right * factor + "px " + clip.bottom * factor + "px " + clip.left * factor + "px)";
    that.inBanner.clip.current = clip;
    videoDiv.style.display = "none";
    if (browser.isFirefox) {
        if (top.detachEvent) {
            top.detachEvent("onscroll", that.tempVars.scrollEventListener);
        } else {
            top.removeEventListener("scroll", that.tempVars.scrollEventListener, false);
        }
    }

    var frames = that.tempVars.iWins;
    for (var i = 0; i < frames.length; i++) {
        that.hideIWin(frames[i].id, true);
    }

    if (typeof(top.tf_FEVPubHideCallback) == "function") {
        top.tf_FEVPubHideCallback();
    }
};

TF_toolbarIBV.prototype.makeElementFloating = function () {
    var that = this;
    var dynamicDiv = top.document.getElementById(this.inBanner.dynamicDivId);
    var position = that.getElementPosition(dynamicDiv, top);
    var viewPort = that.getViewPort(top);
    var factor = 100;
    if (that.browserProperties.browser.zoomFactor) {
        factor = that.browserProperties.browser.zoomFactor;
    }
    factor = 100 / factor;
    dynamicDiv.style.left = parseInt(viewPort.width / 2 - that.inBanner.widthFloating * factor / 2) + (viewPort.left - position.left) + "px";
    dynamicDiv.style.top = parseInt(viewPort.height / 2 - that.inBanner.heightFloating * factor / 2) + (viewPort.top - position.top) + "px";
};

TF_toolbarIBV.prototype.finalizeFloatingUnit = function () {
    var that = this;
    var browser = that.browserProperties.browser;
    var dynamicDiv = top.document.getElementById(this.inBanner.dynamicDivId, top);
    var position = that.getElementPosition(dynamicDiv, top);
    var viewPort = that.getViewPort(top);
    var factor = 100;
    if (that.browserProperties.browser.zoomFactor) {
        factor = that.browserProperties.browser.zoomFactor;
    }
    factor = 100 / factor;

    var finalLeftCord = parseInt(viewPort.width / 2 - that.inBanner.widthFloating * factor / 2);
    var finalTopCord = parseInt(viewPort.height / 2 - that.inBanner.heightFloating * factor / 2);

    if (browser.isOldIE) {
        finalLeftCord -= position.left;
        finalTopCord -= position.top;
        dynamicDiv.className = that.getNewCss(that.id + "2", "l", "t", false, finalLeftCord-1, finalTopCord-1, "update");
    } else {
        if (browser.isFirefox) {
            finalLeftCord = parseInt(viewPort.width / 2 - that.inBanner.widthFloating * factor / 2) + viewPort.left;
            finalTopCord = parseInt(viewPort.height / 2 - that.inBanner.heightFloating * factor / 2) + viewPort.top;
        }
        dynamicDiv.style.left = finalLeftCord + "px";
        dynamicDiv.style.top = finalTopCord + "px";
    }
};

var tf_superClassMethod = TF_toolbarIBV.prototype.init;
TF_toolbarIBV.prototype.init = (function (tf_superClassMethod) {
    return function (l, t, version) {
        var that = this;
        if(parseInt(version) !== 1 && typeof(l) !== "undefined" && typeof(t) !== "undefined"){
            if (that.windowObj.document.location.protocol == "file:" || that.windowObj.document.location.hostname.toLowerCase().indexOf("tribalfusion") != -1 || that.windowObj.document.location.hostname.toLowerCase().indexOf("fireflyvideo") != -1) {
                alert("Javascript and flash version mismatch.");
            }
            return;
        }
        if (typeof(l) === "undefined") {
            l = 0;
        }
        if (typeof(t) === "undefined") {
            t = 0;
        }
        tf_superClassMethod.call(that, l, t);
    };
}(tf_superClassMethod));

tf_superClassMethod = TF_toolbarIBV.prototype.addConfiguration;
TF_toolbarIBV.prototype.addConfiguration = (function (tf_superClassMethod) {
    return function (toObj, fromObj) {
        var flag = fromObj.flag;
        if (typeof(toObj[flag]) === "undefined") {
            toObj[flag] = {};
            toObj[flag].flashId = "TFIBVLogo" + this.id;
        }
        tf_superClassMethod.call(this, toObj, fromObj);
        toObj[flag].widthInit = (typeof(fromObj.widthInit) != "undefined") ? fromObj.widthInit : null;
        toObj[flag].heightInit = (typeof(fromObj.heightInit) != "undefined") ? fromObj.heightInit : null;

        //default values for offset
        var offsetX = {
            "l":10,
            "r":10,
            "c":0
        };
        var offsetY = {
            "t":10,
            "b":0,
            "m":10
        };

        toObj[flag].offsetX = (typeof(fromObj.offsetX) != "undefined") ? fromObj.offsetX : offsetX;
        toObj[flag].offsetY = (typeof(fromObj.offsetY) != "undefined") ? fromObj.offsetY : offsetY;
    };
}(tf_superClassMethod));

}


//Handling for Expansion issue on Publisher pages

function TF_IBVWrapper(id) {
	tf_inBannerVideoAd20.call(this, id);
	this.floatAdScript = window.tf_floatAdScriptPath;
	this.tempVars.isExpansionHandle = window.tf_isExpansionHandle;
}

if (typeof(tf_isExpansionHandle) != "undefined" && tf_isExpansionHandle === true) {
	TF_IBVWrapper.prototype = tf_inBannerVideoAd20.prototype;
	TF_IBVWrapper.prototype.constructor = TF_IBVWrapper;


    TF_IBVWrapper.prototype.reSizeAdOldIE = function(l, t) {
        var dynamicDiv = this.windowObj.document.getElementById(this.inBanner.dynamicDivId);
        if (this.inBanner.state.current != "floating") {
            dynamicDiv.className = this.getNewCss(this.id + "1", l, t, false, 0, 0, "update");
            if (document.defaultView) {
                var topCord = document.defaultView.getComputedStyle(dynamicDiv, "").getPropertyValue("top");
            }
            else {
                topCord = dynamicDiv.currentStyle.top;
            }
        }
    };

    var tf_superClassMethod = TF_IBVWrapper.prototype.performInitLoad;
    TF_IBVWrapper.prototype.performInitLoad = (function (tf_superClassMethod) {
        return function () {
            if (this.tempVars.initLoad) {
                return;
            }
            var that = this;
            var dynamicDiv = this.windowObj.document.getElementById(this.inBanner.dynamicDivId);
            dynamicDiv.style.visibility = "hidden";
            tf_superClassMethod.call(this);
            this.tempVars.initLoad = true;
            var scr = this.windowObj.document.createElement("script");
            scr.type = "text/javascript";
            scr.src = this.floatAdScript;
            if (window.TF_FloatAd) {
                this.windowObj.TF_FloatAd = window.TF_FloatAd;
            }

            if (scr.readyState) {  //IE
                scr.onreadystatechange = function () {
                    if (scr.readyState == "loaded" || scr.readyState == "complete") {
                        scr.onreadystatechange = null;
                        that.floatAdObj = new window.TF_FloatAd(that.id, that.inBanner.staticDivId, that.inBanner.dynamicDivId, that.windowObj, that.browserProperties.browser);
                        that.floatAdObj.getAdObj = that;
                        that.floatAdObj.init();
                        that.isFloatNeeded = that.floatAdObj.getFloatNeeded();
                        var dynamicDiv = that.windowObj.document.getElementById(that.inBanner.dynamicDivId);
                        dynamicDiv.style.zIndex = 2147483647;
                        dynamicDiv.style.visibility = "visible";
                    }
                };
            } else { //other browsers
                scr.onload = function () {
                    that.floatAdObj = new window.TF_FloatAd(that.id, that.inBanner.staticDivId, that.inBanner.dynamicDivId, that.windowObj, that.browserProperties.browser);
                    that.floatAdObj.getAdObj = that;
                    that.floatAdObj.init();
                    that.isFloatNeeded = that.floatAdObj.getFloatNeeded();
                    var dynamicDiv = that.windowObj.document.getElementById(that.inBanner.dynamicDivId);
                    dynamicDiv.style.zIndex = 2147483647;
                    dynamicDiv.style.visibility = "visible";
                };
            }
            document.body.appendChild(scr);
        };
    }(tf_superClassMethod));

    tf_superClassMethod = TF_IBVWrapper.prototype.hideIBVFloating;
    TF_IBVWrapper.prototype.hideIBVFloating = (function(tf_superClassMethod) {
        return function() {
            if (this.isFloatNeeded) {
                var dynamicDiv = this.windowObj.document.getElementById(this.inBanner.dynamicDivId);
                dynamicDiv.style.display = "none";
                tf_superClassMethod.call(this);
                var pos = this.getElementPosition(this.windowObj.document.getElementById(this.inBanner.staticDivId), this.windowObj);
                var clip = this.inBanner.collapsedClip;
                dynamicDiv.style.left = pos.left - clip.left + "px";
                dynamicDiv.style.top = pos.top - clip.top + "px";
                dynamicDiv.style.display = "";
            } else {
                tf_superClassMethod.call(this);
            }
        }
    }(tf_superClassMethod));
}

try {
	if (typeof(tf_isExpansionHandle) != "undefined" && tf_isExpansionHandle && window.tf_adType !== "toolbarAd" ) {
		if (typeof(window.tf_floatAdScriptPath) == "undefined") {
			throw "tf_floatAdScriptPath";
		}
		if (typeof(window.tf_zoomFlash) == "undefined") {
			throw "tf_zoomFlash";
		}
		window["tf_inBannerVideo" + tf_id] = new TF_IBVWrapper(tf_id);
	}else if (window.tf_adType === "toolbarAd") {
        if (typeof(window.tf_functionMapForAd) === "undefined") {
            throw "toolbar is not loaded properly";
        } else {
            tf_id = window.tf_functionMapForAd.tf_id;
        }
        window["tf_inBannerVideo" + tf_id] = new TF_toolbarIBV(tf_id);
    } else {
        window["tf_inBannerVideo" + tf_id] = new tf_inBannerVideoAd20(tf_id);
    }
} catch (tf_exception) {
    if (document.location.protocol == "file:" || document.location.hostname.toLowerCase().indexOf("tribalfusion") != -1) {
        if (typeof(tf_exception) == "string") {
            if (tf_exception.indexOf(" ") == -1) {
                alert(tf_exception + " variable not defined.");
            } else {
                alert(tf_exception);
            }
        } else {
            alert(tf_exception.message);
        }
    }
}

//Finally
window.tf_adModel = undefined;
window.tf_adType = undefined;
window.tf_commonLocation = undefined;
window.tf_cookieFlash = undefined;
window.tf_zoomFlash = undefined;
window.tf_commonConfig = undefined;
window.tf_replacementRegEx = undefined;
window.tf_animDurationOpacity = undefined;
window.tf_animDurationFloating = undefined;

//undef toolbar specific variables
window.tf_initialStateDuration = undefined;
window.tf_slideDuration = undefined;
window.tf_transitionDuration = undefined;
window.tf_animDurationFloating = undefined;
window.tf_isExpansionHandle = undefined;