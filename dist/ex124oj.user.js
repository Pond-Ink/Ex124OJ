// ==UserScript==
// @name         Ex124OJ
// @namespace    http://tampermonkey.net/
// @version      1.1.4
// @description  Extend 124OJ!
// @author       Sukwants
// @license      MIT
// @match        http://124.221.194.184/*
// @icon         https://ex124oj.pond.ink/images/icon.png
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_xmlhttpRequest
// @connect      ex124oj.pond.ink
// @run-at       document-start
// ==/UserScript==


/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 579:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exAnnouncements = void 0;
function exAnnouncements() {
    var PostsExp = /<body[\s\S]*?>([\s\S]*?)<\/body>/;
    var WrittenByExp = /^by (.*)$/;
    var DateTimeExp = /^(.*?) .*$/;
    if (document.getElementsByClassName('uoj-content')[0].children[0].children[0].children[0]) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://ex124oj.pond.ink/categories/Announcements/",
            revalidate: true,
            onload: function (data) {
                var Announcements = document.querySelector('div.uoj-content > div.card.card-default > div.card-body > div.row > div:first-child > table');
                if (Announcements) {
                    Announcements.querySelector('thead > tr').innerHTML = '<th style="width:30%">公告</th><th style="width:10%"></th><th style="width:10%"></th><th style="width:30%">Ex 公告</th><th style="width:10%"></th><th style="width:10%"></th>';
                    var trs = Announcements.querySelectorAll('tbody > tr');
                    for (var tr = 0; tr < trs.length - 1; ++tr) {
                        if (trs[tr].innerHTML) {
                            trs[tr].innerHTML = (trs[tr].children.length > 2 ? trs[tr].innerHTML : '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>') + '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
                            if (WrittenByExp.test(trs[tr].children[1] && trs[tr].children[1].innerHTML)) {
                                trs[tr].children[1].innerHTML = trs[tr].children[1].innerHTML.match(WrittenByExp)[1];
                            }
                            if (DateTimeExp.test(trs[tr].children[2] && trs[tr].children[2].innerHTML)) {
                                trs[tr].children[2].innerHTML = '<small>' + trs[tr].children[2].textContent.match(DateTimeExp)[1] + '</small>';
                            }
                        }
                    }
                    trs[trs.length - 1].innerHTML = '<td class="text-right" colspan="3"><a href="/announcements">所有公告……</a></td><td class="text-right" colspan="3"><a href="https://ex124oj.pond.ink/categories/Announcements/">所有公告……</a></td>';
                    var PostsPage = (new DOMParser()).parseFromString(data.response, 'text/html');
                    var Posts = PostsPage.querySelectorAll('article');
                    for (var i = 0; i < Posts.length && i < 5; ++i) {
                        var title = Posts[i].querySelector('a.post-title-link');
                        Announcements.querySelector('tbody').children[i].children[3].innerHTML = "<a href=\"https://ex124oj.pond.ink".concat(title.getAttribute('href'), "\">").concat(title.innerText, "</a>");
                        Announcements.querySelector('tbody').children[i].children[4].innerHTML = '<a class="uoj-username" href="https://ex124oj.pond.ink/" style="color:rgb(40,173,202)">Ex124OJ</a>';
                        var date = Posts[i].querySelector('time');
                        Announcements.querySelector('tbody').children[i].children[5].innerHTML = '<small>' + date.getAttribute('content') + '</small>';
                    }
                }
            }
        });
    }
}
exports.exAnnouncements = exAnnouncements;


/***/ }),

/***/ 690:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.changeIcon = exports.Background = void 0;
var variables_1 = __webpack_require__(449);
function Background() {
    if (variables_1.BackgroundImage) {
        var titlebar = document.querySelector('div.container > div:first-child');
        if (titlebar) {
            titlebar.style.marginLeft = titlebar.style.marginRight = '-15px';
        }
        GM_addStyle("body {\n    background: url(".concat(variables_1.BackgroundImage, ");\n    background-repeat: no-repeat;\n    background-attachment: fixed;\n    background-position: 50% 50%;\n    background-size: cover;\n}\n.uoj-content {\n    background-color: ").concat(!variables_1.Darktheme ? '#fff' : '#222', ";\n    margin: 16px -16px;\n    padding: 16px 16px;\n    opacity: 0.85;\n    border-radius: 8px;\n}\n.navbar {\n    margin: 16px -16px;\n    padding: 8px 16px;\n    opacity: 0.85;\n    border-radius: 8px;\n}\n.giscus {\n    opacity: 0.85;\n}"));
    }
}
exports.Background = Background;
function getIcon() {
    if (variables_1.SiteIconImage)
        return variables_1.SiteIconImage;
    else
        return '/images/logo.png';
}
function getIconSmall() {
    if (variables_1.SiteIconSmallImage)
        return variables_1.SiteIconSmallImage;
    else
        return getIcon();
}
function changeIcon() {
    var LogoURLRegExp = /^.*\/images\/logo(_small){0,1}.png$/;
    var Links = document.getElementsByTagName('link');
    for (var link in Links) {
        if (Links[link] && Links[link].nodeType && Links[link].getAttribute('rel') == 'shortcut icon') {
            Links[link].setAttribute('href', getIconSmall());
        }
    }
    var Icons = document.getElementsByTagName('img');
    for (var icon in Icons) {
        if (Icons[icon] instanceof Element && Icons[icon].nodeType === Node.ELEMENT_NODE) {
            var srcAttribute = Icons[icon].getAttribute('src');
            if (srcAttribute !== null && LogoURLRegExp.test(srcAttribute)) {
                if (!Icons[icon].getAttribute('style')) {
                    Icons[icon].setAttribute('src', getIcon());
                    Icons[icon].setAttribute('style', 'width:100%;height:auto;object-fit:cover');
                }
                else {
                    Icons[icon].setAttribute('src', getIconSmall());
                }
            }
        }
    }
}
exports.changeIcon = changeIcon;


/***/ }),

/***/ 480:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeCopy = void 0;
var variables_1 = __webpack_require__(449);
function CodeCopy() {
    if (!(/^.*\/manage\/statement(\?.*){0,1}$/).test(window.location.href)) {
        var CodeBlocks = document.getElementsByTagName('pre');
        var _loop_1 = function (cb) {
            if (CodeBlocks[cb] && CodeBlocks[cb].nodeType) {
                var Content_1 = CodeBlocks[cb].innerText;
                CodeBlocks[cb].style.position = 'relative';
                var CopyButton_1 = document.createElement('button');
                CodeBlocks[cb].insertBefore(CopyButton_1, CodeBlocks[cb].children[0]);
                CopyButton_1.setAttribute('class', 'copybutton');
                CopyButton_1.setAttribute('id', "copybutton".concat(cb));
                if (variables_1.Darktheme)
                    CopyButton_1.setAttribute('style', "color: white;");
                CopyButton_1.innerHTML = '<i class="fa-solid fa-copy"></i>';
                CopyButton_1.onclick = function () {
                    GM_setClipboard(Content_1, 'text');
                    CopyButton_1.innerHTML = '<i class="fa-solid fa-check"></i>';
                    setTimeout(function () { CopyButton_1.innerHTML = '<i class="fa-solid fa-copy"></i>'; }, 500);
                };
            }
        };
        for (var cb in CodeBlocks) {
            _loop_1(cb);
        }
    }
}
exports.CodeCopy = CodeCopy;


/***/ }),

