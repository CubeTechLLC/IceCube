(function() {
	function TF_FloatAd(id, InPageStaticDivId, InPageDynamicDivId, windowObj, browser) {
		if (typeof(id) == "undefined") {
			return;
		}

		this.adId = id;
		this.InPageDynamicDivId = InPageDynamicDivId;
		this.InPageStaticDivId = InPageStaticDivId;
		this.windowObj = windowObj;
		this.browser = browser;
	}

	TF_FloatAd.prototype = {
		init : function() {
			this.isFloatNeeded = this.isFloatNeeded(this.windowObj.document.getElementById(this.InPageStaticDivId));
			if (this.isFloatNeeded) {
				this.makeAdFloating();
			}
		},

		getFloatNeeded : function() {
			return this.isFloatNeeded;
		},

		isFloatNeeded : function(element) {
			if (typeof(element) == "undefined") {
				return;
			}
			var isFloatNeeded = false;
			while (element.parentNode) {
				if (element.tagName.toString().toLowerCase() === "body") {
					break;
				}
				element = element.parentNode;
				var overflow = this.getCssProperty(element, "overflow");
				if (overflow == undefined || overflow == "" || overflow == null || typeof(overflow) == "undefined") {
					overflow = this.getCssProperty(element, "overflowX");
					if (overflow == undefined || overflow == "" || overflow == null || typeof(overflow) == "undefined") {
						overflow = this.getCssProperty(element, "overflowY");
					}
				}
				if (overflow == "hidden" || overflow == "scroll" || overflow == "auto") {
					isFloatNeeded = true;
					break;
				} else {
					var position = this.getCssProperty(element, "position");
					if (position != undefined && position != "" && position != null && typeof(position) != "undefined" && position == "relative") {
						isFloatNeeded = true;
						break;
					}
				}
			}
			return isFloatNeeded;
		},

		getCssProperty : function(el, prop) {
			if (typeof(el) == "undefined" || typeof(prop) == "undefined") {
				return;
			}
			var value;
			var cssStyle;
			if (this.windowObj.document.defaultView) {
				try {
					cssStyle = this.windowObj.document.defaultView.getComputedStyle(el, "");
				} catch (e) {
				}
				if (cssStyle) {
					value = cssStyle.getPropertyValue(prop);
				}
			} else {
				value = el.currentStyle[prop];
			}
			return value;
		},

		makeAdFloating: function() {
			var adDiv = this.windowObj.document.getElementById(this.InPageDynamicDivId);
			this.position = this.getElementPosition(adDiv);
			var clonedAdDiv = adDiv.cloneNode(true);
			adDiv.id = this.InPageDynamicDivId + "_old";
			adDiv.style.visibility = "hidden";
			adDiv.innerHTML = "";
			adDiv = clonedAdDiv;
			this.windowObj.document.body.appendChild(adDiv);
			this.reSizeAd();

			var tf_winResizeFun = (function(obj) {
				return function () {
					obj.reSizeAd();
				}
			}(this));
			if (this.windowObj.attachEvent) {
				this.windowObj.attachEvent("onresize", tf_winResizeFun);
			} else {
				this.windowObj.addEventListener("resize", tf_winResizeFun, false);
			}
		},

		reSizeAd : function() {
			var adDiv = this.windowObj.document.getElementById(this.InPageDynamicDivId);
			this.position = this.getElementPosition(this.windowObj.document.getElementById(this.InPageDynamicDivId + "_old"));
			var l = Number(this.position.left - this.windowObj.document.body.offsetLeft);
			var t = Number(this.position.top - this.windowObj.document.body.offsetTop);
			if (!this.browser.isOldIE) {
				adDiv.style.left = l + "px";
				adDiv.style.top = t + "px";
			} else {
				this.getAdObj.reSizeAdOldIE(l, t);
			}
		},

		getElementPosition : function(element) {
			var that = this;
			var currentObj = element;
			var elementX = 0;
			var elementY = 0;
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
			return {"left": elementX, "top": elementY};

			function getPosition(el) {
				var position;
				if (that.windowObj.document.defaultView) {
					position = that.windowObj.document.defaultView.getComputedStyle(el, "").getPropertyValue("position");
				}
				else {
					position = el.currentStyle.position;
				}
				return position;
			}

			function getBorder(el) {
				var elementBorder = {left: 0, top: 0};
				if (that.windowObj.document.defaultView) {
					var cs = that.windowObj.document.defaultView.getComputedStyle(el, "");
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
		}
	};
	window.TF_FloatAd = TF_FloatAd;
}());