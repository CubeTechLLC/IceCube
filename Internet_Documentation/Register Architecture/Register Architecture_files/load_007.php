function isCompatible(ua){if(ua===undefined){ua=navigator.userAgent;}return!((ua.indexOf('MSIE')!==-1&&parseFloat(ua.split('MSIE')[1])<6)||(ua.indexOf('Firefox/')!==-1&&parseFloat(ua.split('Firefox/')[1])<3)||ua.match(/BlackBerry[^\/]*\/[1-5]\./)||ua.match(/webOS\/1\.[0-4]/)||ua.match(/PlayStation/i)||ua.match(/SymbianOS|Series60/)||ua.match(/NetFront/)||ua.match(/Opera Mini/));}var startUp=function(){mw.config=new mw.Map(true);mw.loader.addSource({"local":{"loadScript":"//bits.wikimedia.org/en.wikibooks.org/load.php","apiScript":"/w/api.php"}});(function(name,version,dependencies,group,source){})("MediaWikiSupport.loader","20130620T163512Z",[],null,"local");(function(name,version,dependencies,group,source){(function(mw,$){$(function(event){var $selected=$(mw.config.get('EmbedPlayer.RewriteSelector'));if($selected.length){var inx=0;var checkSetDone=function(){if(inx<$selected.length){$selected.slice(inx,inx+1).embedPlayer(function(){setTimeout(function(){checkSetDone();},5);});}inx++;}
;checkSetDone();}});$.fn.embedPlayer=function(readyCallback){var playerSet=this;mw.log('jQuery.fn.embedPlayer :: '+$(this).length);var dependencySet=['mw.EmbedPlayer'];var rewriteElementCount=0;$(this).each(function(inx,playerElement){var skinName='';$(playerElement).removeAttr('controls');if(!$.browser.mozilla){$(playerElement).parent().getAbsoluteOverlaySpinner().attr('id','loadingSpinner_'+$(playerElement).attr('id'));}$(mw).trigger('EmbedPlayerUpdateDependencies',[playerElement,dependencySet]);});dependencySet=$.uniqueArray(dependencySet);mediaWiki.loader.using(dependencySet,function(){window.gM=mw.jqueryMsg.getMessageFunction({});mw.processEmbedPlayers(playerSet,readyCallback);},function(e){throw new Error('Error loading EmbedPlayer dependency set: '+e.message);});};})(window.mediaWiki,window.jQuery);})("EmbedPlayer.loader","20130620T163559Z",[],null,"local");(function(name,version,dependencies,group,source){(function(mw,$){$(mw).bind('EmbedPlayerUpdateDependencies',function(event
,playerElement,classRequest){if(mw.isTimedTextSupported(playerElement)){classRequest=$.merge(classRequest,['mw.TimedText']);}});$(mw).bind('EmbedPlayerNewPlayer',function(event,embedPlayer){if(mw.isTimedTextSupported(embedPlayer)){embedPlayer.timedText=new mw.TimedText(embedPlayer);}});mw.isTimedTextSupported=function(embedPlayer){var mwprovider=embedPlayer['data-mwprovider']||$(embedPlayer).data('mwprovider');var showInterface=mw.config.get('TimedText.ShowInterface.'+mwprovider)||mw.config.get('TimedText.ShowInterface');if(showInterface=='always'){return true;}else if(showInterface=='off'){return false;}if($(embedPlayer).find('track').length!=0){return true;}else{return false;}};})(window.mediaWiki,window.jQuery);})("TimedText.loader","20130620T163559Z",[],null,"local");(function(name,version,dependencies,group,source){(function(mw,$){$(mw).bind('EmbedPlayerUpdateDependencies',function(event,embedPlayer,dependencySet){if($(embedPlayer).attr('data-mwtitle')){$.merge(dependencySet,[
'mw.MediaWikiPlayerSupport']);}});})(window.mediaWiki,jQuery);})("mw.MediaWikiPlayer.loader","20130620T163559Z",[],null,"local");mw.loader.register([["site","1363393124",[],"site"],["noscript","1347062400",[],"noscript"],["startup","1372257577",[],"startup"],["filepage","1347062400"],["user.groups","1347062400",[],"user"],["user","1347062400",[],"user"],["user.cssprefs","1347062400",["mediawiki.user"],"private"],["user.options","1347062400",[],"private"],["user.tokens","1347062400",[],"private"],["mediawiki.language.data","1372257577",["mediawiki.language.init"]],["skins.cologneblue","1371745973"],["skins.modern","1371745973"],["skins.monobook","1371745973"],["skins.vector","1371745973"],["skins.vector.js","1372210827",["jquery.delayedBind"]],["jquery","1371745973"],["jquery.appear","1371745973"],["jquery.arrowSteps","1371745973"],["jquery.async","1371745973"],["jquery.autoEllipsis","1371745973",["jquery.highlightText"]],["jquery.badge","1371745973",["mediawiki.language"]],[
"jquery.byteLength","1371745973"],["jquery.byteLimit","1371745973",["jquery.byteLength"]],["jquery.checkboxShiftClick","1371745973"],["jquery.chosen","1371745973"],["jquery.client","1371745973"],["jquery.color","1371745973",["jquery.colorUtil"]],["jquery.colorUtil","1371745973"],["jquery.cookie","1371745973"],["jquery.delayedBind","1371745973"],["jquery.expandableField","1371745973",["jquery.delayedBind"]],["jquery.farbtastic","1371745973",["jquery.colorUtil"]],["jquery.footHovzer","1371745973"],["jquery.form","1371745973"],["jquery.getAttrs","1371745973"],["jquery.hidpi","1371745973"],["jquery.highlightText","1371745973",["jquery.mwExtension"]],["jquery.hoverIntent","1371745973"],["jquery.json","1371745973"],["jquery.localize","1371745973"],["jquery.makeCollapsible","1372213042"],["jquery.mockjax","1371745973"],["jquery.mw-jump","1371745973"],["jquery.mwExtension","1371745973"],["jquery.placeholder","1371745973"],["jquery.qunit","1371745973"],["jquery.qunit.completenessTest",
"1371745973",["jquery.qunit"]],["jquery.spinner","1371745973"],["jquery.jStorage","1371745973",["jquery.json"]],["jquery.suggestions","1371745973",["jquery.autoEllipsis"]],["jquery.tabIndex","1371745973"],["jquery.tablesorter","1372213042",["jquery.mwExtension"]],["jquery.textSelection","1371745973",["jquery.client"]],["jquery.validate","1371745973"],["jquery.xmldom","1371745973"],["jquery.tipsy","1371745973"],["jquery.ui.core","1371745973",["jquery"],"jquery.ui"],["jquery.ui.widget","1371745973",[],"jquery.ui"],["jquery.ui.mouse","1371745973",["jquery.ui.widget"],"jquery.ui"],["jquery.ui.position","1371745973",[],"jquery.ui"],["jquery.ui.draggable","1371745973",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget"],"jquery.ui"],["jquery.ui.droppable","1371745973",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget","jquery.ui.draggable"],"jquery.ui"],["jquery.ui.resizable","1371745973",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.selectable",
"1371745973",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.sortable","1371745973",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.accordion","1371745973",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.autocomplete","1371745973",["jquery.ui.core","jquery.ui.widget","jquery.ui.position"],"jquery.ui"],["jquery.ui.button","1371745973",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.datepicker","1371745973",["jquery.ui.core"],"jquery.ui"],["jquery.ui.dialog","1371745973",["jquery.ui.core","jquery.ui.widget","jquery.ui.button","jquery.ui.draggable","jquery.ui.mouse","jquery.ui.position","jquery.ui.resizable"],"jquery.ui"],["jquery.ui.progressbar","1371745973",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.slider","1371745973",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.tabs","1371745973",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],[
"jquery.effects.core","1371745973",["jquery"],"jquery.ui"],["jquery.effects.blind","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.bounce","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.clip","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.drop","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.explode","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.fade","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.fold","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.highlight","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.pulsate","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.scale","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.shake","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.slide","1371745973",["jquery.effects.core"],"jquery.ui"],["jquery.effects.transfer","1371745973",[
"jquery.effects.core"],"jquery.ui"],["mediawiki","1371745973"],["mediawiki.api","1371745973",["mediawiki.util"]],["mediawiki.api.category","1371745973",["mediawiki.api","mediawiki.Title"]],["mediawiki.api.edit","1371745973",["mediawiki.api","mediawiki.Title"]],["mediawiki.api.login","1371745973",["mediawiki.api"]],["mediawiki.api.parse","1371745973",["mediawiki.api"]],["mediawiki.api.watch","1371745973",["mediawiki.api","user.tokens"]],["mediawiki.icon","1371745973"],["mediawiki.debug","1371745973",["jquery.footHovzer"]],["mediawiki.debug.init","1371745973",["mediawiki.debug"]],["mediawiki.feedback","1371745973",["mediawiki.api.edit","mediawiki.Title","mediawiki.jqueryMsg","jquery.ui.dialog"]],["mediawiki.hidpi","1371745973",["jquery.hidpi"]],["mediawiki.htmlform","1372213042"],["mediawiki.notification","1371745973",["mediawiki.page.startup"]],["mediawiki.notify","1371745973"],["mediawiki.searchSuggest","1372213042",["jquery.autoEllipsis","jquery.client","jquery.placeholder",
"jquery.suggestions","mediawiki.api"]],["mediawiki.Title","1371745973",["mediawiki.util"]],["mediawiki.Uri","1371745973"],["mediawiki.user","1371745973",["jquery.cookie","mediawiki.api","user.options","user.tokens"]],["mediawiki.util","1372213042",["jquery.client","jquery.cookie","jquery.mwExtension","mediawiki.notify"]],["mediawiki.action.edit","1371745973",["jquery.textSelection","jquery.byteLimit"]],["mediawiki.action.edit.preview","1371745973",["jquery.form","jquery.spinner"]],["mediawiki.action.history","1371745973",[],"mediawiki.action.history"],["mediawiki.action.history.diff","1371745973",[],"mediawiki.action.history"],["mediawiki.action.view.dblClickEdit","1371745973",["mediawiki.util","mediawiki.page.startup"]],["mediawiki.action.view.metadata","1372213042"],["mediawiki.action.view.postEdit","1372213042",["jquery.cookie","mediawiki.jqueryMsg"]],["mediawiki.action.view.rightClickEdit","1371745973"],["mediawiki.action.edit.editWarning","1372213042"],[
"mediawiki.action.watch.ajax","1347062400",["mediawiki.page.watch.ajax"]],["mediawiki.language","1371745973",["mediawiki.language.data","mediawiki.cldr"]],["mediawiki.cldr","1371745973",["mediawiki.libs.pluralruleparser"]],["mediawiki.libs.pluralruleparser","1371745973"],["mediawiki.language.init","1371745973"],["mediawiki.jqueryMsg","1371745973",["mediawiki.util","mediawiki.language"]],["mediawiki.libs.jpegmeta","1371745973"],["mediawiki.page.ready","1371745973",["jquery.checkboxShiftClick","jquery.makeCollapsible","jquery.placeholder","jquery.mw-jump","mediawiki.util"]],["mediawiki.page.startup","1371745973",["jquery.client","mediawiki.util"]],["mediawiki.page.patrol.ajax","1372213042",["mediawiki.page.startup","mediawiki.api","mediawiki.util","mediawiki.Title","mediawiki.notify","jquery.spinner","user.tokens"]],["mediawiki.page.watch.ajax","1372213042",["mediawiki.page.startup","mediawiki.api.watch","mediawiki.util","mediawiki.notify","jquery.mwExtension"]],["mediawiki.special",
"1371745973"],["mediawiki.special.block","1371745973",["mediawiki.util"]],["mediawiki.special.changeemail","1372213042",["mediawiki.util"]],["mediawiki.special.changeslist","1371745973",["jquery.makeCollapsible","mediawiki.icon"]],["mediawiki.special.movePage","1371745973",["jquery.byteLimit"]],["mediawiki.special.preferences","1371745973"],["mediawiki.special.recentchanges","1371745973",["mediawiki.special"]],["mediawiki.special.search","1372213042"],["mediawiki.special.undelete","1371745973"],["mediawiki.special.upload","1371745973",["mediawiki.libs.jpegmeta","mediawiki.util"]],["mediawiki.special.userlogin","1371745973"],["mediawiki.special.createaccount","1371745973"],["mediawiki.special.createaccount.js","1372213042",["mediawiki.jqueryMsg"]],["mediawiki.special.javaScriptTest","1371745973",["jquery.qunit"]],["mediawiki.tests.qunit.testrunner","1371745973",["jquery.getAttrs","jquery.qunit","jquery.qunit.completenessTest","mediawiki.page.startup","mediawiki.page.ready"]],[
"mediawiki.legacy.ajax","1371745973",["mediawiki.util","mediawiki.legacy.wikibits"]],["mediawiki.legacy.commonPrint","1371745973"],["mediawiki.legacy.config","1371745973",["mediawiki.legacy.wikibits"]],["mediawiki.legacy.IEFixes","1371745973",["mediawiki.legacy.wikibits"]],["mediawiki.legacy.protect","1371745973",["mediawiki.legacy.wikibits","jquery.byteLimit"]],["mediawiki.legacy.shared","1371745973"],["mediawiki.legacy.oldshared","1371745973"],["mediawiki.legacy.upload","1371745973",["mediawiki.legacy.wikibits","mediawiki.util"]],["mediawiki.legacy.wikibits","1371745973",["mediawiki.util"]],["mediawiki.legacy.wikiprintable","1371745973"],["mediawiki.ui","1347062400"],["ext.gadget.colorcats","1347062400"],["ext.gadget.background-awesomeness","1347062400"],["ext.gadget.subject-pages","1347062400"],["ext.gadget.extlinks","1347062400",["mediawiki.util"]],["ext.gadget.navpop","1347062400"],["ext.gadget.Twinklerevert","1347062400",["mediawiki.util","jquery.ui.dialog","jquery.tipsy"]],[
"ext.gadget.twinklespeedy","1347062400",["mediawiki.util","jquery.ui.dialog","jquery.tipsy"]],["ext.gadget.twinklewarn","1366809435",["mediawiki.util","jquery.ui.dialog","jquery.tipsy"]],["ext.gadget.Twinkleunlink","1347062400",["mediawiki.util","jquery.ui.dialog","jquery.tipsy"]],["ext.gadget.purge","1347062400",["mediawiki.util"]],["ext.gadget.bottomtabs","1347062400"],["ext.gadget.twinkledelimages","1347062400"],["mw.MwEmbedSupport","1371746112",["jquery.triggerQueueCallback","Spinner","jquery.loadingSpinner","jquery.mwEmbedUtil","mw.MwEmbedSupport.style"]],["Spinner","1371746112"],["iScroll","1371746112"],["jquery.loadingSpinner","1371746112"],["mw.MwEmbedSupport.style","1371746112"],["mediawiki.UtilitiesTime","1371746112"],["mediawiki.client","1371746112"],["mediawiki.absoluteUrl","1371746112"],["mw.ajaxProxy","1371746112"],["fullScreenApi","1371746112"],["jquery.embedMenu","1371746112"],["jquery.ui.touchPunch","1371746112",["jquery.ui.core","jquery.ui.mouse"]],[
"jquery.triggerQueueCallback","1371746112"],["jquery.mwEmbedUtil","1371746112",["jquery.ui.dialog"]],["jquery.debouncedresize","1371746112"],["mw.Language.names","1371746112"],["mw.Api","1371746112"],["mw.MediaElement","1371746159"],["mw.MediaPlayer","1371746159"],["mw.MediaPlayers","1371746159",["mw.MediaPlayer"]],["mw.MediaSource","1371746159"],["mw.EmbedTypes","1371746159",["mw.MediaPlayers","mediawiki.Uri"]],["mw.EmbedPlayer","1372213042",["mediawiki.client","mediawiki.UtilitiesTime","mediawiki.Uri","mediawiki.absoluteUrl","mediawiki.jqueryMsg","fullScreenApi","mw.EmbedPlayerNative","mw.MediaElement","mw.MediaPlayers","mw.MediaSource","mw.EmbedTypes","jquery.client","jquery.hoverIntent","jquery.cookie","jquery.ui.mouse","jquery.debouncedresize","jquery.embedMenu","jquery.ui.slider","jquery.ui.touchPunch","mw.PlayerSkinKskin"]],["mw.EmbedPlayerKplayer","1371746159"],["mw.EmbedPlayerGeneric","1371746159"],["mw.EmbedPlayerJava","1371746159"],["mw.EmbedPlayerNative","1371746159"],[
"mw.EmbedPlayerImageOverlay","1371746159"],["mw.EmbedPlayerVlc","1371746159"],["mw.PlayerSkinKskin","1371746159"],["mw.PlayerSkinMvpcf","1371746159"],["mw.TimedText","1372213042",["mw.EmbedPlayer","jquery.ui.dialog","mw.TextSource"]],["mw.TextSource","1371746159",["mediawiki.UtilitiesTime","mw.ajaxProxy"]],["ext.wikihiero","1371746236"],["ext.wikihiero.Special","1371746236",["jquery.spinner"]],["ext.cite","1371746031",["jquery.tooltip"]],["jquery.tooltip","1371746031"],["ext.rtlcite","1371746031"],["ext.specialcite","1371746031"],["ext.geshi.local","1347062400"],["ext.flaggedRevs.basic","1371746080"],["ext.flaggedRevs.advanced","1372213042",["mediawiki.util"]],["ext.flaggedRevs.review","1372213042",["mediawiki.util","mediawiki.user","mediawiki.jqueryMsg"]],["ext.categoryTree","1372213042"],["ext.categoryTree.css","1371746008"],["mediawiki.api.titleblacklist","1371746160",["mediawiki.api"]],["ext.quiz","1371746130"],["ext.nuke","1371746115"],["ext.confirmEdit.fancyCaptcha.styles",
"1371746043"],["ext.confirmEdit.fancyCaptcha","1371746043",["mediawiki.api"]],["ext.centralauth","1372213042",["mediawiki.util","jquery.spinner"]],["ext.centralauth.centralautologin","1371746023",["mediawiki.notify","mediawiki.jqueryMsg"]],["ext.centralauth.noflash","1371746023"],["ext.centralauth.globalusers","1371746023"],["ext.centralauth.globalgrouppermissions","1371746023"],["ext.dismissableSiteNotice","1371746051",["jquery.cookie","mediawiki.util"]],["jquery.ui.multiselect","1371746027",["jquery.ui.core","jquery.ui.sortable","jquery.ui.draggable","jquery.ui.droppable","mediawiki.jqueryMsg"]],["ext.centralNotice.adminUi","1371746027",["jquery.ui.datepicker","jquery.ui.multiselect"]],["ext.centralNotice.adminUi.bannerManager","1371746027",["ext.centralNotice.adminUi","jquery.ui.dialog"]],["ext.centralNotice.adminUi.bannerEditor","1371746027",["ext.centralNotice.adminUi","jquery.ui.dialog"]],["ext.centralNotice.adminUi.bannerPreview","1371746027",[
"ext.centralNotice.bannerController"]],["ext.centralNotice.bannerStats","1371746027"],["ext.centralNotice.bannerController","1371746027",["jquery.cookie"]],["ext.collection.jquery.jstorage","1371746040",["jquery.json"]],["ext.collection.suggest","1371746040",["ext.collection.bookcreator"]],["ext.collection","1371746040",["ext.collection.bookcreator","jquery.ui.sortable"]],["ext.collection.bookcreator","1371746040",["ext.collection.jquery.jstorage"]],["ext.collection.checkLoadFromLocalStorage","1371746040",["ext.collection.jquery.jstorage"]],["ext.abuseFilter","1371745989"],["ext.abuseFilter.edit","1371745989",["mediawiki.util","mediawiki.api","jquery.textSelection","jquery.spinner"]],["ext.abuseFilter.tools","1371745989",["mediawiki.api","mediawiki.notify","user.tokens","jquery.spinner"]],["ext.abuseFilter.examine","1371745989",["jquery.spinner","mediawiki.api"]],["ext.vector.collapsibleNav","1372213042",["mediawiki.util","jquery.client","jquery.cookie","jquery.tabIndex"],"ext.vector"]
,["ext.vector.expandableSearch","1371746198",["jquery.client","jquery.expandableField","jquery.delayedBind"],"ext.vector"],["ext.vector.footerCleanup","1371746198",["mediawiki.jqueryMsg","jquery.cookie"],"ext.vector"],["ext.vector.sectionEditLinks","1371746198",["jquery.cookie"],"ext.vector"],["contentCollector","1371746208",[],"ext.wikiEditor"],["jquery.wikiEditor","1372213042",["jquery.client","jquery.textSelection","jquery.delayedBind"],"ext.wikiEditor"],["jquery.wikiEditor.iframe","1371746208",["jquery.wikiEditor","contentCollector"],"ext.wikiEditor"],["jquery.wikiEditor.dialogs","1371746208",["jquery.wikiEditor","jquery.wikiEditor.toolbar","jquery.ui.dialog","jquery.ui.button","jquery.ui.draggable","jquery.ui.resizable","jquery.tabIndex"],"ext.wikiEditor"],["jquery.wikiEditor.dialogs.config","1372213042",["jquery.wikiEditor","jquery.wikiEditor.dialogs","jquery.wikiEditor.toolbar.i18n","jquery.suggestions","mediawiki.Title","mediawiki.jqueryMsg"],"ext.wikiEditor"],[
"jquery.wikiEditor.highlight","1371746208",["jquery.wikiEditor","jquery.wikiEditor.iframe"],"ext.wikiEditor"],["jquery.wikiEditor.preview","1371746208",["jquery.wikiEditor"],"ext.wikiEditor"],["jquery.wikiEditor.previewDialog","1371746208",["jquery.wikiEditor","jquery.wikiEditor.dialogs"],"ext.wikiEditor"],["jquery.wikiEditor.publish","1371746208",["jquery.wikiEditor","jquery.wikiEditor.dialogs"],"ext.wikiEditor"],["jquery.wikiEditor.templateEditor","1371746208",["jquery.wikiEditor","jquery.wikiEditor.iframe","jquery.wikiEditor.dialogs"],"ext.wikiEditor"],["jquery.wikiEditor.templates","1371746208",["jquery.wikiEditor","jquery.wikiEditor.iframe"],"ext.wikiEditor"],["jquery.wikiEditor.toc","1371746208",["jquery.wikiEditor","jquery.wikiEditor.iframe","jquery.ui.draggable","jquery.ui.resizable","jquery.autoEllipsis","jquery.color"],"ext.wikiEditor"],["jquery.wikiEditor.toolbar","1371746208",["jquery.wikiEditor","jquery.wikiEditor.toolbar.i18n"],"ext.wikiEditor"],[
"jquery.wikiEditor.toolbar.config","1371746208",["jquery.wikiEditor","jquery.wikiEditor.toolbar.i18n","jquery.wikiEditor.toolbar","jquery.cookie","jquery.async"],"ext.wikiEditor"],["jquery.wikiEditor.toolbar.i18n","1347062400",[],"ext.wikiEditor"],["ext.wikiEditor","1371746208",["jquery.wikiEditor"],"ext.wikiEditor"],["ext.wikiEditor.dialogs","1371746208",["ext.wikiEditor","ext.wikiEditor.toolbar","jquery.wikiEditor.dialogs","jquery.wikiEditor.dialogs.config"],"ext.wikiEditor"],["ext.wikiEditor.highlight","1371746208",["ext.wikiEditor","jquery.wikiEditor.highlight"],"ext.wikiEditor"],["ext.wikiEditor.preview","1371746208",["ext.wikiEditor","jquery.wikiEditor.preview"],"ext.wikiEditor"],["ext.wikiEditor.previewDialog","1371746208",["ext.wikiEditor","jquery.wikiEditor.previewDialog"],"ext.wikiEditor"],["ext.wikiEditor.publish","1371746208",["ext.wikiEditor","jquery.wikiEditor.publish"],"ext.wikiEditor"],["ext.wikiEditor.templateEditor","1371746208",["ext.wikiEditor",
"ext.wikiEditor.highlight","jquery.wikiEditor.templateEditor"],"ext.wikiEditor"],["ext.wikiEditor.templates","1371746208",["ext.wikiEditor","ext.wikiEditor.highlight","jquery.wikiEditor.templates"],"ext.wikiEditor"],["ext.wikiEditor.toc","1371746208",["ext.wikiEditor","ext.wikiEditor.highlight","jquery.wikiEditor.toc"],"ext.wikiEditor"],["ext.wikiEditor.tests.toolbar","1371746208",["ext.wikiEditor.toolbar"],"ext.wikiEditor"],["ext.wikiEditor.toolbar","1371746208",["ext.wikiEditor","jquery.wikiEditor.toolbar","jquery.wikiEditor.toolbar.config"],"ext.wikiEditor"],["ext.wikiEditor.toolbar.hideSig","1371746208",[],"ext.wikiEditor"],["ext.templateData","1371746156"],["mobile.mainpage.styles","1371746110",["mobile.startup"],"other"],["mobile.mainpage.plumbing","1372191324",["mobile.startup"]],["mobile.mainpage.scripts","1371746110",["mobile.startup","mobile.mainpage.plumbing"],"other"],["mobile.file.styles","1371746110",["mobile.startup"]],["mobile.file.scripts","1371746110",[
"mobile.startup"]],["mobile.styles.page","1372190433",["mobile.startup"]],["mobile.styles","1372190433"],["mobile.styles.beta","1372190433"],["mobile.head","1371746110"],["mobile.startup","1372191324",["mobile.head"]],["mobile.stable.plumbing","1372191324",["mobile.startup"]],["mobile.beta.plumbing","1372191324",["mobile.startup"]],["mobile.beta.common","1372213042",["mobile.beta.plumbing","mobile.stable.common"]],["mobile.beta","1372213042",["mobile.stable","mobile.beta.common"]],["mobile.action.history","1371746110",["mobile.startup"],"other"],["mobile.history","1371746110"],["mobile.alpha","1372228659",["mobile.stable","mobile.beta","mobile.history"]],["mobile.toast.styles","1372191324"],["mobile.stable.styles","1372191324",["mobile.pagelist.styles"]],["mobile.stable.common","1372213042",["mobile.startup","mobile.stable.plumbing","mobile.toast.styles","mediawiki.jqueryMsg"]],["mobile.pagelist.styles","1372190433"],["mobile.stable","1372213042",["mobile.startup",
"mobile.stable.common","mediawiki.util","mobile.stable.styles"]],["mobile.desktop","1371746110",["jquery.cookie"]],["mobile.nearby.plumbing","1372191324",["mobile.startup"]],["mobile.nearby.previews","1371746110",["mobile.nearby.scripts","mobile.beta.common"]],["mobile.nearby.watchstar","1371746110",["mobile.nearby.scripts","mobile.stable"]],["mobile.nearby.styles","1372190433"],["mobile.nearby.scripts","1372190433",["mobile.stable.common","mobile.nearby.styles","mobile.nearby.plumbing","jquery.json","mobile.pagelist.styles"]],["mobile.notifications.styles","1371746110"],["mobile.uploads.plumbing","1372191324",["mobile.startup"]],["mobile.uploads.scripts","1372213042",["mobile.uploads.plumbing","mobile.stable.styles","mobile.stable.common"]],["mobile.mobilediff.scripts.beta","1371746110",["mobile.head"]],["mobile.xdevice.detect","1347062400"],["zero.config","1371746233"],["mobile.watchlist.schema","1347062400",["ext.eventLogging"]],["mobile.uploads.schema","1347062400",[
"ext.eventLogging"]],["mobile.editing.schema","1347062400",["ext.eventLogging"]],["ext.math.mathjax","1371746104",[],"ext.math.mathjax"],["ext.math.mathjax.enabler","1371746104"],["ext.babel","1371746006"],["ext.apiSandbox","1372213042",["mediawiki.util","jquery.ui.button"]],["ext.interwiki.specialpage","1371746093",["jquery.makeCollapsible"]],["ext.codeEditor","1371746032",["ext.wikiEditor.toolbar","jquery.codeEditor"],"ext.wikiEditor"],["jquery.codeEditor","1371746032",["jquery.wikiEditor","ext.codeEditor.ace","jquery.ui.resizable"],"ext.wikiEditor"],["ext.codeEditor.ace","1371746032",[],"ext.codeEditor.ace"],["ext.codeEditor.ace.modes","1371746032",["ext.codeEditor.ace"],"ext.codeEditor.ace"],["ext.codeEditor.geshi","1371746032",[],"ext.wikiEditor"],["ext.scribunto","1371746135",["jquery.ui.dialog"]],["ext.scribunto.edit","1371746135",["ext.scribunto","mediawiki.api"]],["ext.eventLogging","1371746066",["jquery.json","mediawiki.util"]],["ext.eventLogging.jsonSchema","1371759524"],[
"ext.campaigns","1371749810",["mediawiki.user","jquery.cookie"]],["schema.NavigationTiming","1347062400",["ext.eventLogging"]],["ext.navigationTiming","1371746112",["schema.NavigationTiming"]],["ext.TemplateSandbox","1371746156"],["ext.checkUser","1371746030",["mediawiki.util"]],["mw.PopUpMediaTransform","1371746159",["jquery.ui.dialog"]],["embedPlayerIframeStyle","1371746159"],["ext.tmh.transcodetable","1372213042"],["mw.MediaWikiPlayerSupport","1371746159",["mw.Api"]]]);mw.config.set({"wgLoadScript":"//bits.wikimedia.org/en.wikibooks.org/load.php","debug":false,"skin":"vector","stylepath":"//bits.wikimedia.org/static-1.22wmf8/skins","wgUrlProtocols":"http\\:\\/\\/|https\\:\\/\\/|ftp\\:\\/\\/|irc\\:\\/\\/|ircs\\:\\/\\/|gopher\\:\\/\\/|telnet\\:\\/\\/|nntp\\:\\/\\/|worldwind\\:\\/\\/|mailto\\:|news\\:|svn\\:\\/\\/|git\\:\\/\\/|mms\\:\\/\\/|\\/\\/","wgArticlePath":"/wiki/$1","wgScriptPath":"/w","wgScriptExtension":".php","wgScript":"/w/index.php","wgVariantArticlePath":false,
"wgActionPaths":{},"wgServer":"//en.wikibooks.org","wgUserLanguage":"en","wgContentLanguage":"en","wgVersion":"1.22wmf8","wgEnableAPI":true,"wgEnableWriteAPI":true,"wgMainPageTitle":"Main Page","wgFormattedNamespaces":{"-2":"Media","-1":"Special","0":"","1":"Talk","2":"User","3":"User talk","4":"Wikibooks","5":"Wikibooks talk","6":"File","7":"File talk","8":"MediaWiki","9":"MediaWiki talk","10":"Template","11":"Template talk","12":"Help","13":"Help talk","14":"Category","15":"Category talk","102":"Cookbook","103":"Cookbook talk","108":"Transwiki","109":"Transwiki talk","110":"Wikijunior","111":"Wikijunior talk","112":"Subject","113":"Subject talk","828":"Module","829":"Module talk"},"wgNamespaceIds":{"media":-2,"special":-1,"":0,"talk":1,"user":2,"user_talk":3,"wikibooks":4,"wikibooks_talk":5,"file":6,"file_talk":7,"mediawiki":8,"mediawiki_talk":9,"template":10,"template_talk":11,"help":12,"help_talk":13,"category":14,"category_talk":15,"cookbook":102,"cookbook_talk":103,"transwiki":
108,"transwiki_talk":109,"wikijunior":110,"wikijunior_talk":111,"subject":112,"subject_talk":113,"module":828,"module_talk":829,"wb":4,"wj":110,"cat":14,"cook":102,"sub":112,"image":6,"image_talk":7,"project":4,"project_talk":5},"wgSiteName":"Wikibooks","wgFileExtensions":["png","gif","jpg","jpeg","tiff","tif","xcf","pdf","mid","ogg","ogv","svg","djvu","ogg","ogv","oga","webm"],"wgDBname":"enwikibooks","wgFileCanRotate":true,"wgAvailableSkins":{"monobook":"MonoBook","vector":"Vector","modern":"Modern","cologneblue":"CologneBlue"},"wgExtensionAssetsPath":"//bits.wikimedia.org/static-1.22wmf8/extensions","wgCookiePrefix":"enwikibooks","wgResourceLoaderMaxQueryLength":-1,"wgCaseSensitiveNamespaces":[],"EmbedPlayer.DirectFileLinkWarning":true,"EmbedPlayer.EnableOptionsMenu":true,"EmbedPlayer.DisableJava":false,"EmbedPlayer.DisableHTML5FlashFallback":true,"TimedText.ShowInterface":"always","TimedText.ShowAddTextLink":true,"EmbedPlayer.WebPath":
"//bits.wikimedia.org/static-1.22wmf8/extensions/TimedMediaHandler/MwEmbedModules/EmbedPlayer","wgCortadoJarFile":false,"TimedText.ShowInterface.local":"off","AjaxRequestTimeout":30,"MediaWiki.DefaultProvider":"local","MediaWiki.ApiProviders":{"wikimediacommons":{"url":"//commons.wikimedia.org/w/api.php"}},"MediaWiki.ApiPostActions":["login","purge","rollback","delete","undelete","protect","block","unblock","move","edit","upload","emailuser","import","userrights"],"EmbedPlayer.OverlayControls":true,"EmbedPlayer.CodecPreference":["webm","h264","ogg"],"EmbedPlayer.DisableVideoTagSupport":false,"EmbedPlayer.ReplaceSources":null,"EmbedPlayer.EnableFlavorSelector":false,"EmbedPlayer.EnableIpadHTMLControls":true,"EmbedPlayer.WebKitPlaysInline":false,"EmbedPlayer.EnableIpadNativeFullscreen":false,"EmbedPlayer.iPhoneShowHTMLPlayScreen":true,"EmbedPlayer.ForceLargeReplayButton":false,"EmbedPlayer.LibraryPage":"http://www.kaltura.org/project/HTML5_Video_Media_JavaScript_Library",
"EmbedPlayer.RewriteSelector":"video,audio,playlist","EmbedPlayer.DefaultSize":"400x300","EmbedPlayer.ControlsHeight":31,"EmbedPlayer.TimeDisplayWidth":85,"EmbedPlayer.KalturaAttribution":true,"EmbedPlayer.AttributionButton":{"title":"Kaltura html5 video library","href":"http://www.kaltura.com","class":"kaltura-icon","style":[],"iconurl":false},"EmbedPlayer.EnableRightClick":true,"EmbedPlayer.EnabledOptionsMenuItems":["playerSelect","download","share","aboutPlayerLibrary"],"EmbedPlayer.WaitForMeta":true,"EmbedPlayer.ShowNativeWarning":true,"EmbedPlayer.ShowPlayerAlerts":true,"EmbedPlayer.EnableFullscreen":true,"EmbedPlayer.EnableTimeDisplay":true,"EmbedPlayer.EnableVolumeControl":true,"EmbedPlayer.NewWindowFullscreen":false,"EmbedPlayer.FullscreenTip":true,"EmbedPlayer.FirefoxLink":"http://www.mozilla.com/en-US/firefox/upgrade.html?from=mwEmbed","EmbedPlayer.NativeControls":false,"EmbedPlayer.NativeControlsMobileSafari":true,"EmbedPlayer.FullScreenZIndex":999998,
"EmbedPlayer.ShareEmbedMode":"iframe","EmbedPlayer.SkinList":["mvpcf","kskin"],"EmbedPlayer.DefaultSkin":"mvpcf","EmbedPlayer.MonitorRate":250,"EmbedPlayer.UseFlashOnAndroid":false,"EmbedPlayer.EnableURLTimeEncoding":"flash","EmbedPLayer.IFramePlayer.DomainWhiteList":"*","EmbedPlayer.EnableIframeApi":true,"EmbedPlayer.PageDomainIframe":true,"EmbedPlayer.NotPlayableDownloadLink":true,"EmbedPlayer.BlackPixel":"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%01%08%02%00%00%00%90wS%DE%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DB%0B%0A%17%041%80%9B%E7%F2%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%00%0CIDAT%08%D7c%60%60%60%00%00%00%04%00%01'4'%0A%00%00%00%00IEND%AEB%60%82","TimedText.ShowRequestTranscript":false,"TimedText.NeedsTranscriptCategory":"Videos needing subtitles","TimedText.BottomPadding":10,"TimedText.BelowVideoBlackBoxHeight":40,"wgCentralAuthWikiID":"enwikibooks",
"wgCentralAuthCentralAutoLoginEndpoint":"","wgCollectionVersion":"1.6.1","wgCollapsibleNavBucketTest":false,"wgCollapsibleNavForceNewVersion":false,"wgWikiEditorMagicWords":{"redirect":"#REDIRECT","img_right":"right","img_left":"left","img_none":"none","img_center":"center","img_thumbnail":"thumbnail","img_framed":"framed","img_frameless":"frameless"},"wgStopMobileRedirectCookie":{"name":"stopMobileRedirect","duration":30,"domain":".wikibooks.org","path":"/"},"wgMFNearbyEndpoint":"","wgMFNearbyNamespace":0,"wgEventLoggingBaseUri":"//bits.wikimedia.org/event.gif","wgNavigationTimingSamplingFactor":5000,"wgNoticeFundraisingUrl":"https://donate.wikimedia.org/wiki/Special:LandingCheck","wgCentralPagePath":"//meta.wikimedia.org/w/index.php","wgCentralBannerDispatcher":"//meta.wikimedia.org/wiki/Special:BannerRandom","wgCentralBannerRecorder":"//meta.wikimedia.org/wiki/Special:RecordImpression","wgNoticeXXCountries":["XX","EU","AP","A1","A2","O1"],"wgNoticeNumberOfBuckets":4,
"wgNoticeBucketExpiry":7,"wgNoticeNumberOfControllerBuckets":2,"wgNoticeCookieShortExpiry":1209600});};if(isCompatible()){document.write("\u003Cscript src=\"//bits.wikimedia.org/en.wikibooks.org/load.php?debug=false\u0026amp;lang=en\u0026amp;modules=jquery%2Cmediawiki%2CSpinner%7Cjquery.triggerQueueCallback%2CloadingSpinner%2CmwEmbedUtil%7Cmw.MwEmbedSupport\u0026amp;only=scripts\u0026amp;skin=vector\u0026amp;version=20130620T163512Z\"\u003E\u003C/script\u003E");}delete isCompatible;
/* cache key: enwikibooks:resourceloader:filter:minify-js:7:31ad031f3583e894046e69b24a1f0613 */