/***/ 103:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContestStandings = exports.ContestHome = exports.ContestsCard = void 0;
var name_1 = __webpack_require__(819);
var variables_1 = __webpack_require__(449);
var utils_1 = __webpack_require__(593);
function ContestsCard() {
    var content = document.querySelector('div.uoj-content');
    if (content && content.children.length > 1) {
        var TabList = document.createElement('ul');
        content.insertBefore(TabList, content.children[0]);
        TabList.setAttribute('class', 'nav nav-tabs');
        TabList.setAttribute('role', 'tablist');
        var TabContent = document.createElement('div');
        content.insertBefore(TabContent, content.children[1]);
        TabContent.setAttribute('class', 'tab-content');
        TabContent.style.marginBottom = '20px';
        TabContent.style.marginTop = '20px';
        var counter = 0;
        for (var i = 2; i < content.children.length; i++) {
            console.log(content.children[i].tagName);
            if (content.children[i].tagName.toUpperCase() == 'H4') {
                var isActive = !counter;
                var title = document.createElement('li');
                TabList.appendChild(title);
                title.setAttribute('class', 'nav-item');
                var titleText = content.children[i].textContent;
                if (titleText) {
                    titleText = titleText.charAt(0).toUpperCase() + titleText.slice(1);
                    title.innerHTML = "<a class=\"nav-link".concat(isActive ? ' active' : '', "\" href=\"#card").concat(counter, "\" role=\"tab\" data-toggle=\"tab\" aria-selected=\"true\">").concat(titleText, "</a>");
                }
                var card = document.createElement('div');
                TabContent.appendChild(card);
                card.setAttribute('class', "tab-pane".concat(isActive ? ' active' : ''));
                card.setAttribute('id', "card".concat(counter));
                content.removeChild(content.children[i]);
                counter++;
            }
            else if (counter) {
                TabContent.children[counter - 1].appendChild(content.children[i]);
            }
            else {
                content.removeChild(content.children[i]);
            }
            i--;
        }
    }
}
exports.ContestsCard = ContestsCard;
function ContestHome() {
    var content = document.querySelector('div.uoj-content');
    if (content && content.querySelectorAll('div').length < 2) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://ex124oj.pond.ink/api/contest/".concat((0, utils_1.isContest)()[1]),
            revalidate: true,
            onload: function (data) {
                if (data.status == 200) {
                    var res = JSON.parse(data.response);
                    var title = document.querySelector('head > title');
                    if (title && res.title) {
                        title.innerHTML = res.title;
                    }
                    var content_1 = document.querySelector('div.uoj-content');
                    if (content_1 && res.content) {
                        content_1.innerHTML = res.content;
                        eval('$(".countdown").countdown();');
                    }
                }
            }
        });
    }
}
exports.ContestHome = ContestHome;
function PinLineHeader() {
    var lines = document.querySelectorAll('div#standings > div.table-responsive > table tr');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var x = 0;
        for (var j = 0; j < line.children.length && j < 3; j++) {
            line.children[j].style.position = 'sticky';
            line.children[j].style.left = x + 'px';
            line.children[j].classList.add('checked');
            x = x + parseFloat(window.getComputedStyle(line.children[j]).width);
        }
    }
}
var ContestHomepage;
function ProblemTitles() {
    var solve = function () {
        var lines = document.querySelectorAll('div#standings > div.table-responsive > table tr');
        var problems = {};
        var rows = ContestHomepage.querySelectorAll('table > tbody > tr');
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].children.length >= 2) {
                var id = rows[i].children[0].textContent, title = rows[i].children[1].textContent;
                if (id && title) {
                    problems[id] = "".concat(id, ". ").concat(title);
                }
            }
        }
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            for (var j = 3; j < line.children.length; j++) {
                var title = lines[0].children[j].querySelector('a');
                if (title && title.textContent && problems[title.textContent]) {
                    line.children[j].title = problems[title.textContent];
                }
            }
        }
    };
    if (ContestHomepage) {
        solve();
    }
    else {
        GM_xmlhttpRequest({
            method: "GET",
            url: "/contest/".concat(contest_id),
            revalidate: true,
            onload: function (data) {
                ContestHomepage = (new DOMParser()).parseFromString(data.response, 'text/html');
                solve();
            }
        });
    }
}
var Problemchecked = [];
function ShowStandings() {
    PinLineHeader();
    ProblemTitles();
    var lines = document.querySelectorAll('div#standings > div.table-responsive > table tr');
    if (!lines.length) {
        return;
    }
    var sum = 0;
    for (var k = 0; k < lines.length; k++) {
        var _loop_1 = function (i) {
            if (Problemchecked[i - 3]) {
                lines[k].children[i].classList.add('checked');
                if (k == 0)
                    sum++;
            }
            lines[k].children[i].addEventListener('click', function (event) {
                var target = event.target;
                if (target.tagName === 'A') {
                    return;
                }
                Problemchecked[i - 3] = !Problemchecked[i - 3];
                displayStandings();
            });
        };
        for (var i = 3; i < lines[k].children.length; i++) {
            _loop_1(i);
        }
    }
    if (sum == 0) {
        return;
    }
    var scores = document.querySelectorAll('div#standings > div.table-responsive > table > tbody > tr > td:nth-child(3) > div > span.uoj-score');
    for (var i = 0; i < scores.length; i++) {
        scores[i].style.color = getColOfScore(standings[i][0] / sum);
    }
}
function displayStandings(initial) {
    var standingsArea = document.querySelector('div#standings');
    if (!standingsArea) {
        return;
    }
    var lines = standingsArea.querySelectorAll('div.table-responsive > table tr');
    var headline = lines[0];
    var Problemsum = headline.children.length - 3;
    var Usersum = lines.length - 1;
    // let checked = false;
    // for (let i = 0; i < Problemsum; i++) {
    //     checked = checked || Problemchecked[i];
    // }
    for (var i = 0; i < Usersum; i++) {
        var name_2 = standings[i][2][0];
        standings[i][0] = standings[i][1] = 0;
        for (var j = 0; j < Problemsum; j++) {
            if ((Problemchecked[j] /* || !checked*/) && score[name_2][j] !== undefined) {
                standings[i][0] += score[name_2][j][0], standings[i][1] += score[name_2][j][1];
            }
        }
    }
    standings.sort(function (a, b) {
        return a[0] != b[0] ? b[0] - a[0] : a[1] - b[1];
    });
    for (var i = 0; i < Usersum; i++) {
        if (!i || standings[i][0] != standings[i - 1][0] || standings[i][1] != standings[i - 1][1]) {
            standings[i][3] = i + 1;
        }
        else {
            standings[i][3] = standings[i - 1][3];
        }
    }
    var tableBefore = document.querySelector('div.table-responsive');
    if (tableBefore && tableBefore.children[0]) {
        var ScrollRight = parseInt(window.getComputedStyle(tableBefore.children[0]).width) - tableBefore.scrollLeft;
        showStandings();
        // if (!initial) {
        (0, name_1.NameColor)(standingsArea);
        (0, name_1.NameBadge)(standingsArea);
        // }
        ShowStandings();
        var tableAfter = document.querySelector('div.table-responsive');
        if (tableAfter && tableAfter.children[0]) {
            tableAfter.scrollLeft = parseInt(window.getComputedStyle(tableAfter.children[0]).width) - ScrollRight;
        }
    }
}
function NavBar(ProblemSum) {
    var navtabs = document.querySelector('div.uoj-content ul[role=tablist]');
    if (!navtabs) {
        return;
    }
    var navbar = document.createElement('div');
    navtabs.before(navbar);
    navbar.setAttribute('style', variables_1.Darktheme ? 'border-bottom: 1px solid #2e2e30;' : 'border-bottom: 1px solid #dee2e6;');
    var floatright = document.createElement('div');
    navbar.appendChild(floatright);
    floatright.setAttribute('class', 'float-right');
    var unselectall = document.createElement('a');
    floatright.appendChild(unselectall);
    unselectall.setAttribute('class', 'btn btn-info btn-sm');
    unselectall.setAttribute('target', '_blank');
    unselectall.style.color = '#fff';
    unselectall.style.cursor = 'pointer';
    unselectall.addEventListener('click', function () {
        Problemchecked = new Array(ProblemSum).fill(true);
        displayStandings();
    });
    unselectall.innerHTML = '全选';
    var selectall = document.createElement('a');
    floatright.appendChild(selectall);
    selectall.setAttribute('class', 'btn btn-primary btn-sm');
    selectall.setAttribute('target', '_blank');
    selectall.style.color = '#fff';
    selectall.style.cursor = 'pointer';
    selectall.addEventListener('click', function () {
        Problemchecked = new Array(ProblemSum).fill(false);
        displayStandings();
    });
    selectall.innerHTML = '全不选';
    navbar.appendChild(navtabs);
    navtabs.setAttribute('style', 'border-bottom: none');
}
function ContestStandings() {
    GM_addStyle("\ndiv#standings > div.table-responsive > table > thead > tr > th:nth-child(-n+3)::before,\ndiv#standings > div.table-responsive > table > tbody > tr > td:nth-child(-n+3)::before {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    right: 100%;\n    width: 1px;\n    height: 100%;\n    background-color: ".concat(variables_1.Darktheme ? '#2e2e30' : '#dee2e6', ";\n}\n\ndiv#standings > div.table-responsive > table > thead > tr > th.checked, \ndiv#standings > div.table-responsive > table > tbody > tr:nth-of-type(even) > td.checked {\n    background-color: ").concat(variables_1.Darktheme ? '#192523' : '#F4FFFF', ";\n}\ndiv#standings > div.table-responsive > table > tbody > tr:nth-of-type(odd) > td.checked {\n    background-color: ").concat(variables_1.Darktheme ? '#1F2B29' : '#F0FFFF', ";\n}\n\n"));
    var ProblemSum = document.querySelectorAll('div#standings > div.table-responsive > table > thead > tr > th').length - 3;
    Problemchecked = new Array(ProblemSum).fill(true);
    displayStandings(true);
    NavBar(ProblemSum);
}
exports.ContestStandings = ContestStandings;


