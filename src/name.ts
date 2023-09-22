//@ts-nocheck

import { NameColorList, CCFBadgeList, TagBadgeList } from "./variables";

const ccfbadgecode = (color: string) => `<svg width="1em" height="1em" data-v-303bbf52="" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="badge-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin-bottom:.25em!important;bottom:10px;--fa-primary-color:#fff;--fa-secondary-color:${color};--fa-secondary-opacity:1;"><g data-v-303bbf52="" class="fa-group"><path data-v-303bbf52="" fill="var(--fa-secondary-color)" d="M512 256a88 88 0 0 0-57.1-82.4A88 88 0 0 0 338.4 57.1a88 88 0 0 0-164.8 0A88 88 0 0 0 57.1 173.6a88 88 0 0 0 0 164.8 88 88 0 0 0 116.5 116.5 88 88 0 0 0 164.8 0 88 88 0 0 0 116.5-116.5A88 88 0 0 0 512 256zm-144.8-44.25l-131 130a11 11 0 0 1-15.55-.06l-75.72-76.33a11 11 0 0 1 .06-15.56L171 224a11 11 0 0 1 15.56.06l42.15 42.49 97.2-96.42a11 11 0 0 1 15.55.06l25.82 26a11 11 0 0 1-.08 15.56z" class="fa-secondary"></path></g></svg>`;
const tagbadgecode = (color: string, text: string) => `<span style="background-color:${color};padding:0.2em 0.6em;border-radius:.2em;color:#fff;font-size:0.7em;font-weight:bold;display:inline-block">${text}</span>`;

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
    if (NameColorList && NameColorList[username]) {
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
    if (TagBadgeList && TagBadgeList[username]) {
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
    if (NameColorList && NameColorList[username]) {
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
    if (TagBadgeList && TagBadgeList[username]) {
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