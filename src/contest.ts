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