export const version = "1.1.6";

export var BackgroundImage: string;
export var SiteIconImage: string;
export var Academic: boolean;
export var Ligatures: boolean;
export var DarkthemeSelect: "follow" | "light" | "dark";
export var Darktheme: boolean;

export var NameColorList: { [key: string]: string[]; };
export var CCFBadgeList: { [key: string]: string[]; };
export var TagBadgeList: { [key: string]: { color: string, text: string }[]; };

function getRandomColorCode() {
    const letters = '0123456789ABCDEF';
    let colorCode = '#';
    for (let i = 0; i < 6; i++) {
        colorCode += letters[Math.floor(Math.random() * 16)];
    }
    return colorCode;
}

export function getVariables() {
    BackgroundImage = GM_getValue('BackgroundImage', '');
    SiteIconImage = GM_getValue('SiteIconImage', '');
    Academic = GM_getValue('Academic', false);
    Ligatures = GM_getValue('Ligatures', true);
    DarkthemeSelect = GM_getValue('Darktheme', "follow");
    Darktheme = (DarkthemeSelect == 'light' || DarkthemeSelect == 'dark') ? DarkthemeSelect == 'dark' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const variables = GM_getValue('public_variables', {});
    const randomcolor = getRandomColorCode();
    NameColorList = variables.NameColorList;
    if (NameColorList) {
        for (let i in NameColorList) {
            for (let j = 0; j < NameColorList[i].length; j++) {
                if (NameColorList[i][j] == 'rand') {
                    NameColorList[i][j] = randomcolor;
                }
            }
        }
    }
    CCFBadgeList = variables.CCFBadgeList;
    if (CCFBadgeList) {
        for (let i in CCFBadgeList) {
            for (let j = 0; j < CCFBadgeList[i].length; j++) {
                if (CCFBadgeList[i][j] == 'rand') {
                    CCFBadgeList[i][j] = randomcolor;
                }
            }
        }
    }
    TagBadgeList = variables.TagBadgeList;
    if (TagBadgeList) {
        for (let i in TagBadgeList) {
            for (let j = 0; j < TagBadgeList[i].length; j++) {
                if (TagBadgeList[i][j].color == 'rand') {
                    TagBadgeList[i][j].color = randomcolor;
                }
            }
        }
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://ex124oj.pond.ink/public/variables.json",
        nocache: true,
        onload: (data) => {
            GM_setValue('public_variables', JSON.parse(data.response));
        }
    });
}