import { NameColorList, CCFBadgeList, TagBadgeList } from "./variables";

export function NameColor() {
    function setNameColor() {
        const Names = document.querySelectorAll('.uoj-username, .uoj-honor') as NodeListOf<HTMLElement>;
        let NeedsRepeat = false;
        for (const i in Names) {
            if (Names[i].innerHTML && NameColorList[Names[i].innerHTML]) {
                Names[i].style.color = NameColorList[Names[i].innerHTML][0];
                let resN = '';
                for (let char = 1; char < NameColorList[Names[i].innerHTML].length; ++char) {
                    resN = resN + `<font style="color:${NameColorList[Names[i].innerHTML][char]}">${Names[i].innerHTML.substring(char - 1, char)}</font>`;
                }
                Names[i].innerHTML = resN + Names[i].innerHTML.substring(NameColorList[Names[i].innerHTML].length - 1);
                if (Names[i].parentElement?.getAttribute('class') === 'legendLabel') {
                    NeedsRepeat = true;
                }
            }
        }
        return NeedsRepeat;
    }
    if (setNameColor()) setInterval(setNameColor, 200);
}

export function NameBadge() {
    function setNameBadge() {
        const ccfbadgecode = (color: string) => `<svg width="1em" height="1em" data-v-303bbf52="" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="badge-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin-bottom:.25em!important;bottom:10px;--fa-primary-color:#fff;--fa-secondary-color:${color};--fa-secondary-opacity:1;"><g data-v-303bbf52="" class="fa-group"><path data-v-303bbf52="" fill="var(--fa-secondary-color)" d="M512 256a88 88 0 0 0-57.1-82.4A88 88 0 0 0 338.4 57.1a88 88 0 0 0-164.8 0A88 88 0 0 0 57.1 173.6a88 88 0 0 0 0 164.8 88 88 0 0 0 116.5 116.5 88 88 0 0 0 164.8 0 88 88 0 0 0 116.5-116.5A88 88 0 0 0 512 256zm-144.8-44.25l-131 130a11 11 0 0 1-15.55-.06l-75.72-76.33a11 11 0 0 1 .06-15.56L171 224a11 11 0 0 1 15.56.06l42.15 42.49 97.2-96.42a11 11 0 0 1 15.55.06l25.82 26a11 11 0 0 1-.08 15.56z" class="fa-secondary"></path></g></svg>`;
        const tagbadgecode = (color: string, text: string) => `<span style="background-color:${color};padding:0.2em 0.6em;border-radius:.2em;color:#fff;font-size:0.7em;font-weight:bold;display:inline-block">${text}</span>`;
        const Names = document.querySelectorAll('.uoj-username, .uoj-honor') as NodeListOf<HTMLElement>;
        for (const i in Names) {
            const name = Names[i].textContent;
            if (!name || Names[i].parentElement?.getAttribute('class') == 'legendLabel') continue;
            if (CCFBadgeList[name]) {
                for (const j in CCFBadgeList[name]) {
                    console.log(name, Names[i].textContent, CCFBadgeList[name][j]);
                    Names[i].innerHTML += ` ${ccfbadgecode(CCFBadgeList[name][j])}`;
                }
            }
            if (TagBadgeList[name]) {
                for (const j in TagBadgeList[name]) {
                    console.log(Names[i].textContent, TagBadgeList[name][j]);
                    Names[i].innerHTML += ` ${tagbadgecode(TagBadgeList[name][j].color, TagBadgeList[name][j].text)}`;
                }
            }
        }
    }
    setNameBadge();
}