/***/ }),

/***/ 992:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscussionCard = void 0;
var variables_1 = __webpack_require__(449);
var variables_2 = __webpack_require__(449);
function DiscussionCard() {
    var _a;
    var footer = document.querySelector('div.uoj-footer');
    if (footer) {
        var discrd = document.createElement('div');
        discrd.setAttribute('class', 'giscus');
        footer.insertBefore(discrd, footer.firstChild);
        GM_addElement('script', {
            'src': 'https://giscus.app/client.js',
            'data-repo': 'Sukwants/Ex124OJ-discussions',
            'data-repo-id': 'R_kgDOImiZLA',
            'data-category': 'Ideas',
            'data-category-id': 'DIC_kwDOImiZLM4CTCIj',
            'data-mapping': 'pathname',
            'data-strict': '0',
            'data-reactions-enabled': '1',
            'data-emit-metadata': '0',
            'data-input-position': 'top',
            'data-theme': variables_2.Darktheme ? 'dark' : 'light',
            'data-lang': 'zh-CN',
            'data-loading': 'lazy',
            'crossorigin': 'anonymous',
            'async': ''
        });
        GM_addStyle(".giscus {\n    display: ".concat((variables_1.Academic == true ? 'none' : 'unset'), ";\n}\n.giscus-frame {\n    margin-top: 20px;\n}"));
        var lanButton = document.getElementsByClassName('btn-group dropright mb-3')[0];
        var blankLine = document.createElement('div');
        blankLine.style.marginTop = '20px';
        (_a = lanButton.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(blankLine, lanButton);
    }
}
exports.DiscussionCard = DiscussionCard;


/***/ }),

/***/ 18:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.changeGravatarURL = void 0;
function changeGravatarURL() {
    var GravatarURLRegExp = /\/\/cn.gravatar.com\/avatar\/(.*)/;
    var Gravatars = document.querySelectorAll('img');
    for (var i in Gravatars) {
        if (Gravatars[i] && Gravatars[i].nodeType
            && GravatarURLRegExp.test(Gravatars[i].getAttribute('src'))
            && Gravatars[i].getAttribute('alt').toLowerCase().includes('avatar')) {
            Gravatars[i].setAttribute('src', '//cravatar.cn/avatar/' + Gravatars[i].getAttribute('src').match(GravatarURLRegExp)[1]);
        }
    }
}
exports.changeGravatarURL = changeGravatarURL;


/***/ }),

/***/ 819:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NameBadge = exports.NameColor = void 0;
var variables_1 = __webpack_require__(449);
function NameColor(where) {
    if (!where) {
        where = document;
    }
    var Names = where.querySelectorAll('.uoj-username, .uoj-honor');
    for (var i in Names) {
        if (Names[i].innerHTML && variables_1.NameColorList[Names[i].innerHTML]) {
            Names[i].style.color = variables_1.NameColorList[Names[i].innerHTML][0];
            var resN = '';
            for (var char = 1; char < variables_1.NameColorList[Names[i].innerHTML].length; ++char) {
                resN = resN + "<font style=\"color:".concat(variables_1.NameColorList[Names[i].innerHTML][char], "\">").concat(Names[i].innerHTML.substring(char - 1, char), "</font>");
            }
            Names[i].innerHTML = resN + Names[i].innerHTML.substring(variables_1.NameColorList[Names[i].innerHTML].length - 1);
        }
    }
}
exports.NameColor = NameColor;
function NameBadge(where) {
    var _a;
    if (!where) {
        where = document;
    }
    var ccfbadgecode = function (color) { return "<svg width=\"1em\" height=\"1em\" data-v-303bbf52=\"\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fad\" data-icon=\"badge-check\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" style=\"margin-bottom:.25em!important;bottom:10px;--fa-primary-color:#fff;--fa-secondary-color:".concat(color, ";--fa-secondary-opacity:1;\"><g data-v-303bbf52=\"\" class=\"fa-group\"><path data-v-303bbf52=\"\" fill=\"var(--fa-secondary-color)\" d=\"M512 256a88 88 0 0 0-57.1-82.4A88 88 0 0 0 338.4 57.1a88 88 0 0 0-164.8 0A88 88 0 0 0 57.1 173.6a88 88 0 0 0 0 164.8 88 88 0 0 0 116.5 116.5 88 88 0 0 0 164.8 0 88 88 0 0 0 116.5-116.5A88 88 0 0 0 512 256zm-144.8-44.25l-131 130a11 11 0 0 1-15.55-.06l-75.72-76.33a11 11 0 0 1 .06-15.56L171 224a11 11 0 0 1 15.56.06l42.15 42.49 97.2-96.42a11 11 0 0 1 15.55.06l25.82 26a11 11 0 0 1-.08 15.56z\" class=\"fa-secondary\"></path></g></svg>"); };
    var tagbadgecode = function (color, text) { return "<span style=\"background-color:".concat(color, ";padding:0.2em 0.6em;border-radius:.2em;color:#fff;font-size:0.7em;font-weight:bold;display:inline-block\">").concat(text, "</span>"); };
    var Names = where.querySelectorAll('.uoj-username, .uoj-honor');
    for (var i in Names) {
        var name_1 = Names[i].textContent;
        if (!name_1 || ((_a = Names[i].parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('class')) == 'legendLabel')
            continue;
        if (variables_1.CCFBadgeList[name_1]) {
            for (var j in variables_1.CCFBadgeList[name_1]) {
                Names[i].innerHTML += " ".concat(ccfbadgecode(variables_1.CCFBadgeList[name_1][j]));
            }
        }
        if (variables_1.TagBadgeList[name_1]) {
            for (var j in variables_1.TagBadgeList[name_1]) {
                Names[i].innerHTML += " ".concat(tagbadgecode(variables_1.TagBadgeList[name_1][j].color, variables_1.TagBadgeList[name_1][j].text));
            }
        }
    }
}
exports.NameBadge = NameBadge;


/***/ }),

