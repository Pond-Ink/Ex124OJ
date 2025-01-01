export const version = "1.1.17";

export var BackgroundImage: string;
export var SiteIconImage: string;
export var EnabledGroups: string;
export var Academic: boolean;
export var Ligatures: boolean;
export var DarkthemeSelect: "follow" | "light" | "dark";
export var Darktheme: boolean;
export var GroupsEnabled: string[];

export var GroupBelong: { [key: string]: string };
export var NameColorList: { [key: string]: string[]; };
export var CCFBadgeList: { [key: string]: string[]; };
export var FFCBadgeList: { [key: string]: string[]; };
export var TagBadgeList: { [key: string]: { color: string, text: string }[]; };
export var NewYearMagic: boolean;
export var NewYearMagicBot: string;

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
    EnabledGroups = GM_getValue('EnabledGroups', '');
    Academic = GM_getValue('Academic', false);
    Ligatures = GM_getValue('Ligatures', true);
    DarkthemeSelect = GM_getValue('Darktheme', "follow");
    Darktheme = (DarkthemeSelect == 'light' || DarkthemeSelect == 'dark') ? DarkthemeSelect == 'dark' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    GroupsEnabled = EnabledGroups.split(/\s*,\s*/);

    const variables = GM_getValue('public_variables', {});
    GroupBelong = {};
    for (let group in variables.Groups) {
        for (let name of variables.Groups[group]) {
            GroupBelong[name] = group;
        }
    }
    NewYearMagic = variables.NewYearMagic;
    NewYearMagicBot = variables.NewYearMagicBot;
    const randomcolor = getRandomColorCode();
    NameColorList = variables.NameColorList;
    if (NewYearMagic && variables.NewYearMagicNameColorList) {
        for (let i in variables.NewYearMagicNameColorList) {
            if(!variables.NewYearMagicNameColorList[i]) continue;
            for (let j = 0; j < variables.NewYearMagicNameColorList[i].length; j++) {
                if(variables.NewYearMagicNameColorList[i][j]) NameColorList[i][j] = variables.NewYearMagicNameColorList[i][j];
            }
        }
    }
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
    FFCBadgeList = variables.FFCBadgeList;
    if (FFCBadgeList) {
        for (let i in FFCBadgeList) {
            for (let j = 0; j < FFCBadgeList[i].length; j++) {
                if (FFCBadgeList[i][j] == 'rand') {
                    FFCBadgeList[i][j] = randomcolor;
                }
            }
        }
    }
    TagBadgeList = variables.TagBadgeList;
    if (NewYearMagic && variables.NewYearMagicTagBadgeList) {
        for (let i in variables.NewYearMagicTagBadgeList) {
            for (let j = 0; j < variables.NewYearMagicTagBadgeList[i].length; j++) {
                if(variables.NewYearMagicTagBadgeList[i][j].color) {
                    TagBadgeList[i][j].color = variables.NewYearMagicTagBadgeList[i][j].color;
                }
                if(variables.NewYearMagicTagBadgeList[i][j].text) {
                    TagBadgeList[i][j].text = variables.NewYearMagicTagBadgeList[i][j].text;
                }
            }
        }
    }
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
