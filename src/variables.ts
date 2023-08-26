export const version = "1.0.3";

export var BackgroundImage: string;
export var SiteIconImage: string;
export var SiteIconSmallImage: string;
export var Academic: boolean;

export var NameColorList: { [key: string]: string[]; };
export var CCFBadgeList: { [key: string]: string[]; };
export var TagBadgeList: { [key: string]: { color: string, text: string }[]; };

export function getVariables(callback: Function) {
    BackgroundImage = GM_getValue('BackgroundImage', '');
    SiteIconImage = GM_getValue('SiteIconImage', '');
    SiteIconSmallImage = GM_getValue('SiteIconSmallImage', '');
    Academic = GM_getValue('Academic', false);

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://ex124oj.pond.ink/public/variables.json",
        revalidate: true,
        onload: (data) => {
            const variables = JSON.parse(data.response);
            NameColorList = variables.NameColorList;
            GM_setValue('NameColorList', NameColorList);
            CCFBadgeList = variables.CCFBadgeList;
            GM_setValue('CCFBadgeList', CCFBadgeList);
            TagBadgeList = variables.TagBadgeList;
            GM_setValue('TagBadgeList', TagBadgeList);
            callback();
        }
    });
}