import { BackgroundImage, SiteIconImage, Darktheme } from "./variables";

export function Background() {
    if (BackgroundImage) {
        const titlebar = document.querySelector('div.container > div:first-child');
        if (titlebar) {
            (titlebar as HTMLElement).style.marginLeft = (titlebar as HTMLElement).style.marginRight = '-15px';
        }

        GM_addStyle(`
body {
    background: url(${BackgroundImage});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: 50% 50%;
    background-size: cover;
}
.uoj-content {
    background-color: ${!Darktheme ? '#fff' : '#222'};
    margin: 16px -16px;
    padding: 16px 16px;
    opacity: 0.85;
    border-radius: 8px;
}
.navbar {
    margin: 16px -16px;
    padding: 8px 16px;
    opacity: 0.85;
    border-radius: 8px;
}
.giscus {
    opacity: 0.85;
}
        `);
    }
}

function getIcon() {
    if (SiteIconImage) return SiteIconImage;
    else return '/images/logo.png';
}

export function changeIcon() {
    const LogoURLRegExp = /^.*\/images\/logo(_small){0,1}.png$/;
    var Links = document.getElementsByTagName('link');
    for (var link in Links) {
        if (Links[link] && Links[link].nodeType && Links[link].getAttribute('rel') == 'shortcut icon') {
            Links[link].setAttribute('href', getIcon());
        }
    }
    var Icons = document.getElementsByTagName('img');
    for (var icon in Icons) {
        if (Icons[icon] instanceof Element && Icons[icon].nodeType === Node.ELEMENT_NODE) {
            const srcAttribute = Icons[icon].getAttribute('src');
            if (srcAttribute !== null && LogoURLRegExp.test(srcAttribute)) {
                if (!Icons[icon].getAttribute('style')) {
                    Icons[icon].setAttribute('src', getIcon());
                    Icons[icon].setAttribute('style', 'width:100%;height:auto;object-fit:cover');
                } else {
                    Icons[icon].setAttribute('src', getIcon());
                }
            }
        }
    }
}