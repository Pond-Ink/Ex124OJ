import { NameColorList, CCFBadgeList, TagBadgeList } from "./variables";

export function NameColor() {
    const Names = document.getElementsByClassName('uoj-username') as HTMLCollectionOf<HTMLElement>;
    let NeedsRepeat = false;
    for (const i in Names) {
        if (Names[i].innerHTML && NameColorList[Names[i].innerHTML]) {
            Names[i].style.color = NameColorList[Names[i].innerHTML][0];
            let resN = '';
            for (let charN = 1; charN < NameColorList[Names[i].innerHTML].length; ++charN) {
                resN = resN + `<font style="color:${NameColorList[Names[i].innerHTML][charN]}">${Names[i].innerHTML.substring(charN - 1, charN)}</font>`;
            }
            Names[i].innerHTML = resN + Names[i].innerHTML.substring(NameColorList[Names[i].innerHTML].length - 1);
            if (Names[i].parentElement?.getAttribute('class') === 'legendLabel') {
                NeedsRepeat = true;
            }
        }
    }
    if (NeedsRepeat) {
        setInterval(() => {
            const Names = document.getElementsByClassName('uoj-username') as HTMLCollectionOf<HTMLElement>;
            for (const i in Names) {
                if (Names[i].innerHTML && Names[i].parentElement?.getAttribute('class') === 'legendLabel' && NameColorList[Names[i].innerHTML]) {
                    Names[i].style.color = NameColorList[Names[i].innerHTML][0];
                    let resN = '';
                    for (let charN = 1; charN < NameColorList[Names[i].innerHTML].length; ++charN) {
                        resN = resN + `<font style="color:${NameColorList[Names[i].innerHTML][charN]}">${Names[i].innerHTML.substring(charN - 1, charN)}</font>`;
                    }
                    Names[i].innerHTML = resN + Names[i].innerHTML.substring(NameColorList[Names[i].innerHTML].length - 1);
                }
            }
        }, 200);
    }
    const Honors = document.getElementsByClassName('uoj-honor') as HTMLCollectionOf<HTMLElement>;
    for (const j in Honors) {
        if (Honors[j].innerHTML && NameColorList[Honors[j].innerHTML]) {
            Honors[j].style.color = NameColorList[Honors[j].innerHTML][0];
            let resH = '';
            for (let charH = 1; charH < NameColorList[Honors[j].innerHTML].length; ++charH) {
                resH = resH + `<font style="color:${NameColorList[Honors[j].innerHTML][charH]}">${Honors[j].innerHTML.substring(charH - 1, charH)}</font>`;
            }
            Honors[j].innerHTML = resH + Honors[j].innerHTML.substring(NameColorList[Honors[j].innerHTML].length - 1);
        }
    }
}

export function NameBadge() {
    const Names = document.getElementsByClassName('uoj-username') as HTMLCollectionOf<HTMLElement>;
    for (const i in Names) {
        if (!Names[i].innerHTML) continue;
        const name = Names[i].textContent!;
        if (CCFBadgeList[name] && Names[i].parentElement?.getAttribute('class') !== 'legendLabel') {
            Names[i].innerHTML = Names[i].innerHTML + ` <svg width="1em" height="1em" data-v-303bbf52="" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="badge-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin-bottom:.25em!important;bottom:10px;--fa-primary-color:#fff;--fa-secondary-color:${CCFBadgeList[name]};--fa-secondary-opacity:1;"><g data-v-303bbf52="" class="fa-group"><path data-v-303bbf52="" fill="var(--fa-secondary-color)" d="M512 256a88 88 0 0 0-57.1-82.4A88 88 0 0 0 338.4 57.1a88 88 0 0 0-164.8 0A88 88 0 0 0 57.1 173.6a88 88 0 0 0 0 164.8 88 88 0 0 0 116.5 116.5 88 88 0 0 0 164.8 0 88 88 0 0 0 116.5-116.5A88 88 0 0 0 512 256zm-144.8-44.25l-131 130a11 11 0 0 1-15.55-.06l-75.72-76.33a11 11 0 0 1 .06-15.56L171 224a11 11 0 0 1 15.56.06l42.15 42.49 97.2-96.42a11 11 0 0 1 15.55.06l25.82 26a11 11 0 0 1-.08 15.56z" class="fa-secondary"></path></g></svg>`;
        }
        if (TagBadgeList[name] && Names[i].parentElement?.getAttribute('class') !== 'legendLabel') {
            Names[i].innerHTML = Names[i].innerHTML + ` <span style="background-color:${TagBadgeList[name][0]};padding:0.2em 0.6em;border-radius:.2em;color:#fff;font-size:0.7em;font-weight:bold;display:inline-block">${TagBadgeList[name][1]}</span>`;
        }
    }
    const Honors = document.getElementsByClassName('uoj-honor') as HTMLCollectionOf<HTMLElement>;
    for (const j in Honors) {
        if (!Honors[j].innerHTML) continue;
        const honor = Honors[j].textContent!;
        if (CCFBadgeList[honor]) {
            Honors[j].innerHTML = Honors[j].innerHTML + ` <svg width="1em" height="1em" data-v-303bbf52="" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="badge-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin-bottom:.25em!important;bottom:10px;--fa-primary-color:#fff;--fa-secondary-color:${CCFBadgeList[honor]};--fa-secondary-opacity:1;"><g data-v-303bbf52="" class="fa-group"><path data-v-303bbf52="" fill="var(--fa-secondary-color)" d="M512 256a88 88 0 0 0-57.1-82.4A88 88 0 0 0 338.4 57.1a88 88 0 0 0-164.8 0A88 88 0 0 0 57.1 173.6a88 88 0 0 0 0 164.8 88 88 0 0 0 116.5 116.5 88 88 0 0 0 164.8 0 88 88 0 0 0 116.5-116.5A88 88 0 0 0 512 256zm-144.8-44.25l-131 130a11 11 0 0 1-15.55-.06l-75.72-76.33a11 11 0 0 1 .06-15.56L171 224a11 11 0 0 1 15.56.06l42.15 42.49 97.2-96.42a11 11 0 0 1 15.55.06l25.82 26a11 11 0 0 1-.08 15.56z" class="fa-secondary"></path></g></svg>`;
        }
        if (TagBadgeList[honor]) {
            Honors[j].innerHTML = Honors[j].innerHTML + ` <span style="background-color:${TagBadgeList[honor][0]};padding:0.2em 0.6em;border-radius:.2em;color:#fff;font-size:0.7em;font-weight:bold;display:inline-block">${TagBadgeList[honor][1]}</span>`;
        }
    }
}