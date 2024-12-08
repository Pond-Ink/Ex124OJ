//@ts-nocheck

import { NameColorList, CCFBadgeList, FFCBadgeList, TagBadgeList, GroupBelong, GroupsEnabled } from "./variables";

const ccfbadgecode = (color: string) => `<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600.000000 1600.000000" style="margin-bottom:.25em!important;bottom:10px;--fa-badge-color:${color};"><g transform="translate(0.000000,1600.000000) scale(0.100000,-0.100000)" fill="var(--fa-badge-color)" stroke="none"><path d="M7757 15990 c-453 -44 -890 -196 -1257 -437 -187 -124 -312 -227 -470 -390 -247 -253 -426 -521 -560 -839 -24 -54 -44 -101 -46 -103 -2 -2 -38 11 -81 29 -515 216 -1090 266 -1648 145 -505 -110 -976 -368 -1348 -739 -432 -430 -700 -976 -789 -1606 -20 -144 -17 -565 5 -710 38 -242 96 -459 179 -663 22 -54 38 -100 37 -101 -2 -2 -53 -24 -114 -50 -308 -131 -580 -314 -834 -561 -443 -432 -716 -972 -808 -1600 -24 -168 -24 -562 0 -730 92 -626 365 -1168 803 -1595 153 -149 248 -226 407 -331 142 -95 285 -172 432 -235 61 -26 112 -48 114 -50 1 -1 -15 -47 -37 -101 -83 -204 -141 -421 -179 -663 -22 -144 -25 -567 -5 -705 49 -342 131 -609 273 -895 377 -758 1084 -1298 1914 -1465 216 -43 290 -50 550 -50 187 1 279 5 365 18 242 38 459 96 663 179 54 22 100 38 101 37 2 -2 22 -49 46 -103 141 -334 319 -596 585 -862 238 -238 449 -391 730 -529 853 -418 1839 -373 2649 120 236 143 496 367 678 585 158 188 317 447 414 675 26 61 48 111 49 113 2 2 54 -17 117 -42 209 -83 440 -143 683 -178 120 -17 552 -17 670 0 50 7 144 24 210 37 1083 217 1932 1066 2150 2150 43 216 50 290 50 550 -1 187 -5 279 -18 365 -38 242 -96 459 -179 663 -22 54 -38 100 -37 101 2 2 49 22 103 46 334 141 596 319 862 585 172 172 247 263 368 447 596 907 592 2106 -12 3013 -123 185 -222 304 -388 465 -243 236 -538 431 -841 556 -48 20 -90 38 -92 39 -1 2 15 48 37 102 83 204 141 421 179 663 22 144 25 567 5 705 -49 340 -132 610 -273 895 -377 756 -1085 1299 -1909 1464 -222 45 -294 51 -555 51 -187 -1 -279 -5 -365 -18 -242 -38 -459 -96 -663 -179 -54 -22 -100 -38 -101 -37 -2 2 -22 49 -45 104 -202 478 -572 926 -1002 1211 -343 227 -723 374 -1125 434 -157 24 -501 34 -647 20z m2823 -5244 c44 -22 139 -112 492 -469 472 -477 489 -497 503 -614 8 -64 -15 -162 -53 -219 -38 -58 -4132 -4121 -4198 -4166 -64 -44 -145 -63 -223 -54 -126 15 -95 -12 -959 858 -438 442 -988 997 -1223 1233 -491 494 -484 484 -484 635 0 153 -10 140 498 642 512 507 507 503 657 503 152 -1 109 35 878 -740 l679 -685 1522 1510 c837 830 1537 1521 1556 1536 64 48 121 65 215 61 69 -3 96 -9 140 -31z"/></g></svg>`;
const ffcbadgecode = (color: string) => `<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600.000000 1600.000000" style="margin-bottom:.25em!important;bottom:10px;--fa-badge-color:${color};"><g transform="translate(0.000000,1600.000000) scale(0.100000,-0.100000)" fill="var(--fa-badge-color)" stroke="none"><path d="M7757 15990 c-453 -44 -890 -196 -1257 -437 -187 -124 -312 -227 -470 -390 -247 -253 -426 -521 -560 -839 -24 -54 -44 -101 -46 -103 -2 -2 -38 11 -81 29 -515 216 -1090 266 -1648 145 -505 -110 -976 -368 -1348 -739 -432 -430 -700 -976 -789 -1606 -20 -144 -17 -565 5 -710 38 -242 96 -459 179 -663 22 -54 38 -100 37 -101 -2 -2 -53 -24 -114 -50 -308 -131 -580 -314 -834 -561 -443 -432 -716 -972 -808 -1600 -24 -168 -24 -562 0 -730 92 -626 365 -1168 803 -1595 153 -149 248 -226 407 -331 142 -95 285 -172 432 -235 61 -26 112 -48 114 -50 1 -1 -15 -47 -37 -101 -83 -204 -141 -421 -179 -663 -22 -144 -25 -567 -5 -705 49 -342 131 -609 273 -895 377 -758 1084 -1298 1914 -1465 216 -43 290 -50 550 -50 187 1 279 5 365 18 242 38 459 96 663 179 54 22 100 38 101 37 2 -2 22 -49 46 -103 141 -334 319 -596 585 -862 238 -238 449 -391 730 -529 853 -418 1839 -373 2649 120 236 143 496 367 678 585 158 188 317 447 414 675 26 61 48 111 49 113 2 2 54 -17 117 -42 209 -83 440 -143 683 -178 120 -17 552 -17 670 0 50 7 144 24 210 37 1083 217 1932 1066 2150 2150 43 216 50 290 50 550 -1 187 -5 279 -18 365 -38 242 -96 459 -179 663 -22 54 -38 100 -37 101 2 2 49 22 103 46 334 141 596 319 862 585 172 172 247 263 368 447 596 907 592 2106 -12 3013 -123 185 -222 304 -388 465 -243 236 -538 431 -841 556 -48 20 -90 38 -92 39 -1 2 15 48 37 102 83 204 141 421 179 663 22 144 25 567 5 705 -49 340 -132 610 -273 895 -377 756 -1085 1299 -1909 1464 -222 45 -294 51 -555 51 -187 -1 -279 -5 -365 -18 -242 -38 -459 -96 -663 -179 -54 -22 -100 -38 -101 -37 -2 2 -22 49 -45 104 -202 478 -572 926 -1002 1211 -343 227 -723 374 -1125 434 -157 24 -501 34 -647 20z m-1670 -4681 c55 -20 88 -51 573 -533 283 -282 722 -718 976 -970 l461 -457 794 787 c437 434 869 863 961 954 184 182 245 223 343 235 75 10 175 -15 237 -58 25 -17 239 -228 475 -467 323 -328 435 -447 453 -485 21 -42 25 -65 25 -145 0 -82 -4 -103 -27 -152 -28 -60 18 -13 -1506 -1538 l-454 -455 793 -800 c436 -440 868 -875 959 -967 182 -184 223 -245 235 -343 10 -75 -15 -175 -58 -237 -17 -25 -228 -239 -467 -475 -328 -323 -447 -435 -485 -453 -42 -21 -65 -25 -145 -25 -82 0 -103 4 -152 27 -60 28 -14 -17 -1539 1507 l-456 456 -544 -535 c-299 -294 -737 -726 -974 -961 -336 -333 -441 -430 -479 -448 -101 -46 -213 -46 -311 0 -56 26 -88 57 -582 559 -340 345 -372 380 -391 433 -29 78 -30 185 -1 264 20 55 51 88 533 573 282 283 719 723 971 977 l458 462 -529 538 c-291 296 -720 732 -955 968 -333 336 -430 441 -448 479 -46 101 -46 213 0 311 26 56 57 88 559 582 335 330 381 372 430 391 76 29 189 29 267 1z"/></g></svg>`;
const tagbadgecode = (color: string, text: string) => `<span style="background-color:${color};padding:0.2em 0.6em;border-radius:.2em;color:#fff;font-size:0.7em;font-weight:bold;display:inline-block">${text}</span>`;

