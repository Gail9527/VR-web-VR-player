var frequency_period = 5;
var host_syndication = 'syndication.exoclick.com';
if(typeof(ad_sub) == 'undefined') var ad_sub = "";
if(typeof(ad_tags) == 'undefined') var ad_tags = "";

(function(document, ad_idzone, ad_width, ad_height, h_pos, v_pos, host_syndication, screen, ad_sub, ad_tags) {

    function setCookie(c_name, value, minutes_ttl) {
        var exdate = new Date();
        exdate.setMinutes(exdate.getMinutes() + minutes_ttl);
        var c_value = escape(value) + "; expires=" + exdate.toUTCString() + ";domain=." + document.location.hostname + ";path=/";
        document.cookie = c_name + "=" + c_value;
    }

    function getCookie(c_name) {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
            {
                return unescape(y);
            }
        }
    }

    function getIframeUrl(document, ad_idzone, ad_width, ad_height, host_syndication, screen, ad_sub, ad_tags){
        if(top===self) var p=document.URL; else var p=document.referrer;
        var dt=new Date().getTime();
        var exoDocumentProtocol = (document.location.protocol != "https:" && document.location.protocol != "http:") ? "https:" : document.location.protocol;
        var ad_type = ad_width + 'x' + ad_height;
        if(ad_width == '100%' && ad_height == '100%') ad_type = 'auto';
        var ad_screen_resolution = screen.width + 'x' + screen.height;

        return exoDocumentProtocol + '//' + host_syndication  + '/ads-iframe-display.php?idzone=' + ad_idzone + '&type=' + ad_type + '&p=' + escape(p) + '&dt=' + dt + '&sub=' + ad_sub + '&tags=' + ad_tags + '&screen_resolution=' + ad_screen_resolution + '&sticky=1';
    }

    var iframe_url = getIframeUrl(document, ad_idzone, ad_width, ad_height, host_syndication, screen, ad_sub, ad_tags);
    var content = '<iframe frameborder="0" scrolling="no" style="border: none;" width="' + ad_width + '" height="' + ad_height + '" src="' + iframe_url + '"></iframe>';
	content += '<div style="width: 15px; height: 15px; position: absolute; top: 0px; right: 0px; background-color: #ddd; cursor: pointer;">';
	content += '<a style="text-decoration: none; color: #b5a871; float: right; border: none; position: absolute; right: 0px; top: -2px; font-weight: bold; padding-right: 3px; cursor: pointer;">&#10799;</a>';
	content += '</div>';

	var h_pos_css;
	var v_pos_css;
    var default_margin_px = 20;

	switch (h_pos){
		case "left":
			h_pos_css = "left: 0px; margin-left: " + default_margin_px + "px;";
			break;
		case "right":
			h_pos_css = "right: 0px; margin-right: " + default_margin_px + "px;";
			break;
        case "center":
        default:
			h_pos_css = "left: 50%; margin-left: -" + (ad_width/2) + "px;";
			break;
	}

	switch (v_pos){
		case "top":
			v_pos_css = "top: 0px; margin-top: " + default_margin_px + "px;";
			break;
		case "bottom":
			v_pos_css = "bottom: 0px; margin-bottom: " + default_margin_px + "px;";
			break;
        case "middle":
        default:
			v_pos_css = "top: 50%; margin-top: -" + (ad_height/2) + "px;";
			break;
	}

    function display() {
        var container = document.createElement("div");
        container.setAttribute("id", "sticky-banner-" + ad_idzone);
        container.style.cssText = "display: none; position: fixed; height:" + ad_height + "px; width: " + ad_width + "px; " + h_pos_css + v_pos_css + "; z-index: 999999;";
        container.innerHTML = content;
        document.body.insertBefore(container, document.body.childNodes[0]);

        var closeButton = container.childNodes[1];
        closeButton.addEventListener('mousedown', function(evt){ close(evt, container); }, true);
        closeButton.addEventListener('touchstart', function(evt){ close(evt, container); }, true);
        closeButton.addEventListener('mouseup', function(evt){ close(evt, container); }, true);
        closeButton.addEventListener('touchend', function(evt){ close(evt, container); }, true);
    }

    function close(evt, container) {
       evt.stopPropagation();
       evt.preventDefault();
       container.style.display = "none";
       setCookie('sticky-closed-' + ad_idzone, true, frequency_period);
    }

    var closedStatus = getCookie('sticky-closed-' + ad_idzone);
    if (!closedStatus) {
        display();
    }
})(document, ad_idzone, ad_width, ad_height, h_pos, v_pos, host_syndication, screen, ad_sub, ad_tags);