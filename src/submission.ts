import { isSubmission } from "./utils";

declare function sh_highlightDocument(): void;
function SubmissionCrack() {
    GM_xmlhttpRequest({
        method: "GET",
        url: `https://ex124oj.pond.ink/api/submission/${isSubmission()![1]}`,
        revalidate: true,
        onload: (data) => {
            if (data.status == 200) {
                SubmissionCard(JSON.parse(data.response));
            } else {
                SubmissionCard({});
            }
        }
    });
}

function SubmissionCard(data: { [keys: string]: { body?: string, footer?: string } }) {
    GM_addStyle(
`div.tab-content > div.tab-pane.card {
    border-top: none;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
}`
    );

    const content = document.querySelector('div.uoj-content');
    
    if (content && content.children.length) {
        const TabList = document.createElement('ul');
        content.insertBefore(TabList, content.children[1]);
        TabList.setAttribute('class', 'nav nav-tabs');
        TabList.setAttribute('role', 'tablist');
        const TabContent = document.createElement('div');
        content.insertBefore(TabContent, content.children[2]);
        TabContent.setAttribute('class', 'tab-content');
        TabContent.style.marginBottom = '20px';
        
        let counter = 0, cardtitle;
        let flag = { answer: false, details: false };
        for (let i = 3; i < content.children.length; i++, counter++) {
            const classlist = content.children[i].getAttribute('class');
            if (classlist && (classlist as string).includes('card')) {
                const isActive = !counter;

                const title = document.createElement('li');
                TabList.appendChild(title);
                title.setAttribute('class', 'nav-item');
                const titleText = content.children[i].querySelector('h4.card-title')?.textContent;
                if (titleText) {
                    cardtitle = titleText.charAt(0).toUpperCase() + titleText.slice(1);
                    title.innerHTML = `<a class="nav-link${isActive ? ' active' : ''}" href="#card${counter}" role="tab" data-toggle="tab" aria-selected="true">${cardtitle}</a>`;

                    if (cardtitle == 'Answer') {
                        flag.answer = true;
                    } else if (cardtitle == '详细' || cardtitle == 'Details') {
                        flag.details = true;
                    }
                }
                
                const card = document.createElement('div');
                TabContent.appendChild(card);
                card.setAttribute('class', `tab-pane card${isActive ? ' active' : ''}`);
                card.setAttribute('id', `card${counter}`);

                let card_body = content.children[i].querySelector('div.card-body');
                if (cardtitle == 'Answer' && data.answer && data.answer.body) {
                    card_body = document.createElement('div');
                    card_body.classList.add('card-body');
                    (card_body as HTMLElement).innerHTML = data.answer.body;
                } else if ((cardtitle == '详细' || cardtitle == 'Details') && data.details && data.details.body) {
                    card_body = document.createElement('div');
                    card_body.classList.add('card-body');
                    (card_body as HTMLElement).innerHTML = data.details.body;
                }
                if (card_body) {
                    card.appendChild(card_body);
                }

                const card_footer = content.children[i].querySelector('div.card-footer');
                if (card_footer) {
                    card.appendChild(card_footer);
                }
                if (cardtitle == 'Answer' && data.answer && data.answer.footer) {
                    (card_footer as HTMLElement).innerHTML = data.answer.footer;
                }

                content.removeChild(content.children[i]);
                i--;
            }
        }

        if (!flag.answer && data.answer) {
            const isActive = !counter;

            const title = document.createElement('li');
            TabList.appendChild(title);
            title.setAttribute('class', 'nav-item');
            title.innerHTML = `<a class="nav-link${isActive ? ' active' : ''}" href="#card${counter}" role="tab" data-toggle="tab" aria-selected="true">Answer</a>`;
            
            const card = document.createElement('div');
            TabContent.appendChild(card);
            card.setAttribute('class', `tab-pane card${isActive ? ' active' : ''}`);
            card.setAttribute('id', `card${counter}`);

            if (data.answer.body) {
                const card_body = document.createElement('div');
                card_body.classList.add('card-body');
                (card_body as HTMLElement).innerHTML = data.answer.body;
                card.appendChild(card_body);
            }
            if (data.answer.footer) {
                const card_body = document.createElement('div');
                card_body.classList.add('card-footer');
                (card_body as HTMLElement).innerHTML = data.answer.footer;
                card.appendChild(card_body);
            }
            
            counter++;
        }
        if (!flag.details) {
            const isActive = !counter;

            const title = document.createElement('li');
            TabList.appendChild(title);
            title.setAttribute('class', 'nav-item');
            title.innerHTML = `<a class="nav-link${isActive ? ' active' : ''}" href="#card${counter}" role="tab" data-toggle="tab" aria-selected="true">详细</a>`;
            
            const card = document.createElement('div');
            TabContent.appendChild(card);
            card.setAttribute('class', `tab-pane card${isActive ? ' active' : ''}`);
            card.setAttribute('id', `card${counter}`);

            if (data.details.body) {
                const card_body = document.createElement('div');
                card_body.classList.add('card-body');
                (card_body as HTMLElement).innerHTML = data.details.body;
                card.appendChild(card_body);
            }
            
            counter++;
        }

        sh_highlightDocument();
    }
}

export function Submission() {
    SubmissionCrack();
}