function avail(name) {
    return !GroupBelong[name] || GroupsEnabled.includes(GroupBelong[name]);
}

function getUserLink_Ex124OJ(username, rating, addSymbol) {
    if (!username) {
        return '';
    }
    if (addSymbol == undefined) {
        addSymbol = true;
    }
    var text = username, at, color = getColOfRating(rating);
    if (username.charAt(0) == '@') {
        at = true;
        username = username.substr(1);
    }
    if (NameColorList && NameColorList[username] && avail(username)) {
        text = '';
        for (let char = 1; char < NameColorList[username].length; char++) {
            text += `<font style="color:${NameColorList[username][char]}">${username.substring(char - 1, char)}</font>`;
        }
        text += username.substring(NameColorList[username].length - 1);
        if (at) text = '@' + text;
        color = NameColorList[username][0];
    }
    if (CCFBadgeList && CCFBadgeList[username]) {
        for (const j in CCFBadgeList[username]) {
            text +=  ` ${ccfbadgecode(CCFBadgeList[username][j])}`;
        }
    }
    if (FFCBadgeList && FFCBadgeList[username]) {
        for (const j in FFCBadgeList[username]) {
            text +=  ` ${ffcbadgecode(FFCBadgeList[username][j])}`;
        }
    }
    if (TagBadgeList && TagBadgeList[username] && avail(username)) {
        for (const j in TagBadgeList[username]) {
            text +=  ` ${tagbadgecode(TagBadgeList[username][j].color, TagBadgeList[username][j].text)}`;
        }
    }
    if (addSymbol) {
        if (rating >= 2500) {
            text += '<sup>';
            for (var i = 2500; i <= rating; i += 200) {
                text += "&alefsym;"
            }
            text += "</sup>";
        }
    }
    return '<a class="uoj-username" href="' + uojHome + '/user/profile/' + username + '" style="color:' + color + '">' + text + '</a>';
}
function getUserSpan_Ex124OJ(username, rating, addSymbol) {
    if (!username) {
        return '';
    }
    if (addSymbol == undefined) {
        addSymbol = true;
    }
    var text = username, at, color = getColOfRating(rating);
    if (username.charAt(0) == '@') {
        at = true;
        username = username.substr(1);
    }
    if (NameColorList && NameColorList[username] && avail(username)) {
        text = '';
        for (let char = 1; char < NameColorList[username].length; char++) {
            text += `<font style="color:${NameColorList[username][char]}">${username.substring(char - 1, char)}</font>`;
        }
        text += username.substring(NameColorList[username].length - 1);
        if (at) text = '@' + text;
        color = NameColorList[username][0];
    }
    if (CCFBadgeList && CCFBadgeList[username]) {
        for (const j in CCFBadgeList[username]) {
            text +=  ` ${ccfbadgecode(CCFBadgeList[username][j])}`;
        }
    }
    if (FFCBadgeList && FFCBadgeList[username]) {
        for (const j in FFCBadgeList[username]) {
            text +=  ` ${ffcbadgecode(FFCBadgeList[username][j])}`;
        }
    }
    if (TagBadgeList && TagBadgeList[username] && avail(username)) {
        for (const j in TagBadgeList[username]) {
            text +=  ` ${tagbadgecode(TagBadgeList[username][j].color, TagBadgeList[username][j].text)}`;
        }
    }
    if (addSymbol) {
        if (rating >= 2500) {
            text += '<sup>';
            for (var i = 2500; i <= rating; i += 200) {
                text += "&alefsym;"
            }
            text += "</sup>";
        }
    }
    return '<span class="uoj-username" style="color:' + color + '">' + text + '</span>';
}

