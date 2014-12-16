/* jslint asi:true, browser:true */

var current_scroll_target = 0;
var current_scroll_velocity = 0;
var current_scroll_hash = "#";
var should_push_state = false;
var Request = new XMLHttpRequest();

function loadSnippets() {
    Request.open("get", "/!DATA!/Snippets/snippets.html", true);
    Request.responseType = "document";
    Request.addEventListener("load", function(){
        document.body.insertBefore(document.importNode(this.responseXML.getElementById("topnav"), true), document.body.firstElementChild);
    }, false);
    Request.send();
}

function scroll() {
    var max_scroll = window.scrollMaxY;
    if (max_scroll === undefined) max_scroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var current_scroll_location = window.scrollY + window.innerHeight / 3;
    if (Math.abs(current_scroll_location - current_scroll_target) > 1 && max_scroll - window.scrollY > current_scroll_velocity && -1 * window.scrollY < current_scroll_velocity) {
        current_scroll_velocity = (current_scroll_velocity + (current_scroll_target - current_scroll_location) * 1023 / document.body.scrollHeight) / 2;
        if (current_scroll_velocity > 0) window.scrollBy(0, Math.ceil(current_scroll_velocity));
        else window.scrollBy(0, Math.floor(current_scroll_velocity));
        window.requestAnimationFrame(scroll);
    }
    else {
        window.scrollBy(0, current_scroll_target - current_scroll_location);
        current_scroll_velocity = 0;
        if (should_push_state) window.history.pushState(null, "", current_scroll_hash);
    }
}

function navHashFromLink(e) {
    if (document.getElementById(this.hash.substr(1))) {
        current_scroll_target = document.getElementById(this.hash.substr(1)).getBoundingClientRect().top + window.scrollY;
        current_scroll_velocity = 0;
        current_scroll_hash = this.hash;
        should_push_state = true;
        window.requestAnimationFrame(scroll);
        e.preventDefault();
    }
}

function navHashFromLocation() {
    if (window.location.hash && document.getElementById(window.location.hash.substr(1))) {
        current_scroll_target = document.getElementById(window.location.hash.substr(1)).getBoundingClientRect().top + window.scrollY;
        current_scroll_velocity = 0;
        current_scroll_hash = window.location.hash;
        should_push_state = false;
        window.requestAnimationFrame(scroll);
    }
}

function init() {
    loadSnippets();
    var hashLinks = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < hashLinks.length; i++) {
        hashLinks.item(i).addEventListener("click", navHashFromLink, false);
    }
    navHashFromLocation();
}

document.addEventListener("DOMContentLoaded", init, false);
window.addEventListener("popstate", navHashFromLocation, false);
