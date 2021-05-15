'use strict';
$(document).foundation();

// Pre-loader
setTimeout(() => {
    $('body').addClass('loaded');
    $('h1').css('color', '#222222');
}, 3000);

// Set this to the local filename or remote URL of the markdown file content.
const readme = 'readme.md';
// Set our regex checks for release and tag
const regex_version = /{{REPOID=(.*)}{ASSET=(.*)}}/g;
const regex_tag = /{{REPOID=(.*)}{TAG=(.*)}}/g;
// Create some variables we will use.
let releaseurl;
let giturl;
let assest_id;
let repoid;
let newstr;
let tag_json;
let decodeHTML;
let md;
let txt;

// Our function to generate the dynamic URL based on the magic variable.
function getlatestreleaseinfo() {
    $.ajaxSetup(
        {
            async: false
        });

    newstr = document.getElementById('markdown-content').innerHTML;

    // The while loop to check regex_version
    // eslint-disable-next-line no-cond-assign
    while (repoid = regex_version.exec(newstr)) {
        giturl = repoid[1];
        assest_id = repoid[2];
        $.getJSON('https://api.github.com/repos/' + giturl + '/releases').done(json => {
            if (json[0] !== null) {
                if (json[0].assets[assest_id] !== null) {
                    releaseurl = json[0].assets[assest_id].browser_download_url;
                } else if (json[0] === null) {
                    releaseurl = json[0].tag_name;
                }

                newstr = newstr.replace(repoid[0], releaseurl);
            }
        });
    }

    // The while loop to check regex_tag
    // eslint-disable-next-line no-cond-assign
    while (repoid = regex_tag.exec(newstr)) {
        giturl = repoid[1];
        assest_id = repoid[2];
        $.getJSON('https://api.github.com/repos/' + giturl + '/tags').done(json => {
            tag_json = json.find(({name}) => RegExp(assest_id, 'g').test(name));
            if (json[0] !== null) {
                releaseurl = tag_json.name;
            }

            newstr = newstr.replace(repoid[0], releaseurl);
        });
    }

    // Create our dynamic content and set it to the newstr variable
    document.getElementById('markdown-content').innerHTML = newstr;
    // Decode the html so that code boxes don't have ampersands and other encoded symbols.
    decodeHTML = function (html) {
        txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    // Using markdown-it with the container plugin instead of markedjs
    md = window.markdownit({html: false, xhtmlOut: true, typographer: true, linkify: true})
        .use(window.markdownitContainer, 'note', {})
        .use(window.markdownitContainer, 'warning', {})
        .use(window.markdownitContainer, 'caution', {})
        .use(window.markdownItAnchor, {permalink: false, permalinkBefore: false, permalinkSymbol: '#'})
        .use(window.markdownItTocDoneRight, {
            listType: 'ul',
            level: '2',
            callback(html) {
                $('#toc').html(html);
            }
        });

    $('#markdown-content').html(md.render(decodeHTML(newstr)));

    // Prism highlight
    // eslint-disable-next-line no-undef
    Prism.highlightAll();
}

// Our fetch code to load the markdown content from a local or remote file.
fetch(readme).then(response => response.text()).then(data => {
    // eslint-disable-next-line no-undef
    document.getElementById('markdown-content').innerHTML = DOMPurify.sanitize(data);
    // Load out function to generate the dynamic URLs
    $(document).ready(() => {
        getlatestreleaseinfo();
    });
});