/***/ 823:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Problem = void 0;
var utils_1 = __webpack_require__(593);
var variables_1 = __webpack_require__(449);
var code_1 = __webpack_require__(480);
function appendsource() {
    var mathjaxconfig = document.createElement('script');
    mathjaxconfig.type = 'text/x-mathjax-config';
    mathjaxconfig.innerHTML = "\n        MathJax.Hub.Config({\n            showProcessingMessages: false,\n            tex2jax: {\n                inlineMath: [[\"$\", \"$\"], [\"\\\\(\", \"\\\\)\"]],\n                processEscapes:true\n            },\n            menuSettings: {\n                zoom: \"Hover\"\n            }\n        });\n    ";
    document.head.appendChild(mathjaxconfig);
    var mathjax = document.createElement('script');
    mathjax.src = '//cdn.bootcss.com/mathjax/2.6.0/MathJax.js?config=TeX-AMS_HTML';
    document.head.appendChild(mathjax);
    var jquery = document.createElement('script');
    jquery.src = 'http://124.221.194.184/js/jquery.form.min.js';
    document.head.appendChild(jquery);
    var shtypical = document.createElement('link');
    shtypical.type = 'text/css';
    shtypical.rel = 'stylesheet';
    shtypical.href = 'http://124.221.194.184/css/sh_typical.min.css';
    document.head.append(shtypical);
    var shmain = document.createElement('script');
    shmain.src = 'http://124.221.194.184/js/sh_main.min.js';
    document.head.appendChild(shmain);
    shmain.addEventListener('load', function () {
        sh_highlightDocument();
    });
}
function Problem() {
    GM_addStyle("\n.partly-hidden {\n    transition: opacity 125ms;\n}\n.partly-hidden:not(:hover) {\n    opacity: 0;\n}\n    ");
    var uojcontent = document.querySelector('div.uoj-content');
    if (!uojcontent) {
        return;
    }
    if (!uojcontent.querySelectorAll('.page-header').length) {
        var lostpage_1 = document.body.innerHTML;
        uojcontent.innerHTML = "\n<div class=\"row d-flex justify-content-center\">\n    <span class=\"badge badge-secondary mr-1\" id=\"time-limit\">\u65F6\u95F4\u9650\u5236:</span>\n    <span class=\"badge badge-secondary mr-1\" id=\"memory-limit\">\u7A7A\u95F4\u9650\u5236:</span>\n</div>\n<div class=\"float-right\">\n    <div class=\"uoj-click-zan-block\" id=\"vote\"></div>\n</div>\n".concat((function () {
            if ((0, utils_1.isProblem)()[2]) {
                return "\n<div class=\"page-header row\">\n    <h1 class=\"col-md-3 text-left\" id=\"contest-name\"><small></small></h1>\n    <h1 class=\"col-md-7 text-center\" id=\"problem-name\"></h1>\n    <div class=\"col-md-2 text-right\" id=\"contest-countdown\"></div>\n</div>\n        ";
            }
            else {
                return "<h1 class=\"page-header text-center\" id=\"problem-name\"></h1>";
            }
        })(), "\n<a role=\"button\" class=\"btn btn-info float-right\" href=\"").concat((0, utils_1.isProblem)()[2] ? "/contest/".concat((0, utils_1.isProblem)()[2]) : '', "/problem/").concat((0, utils_1.isProblem)()[3], "/statistics\"><span class=\"glyphicon glyphicon-stats\"></span> \u7EDF\u8BA1</a>\n\n<ul class=\"nav nav-tabs\" role=\"tablist\">\n    <li class=\"nav-item\"><a class=\"nav-link active\" href=\"#tab-statement\" role=\"tab\" data-toggle=\"tab\"><span class=\"glyphicon glyphicon-book\"></span> \u63CF\u8FF0</a></li>\n    ").concat((0, utils_1.isProblem)()[2] ? "<li class=\"nav-item\"><a class=\"nav-link\" id=\"nav-contest\" href=\"/contest/".concat((0, utils_1.isProblem)()[2], "\" role=\"tab\">\u8FD4\u56DE\u6BD4\u8D5B</a></li>") : '', "\n</ul>\n<div class=\"tab-content\">\n    <div class=\"tab-pane active\" id=\"tab-statement\">\n    </div>\n</div>");
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://ex124oj.pond.ink/api".concat((0, utils_1.isProblem)()[2] ? "/contest/".concat((0, utils_1.isProblem)()[2]) : '', "/problem/").concat((0, utils_1.isProblem)()[3]),
            revalidate: true,
            onload: function (data) {
                if (data.status == 200) {
                    var res = JSON.parse(data.response);
                    var title = document.querySelector('head > title');
                    if (title && res.title) {
                        title.innerHTML = res.title;
                    }
                    var problename = document.querySelector('#problem-name');
                    if (problename && res.problemname) {
                        problename.innerHTML = res.problemname;
                    }
                    var contestname = document.querySelector('#contest-name');
                    if (contestname && res.contestname) {
                        contestname.innerHTML = res.contestname;
                    }
                    var statement = document.querySelector('#tab-statement');
                    if (statement && res.statement) {
                        statement.innerHTML = res.statement;
                    }
                    var timelimit = document.querySelector('#time-limit');
                    if (timelimit && res.timelimit) {
                        timelimit.innerHTML = res.timelimit;
                    }
                    var memorylimit = document.querySelector('#memory-limit');
                    if (memorylimit && res.memorylimit) {
                        memorylimit.innerHTML = res.memorylimit;
                    }
                    var vote = document.querySelector('#vote');
                    if (vote && res.vote) {
                        vote.innerHTML = res.vote;
                        eval('$(".uoj-click-zan-block").click_zan_block();');
                    }
                    var countdown = document.querySelector('#contest-countdown');
                    if (countdown && res.script) {
                        eval(res.script);
                    }
                    appendsource();
                    (0, code_1.CodeCopy)();
                }
                else {
                    document.body.innerHTML = lostpage_1;
                }
            }
        });
    }
    var tabcontent = document.querySelector('div.tab-content');
    if (tabcontent) {
        var navbar = document.createElement('div');
        tabcontent.before(navbar);
        navbar.setAttribute('style', 'border-bottom: 1px solid ' + (variables_1.Darktheme ? '#2e2e30' : '#dee2e6;'));
        var statisticsButton = document.querySelector('div.uoj-content > a[role=button]');
        if (statisticsButton)
            navbar.appendChild(statisticsButton);
        var DownloadTag = document.createElement('a');
        navbar.appendChild(DownloadTag);
        DownloadTag.setAttribute('role', 'button');
        DownloadTag.setAttribute('class', 'btn btn-primary float-right partly-hidden');
        DownloadTag.setAttribute('href', '/download.php?type=problem&id=' + (0, utils_1.isProblem)()[3]);
        DownloadTag.setAttribute('target', '_blank');
        DownloadTag.innerHTML = '<span class="glyphicon glyphicon-download-alt"></span> 下载数据';
        var navtabs = document.querySelector('div.uoj-content > ul[role=tablist]');
        if (navtabs) {
            navbar.appendChild(navtabs);
            navtabs.setAttribute('style', 'border-bottom: none');
            var TJTag = document.createElement('li');
            navtabs.insertBefore(TJTag, null);
            TJTag.setAttribute('class', 'nav-item partly-hidden');
            var TJInnerTag = document.createElement('a');
            TJTag.appendChild(TJInnerTag);
            TJInnerTag.setAttribute('role', 'tab');
            TJInnerTag.setAttribute('class', 'nav-link');
            TJInnerTag.setAttribute('href', '/download.php?type=tj&id=' + (0, utils_1.isProblem)()[3]);
            TJInnerTag.innerHTML = '<span class="glyphicon glyphicon-book"></span> 题解';
        }
    }
}
exports.Problem = Problem;


/***/ }),

