import { NameBadge, NameColor } from "./name";
import { Darktheme } from "./variables";

export function ContestsCard() {
    const content = document.querySelector('div.uoj-content');

    if (content && content.children.length > 1) {
        const TabList = document.createElement('ul');
        content.insertBefore(TabList, content.children[0]);
        TabList.setAttribute('class', 'nav nav-tabs');
        TabList.setAttribute('role', 'tablist');
        const TabContent = document.createElement('div');
        content.insertBefore(TabContent, content.children[1]);
        TabContent.setAttribute('class', 'tab-content');
        TabContent.style.marginBottom = '20px';
        TabContent.style.marginTop = '20px';

        let counter = 0;
        for (let i = 2; i < content.children.length; i++) {
            console.log(content.children[i].tagName);
            if (content.children[i].tagName.toUpperCase() == 'H4') {
                const isActive = !counter;
                const title = document.createElement('li');
                TabList.appendChild(title);
                title.setAttribute('class', 'nav-item');
                let titleText = content.children[i].textContent;
                if (titleText) {
                    titleText = titleText.charAt(0).toUpperCase() + titleText.slice(1);
                    title.innerHTML = `<a class="nav-link${isActive ? ' active' : ''}" href="#card${counter}" role="tab" data-toggle="tab" aria-selected="true">${titleText}</a>`;
                }

                const card = document.createElement('div');
                TabContent.appendChild(card);
                card.setAttribute('class', `tab-pane${isActive ? ' active' : ''}`);
                card.setAttribute('id', `card${counter}`);

                content.removeChild(content.children[i]);

                counter++;
            } else if (counter) {
                TabContent.children[counter - 1].appendChild(content.children[i]);
            } else {
                content.removeChild(content.children[i]);
            }
            i--;
        }
    }
}

function PinLineHeader() {
    const lines = document.querySelectorAll('div#standings > div.table-responsive > table tr');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let x = 0;
        for (let j = 0; j < line.children.length && j < 3; j++) {
            (line.children[j] as HTMLElement).style.position = 'sticky';
            (line.children[j] as HTMLElement).style.left = x + 'px';
            (line.children[j] as HTMLElement).classList.add('checked');
            x = x + parseFloat(window.getComputedStyle(line.children[j]).width);
        }
    }
}

declare let contest_id: number;
let ContestHomepage: Document;
function ProblemTitles() {
    let solve = () => {
        const lines = document.querySelectorAll('div#standings > div.table-responsive > table tr');
        const problems: { [key: string]: string; } = {};
        const rows = ContestHomepage.querySelectorAll('table > tbody > tr');
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].children.length >= 2) {
                const id = rows[i].children[0].textContent, title = rows[i].children[1].textContent;
                if (id && title) {
                    problems[id] = `${id}. ${title}`;
                }
            }
        }
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            for (let j = 3; j < line.children.length; j++) {
                const title = lines[0].children[j].querySelector('a');
                if (title && title.textContent && problems[title.textContent]) {
                    (line.children[j] as HTMLElement).title = problems[title.textContent];
                }
            }
        }
    };
    if (ContestHomepage) {
        solve();
    } else {
        GM_xmlhttpRequest({
            method: "GET",
            url: `/contest/${contest_id}`,
            revalidate: true,
            onload: (data) => {
                ContestHomepage = (new DOMParser()).parseFromString(data.response, 'text/html');
                solve();
            }
        });
    }
}

let Problemchecked: boolean[] = [];

declare let standings: Array<[number, number, [string, number], number]>;
declare let score: { [key: string]: { [key: number]: [number, number, number] } };
declare function showStandings(): void;
declare function getColOfScore(score: number): string;
function ShowStandings() {
    PinLineHeader();
    ProblemTitles();

    const lines = document.querySelectorAll('div#standings > div.table-responsive > table tr');
    if (!lines.length) {
        return;
    }

    let sum = 0;
    for (let k = 0; k < lines.length; k++) {
        for (let i = 3; i < lines[k].children.length; i++) {
            if (Problemchecked[i - 3]) {
                (lines[k].children[i] as HTMLElement).classList.add('checked');
                if (k == 0) sum++;
            }
            (lines[k].children[i] as HTMLElement).addEventListener('click', (event) => {
                const target = event.target as HTMLElement
                if (target.tagName === 'A') {
                    return;
                }
                Problemchecked[i - 3] = !Problemchecked[i - 3];
                displayStandings();
            });
        }
    }

    if (sum == 0) {
        return;
    }
    const scores = document.querySelectorAll('div#standings > div.table-responsive > table > tbody > tr > td:nth-child(3) > div > span.uoj-score');
    for (let i = 0; i < scores.length; i++) {
        (scores[i] as HTMLElement).style.color = getColOfScore(standings[i][0] / sum);
    }
}

