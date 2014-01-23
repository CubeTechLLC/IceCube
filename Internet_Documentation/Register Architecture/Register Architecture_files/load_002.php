mw.loader.implement("ext.centralNotice.bannerController",function(){(function($,mw){var rPlus=/\+/g;function decode(s){try{return decodeURIComponent(s.replace(rPlus,' '));}catch(e){return'';}}mw.centralNotice={data:{getVars:{},bannerType:'default',bucket:null,testing:false},bannerData:{},events:{},alreadyRan:false,deferredObjs:{},loadBanner:function(){if(mw.centralNotice.data.getVars.banner){mw.centralNotice.loadTestingBanner(mw.centralNotice.data.getVars.banner,'none','testing');}else{mw.centralNotice.loadRandomBanner();}},loadTestingBanner:function(bannerName,campaign){var bannerPageQuery;mw.centralNotice.data.testing=true;bannerPageQuery={title:'Special:BannerLoader',banner:bannerName,campaign:campaign,uselang:mw.config.get('wgUserLanguage'),db:mw.config.get('wgDBname'),project:mw.config.get('wgNoticeProject'),country:mw.centralNotice.data.country,device:mw.centralNotice.data.device};$.ajax({url:mw.config.get('wgCentralPagePath')+'?'+$.param(bannerPageQuery),dataType:'script',cache:
true});},loadRandomBanner:function(){var RAND_MAX=30;var bannerDispatchQuery={uselang:mw.config.get('wgUserLanguage'),sitename:mw.config.get('wgSiteName'),project:mw.config.get('wgNoticeProject'),anonymous:mw.config.get('wgUserName')===null,bucket:mw.centralNotice.data.bucket,country:mw.centralNotice.data.country,device:mw.centralNotice.data.device,slot:Math.floor(Math.random()*RAND_MAX)+1};var scriptUrl=mw.config.get('wgCentralBannerDispatcher')+'?'+$.param(bannerDispatchQuery);$.ajax({url:scriptUrl,dataType:'script',cache:true});},insertBanner:function(bannerJson){window.insertBanner(bannerJson);},toggleNotice:function(){window.toggleNotice();},hideBanner:function(){window.hideBanner();},recordImpression:function(data){var url=mw.config.get('wgCentralBannerRecorder')+'?'+$.param(data);(new Image()).src=url;},loadQueryStringVariables:function(){document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g,function(str,p1,p2){mw.centralNotice.data.getVars[decode(p1)]=decode(p2);});},
waitForCountry:function(){if(Geo.country){mw.centralNotice.data.country=Geo.country;mw.centralNotice.loadBanner();}else{mw.centralNotice.data.waitCycle++;if(mw.centralNotice.data.waitCycle<10){window.setTimeout(mw.centralNotice.waitForCountry,100);}else{mw.centralNotice.data.country='XX';mw.centralNotice.loadBanner();}}},getBucket:function(){var dataString=$.cookie('centralnotice_bucket')||'',bucket=dataString.split('-')[0],validity=dataString.split('-')[1],expValidity=mw.config.get('wgNoticeNumberOfBuckets')+'.'+mw.config.get('wgNoticeNumberOfControllerBuckets');if((bucket===null)||(validity!==expValidity)){bucket=Math.floor(Math.random()*mw.config.get('wgNoticeNumberOfControllerBuckets'));$.cookie('centralnotice_bucket',bucket+'-'+expValidity,{expires:mw.config.get('wgNoticeBucketExpiry'),path:'/'});}return bucket;},initialize:function(){if(mw.centralNotice.alreadyRan){return;}mw.centralNotice.alreadyRan=true;mw.centralNotice.loadQueryStringVariables();mw.centralNotice.data.bucket=mw
.centralNotice.getBucket();mw.centralNotice.data.country=mw.centralNotice.data.getVars.country||Geo.country||'XX';mw.centralNotice.isPreviewFrame=(mw.config.get('wgCanonicalSpecialPageName')==='BannerPreview');mw.centralNotice.data.device=mw.centralNotice.data.getVars.device||mw.config.get('wgMobileDeviceName','desktop');if(mw.config.get('wgNamespaceNumber')==-1&&!mw.centralNotice.isPreviewFrame){return;}mw.centralNotice.deferredObjs.bannerLoaded=$.Deferred();mw.centralNotice.events.bannerLoaded=mw.centralNotice.deferredObjs.bannerLoaded.promise();$('#siteNotice').prepend('<div id="centralNotice"></div>');if(mw.centralNotice.data.country==='XX'){$('body').append('<script src="//geoiplookup.wikimedia.org/"></script>');mw.centralNotice.data.waitCycle=0;mw.centralNotice.waitForCountry();}else{mw.centralNotice.loadBanner();}}};window.insertBanner=function(bannerJson){var url,targets,data;var impressionData={country:mw.centralNotice.data.country,uselang:mw.config.get('wgUserLanguage'),
project:mw.config.get('wgNoticeProject'),db:mw.config.get('wgDBname'),bucket:mw.centralNotice.data.bucket,anonymous:mw.config.get('wgUserName')===null,device:mw.centralNotice.data.device};var impressionResultData=null;if(!bannerJson){impressionResultData={result:'hide',reason:'empty'};}else{mw.centralNotice.data.bannerType=(bannerJson.fundraising?'fundraising':'default');if(typeof mw.centralNotice.bannerData.preload==='function'&&!mw.centralNotice.bannerData.preload()){impressionResultData={result:'hide',reason:'preload'}}else if($.cookie('stopMobileRedirect')==='true'){impressionResultData={result:'hide',reason:'mobile'}}else if($.cookie('centralnotice_'+encodeURIComponent(mw.centralNotice.data.bannerType))==='hide'&&!mw.centralNotice.data.testing){impressionResultData={result:'hide',reason:'cookie'}}else{mw.centralNotice.bannerData.bannerName=bannerJson.bannerName;$('div#centralNotice').attr('class',mw.html.escape('cn-'+mw.centralNotice.data.bannerType)).prepend(bannerJson.bannerHtml
);if(bannerJson.autolink){url=mw.config.get('wgNoticeFundraisingUrl');if((bannerJson.landingPages!==null)&&bannerJson.landingPages.length){targets=String(bannerJson.landingPages).split(',');if($.inArray(mw.centralNotice.data.country,mw.config.get('wgNoticeXXCountries'))!==-1){mw.centralNotice.data.country='XX';}url+="?"+$.param({landing_page:targets[Math.floor(Math.random()*targets.length)].replace(/^\s+|\s+$/,''),utm_medium:'sitenotice',utm_campaign:bannerJson.campaign,utm_source:bannerJson.bannerName,language:mw.config.get('wgUserLanguage'),country:mw.centralNotice.data.country});$('#cn-landingpage-link').attr('href',url);}}var bannerShown=true;if(typeof mw.centralNotice.bannerData.alterImpressionData==='function'){bannerShown=mw.centralNotice.bannerData.alterImpressionData(impressionData);}if(bannerShown){impressionResultData={banner:bannerJson.bannerName,campaign:bannerJson.campaign,result:'show'};}else{impressionResultData={result:'hide'};}}}impressionResultData=$.extend(
impressionResultData,impressionData);if(!mw.centralNotice.data.testing){mw.centralNotice.recordImpression(impressionResultData);}mw.centralNotice.deferredObjs.bannerLoaded.resolve(impressionResultData);};window.hideBanner=function(){$('#centralNotice').hide();var bannerType=mw.centralNotice.data.bannerType||'default';var d=new Date();d.setSeconds(d.getSeconds()+mw.config.get('wgNoticeCookieShortExpiry'));$.cookie('centralnotice_'+encodeURIComponent(bannerType),'hide',{expires:d,path:'/'});};window.toggleNotice=function(){window.hideBanner();};$(function(){mw.centralNotice.initialize();});})(jQuery,mediaWiki);;},{},{});mw.loader.implement("jquery.client",function(){(function($){var profileCache={};$.client={profile:function(nav){if(nav===undefined){nav=window.navigator;}if(profileCache[nav.userAgent]===undefined){var versionNumber,uk='unknown',x='x',wildUserAgents=['Opera','Navigator','Minefield','KHTML','Chrome','PLAYSTATION 3','Iceweasel'],userAgentTranslations=[[
/(Firefox|MSIE|KHTML,?\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape'],['PLAYSTATION 3','PS3']],versionPrefixes=['camino','chrome','firefox','iceweasel','netscape','netscape6','opera','version','konqueror','lynx','msie','safari','ps3','android'],versionSuffix='(\\/|\\;?\\s|)([a-z0-9\\.\\+]*?)(\\;|dev|rel|\\)|\\s|$)',names=['camino','chrome','firefox','iceweasel','netscape','konqueror','lynx','msie','opera','safari','ipod','iphone','blackberry','ps3','rekonq','android'],nameTranslations=[],layouts=['gecko','konqueror','msie','opera','webkit'],layoutTranslations=[['konqueror','khtml'],['msie','trident'],['opera','presto']],layoutVersions=['applewebkit','gecko'],platforms=['win','mac','linux','sunos','solaris','iphone'],platformTranslations=[['sunos','solaris']],translate=function(source,translations){var i;for(i=0;i<translations.length;i++){source=source.replace(translations[i][0],translations[i][1]);}return source
;},ua=nav.userAgent,match,name=uk,layout=uk,layoutversion=uk,platform=uk,version=x;if(match=new RegExp('('+wildUserAgents.join('|')+')').exec(ua)){ua=translate(ua,userAgentTranslations);}ua=ua.toLowerCase();if(match=new RegExp('('+names.join('|')+')').exec(ua)){name=translate(match[1],nameTranslations);}if(match=new RegExp('('+layouts.join('|')+')').exec(ua)){layout=translate(match[1],layoutTranslations);}if(match=new RegExp('('+layoutVersions.join('|')+')\\\/(\\d+)').exec(ua)){layoutversion=parseInt(match[2],10);}if(match=new RegExp('('+platforms.join('|')+')').exec(nav.platform.toLowerCase())){platform=translate(match[1],platformTranslations);}if(match=new RegExp('('+versionPrefixes.join('|')+')'+versionSuffix).exec(ua)){version=match[3];}if(name.match(/safari/)&&version>400){version='2.0';}if(name==='opera'&&version>=9.8){match=ua.match(/version\/([0-9\.]*)/i);if(match&&match[1]){version=match[1];}else{version='10';}}versionNumber=parseFloat(version,10)||0.0;profileCache[nav.
userAgent]={name:name,layout:layout,layoutVersion:layoutversion,platform:platform,version:version,versionBase:(version!==x?Math.floor(versionNumber).toString():x),versionNumber:versionNumber};}return profileCache[nav.userAgent];},test:function(map,profile,exactMatchOnly){var conditions,dir,i,op,val;profile=$.isPlainObject(profile)?profile:$.client.profile();if(map.ltr&&map.rtl){dir=$('body').is('.rtl')?'rtl':'ltr';map=map[dir];}if(typeof map!=='object'||map[profile.name]===undefined){return!exactMatchOnly;}conditions=map[profile.name];if(conditions===false){return false;}if(conditions===null){return true;}for(i=0;i<conditions.length;i++){op=conditions[i][0];val=conditions[i][1];if(typeof val==='string'){if(!(eval('profile.version'+op+'"'+val+'"'))){return false;}}else if(typeof val==='number'){if(!(eval('profile.versionNumber'+op+val))){return false;}}}return true;}};}(jQuery));;},{},{});mw.loader.implement("jquery.cookie",function(){(function($){$.cookie=function(key,value,options){if
(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(value))||value===null||value===undefined)){options=$.extend({},options);if(value===null||value===undefined){options.expires=-1;}if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}value=String(value);return(document.cookie=[encodeURIComponent(key),'=',options.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}options=value||{};var decode=options.raw?function(s){return s;}:decodeURIComponent;var pairs=document.cookie.split('; ');for(var i=0,pair;pair=pairs[i]&&pairs[i].split('=');i++){if(decode(pair[0])===key)return decode(pair[1]||'');}return null;};})(jQuery);;},{},{});mw.loader.implement("jquery.delayedBind",function(){(function($){function encodeEvent(event){return event.replace(
/-/g,'--').replace(/ /g,'-');}$.fn.extend({delayedBind:function(timeout,event,data,callback){if(arguments.length===3){callback=data;data=undefined;}var encEvent=encodeEvent(event);return this.each(function(){var that=this;if(!($(this).data('_delayedBindBound-'+encEvent+'-'+timeout))){$(this).data('_delayedBindBound-'+encEvent+'-'+timeout,true);$(this).bind(event,function(){var timerID=$(this).data('_delayedBindTimerID-'+encEvent+'-'+timeout);if(timerID!==null){clearTimeout(timerID);}timerID=setTimeout(function(){$(that).trigger('_delayedBind-'+encEvent+'-'+timeout);},timeout);$(this).data('_delayedBindTimerID-'+encEvent+'-'+timeout,timerID);});}$(this).bind('_delayedBind-'+encEvent+'-'+timeout,data,callback);});},delayedBindCancel:function(timeout,event){var encEvent=encodeEvent(event);return this.each(function(){var timerID=$(this).data('_delayedBindTimerID-'+encEvent+'-'+timeout);if(timerID!==null){clearTimeout(timerID);}});},delayedBindUnbind:function(timeout,event,callback){var
encEvent=encodeEvent(event);return this.each(function(){$(this).unbind('_delayedBind-'+encEvent+'-'+timeout,callback);});}});}(jQuery));;},{},{});mw.loader.implement("jquery.mwExtension",function(){(function($){$.extend({trimLeft:function(str){return str===null?'':str.toString().replace(/^\s+/,'');},trimRight:function(str){return str===null?'':str.toString().replace(/\s+$/,'');},ucFirst:function(str){return str.charAt(0).toUpperCase()+str.substr(1);},escapeRE:function(str){return str.replace(/([\\{}()|.?*+\-\^$\[\]])/g,'\\$1');},isDomElement:function(el){return!!el&&!!el.nodeType;},isEmpty:function(v){var key;if(v===''||v===0||v==='0'||v===null||v===false||v===undefined){return true;}if(v.length===0){return true;}if(typeof v==='object'){for(key in v){return false;}return true;}return false;},compareArray:function(arrThis,arrAgainst){if(arrThis.length!==arrAgainst.length){return false;}for(var i=0;i<arrThis.length;i++){if($.isArray(arrThis[i])){if(!$.compareArray(arrThis[i],arrAgainst[i
])){return false;}}else if(arrThis[i]!==arrAgainst[i]){return false;}}return true;},compareObject:function(objectA,objectB){var prop,type;if(typeof objectA===typeof objectB){if(typeof objectA==='object'){if(objectA===objectB){return true;}else{for(prop in objectA){if(prop in objectB){type=typeof objectA[prop];if(type===typeof objectB[prop]){switch(type){case'object':if(!$.compareObject(objectA[prop],objectB[prop])){return false;}break;case'function':if(objectA[prop].toString()!==objectB[prop].toString()){return false;}break;default:if(objectA[prop]!==objectB[prop]){return false;}break;}}else{return false;}}else{return false;}}for(prop in objectB){if(!(prop in objectA)){return false;}}}}}else{return false;}return true;}});}(jQuery));;},{},{});mw.loader.implement("mediawiki.legacy.ajax",function(){(function(mw){function debug(text){if(!window.sajax_debug_mode){return false;}var e=document.getElementById('sajax_debug');if(!e){e=document.createElement('p');e.className='sajax_debug';e.id=
'sajax_debug';var b=document.getElementsByTagName('body')[0];if(b.firstChild){b.insertBefore(e,b.firstChild);}else{b.appendChild(e);}}var m=document.createElement('div');m.appendChild(document.createTextNode(text));e.appendChild(m);return true;}function createXhr(){debug('sajax_init_object() called..');var a;try{a=new XMLHttpRequest();}catch(xhrE){try{a=new window.ActiveXObject('Msxml2.XMLHTTP');}catch(msXmlE){try{a=new window.ActiveXObject('Microsoft.XMLHTTP');}catch(msXhrE){a=null;}}}if(!a){debug('Could not create connection object.');}return a;}function doAjaxRequest(func_name,args,target){var i,x;var uri;var post_data;uri=mw.util.wikiScript()+'?action=ajax';if(window.sajax_request_type==='GET'){if(uri.indexOf('?')===-1){uri=uri+'?rs='+encodeURIComponent(func_name);}else{uri=uri+'&rs='+encodeURIComponent(func_name);}for(i=0;i<args.length;i++){uri=uri+'&rsargs[]='+encodeURIComponent(args[i]);}post_data=null;}else{post_data='rs='+encodeURIComponent(func_name);for(i=0;i<args.length;i++
){post_data=post_data+'&rsargs[]='+encodeURIComponent(args[i]);}}x=createXhr();if(!x){alert('AJAX not supported');return false;}try{x.open(window.sajax_request_type,uri,true);}catch(e){if(location.hostname==='localhost'){alert('Your browser blocks XMLHttpRequest to "localhost", try using a real hostname for development/testing.');}throw e;}if(window.sajax_request_type==='POST'){x.setRequestHeader('Method','POST '+uri+' HTTP/1.1');x.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}x.setRequestHeader('Pragma','cache=yes');x.setRequestHeader('Cache-Control','no-transform');x.onreadystatechange=function(){if(x.readyState!==4){return;}debug('received ('+x.status+' '+x.statusText+') '+x.responseText);if(typeof target==='function'){target(x);}else if(typeof target==='object'){if(target.tagName==='INPUT'){if(x.status===200){target.value=x.responseText;}}else{if(x.status===200){target.innerHTML=x.responseText;}else{target.innerHTML='<div class="error">Error: '+x.status+' '+
x.statusText+' ('+x.responseText+')</div>';}}}else{alert('Bad target for sajax_do_call: not a function or object: '+target);}};debug(func_name+' uri = '+uri+' / post = '+post_data);x.send(post_data);debug(func_name+' waiting..');return true;}function wfSupportsAjax(){var request=createXhr();var supportsAjax=request?true:false;request=undefined;return supportsAjax;}var deprecationNotice='Sajax is deprecated, use jQuery.ajax or mediawiki.api instead.';mw.log.deprecate(window,'sajax_debug_mode',false,deprecationNotice);mw.log.deprecate(window,'sajax_request_type','GET',deprecationNotice);mw.log.deprecate(window,'sajax_debug',debug,deprecationNotice);mw.log.deprecate(window,'sajax_init_object',createXhr,deprecationNotice);mw.log.deprecate(window,'sajax_do_call',doAjaxRequest,deprecationNotice);mw.log.deprecate(window,'wfSupportsAjax',wfSupportsAjax,deprecationNotice);}(mediaWiki));;},{},{});mw.loader.implement("mediawiki.legacy.wikibits",function(){(function(mw,$){var isIE6,isGecko,ua=
navigator.userAgent.toLowerCase(),uaMsg='Use feature detection or module jquery.client instead.';mw.log.deprecate(window,'clientPC',ua,uaMsg);$.each(['is_gecko','is_chrome_mac','is_chrome','webkit_version','is_safari_win','is_safari','webkit_match','is_ff2','ff2_bugs','is_ff2_win','is_ff2_x11','opera95_bugs','opera7_bugs','opera6_bugs','is_opera_95','is_opera_preseven','is_opera','ie6_bugs'],function(i,key){mw.log.deprecate(window,key,false,uaMsg);});if(/msie ([0-9]{1,}[\.0-9]{0,})/.exec(ua)&&parseFloat(RegExp.$1)<=6.0){isIE6=true;}isGecko=/gecko/.test(ua)&&!/khtml|spoofer|netscape\/7\.0/.test(ua);window.doneOnloadHook=undefined;if(!window.onloadFuncts){window.onloadFuncts=[];}window.addOnloadHook=function(hookFunct){if(!window.doneOnloadHook){window.onloadFuncts[window.onloadFuncts.length]=hookFunct;}else{hookFunct();}};window.importScript=function(page){var uri=mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode(page)+'&action=raw&ctype=text/javascript';return window.
importScriptURI(uri);};window.loadedScripts={};window.importScriptURI=function(url){if(window.loadedScripts[url]){return null;}window.loadedScripts[url]=true;var s=document.createElement('script');s.setAttribute('src',url);s.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(s);return s;};window.importStylesheet=function(page){return window.importStylesheetURI(mw.config.get('wgScript')+'?action=raw&ctype=text/css&title='+mw.util.wikiUrlencode(page));};window.importStylesheetURI=function(url,media){var l=document.createElement('link');l.rel='stylesheet';l.href=url;if(media){l.media=media;}document.getElementsByTagName('head')[0].appendChild(l);return l;};window.appendCSS=function(text){var s=document.createElement('style');s.type='text/css';s.rel='stylesheet';if(s.styleSheet){s.styleSheet.cssText=text;}else{s.appendChild(document.createTextNode(text+''));}document.getElementsByTagName('head')[0].appendChild(s);return s;};if(mw.config.get(
'wgBreakFrames')){if(window.top!==window.self){window.top.location=window.location;}}window.changeText=function(el,newText){if(el.innerText){el.innerText=newText;}else if(el.firstChild&&el.firstChild.nodeValue){el.firstChild.nodeValue=newText;}};window.killEvt=function(evt){evt=evt||window.event||window.Event;if(typeof evt.preventDefault!=='undefined'){evt.preventDefault();evt.stopPropagation();}else{evt.cancelBubble=true;}return false;};window.mwEditButtons=[];window.mwCustomEditButtons=[];window.escapeQuotes=function(text){var re=new RegExp("'","g");text=text.replace(re,"\\'");re=new RegExp("\\n","g");text=text.replace(re,"\\n");return window.escapeQuotesHTML(text);};window.escapeQuotesHTML=function(text){var re=new RegExp('&',"g");text=text.replace(re,"&amp;");re=new RegExp('"',"g");text=text.replace(re,"&quot;");re=new RegExp('<',"g");text=text.replace(re,"&lt;");re=new RegExp('>',"g");text=text.replace(re,"&gt;");return text;};mw.log.deprecate(window,'tooltipAccessKeyPrefix',
'alt-','Use mediawiki.util instead.');mw.log.deprecate(window,'tooltipAccessKeyRegexp',/\[(alt-)?(.)\]$/,'Use mediawiki.util instead.');mw.log.deprecate(window,'updateTooltipAccessKeys',mw.util.updateTooltipAccessKeys,'Use mediawiki.util instead.');window.addPortletLink=function(portlet,href,text,id,tooltip,accesskey,nextnode){var root=document.getElementById(portlet);if(!root){return null;}var uls=root.getElementsByTagName('ul');var node;if(uls.length>0){node=uls[0];}else{node=document.createElement('ul');var lastElementChild=null;for(var i=0;i<root.childNodes.length;++i){if(root.childNodes[i].nodeType===1){lastElementChild=root.childNodes[i];}}if(lastElementChild&&lastElementChild.nodeName.match(/div/i)){lastElementChild.appendChild(node);}else{root.appendChild(node);}}if(!node){return null;}root.className=root.className.replace(/(^| )emptyPortlet( |$)/,"$2");var link=document.createElement('a');link.appendChild(document.createTextNode(text));link.href=href;var span=document.
createElement('span');span.appendChild(link);var item=document.createElement('li');item.appendChild(span);if(id){item.id=id;}if(accesskey){link.setAttribute('accesskey',accesskey);tooltip+=' ['+accesskey+']';}if(tooltip){link.setAttribute('title',tooltip);}if(accesskey&&tooltip){mw.util.updateTooltipAccessKeys([link]);}if(nextnode&&nextnode.parentNode===node){node.insertBefore(item,nextnode);}else{node.appendChild(item);}return item;};window.getInnerText=function(el){if(typeof el==='string'){return el;}if(typeof el==='undefined'){return el;}if(el.nodeType&&el.getAttribute('data-sort-value')!==null){return el.getAttribute('data-sort-value');}if(el.textContent){return el.textContent;}if(el.innerText){return el.innerText;}var str='';var cs=el.childNodes;var l=cs.length;for(var i=0;i<l;i++){switch(cs[i].nodeType){case 1:str+=window.getInnerText(cs[i]);break;case 3:str+=cs[i].nodeValue;break;}}return str;};$.each({checkboxes:[],lastCheckbox:null,setupCheckboxShiftClick:$.noop,
addCheckboxClickHandlers:$.noop,checkboxClickHandler:$.noop},function(key,val){mw.log.deprecate(window,key,val,'Use jquery.checkboxShiftClick instead.');});window.getElementsByClassName=function(oElm,strTagName,oClassNames){var arrReturnElements=[];if(typeof oElm.getElementsByClassName==='function'){var arrNativeReturn=oElm.getElementsByClassName(oClassNames);if(strTagName==='*'){return arrNativeReturn;}for(var h=0;h<arrNativeReturn.length;h++){if(arrNativeReturn[h].tagName.toLowerCase()===strTagName.toLowerCase()){arrReturnElements[arrReturnElements.length]=arrNativeReturn[h];}}return arrReturnElements;}var arrElements=(strTagName==='*'&&oElm.all)?oElm.all:oElm.getElementsByTagName(strTagName);var arrRegExpClassNames=[];if(typeof oClassNames==='object'){for(var i=0;i<oClassNames.length;i++){arrRegExpClassNames[arrRegExpClassNames.length]=new RegExp("(^|\\s)"+oClassNames[i].replace(/\-/g,"\\-")+"(\\s|$)");}}else{arrRegExpClassNames[arrRegExpClassNames.length]=new RegExp("(^|\\s)"+
oClassNames.replace(/\-/g,"\\-")+"(\\s|$)");}var oElement;var bMatchesAll;for(var j=0;j<arrElements.length;j++){oElement=arrElements[j];bMatchesAll=true;for(var k=0;k<arrRegExpClassNames.length;k++){if(!arrRegExpClassNames[k].test(oElement.className)){bMatchesAll=false;break;}}if(bMatchesAll){arrReturnElements[arrReturnElements.length]=oElement;}}return(arrReturnElements);};window.redirectToFragment=function(fragment){var webKitVersion,match=navigator.userAgent.match(/AppleWebKit\/(\d+)/);if(match){webKitVersion=parseInt(match[1],10);if(webKitVersion<420){return;}}if(!window.location.hash){window.location.hash=fragment;if(isGecko){$(function(){if(window.location.hash===fragment){window.location.hash=fragment;}});}}};mw.log.deprecate(window,'jsMsg',mw.util.jsMessage,'Use mediawiki.notify instead.');window.injectSpinner=function(element,id){var spinner=document.createElement('img');spinner.id='mw-spinner-'+id;spinner.src=mw.config.get('stylepath')+'/common/images/spinner.gif';spinner.alt
=spinner.title='...';if(element.nextSibling){element.parentNode.insertBefore(spinner,element.nextSibling);}else{element.parentNode.appendChild(spinner);}};window.removeSpinner=function(id){var spinner=document.getElementById('mw-spinner-'+id);if(spinner){spinner.parentNode.removeChild(spinner);}};window.runOnloadHook=function(){if(window.doneOnloadHook||!(document.getElementById&&document.getElementsByTagName)){return;}window.doneOnloadHook=true;for(var i=0;i<window.onloadFuncts.length;i++){window.onloadFuncts[i]();}};window.addHandler=function(element,attach,handler){if(element.addEventListener){element.addEventListener(attach,handler,false);}else if(element.attachEvent){element.attachEvent('on'+attach,handler);}};window.hookEvent=function(hookName,hookFunct){window.addHandler(window,hookName,hookFunct);};window.addClickHandler=function(element,handler){window.addHandler(element,'click',handler);};window.removeHandler=function(element,remove,handler){if(window.removeEventListener){
element.removeEventListener(remove,handler,false);}else if(window.detachEvent){element.detachEvent('on'+remove,handler);}};window.hookEvent('load',window.runOnloadHook);if(isIE6){window.importScriptURI(mw.config.get('stylepath')+'/common/IEFixes.js');}}(mediaWiki,jQuery));;},{},{});mw.loader.implement("mediawiki.notify",function(){(function(mw){'use strict';mw.notify=function(message,options){mw.loader.using('mediawiki.notification',function(){mw.notify=mw.notification.notify;mw.notify(message,options);});};}(mediaWiki));;},{},{});mw.loader.implement("mediawiki.util",function(){(function(mw,$){'use strict';var util={init:function(){var profile,$tocTitle,$tocToggleLink,hideTocCookie;profile=$.client.profile();if(profile.name==='opera'){util.tooltipAccessKeyPrefix='shift-esc-';}else if(profile.name==='chrome'){util.tooltipAccessKeyPrefix=(profile.platform==='mac'?'ctrl-option-':'alt-shift-');}else if(profile.platform!=='win'&&profile.name==='safari'&&profile.layoutVersion>526){util.
tooltipAccessKeyPrefix='ctrl-alt-';}else if(profile.platform==='mac'&&profile.name==='firefox'&&profile.versionNumber>=14){util.tooltipAccessKeyPrefix='ctrl-option-';}else if(!(profile.platform==='win'&&profile.name==='safari')&&(profile.name==='safari'||profile.platform==='mac'||profile.name==='konqueror')){util.tooltipAccessKeyPrefix='ctrl-';}else if(profile.name==='firefox'&&profile.versionBase>'1'){util.tooltipAccessKeyPrefix='alt-shift-';}util.$content=(function(){var i,l,$content,selectors;selectors=['.mw-body-primary','.mw-body','#bodyContent','#mw_contentholder','#article','#content','#mw-content-text','body'];for(i=0,l=selectors.length;i<l;i++){$content=$(selectors[i]).first();if($content.length){return $content;}}return util.$content;})();mw.hook('wikipage.content').fire(util.$content);$tocTitle=$('#toctitle');$tocToggleLink=$('#togglelink');if($('#toc').length&&$tocTitle.length&&!$tocToggleLink.length){hideTocCookie=$.cookie('mw_hidetoc');$tocToggleLink=$(
'<a href="#" class="internal" id="togglelink"></a>').text(mw.msg('hidetoc')).click(function(e){e.preventDefault();util.toggleToc($(this));});$tocTitle.append($tocToggleLink.wrap('<span class="toctoggle"></span>').parent().prepend('&nbsp;[').append(']&nbsp;'));if(hideTocCookie==='1'){util.toggleToc($tocToggleLink);}}},rawurlencode:function(str){str=String(str);return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/~/g,'%7E');},wikiUrlencode:function(str){return util.rawurlencode(str).replace(/%20/g,'_').replace(/%3A/g,':').replace(/%2F/g,'/');},wikiGetlink:function(str){return mw.config.get('wgArticlePath').replace('$1',util.wikiUrlencode(typeof str==='string'?str:mw.config.get('wgPageName')));},wikiScript:function(str){str=str||'index';if(str==='index'){return mw.config.get('wgScript');}else if(str==='load'){return mw.config.get('wgLoadScript');}else{return mw.config.get('wgScriptPath')+'/'+str+mw.
config.get('wgScriptExtension');}},addCSS:function(text){var s=mw.loader.addStyleTag(text);return s.sheet||s;},toggleToc:function($toggleLink,callback){var $tocList=$('#toc ul:first');if($tocList.length){if($tocList.is(':hidden')){$tocList.slideDown('fast',callback);$toggleLink.text(mw.msg('hidetoc'));$('#toc').removeClass('tochidden');$.cookie('mw_hidetoc',null,{expires:30,path:'/'});return true;}else{$tocList.slideUp('fast',callback);$toggleLink.text(mw.msg('showtoc'));$('#toc').addClass('tochidden');$.cookie('mw_hidetoc','1',{expires:30,path:'/'});return false;}}else{return null;}},getParamValue:function(param,url){if(url===undefined){url=document.location.href;}var re=new RegExp('^[^#]*[&?]'+$.escapeRE(param)+'=([^&#]*)'),m=re.exec(url);if(m){return decodeURIComponent(m[1].replace(/\+/g,'%20'));}return null;},tooltipAccessKeyPrefix:'alt-',tooltipAccessKeyRegexp:/\[(ctrl-)?(option-)?(alt-)?(shift-)?(esc-)?(.)\]$/,updateTooltipAccessKeys:function($nodes){if(!$nodes){$nodes=$(
'#column-one a, #mw-head a, #mw-panel a, #p-logo a, input, label');}else if(!($nodes instanceof $)){$nodes=$($nodes);}$nodes.attr('title',function(i,val){if(val&&util.tooltipAccessKeyRegexp.test(val)){return val.replace(util.tooltipAccessKeyRegexp,'['+util.tooltipAccessKeyPrefix+'$6]');}return val;});},$content:null,addPortletLink:function(portlet,href,text,id,tooltip,accesskey,nextnode){var $item,$link,$portlet,$ul;if(arguments.length<3){return null;}$link=$('<a>').attr('href',href).text(text);if(tooltip){$link.attr('title',tooltip);}$portlet=$('#'+portlet);if($portlet.length===0){return null;}$ul=$portlet.find('ul').eq(0);if($ul.length===0){$ul=$('<ul>');if($portlet.find('div:first').length===0){$portlet.append($ul);}else{$portlet.find('div').eq(-1).append($ul);}}if($ul.length===0){return null;}$portlet.removeClass('emptyPortlet');if($portlet.hasClass('vectorTabs')){$item=$link.wrap('<li><span></span></li>').parent().parent();}else{$item=$link.wrap('<li></li>').parent();}if(id){$item
.attr('id',id);}if(tooltip){tooltip=$.trim(tooltip.replace(util.tooltipAccessKeyRegexp,''));if(accesskey){tooltip+=' ['+accesskey+']';}$link.attr('title',tooltip);if(accesskey){util.updateTooltipAccessKeys($link);}}if(accesskey){$link.attr('accesskey',accesskey);}if(nextnode&&nextnode.parentNode===$ul[0]){$(nextnode).before($item);}else if(typeof nextnode==='string'&&$ul.find(nextnode).length!==0){$ul.find(nextnode).eq(0).before($item);}else{$ul.append($item);}return $item[0];},jsMessage:function(message){if(!arguments.length||message===''||message===null){return true;}if(typeof message!=='object'){message=$.parseHTML(message);}mw.notify(message,{autoHide:true,tag:'legacy'});return true;},validateEmail:function(mailtxt){var rfc5322Atext,rfc1034LdhStr,html5EmailRegexp;if(mailtxt===''){return null;}rfc5322Atext='a-z0-9!#$%&\'*+\\-/=?^_`{|}~';rfc1034LdhStr='a-z0-9\\-';html5EmailRegexp=new RegExp('^'+'['+rfc5322Atext+'\\.]+'+'@'+'['+rfc1034LdhStr+']+'+'(?:\\.['+rfc1034LdhStr+']+)*'+'$','i'
);return(null!==mailtxt.match(html5EmailRegexp));},isIPv4Address:function(address,allowBlock){if(typeof address!=='string'){return false;}var block=allowBlock?'(?:\\/(?:3[0-2]|[12]?\\d))?':'',RE_IP_BYTE='(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|0?[0-9]?[0-9])',RE_IP_ADD='(?:'+RE_IP_BYTE+'\\.){3}'+RE_IP_BYTE;return address.search(new RegExp('^'+RE_IP_ADD+block+'$'))!==-1;},isIPv6Address:function(address,allowBlock){if(typeof address!=='string'){return false;}var block=allowBlock?'(?:\\/(?:12[0-8]|1[01][0-9]|[1-9]?\\d))?':'',RE_IPV6_ADD='(?:'+':(?::|(?::'+'[0-9A-Fa-f]{1,4}'+'){1,7})'+'|'+'[0-9A-Fa-f]{1,4}'+'(?::'+'[0-9A-Fa-f]{1,4}'+'){0,6}::'+'|'+'[0-9A-Fa-f]{1,4}'+'(?::'+'[0-9A-Fa-f]{1,4}'+'){7}'+')';if(address.search(new RegExp('^'+RE_IPV6_ADD+block+'$'))!==-1){return true;}RE_IPV6_ADD='[0-9A-Fa-f]{1,4}'+'(?:::?'+'[0-9A-Fa-f]{1,4}'+'){1,6}';return address.search(new RegExp('^'+RE_IPV6_ADD+block+'$'))!==-1&&address.search(/::/)!==-1&&address.search(/::.*::/)===-1;}};mw.util=util;}(mediaWiki,
jQuery));;},{},{"showtoc":"show","hidetoc":"hide"});mw.loader.implement("mediawiki.page.startup",function(){(function(mw,$){mw.page={};$('html').addClass('client-js').removeClass('client-nojs');$(mw.util.init);}(mediaWiki,jQuery));;},{},{});mw.loader.implement("skins.vector.js",function(){jQuery(function($){$('div.vectorMenu').each(function(){var $el=$(this);$el.find('h3:first a:first').click(function(e){$el.find('.menu:first').toggleClass('menuForceShow');e.preventDefault();}).focus(function(){$el.addClass('vectorMenuFocus');}).blur(function(){$el.removeClass('vectorMenuFocus');});});var $cactions=$('#p-cactions');$('#p-views ul').bind('beforeTabCollapse',function(){if($cactions.hasClass('emptyPortlet')){$cactions.removeClass('emptyPortlet').find('h3, h5').css('width','1px').animate({'width':'24px'},390);}}).bind('beforeTabExpand',function(){if($cactions.find('li').length===1){$cactions.find('h3, h5').animate({'width':'1px'},390,function(){$(this).attr('style','').parent().addClass(
'emptyPortlet');});}}).collapsibleTabs();});(function($){var rtl=$('html').attr('dir')==='rtl';$.fn.collapsibleTabs=function(options){if(!this.length){return this;}var $settings=$.extend({},$.collapsibleTabs.defaults,options);this.each(function(){var $el=$(this);$.collapsibleTabs.instances=($.collapsibleTabs.instances.length===0?$el:$.collapsibleTabs.instances.add($el));$el.data('collapsibleTabsSettings',$settings);$el.children($settings.collapsible).each(function(){$.collapsibleTabs.addData($(this));});});if(!$.collapsibleTabs.boundEvent){$(window).delayedBind('500','resize',function(){$.collapsibleTabs.handleResize();});}$.collapsibleTabs.handleResize();return this;};function calculateTabDistance(){var $leftTab,$rightTab,leftEnd,rightStart;if(!rtl){$leftTab=$('#left-navigation');$rightTab=$('#right-navigation');}else{$leftTab=$('#right-navigation');$rightTab=$('#left-navigation');}leftEnd=$leftTab.offset().left+$leftTab.width();rightStart=$rightTab.offset().left;return rightStart-
leftEnd;}$.collapsibleTabs={instances:[],boundEvent:null,defaults:{expandedContainer:'#p-views ul',collapsedContainer:'#p-cactions ul',collapsible:'li.collapsible',shifting:false,expandCondition:function(eleWidth){return calculateTabDistance()>=eleWidth;},collapseCondition:function(){return calculateTabDistance()<0;}},addData:function($collapsible){var $settings=$collapsible.parent().data('collapsibleTabsSettings');if($settings!==null){$collapsible.data('collapsibleTabsSettings',{expandedContainer:$settings.expandedContainer,collapsedContainer:$settings.collapsedContainer,expandedWidth:$collapsible.width(),prevElement:$collapsible.prev()});}},getSettings:function($collapsible){var $settings=$collapsible.data('collapsibleTabsSettings');if($settings===undefined){$.collapsibleTabs.addData($collapsible);$settings=$collapsible.data('collapsibleTabsSettings');}return $settings;},handleResize:function(){$.collapsibleTabs.instances.each(function(){var $el=$(this),data=$.collapsibleTabs.
getSettings($el);if(data.shifting){return;}if($el.children(data.collapsible).length>0&&data.collapseCondition()){$el.trigger('beforeTabCollapse');$.collapsibleTabs.moveToCollapsed($el.children(data.collapsible+':last'));}if($(data.collapsedContainer+' '+data.collapsible).length>0&&data.expandCondition($.collapsibleTabs.getSettings($(data.collapsedContainer).children(data.collapsible+':first')).expandedWidth)){$el.trigger('beforeTabExpand');$.collapsibleTabs.moveToExpanded(data.collapsedContainer+' '+data.collapsible+':first');}});},moveToCollapsed:function(ele){var data,expContainerSettings,target,$moving=$(ele);data=$.collapsibleTabs.getSettings($moving);if(!data){return;}expContainerSettings=$.collapsibleTabs.getSettings($(data.expandedContainer));if(!expContainerSettings){return;}expContainerSettings.shifting=true;target=data.collapsedContainer;$moving.css('position','relative').css((rtl?'left':'right'),0).animate({width:'1px'},'normal',function(){var data,expContainerSettings;$(
this).hide();$('<span class="placeholder" style="display: none;"></span>').insertAfter(this);$(this).detach().prependTo(target).data('collapsibleTabsSettings',data);$(this).attr('style','display: list-item;');data=$.collapsibleTabs.getSettings($(ele));if(data){expContainerSettings=$.collapsibleTabs.getSettings($(data.expandedContainer));if(expContainerSettings){expContainerSettings.shifting=false;$.collapsibleTabs.handleResize();}}});},moveToExpanded:function(ele){var data,expContainerSettings,$target,expandedWidth,$moving=$(ele);data=$.collapsibleTabs.getSettings($moving);if(!data){return;}expContainerSettings=$.collapsibleTabs.getSettings($(data.expandedContainer));if(!expContainerSettings){return;}expContainerSettings.shifting=true;$target=$(data.expandedContainer).find('span.placeholder:first');expandedWidth=data.expandedWidth;$moving.css('position','relative').css((rtl?'right':'left'),0).css('width','1px');$target.replaceWith($moving.detach().css('width','1px').data(
'collapsibleTabsSettings',data).animate({width:expandedWidth+'px'},'normal',function(){$(this).attr('style','display: block;');var data,expContainerSettings;data=$.collapsibleTabs.getSettings($(this));if(data){expContainerSettings=$.collapsibleTabs.getSettings($(data.expandedContainer));if(expContainerSettings){expContainerSettings.shifting=false;$.collapsibleTabs.handleResize();}}}));}};}(jQuery));;},{},{});
/* cache key: enwikibooks:resourceloader:filter:minify-js:7:c9439b3e0dccd6de1e6b8babc3f47de0 */