/***/ 310:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Settings = void 0;
var variables_1 = __webpack_require__(449);
function Settings() {
    GM_addStyle(".settings-overlay {\n    position: fixed;\n    height: 100%;\n    width: 100%;\n    transition: visibility 0.4s, background 0.4s;\n    top: 0;\n    left: 0;\n    visibility: hidden;\n    z-index: 229;\n}\n.settings-popup-active .settings-overlay {\n    background: ".concat(variables_1.Darktheme ? 'rgb(255,255,255,.3)' : 'rgb(0,0,0,.3)', ";\n    visibility: visible;\n}\n.settings-popup {\n    width: 60%;\n    position: relative;\n    transform: translate(-50%, -50%);\n    top: 50%;\n    left: 50%;\n    visibility: hidden;\n    border-radius: .5rem;\n    padding: 20px 20px;\n}\n.settings-popup-active .settings-overlay .settings-popup {\n    background: ").concat(variables_1.Darktheme ? '#222' : '#ffffff', ";\n    visibility: visible;\n}\n.settings-popup .row {\n    padding: 0 30px 30px;\n}\n.settings-popup .row * {\n    margin-bottom: 0;\n}\n.settings-titlebar {\n    padding: 10px 20px 30px 20px !important;\n}\n.settings-titlebar h4 {\n    position: relative;\n    top: 50%;\n    left: 0;\n    transform: translate(0, -50%);\n}\n.settings-footerbar {\n    height: 60px;\n    padding: 20px 20px;\n}\n.switch {\n    position: relative;\n    vertical-align: middle;\n    width: 60px;\n    height: 28px;\n}\n.switch input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n}\n.settings-popup-active .slider {\n    position: absolute;\n    visibility: visible;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: ").concat(variables_1.Darktheme ? '#333' : '#ccc', ";\n    transition: background-color .4s;\n    transition: visiblility 0s;\n    border-radius: 28px;\n}\n.settings-popup-active .slider:before {\n    position: absolute;\n    visibility: visible;\n    content: \"\";\n    height: 20px;\n    width: 20px;\n    left: 4px;\n    bottom: 4px;\n    background-color: ").concat(variables_1.Darktheme ? '#222' : '#ffffff', ";\n    transition: .4s;\n    border-radius: 50%;\n}\ninput:checked + .slider {\n    background-color: #28ADCA;\n}\ninput:checked + .slider:before {\n    transform: translateX(32px);\n}"));
    var HomepageEntrance = document.createElement('li');
    var NavBarTablist = document.querySelector('div[role=main] > div > ul[role=tablist]');
    NavBarTablist.insertBefore(HomepageEntrance, NavBarTablist.firstChild);
    HomepageEntrance.setAttribute('class', 'nav-item');
    HomepageEntrance.innerHTML = '<span style="padding: 0.5rem 1rem; cursor:pointer"><span style="background-color: #28adca;padding:0.2em 0.6em;border-radius: 1em;color:#fff;font-size: 0.7em;font-weight:bold;display:inline-block;position: relative;top: 50%;transform: translate(0,-50%);">Ex124OJ</span></span>';
    HomepageEntrance.onclick = function () {
        document.body.setAttribute('class', 'settings-popup-active');
    };
    var SettingsOverlay = document.createElement('div');
    document.body.insertBefore(SettingsOverlay, document.body.firstChild);
    SettingsOverlay.setAttribute('class', 'settings-overlay');
    var SettingsPopup = document.createElement('div');
    SettingsOverlay.appendChild(SettingsPopup);
    SettingsPopup.setAttribute('class', 'settings-popup');
    var SettingsTitlebar = document.createElement('div');
    SettingsPopup.appendChild(SettingsTitlebar);
    SettingsTitlebar.setAttribute('class', 'row settings-titlebar');
    SettingsTitlebar.innerHTML = '<h3 style="width:100%;height:3.5rem"><img src="https://ex124oj.pond.ink/images/icon.png" style="height:3.5rem;width:3.5rem;margin-right:10px"><span style="vertical-align:middle"> Ex124OJ 控制面板</span> <span style="vertical-align:middle;cursor:pointer;margin:0 10px" onclick="window.open(\'https://ex124oj.pond.ink/\');"><span style="height:1.75rem;line-height:3.5rem;vertical-align:middle;padding:0 .5rem;background-color:#28adca;border-radius:1em;color:#fff;font-size:1.2rem;font-weight:bold">Ex124OJ</span></span><span style="color:#7f7f7f;line-height:3.5rem;vertical-align:middle;font-size:1.2rem">' + variables_1.version + '</span></h3>';
    var SettingsCloseButton = document.createElement('span');
    SettingsPopup.appendChild(SettingsCloseButton);
    SettingsCloseButton.setAttribute('style', 'position: fixed;right: 20px;top:20px;cursor: pointer');
    SettingsCloseButton.setAttribute('onclick', 'document.body.setAttribute(\'class\', \'\');');
    SettingsCloseButton.innerHTML = '<h4><i class="fa fa-xmark"></i></h4>';
    var background = document.createElement('div');
    SettingsPopup.appendChild(background);
    background.setAttribute('class', 'row');
    var backgroundImageLabel = document.createElement('strong');
    background.appendChild(backgroundImageLabel);
    backgroundImageLabel.setAttribute('style', 'font-size: 1.25em');
    backgroundImageLabel.innerHTML = '背景图片&emsp;&emsp;&emsp;&emsp;';
    var backgroundImageInput = document.createElement('input');
    background.appendChild(backgroundImageInput);
    backgroundImageInput.setAttribute('style', 'flex-grow: 1; height: 2em; width: initial');
    backgroundImageInput.setAttribute('class', 'form-control');
    var siteIcon = document.createElement('div');
    SettingsPopup.appendChild(siteIcon);
    siteIcon.setAttribute('class', 'row');
    var siteIconImageLabel = document.createElement('strong');
    siteIcon.appendChild(siteIconImageLabel);
    siteIconImageLabel.setAttribute('style', 'font-size: 1.25em');
    siteIconImageLabel.innerHTML = '网站图标&emsp;&emsp;&emsp;&emsp;';
    var siteIconImageInput = document.createElement('input');
    siteIcon.appendChild(siteIconImageInput);
    siteIconImageInput.setAttribute('style', 'flex-grow: 1; height: 2em; width: initial');
    siteIconImageInput.setAttribute('class', 'form-control');
    var siteIconSmall = document.createElement('div');
    SettingsPopup.appendChild(siteIconSmall);
    siteIconSmall.setAttribute('class', 'row');
    var siteIconSmallImageLabel = document.createElement('strong');
    siteIconSmall.appendChild(siteIconSmallImageLabel);
    siteIconSmallImageLabel.setAttribute('style', 'font-size: 1.25em');
    siteIconSmallImageLabel.innerHTML = '网站图标（小）&emsp;';
    var siteIconSmallImageInput = document.createElement('input');
    siteIconSmall.appendChild(siteIconSmallImageInput);
    siteIconSmallImageInput.setAttribute('style', 'flex-grow: 1; height: 2em; width: initial');
    siteIconSmallImageInput.setAttribute('class', 'form-control');
    var Switchs = document.createElement('div');
    SettingsPopup.appendChild(Switchs);
    Switchs.setAttribute('class', 'row');
    var academic = document.createElement('div');
    Switchs.appendChild(academic);
    var academicLabel = document.createElement('strong');
    academic.appendChild(academicLabel);
    academicLabel.setAttribute('style', 'font-size: 1.25em; vertical-align: middle;');
    academicLabel.innerHTML = '学术模式&emsp;&emsp;&emsp;&emsp;';
    var academicSwitch = document.createElement('label');
    academicSwitch.className = 'switch';
    academic.appendChild(academicSwitch);
    academicSwitch.innerHTML = '<input type="checkbox" id="AcademicSwitch" style="display: none;">\n<i id="AcademicSwitchIcon" class="slider"></i>';
    {
        var space = document.createElement('p');
        Switchs.appendChild(space);
        space.innerHTML = '&emsp;&emsp;&emsp;&emsp;';
    }
    var ligatures = document.createElement('div');
    Switchs.appendChild(ligatures);
    var ligaturesLabel = document.createElement('strong');
    ligatures.appendChild(ligaturesLabel);
    ligaturesLabel.setAttribute('style', 'font-size: 1.25em; vertical-align: middle;');
    ligaturesLabel.innerHTML = '代码连字&emsp;&emsp;&emsp;&emsp;';
    var ligaturesSwitch = document.createElement('label');
    ligaturesSwitch.className = 'switch';
    ligatures.appendChild(ligaturesSwitch);
    ligaturesSwitch.innerHTML = '<input type="checkbox" id="LigaturesSwitch" style="display: none;">\n<i id="LigaturesSwitchIcon" class="slider"></i>';
    {
        var space = document.createElement('p');
        Switchs.appendChild(space);
        space.innerHTML = '&emsp;&emsp;&emsp;&emsp;';
    }
    var darktheme = document.createElement('div');
    Switchs.appendChild(darktheme);
    var darkthemeLabel = document.createElement('strong');
    darktheme.appendChild(darkthemeLabel);
    darkthemeLabel.setAttribute('style', 'font-size: 1.25em; vertical-align: middle;');
    darkthemeLabel.innerHTML = '主题风格&emsp;&emsp;&emsp;&emsp;';
    var darkthemeSelect = document.createElement('select');
    darktheme.appendChild(darkthemeSelect);
    darkthemeSelect.classList.add('form-control');
    darkthemeSelect.style.display = 'inline-block';
    darkthemeSelect.style.width = 'unset';
    darkthemeSelect.style.verticalAlign = 'middle';
    darkthemeSelect.innerHTML = '<option value="follow">跟随系统</option><option value="light">Light</option><option value="dark">Dark</option>';
    backgroundImageInput.value = variables_1.BackgroundImage;
    siteIconImageInput.value = variables_1.SiteIconImage;
    siteIconSmallImageInput.value = variables_1.SiteIconSmallImage;
    document.getElementById('AcademicSwitch').checked = variables_1.Academic;
    document.getElementById('LigaturesSwitch').checked = variables_1.Ligatures;
    darkthemeSelect.value = variables_1.DarkthemeSelect;
    var FooterRow = document.createElement('div');
    FooterRow.setAttribute('class', 'settings-footerbar');
    SettingsPopup.appendChild(FooterRow);
    var Ok = document.createElement('button');
    FooterRow.appendChild(Ok);
    Ok.setAttribute('class', 'btn btn-search btn-outline-primary float-right');
    Ok.innerHTML = '保存';
    Ok.onclick = function () {
        GM_setValue('BackgroundImage', backgroundImageInput.value);
        GM_setValue('SiteIconImage', siteIconImageInput.value);
        GM_setValue('SiteIconSmallImage', siteIconSmallImageInput.value);
        GM_setValue('Academic', document.getElementById('AcademicSwitch').checked);
        GM_setValue('Ligatures', document.getElementById('LigaturesSwitch').checked);
        GM_setValue('Darktheme', darkthemeSelect.value);
        location.reload();
    };
    var Clear = document.createElement('button');
    FooterRow.appendChild(Clear);
    Clear.setAttribute('class', 'btn btn-search btn-outline-primary float-right');
    Clear.innerHTML = '恢复默认';
    Clear.onclick = function () {
        var values = GM_listValues();
        for (var value in values) {
            GM_deleteValue(values[value]);
        }
        location.reload();
    };
}
exports.Settings = Settings;