function displayStandings(initial?: boolean) {
    const standingsArea = document.querySelector('div#standings') as HTMLElement;
    if (!standingsArea) {
        return;
    }

    const lines = standingsArea.querySelectorAll('div.table-responsive > table tr');
    const headline = lines[0];
    const Problemsum: number = headline.children.length - 3;
    const Usersum: number = lines.length - 1;
    // let checked = false;
    // for (let i = 0; i < Problemsum; i++) {
    //     checked = checked || Problemchecked[i];
    // }

    for (let i = 0; i < Usersum; i++) {
        const name: string = standings[i][2][0];
        standings[i][0] = standings[i][1] = 0;
        for (let j = 0; j < Problemsum; j++) {
            if ((Problemchecked[j]/* || !checked*/) && score[name][j] !== undefined) {
                standings[i][0] += score[name][j][0], standings[i][1] += score[name][j][1];
            }
        }
    }
    standings.sort(function (a: any[], b: any[]) {
        return a[0] != b[0] ? b[0] - a[0] : a[1] - b[1];
    });
    for (let i = 0; i < Usersum; i++) {
        if (!i || standings[i][0] != standings[i - 1][0] || standings[i][1] != standings[i - 1][1]) {
            standings[i][3] = i + 1;
        } else {
            standings[i][3] = standings[i - 1][3];
        }
    }

    const tableBefore = document.querySelector('div.table-responsive');
    if (tableBefore && tableBefore.children[0]) {
        const ScrollRight = parseInt(window.getComputedStyle(tableBefore.children[0]).width) - tableBefore.scrollLeft;
        showStandings();
        if (!initial) {
            NameColor(standingsArea);
            NameBadge(standingsArea);
        }
        ShowStandings();
        const tableAfter = document.querySelector('div.table-responsive');
        if (tableAfter && tableAfter.children[0]) {
            tableAfter.scrollLeft = parseInt(window.getComputedStyle(tableAfter.children[0]).width) - ScrollRight;
        }
    }
}

function NavBar(ProblemSum: number) {
    const navtabs = document.querySelector('div.uoj-content ul[role=tablist]');
    if (!navtabs) {
        return;
    }

    const navbar = document.createElement('div');
    navtabs.before(navbar);
    navbar.setAttribute('style', Darktheme ? 'border-bottom: 1px solid #2e2e30;' : 'border-bottom: 1px solid #dee2e6;');

    const floatright = document.createElement('div');
    navbar.appendChild(floatright);
    floatright.setAttribute('class', 'float-right');

    const unselectall = document.createElement('a');
    floatright.appendChild(unselectall);
    unselectall.setAttribute('class', 'btn btn-info btn-sm');
    unselectall.setAttribute('target', '_blank');
    unselectall.style.color = '#fff';
    unselectall.style.cursor = 'pointer';
    unselectall.addEventListener('click', () => {
        Problemchecked = new Array(ProblemSum).fill(true);
        displayStandings();
    });
    unselectall.innerHTML = '全选';

    const selectall = document.createElement('a');
    floatright.appendChild(selectall);
    selectall.setAttribute('class', 'btn btn-primary btn-sm');
    selectall.setAttribute('target', '_blank');
    selectall.style.color = '#fff';
    selectall.style.cursor = 'pointer';
    selectall.addEventListener('click', () => {
        Problemchecked = new Array(ProblemSum).fill(false);
        displayStandings();
    });
    selectall.innerHTML = '全不选';

    navbar.appendChild(navtabs);
    navtabs.setAttribute('style', 'border-bottom: none');
}

export function ContestStandings() {
    GM_addStyle(`
div#standings > div.table-responsive > table > thead > tr > th:nth-child(-n+3)::before,
div#standings > div.table-responsive > table > tbody > tr > td:nth-child(-n+3)::before {
    content: "";
    position: absolute;
    top: 0;
    right: 100%;
    width: 1px;
    height: 100%;
    background-color: ${Darktheme ? '#2e2e30' : '#dee2e6'};
}

div#standings > div.table-responsive > table > thead > tr > th.checked, 
div#standings > div.table-responsive > table > tbody > tr:nth-of-type(even) > td.checked {
    background-color: ${Darktheme ? '#192523' : '#F4FFFF'};
}
div#standings > div.table-responsive > table > tbody > tr:nth-of-type(odd) > td.checked {
    background-color: ${Darktheme ? '#1F2B29' : '#F0FFFF'};
}

`);
    const ProblemSum = document.querySelectorAll('div#standings > div.table-responsive > table > thead > tr > th').length - 3;
    Problemchecked = new Array(ProblemSum).fill(true);
    displayStandings(true);
    NavBar(ProblemSum);
}