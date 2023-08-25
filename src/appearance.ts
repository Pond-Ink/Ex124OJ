import { BackgroundImage,SiteIconImage, SiteIconSmallImage } from "./variables";

export function Background() {
    if (BackgroundImage) {
        document.getElementsByClassName('navbar-brand')[0].innerHTML = '<img src="/images/logo_small.png" alt="Logo" class="img-rounded" style="width:39px; height:39px;">';
        const container = document.getElementsByClassName('container')[0] as HTMLElement;
        if (container) {
            const firstChild = container.children[0] as HTMLElement;
            if (firstChild && firstChild.children.length >= 2) {
                const innerHTML = firstChild.children[1].innerHTML;
                const matchResult = innerHTML.match(/(.*> ){0,1}(.*)/);
                if (matchResult) {
                    const newInnerHTML = matchResult[2];
                    firstChild.children[1].innerHTML = newInnerHTML;
                }
            }
        }

        GM_addStyle(
`body {
    background: url("' + BackgroundImage + '");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: 50% 50%;
    background-size: cover;
}
.uoj-content {
    background-color: #fff;
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
}`);
    }
}

function getIcon() {
    if (SiteIconImage) return SiteIconImage;
    else return '/images/logo.png';
}

function getIconSmall() {
    if (SiteIconSmallImage) return SiteIconSmallImage;
    else return getIcon();
}

export function changeIcon() {
    const LogoURLRegExp = /^.*\/images\/logo(_small){0,1}.png$/;
    var Links = document.getElementsByTagName('link');
    for (var link in Links) {
        if (Links[link] && Links[link].nodeType && Links[link].getAttribute('rel') == 'shortcut icon') {
            Links[link].setAttribute('href', getIconSmall());
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
                    Icons[icon].setAttribute('src', getIconSmall());
                }
            }
        }
    }
}