/***/ }),

/***/ 978:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Submission = void 0;
var code_1 = __webpack_require__(480);
var utils_1 = __webpack_require__(593);
function SubmissionCrack() {
    var content = document.querySelector('div.uoj-content');
    if (!content || !content.children.length && !content.children[0].className.includes('table-responsive')) {
        return;
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://ex124oj.pond.ink/api/submission/".concat((0, utils_1.isSubmission)()[1]),
        revalidate: true,
        onload: function (data) {
            if (data.status == 200) {
                SubmissionCard(JSON.parse(data.response));
            }
            else {
                SubmissionCard({});
            }
        },
        onerror: function (error) {
            SubmissionCard({});
        }
    });
}
function SubmissionCard(data) {
    var _a;
    GM_addStyle("\ndiv.tab-content > div.tab-pane.card {\n    border-top: none;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0;\n}\n    ");
    var content = document.querySelector('div.uoj-content');
    if (content && content.children.length) {
        var TabList = document.createElement('ul');
        content.insertBefore(TabList, content.children[1]);
        TabList.setAttribute('class', 'nav nav-tabs');
        TabList.setAttribute('role', 'tablist');
        var TabContent = document.createElement('div');
        content.insertBefore(TabContent, content.children[2]);
        TabContent.setAttribute('class', 'tab-content');
        TabContent.style.marginBottom = '20px';
        var counter = 0, cardtitle = void 0;
        var flag = { answer: false, details: false };
        for (var i = 3; i < content.children.length; i++, counter++) {
            var classlist = content.children[i].getAttribute('class');
            if (classlist && classlist.includes('card')) {
                var isActive = !counter;
                var title = document.createElement('li');
                TabList.appendChild(title);
                title.setAttribute('class', 'nav-item');
                var titleText = (_a = content.children[i].querySelector('h4.card-title')) === null || _a === void 0 ? void 0 : _a.textContent;
                if (titleText) {
                    cardtitle = titleText.charAt(0).toUpperCase() + titleText.slice(1);
                    title.innerHTML = "<a class=\"nav-link".concat(isActive ? ' active' : '', "\" href=\"#card").concat(counter, "\" role=\"tab\" data-toggle=\"tab\" aria-selected=\"true\">").concat(cardtitle, "</a>");
                    if (cardtitle == 'Answer') {
                        flag.answer = true;
                    }
                    else if (cardtitle == '详细' || cardtitle == 'Details') {
                        flag.details = true;
                    }
                }
                var card = document.createElement('div');
                TabContent.appendChild(card);
                card.setAttribute('class', "tab-pane card".concat(isActive ? ' active' : ''));
                card.setAttribute('id', "card".concat(counter));
                var card_body = content.children[i].querySelector('div.card-body');
                if (cardtitle == 'Answer' && data.answer && data.answer.body) {
                    card_body = document.createElement('div');
                    card_body.classList.add('card-body');
                    card_body.innerHTML = data.answer.body;
                }
                else if ((cardtitle == '详细' || cardtitle == 'Details') && data.details && data.details.body) {
                    card_body = document.createElement('div');
                    card_body.classList.add('card-body');
                    card_body.innerHTML = data.details.body;
                }
                if (card_body) {
                    card.appendChild(card_body);
                }
                var card_footer = content.children[i].querySelector('div.card-footer');
                if (card_footer) {
                    card.appendChild(card_footer);
                }
                if (cardtitle == 'Answer' && data.answer && data.answer.footer) {
                    card_footer.innerHTML = data.answer.footer;
                }
                content.removeChild(content.children[i]);
                i--;
            }
        }
        if (!flag.answer && data.answer) {
            var isActive = !counter;
            var title = document.createElement('li');
            TabList.appendChild(title);
            title.setAttribute('class', 'nav-item');
            title.innerHTML = "<a class=\"nav-link".concat(isActive ? ' active' : '', "\" href=\"#card").concat(counter, "\" role=\"tab\" data-toggle=\"tab\" aria-selected=\"true\">Answer</a>");
            var card = document.createElement('div');
            TabContent.appendChild(card);
            card.setAttribute('class', "tab-pane card".concat(isActive ? ' active' : ''));
            card.setAttribute('id', "card".concat(counter));
            if (data.answer.body) {
                var card_body = document.createElement('div');
                card_body.classList.add('card-body');
                card_body.innerHTML = data.answer.body;
                card.appendChild(card_body);
            }
            if (data.answer.footer) {
                var card_body = document.createElement('div');
                card_body.classList.add('card-footer');
                card_body.innerHTML = data.answer.footer;
                card.appendChild(card_body);
            }
            counter++;
        }
        if (!flag.details) {
            var isActive = !counter;
            var title = document.createElement('li');
            TabList.appendChild(title);
            title.setAttribute('class', 'nav-item');
            title.innerHTML = "<a class=\"nav-link".concat(isActive ? ' active' : '', "\" href=\"#card").concat(counter, "\" role=\"tab\" data-toggle=\"tab\" aria-selected=\"true\">\u8BE6\u7EC6</a>");
            var card = document.createElement('div');
            TabContent.appendChild(card);
            card.setAttribute('class', "tab-pane card".concat(isActive ? ' active' : ''));
            card.setAttribute('id', "card".concat(counter));
            if (data.details.body) {
                var card_body = document.createElement('div');
                card_body.classList.add('card-body');
                card_body.innerHTML = data.details.body;
                card.appendChild(card_body);
            }
            counter++;
        }
        sh_highlightDocument();
        (0, code_1.CodeCopy)();
    }
}
function Submission() {
    SubmissionCrack();
}
exports.Submission = Submission;


/***/ }),

/***/ 900:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TableStyle = void 0;
function TableStyle() {
    var Tables = document.getElementsByTagName('table');
    for (var table in Tables) {
        if (Tables[table].nodeType) {
            var parentNode = Tables[table].parentNode;
            var parentClass = parentNode.getAttribute('class');
            var classList = Tables[table].classList;
            if (parentClass !== 'legend' && classList.length === 0) {
                Tables[table].classList.add('table', 'table-bordered');
            }
        }
    }
    var ths = document.getElementsByTagName('th');
    for (var th in ths) {
        if (ths[th].nodeType && ths[th].getAttribute('align')) {
            ths[th].setAttribute('style', 'text-align:' + ths[th].getAttribute('align'));
        }
    }
}
exports.TableStyle = TableStyle;


