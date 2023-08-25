export function SubmissionCard() {
    const content = document.querySelector('div.uoj-content');
    
    if (content && content.children.length > 1) {
        const TabList = document.createElement('ul');
        content.insertBefore(TabList, content.children[1]);
        TabList.setAttribute('class', 'nav nav-tabs');
        TabList.setAttribute('role', 'tablist');
        const TabContent = document.createElement('div');
        content.insertBefore(TabContent, content.children[2]);
        TabContent.setAttribute('class', 'tab-content');
        TabContent.style.marginBottom = '20px';
        
        let counter = 0;
        for (let i = 3; i < content.children.length; i++, counter++) {
            const classlist = content.children[i].getAttribute('class');
            if (classlist && (classlist as string).includes('card')) {
                const isActive = !counter;

                const title = document.createElement('li');
                TabList.appendChild(title);
                title.setAttribute('class', 'nav-item');
                let titleText = content.children[i].querySelector('h4.card-title')?.textContent;
                if (titleText) {
                    titleText = titleText.charAt(0).toUpperCase() + titleText.slice(1);
                    title.innerHTML = `<a class="nav-link${isActive ? ' active' : ''}" href="#card${counter}" role="tab" data-toggle="tab" aria-selected="true">${titleText}</a>`;
                }
                
                const card = document.createElement('div');
                TabContent.appendChild(card);
                card.setAttribute('class', `tab-pane card${isActive ? ' active' : ''}`);
                card.setAttribute('id', `card${counter}`);
                const card_body = content.children[i].querySelector('div.card-body');
                if (card_body) card.appendChild(card_body);
                const card_footer = content.children[i].querySelector('div.card-footer');
                if (card_footer) card.appendChild(card_footer);

                content.removeChild(content.children[i]);
                i--;
            }
        }
    }
}