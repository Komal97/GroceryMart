const ajaxcall = {
    ajax(fn, url, key) {
        var xmlhttprqst = new XMLHttpRequest();
        xmlhttprqst.open("GET", url);
        xmlhttprqst.onreadystatechange = function() {
            if (xmlhttprqst.readyState == 4 && xmlhttprqst.status == 200) {
                fn(xmlhttprqst.responseText, key);
            }
        }
        xmlhttprqst.send(null);
    }
}