/***/ }),

/***/ 446:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Theme = void 0;
var variables_1 = __webpack_require__(449);
function Theme() {
    GM_addElement('link', {
        href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.1/css/fontawesome.css',
        rel: 'stylesheet'
    });
    GM_addElement('link', {
        href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.1/css/brands.css',
        rel: 'stylesheet'
    });
    GM_addElement('link', {
        href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.1/css/solid.css',
        rel: 'stylesheet'
    });
    GM_addStyle("\n@import url(https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css);\ncode {\n    font-family: \"Fira Code\";\n    ".concat(variables_1.Ligatures ? '' : 'font-variant-ligatures: none;', "\n}\n.card {\n    ").concat(variables_1.Darktheme ? 'border-color: rgba(255,255,255,.125);' : '', "\n}\n.card-footer {\n    ").concat(variables_1.Darktheme ? 'border-color: rgba(255,255,255,.03);' : '', "\n}\npre, pre.sh_sourceCode {\n    ").concat(variables_1.Darktheme ? 'color: #e0e0e0!important; background-color: #222!important; border-color: #2e2e30!important;' : '', "\n}\ncode > span {\n    font-style: normal !important;\n    font-weight: 400 !important;\n}\ncode > span.sh_preproc,\ncode > span.sh_keyword,\ncode > span.sh_type {\n    color: ").concat(!variables_1.Darktheme ? '#8959a8' : '#cc99cd', " !important;\n}\ncode > span.sh_string,\ncode > span.sh_specialchar {\n    color: ").concat(!variables_1.Darktheme ? '#718c00' : '#7ec699', " !important;\n}\ncode > span.sh_cbracket {\n    color: ").concat(!variables_1.Darktheme ? '#4d4d4c' : '#cccccc', " !important;\n}\ncode > span.sh_symbol {\n    color: ").concat(!variables_1.Darktheme ? '#3e999f' : '#67cdcc', " !important;\n}\ncode > span.sh_number {\n    color: ").concat(!variables_1.Darktheme ? '#f5871f' : '#f08d49', " !important;\n}\ncode > span.sh_function {\n    color: ").concat(!variables_1.Darktheme ? '#4271ae' : '#f08d49', " !important;\n}\ncode > span.sh_comment {\n    color: ").concat(!variables_1.Darktheme ? '#8e908c' : '#999999', " !important;\n}\n.copybutton {\n    font-size: 1.1em;\n    width: 2.2em;\n    height: 2.2em;\n    padding: 0;\n    position: absolute;\n    top: 0;\n    right: 0;\n    background-color: ").concat(variables_1.Darktheme ? 'rgb(255,255,255,.1)' : 'rgb(0,0,0,.1)', ";\n    border: 0 solid transparent;\n    border-bottom-left-radius: .28571429rem;\n}\n.copybutton:hover {\n    background-color: ").concat(variables_1.Darktheme ? 'rgb(255,255,255,.2)' : 'rgb(0,0,0,.2);', ";\n}\n.copybutton:focus {\n    outline: none;\n}\n    "));
    if (variables_1.Darktheme) {
        GM_addStyle("\nbody {\n    color: #f2eee8;\n    background-color: #222;\n}\n\na.header-a {\n    color: #f2eee8;\n}\n\n.navbar-light .navbar-brand {\n    color: #fff\n}\n.navbar-light .navbar-brand:focus,.navbar-light .navbar-brand:hover {\n    color: #fff\n}\n.navbar-light .navbar-nav .nav-link {\n    color: rgba(255,255,255,.5)\n}\n.navbar-light .navbar-nav .nav-link:focus,.navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(255,255,255,.75)\n}\n.navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(255,255,255,.25)\n}\n.navbar-light .navbar-nav .active>.nav-link,.navbar-light .navbar-nav .nav-link.active,.navbar-light .navbar-nav .nav-link.show,.navbar-light .navbar-nav .show>.nav-link {\n    color: #fff\n}\n.navbar-light .navbar-toggler {\n    color: rgba(255,255,255,.5);\n    border-color: rgba(255,255,255,.1)\n}\n.navbar-light .navbar-toggler-icon {\n    background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")\n}\n.navbar-light .navbar-text {\n    color: rgba(255,255,255,.5)\n}\n.navbar-light .navbar-text a {\n    color: #fff\n}\n.navbar-light .navbar-text a:focus,.navbar-light .navbar-text a:hover {\n    color: #fff\n}\n.bg-light {\n    background-color: #343a40!important\n}\na.bg-light:focus,a.bg-light:hover,button.bg-light:focus,button.bg-light:hover {\n    background-color: #1d2124!important\n}\n\n.uoj-footer {\n    border-top-color: #272b31;\n}\n\n.page-header {\n    border-color: #2e2e30;\n}\n\n.page-link, .page-item.disabled .page-link {\n    background-color: #222;\n    border-color: #2e2e30;\n}\n\n.card {\n    background-color: #222;\n}\n.card-header {\n    background-color: rgba(255,255,255,.03);\n    border-bottom-color: rgba(255,255,255,.125);\n}\n\n.card-uoj-accepted>.card-header,\n.card-uoj-wrong>.card-header,\n.card-uoj-acceptable-answer>.card-header,\n.card-uoj-tle>.card-header {\n    opacity: 0.9;\n}\n\n.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {\n    color: #f2eee8;\n    background-color: #222;\n    border-color: #2e2e30 #2e2e30 #222;\n}\n.nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n    border-color: #2e2e30 #2e2e30 #222;\n}\n.nav-tabs {\n    border-bottom-color: #2e2e30;\n}\n\n.border-info, .bg-info {\n    opacity: 0.9;!important;\n}\n.btn-info, .btn-primary, .btn-warning, .btn-danger {\n    opacity: 0.9;\n}\n\n.bootstrap-switch .bootstrap-switch-handle-on, .bootstrap-switch .bootstrap-switch-handle-off, .bootstrap-switch .bootstrap-switch-label {\n    background-color: #222;\n    border-color: #2e2e30;\n    color: #f2eee8;\n}\n\n.table {\n    color: #f2eee8;\n}\n.table-striped tbody tr:nth-of-type(odd) {\n    background-color: rgba(255,255,255,.05);\n}\n.table-hover tbody tr:hover {\n    color: #d1c9bf;\n    background-color: rgba(255,255,255,.075);\n}\n.table thead th {\n    border-bottom-color: #2e2e30;\n}\n.table td, .table th {\n    border-color: #2e2e30;\n    border-top-color: #2e2e30;\n}\n.table-bordered td, .table-bordered th {\n    border-color: #2e2e30;\n}\n\n.form-control {\n    color: #a99e91;\n    background-color: #222;\n    border-color: #2e2e30;\n}\n.form-control:focus {\n    color: #a99e91;\n    background-color: #222;\n}\n\n.img-thumbnail, .img-rounded {\n    background-color: #222;\n}\n\n.list-group {\n    background-color: #222;\n}\n.list-group-item {\n    background-color: #222;\n    border-color: rgba(255, 255, 255, .125);\n}\n\n.dropdown-menu.show {\n    background-color: #222;\n    border-color: rgba(255, 255, 255, .15);\n}\n.dropdown-item {\n    color: #f2eee8;\n}\n.dropdown-item:focus, .dropdown-item:hover {\n    color: #f2eee8;\n    text-decoration: none;\n    background-color: #14171c;\n}\n\n.CodeMirror, .CodeMirror-scroll {\n    background-color: #222;\n    color: #f2eee8;\n}\n.CodeMirror-activeline-background, .CodeMirror-scroll .CodeMirror-activeline-background {\n    background-color: #241e17;\n}\n.CodeMirror div.CodeMirror-cursor {\n    border-left-color: white!important;\n}\n.CodeMirror-gutters, .CodeMirror-scroll > .CodeMirror-gutters {\n    background-color: #222;\n    border-right-color: #59554f;\n    color: #59554f;\n}\n.CodeMirror-linenumber {\n    background-color: #222;\n    color: #59554f;\n}\n.blog-content-md-editor-toolbar {\n    background: #343a40\n}\n\n#MathJax_ZoomFrame {\n    color: black;\n}\n        ");
    }
}
exports.Theme = Theme;