function uoj_honor_Ex124OJ() {
    return this.each(function() {
        var honor = $(this).text();
        var rating = $(this).data("rating");
        if (isNaN(rating)) {
            return;
        }
        let text = honor, color = getColOfRating(rating);
        if (NameColorList && NameColorList[honor]) {
            text = '';
            for (let char = 1; char < NameColorList[honor].length; char++) {
                text += `<font style="color:${NameColorList[honor][char]}">${honor.substring(char - 1, char)}</font>`;
            }
            text += honor.substring(NameColorList[honor].length - 1);
            color = NameColorList[honor][0];
        }
        if (CCFBadgeList && CCFBadgeList[honor]) {
            for (const j in CCFBadgeList[honor]) {
                text +=  ` ${ccfbadgecode(CCFBadgeList[honor][j])}`;
            }
        }
        if (FFCBadgeList && FFCBadgeList[honor]) {
            for (const j in FFCBadgeList[honor]) {
                text +=  ` ${ffcbadgecode(FFCBadgeList[honor][j])}`;
            }
        }
        if (TagBadgeList && TagBadgeList[honor]) {
            for (const j in TagBadgeList[honor]) {
                text +=  ` ${tagbadgecode(TagBadgeList[honor][j].color, TagBadgeList[honor][j].text)}`;
            }
        }
        if (rating >= 2500) {
            text += '<sup>';
            for (var i = 2500; i <= rating; i += 200) {
                text += "&alefsym;"
            }
            text += "</sup>";
        }
        $(this).css("color", color).html(text);
        if (GroupBelong[honor]) {
            $(this).attr('title', `Ex124OJ Group: ${GroupBelong[honor]}`);
        }
    });
}

function launchNameStyle() {
    unsafeWindow.getUserLink = getUserLink_Ex124OJ;
    unsafeWindow.getUserSpan = getUserSpan_Ex124OJ;
    unsafeWindow.$?.fn?.uoj_honor = uoj_honor_Ex124OJ;
}

export function NameStyle() {
    unsafeWindow.launchNameStyle = launchNameStyle;
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = `
        launchNameStyle();
    `;
    document.head.appendChild(script);
    $(document).ready(() => {
        launchNameStyle();
    });
}