/***/ }),

/***/ 720:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RandomProblem = void 0;
function RandomProblem() {
    var SearchBox = document.getElementById('form-search-problem');
    if (SearchBox) {
        var RandomButton = document.createElement('div');
        RandomButton.setAttribute('class', 'input-group-append');
        RandomButton.innerHTML = '<button class="btn btn-search btn-outline-primary" style="height: calc(1.5em + 0.75rem + 2px);" onclick="randomProblem();">随机跳题</button>';
        var RandomScript = document.createElement('script');
        RandomScript.innerHTML =
            "function randomProblem() {\n    const randomProblemId = Math.ceil(Math.random() * 3000);\n    ($.get('/problem/' + randomProblemId, (data, status) => {\n        if (status == 'success') {\n            window.location.href = '/problem/' + randomProblemId;\n        } else {\n            randomProblem();\n        }\n    })).error(() => {\n        randomProblem();\n    })\n}";
        SearchBox.after(RandomButton);
        RandomButton.after(RandomScript);
    }
}
exports.RandomProblem = RandomProblem;


/***/ }),

/***/ 593:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isBlog = exports.isUserProfile = exports.isProblem = exports.isStandings = exports.isContest = exports.isContests = exports.isSubmission = exports.isHomepage = void 0;
var HomepageRegExp = /^http:\/\/124.221.194.184(\/)?(\?.*)?$/;
function isHomepage() {
    return window.location.href.match(HomepageRegExp);
}
exports.isHomepage = isHomepage;
var submissionRegExp = /^http:\/\/124.221.194.184\/submission\/(\d+)(\?.*)?$/;
function isSubmission() {
    return window.location.href.match(submissionRegExp);
}
exports.isSubmission = isSubmission;
var ContestsRegExp = /^http:\/\/124.221.194.184\/contests(\?.*)?$/;
function isContests() {
    return window.location.href.match(ContestsRegExp);
}
exports.isContests = isContests;
var ContestRegExp = /^http:\/\/124.221.194.184\/contest\/(\d+)(\?.*)?$/;
function isContest() {
    return window.location.href.match(ContestRegExp);
}
exports.isContest = isContest;
var StandingsRegExp = /^http:\/\/124.221.194.184\/contest\/(\d+)\/standings(\?.*)?$/;
function isStandings() {
    return window.location.href.match(StandingsRegExp);
}
exports.isStandings = isStandings;
var ProblemRegExp = /^http:\/\/124.221.194.184(\/contest\/(\d+))?\/problem\/(\d+)(\?.*)?$/;
function isProblem() {
    return window.location.href.match(ProblemRegExp);
}
exports.isProblem = isProblem;
var UserProfileRegExp = /^http:\/\/124.221.194.184\/user\/profile\/.+(\?.*)?$/;
function isUserProfile() {
    return window.location.href.match(UserProfileRegExp);
}
exports.isUserProfile = isUserProfile;
var BlogRegExp = /^http:\/\/124.221.194.184\/blog\/.+(\?.*)?$/;
function isBlog() {
    return window.location.href.match(BlogRegExp);
}
exports.isBlog = isBlog;


/***/ }),

/***/ 449:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getVariables = exports.TagBadgeList = exports.CCFBadgeList = exports.NameColorList = exports.Darktheme = exports.DarkthemeSelect = exports.Ligatures = exports.Academic = exports.SiteIconSmallImage = exports.SiteIconImage = exports.BackgroundImage = exports.version = void 0;
exports.version = "1.1.4";
function getRandomColorCode() {
    var letters = '0123456789ABCDEF';
    var colorCode = '#';
    for (var i = 0; i < 6; i++) {
        colorCode += letters[Math.floor(Math.random() * 16)];
    }
    return colorCode;
}
function getVariables(callback) {
    exports.BackgroundImage = GM_getValue('BackgroundImage', '');
    exports.SiteIconImage = GM_getValue('SiteIconImage', '');
    exports.SiteIconSmallImage = GM_getValue('SiteIconSmallImage', '');
    exports.Academic = GM_getValue('Academic', false);
    exports.Ligatures = GM_getValue('Ligatures', true);
    exports.DarkthemeSelect = GM_getValue('Darktheme', "follow");
    exports.Darktheme = (exports.DarkthemeSelect == 'light' || exports.DarkthemeSelect == 'dark') ? exports.DarkthemeSelect == 'dark' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://ex124oj.pond.ink/public/variables.json",
        revalidate: true,
        onload: function (data) {
            var variables = JSON.parse(data.response);
            var randomcolor = getRandomColorCode();
            exports.NameColorList = variables.NameColorList;
            for (var i in exports.NameColorList) {
                for (var j = 0; j < exports.NameColorList[i].length; j++) {
                    if (exports.NameColorList[i][j] == 'rand') {
                        exports.NameColorList[i][j] = randomcolor;
                    }
                }
            }
            exports.CCFBadgeList = variables.CCFBadgeList;
            for (var i in exports.CCFBadgeList) {
                for (var j = 0; j < exports.CCFBadgeList[i].length; j++) {
                    if (exports.CCFBadgeList[i][j] == 'rand') {
                        exports.CCFBadgeList[i][j] = randomcolor;
                    }
                }
            }
            exports.TagBadgeList = variables.TagBadgeList;
            for (var i in exports.TagBadgeList) {
                for (var j = 0; j < exports.TagBadgeList[i].length; j++) {
                    if (exports.TagBadgeList[i][j].color == 'rand') {
                        exports.TagBadgeList[i][j].color = randomcolor;
                    }
                }
            }
            callback();
        }
    });
}
exports.getVariables = getVariables;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

/// <reference path="index.d.ts" />
__webpack_unused_export__ = ({ value: true });
var utils_1 = __webpack_require__(593);
var variables_1 = __webpack_require__(449);
var theme_1 = __webpack_require__(446);
var settings_1 = __webpack_require__(310);
var name_1 = __webpack_require__(819);
var appearance_1 = __webpack_require__(690);
var discussion_1 = __webpack_require__(992);
var code_1 = __webpack_require__(480);
var table_1 = __webpack_require__(900);
var toolbar_1 = __webpack_require__(720);
var announcement_1 = __webpack_require__(579);
var submission_1 = __webpack_require__(978);
var contest_1 = __webpack_require__(103);
var problem_1 = __webpack_require__(823);
var gravatar_1 = __webpack_require__(18);
(function () {
    'use strict';
    var flag = false;
    (0, variables_1.getVariables)(function () {
        var tasks = function () {
            (0, settings_1.Settings)();
            (0, name_1.NameColor)();
            (0, name_1.NameBadge)();
        };
        if (flag) {
            tasks();
        }
        else {
            window.onload = function () {
                tasks();
                if ((0, utils_1.isStandings)())
                    (0, contest_1.ContestStandings)();
            };
        }
    });
    (0, theme_1.Theme)();
    document.addEventListener('DOMContentLoaded', function () {
        (0, appearance_1.Background)();
        (0, appearance_1.changeIcon)();
        (0, discussion_1.DiscussionCard)();
        (0, code_1.CodeCopy)();
        (0, table_1.TableStyle)();
        (0, toolbar_1.RandomProblem)();
        if ((0, utils_1.isHomepage)())
            (0, announcement_1.exAnnouncements)();
        if ((0, utils_1.isSubmission)())
            (0, submission_1.Submission)();
        if ((0, utils_1.isContests)())
            (0, contest_1.ContestsCard)();
        if ((0, utils_1.isContest)())
            (0, contest_1.ContestHome)();
        if ((0, utils_1.isProblem)())
            (0, problem_1.Problem)();
        if ((0, utils_1.isUserProfile)() || (0, utils_1.isBlog)())
            (0, gravatar_1.changeGravatarURL)();
    });
    window.onload = function () {
        flag = true;
        if ((0, utils_1.isStandings)())
            (0, contest_1.ContestStandings)();
    };
})();

})();

/******/ })()
;