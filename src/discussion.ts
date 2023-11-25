import { Academic } from "./variables";
import { Darktheme } from "./variables";

export function DiscussionCard() {
    const footer = document.querySelector('div.uoj-footer');
    if (footer) {
        const discrd = document.createElement('div');
        discrd.setAttribute('class', 'giscus');
        footer.insertBefore(discrd, footer.firstChild);

        const writebutton = document.createElement('button');
        writebutton.setAttribute('class', 'btn btn-search btn-outline-primary');
        writebutton.style.height = 'calc(1.5em + 0.75rem + 2px)';
        writebutton.innerHTML = '<i class="fa fa-pen"> 写评论';
        writebutton.onclick = () => {
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        };
        footer.insertBefore(writebutton, discrd);

        GM_addElement('script', {
            'src': 'https://giscus.app/client.js',
            'data-repo': 'Ex124OJ/Ex124OJ-discussions',
            'data-repo-id': 'R_kgDOImiZLA',
            'data-category': 'Ideas',
            'data-category-id': 'DIC_kwDOImiZLM4CTCIj',
            'data-mapping': 'pathname',
            'data-strict': '1',
            'data-reactions-enabled': '1',
            'data-emit-metadata': '0',
            'data-input-position': 'bottom',
            'data-theme': Darktheme ? 'noborder_dark' : 'light',
            'data-lang': 'zh-CN',
            'data-loading': 'lazy',
            'crossorigin': 'anonymous',
            'async': ''
        });
        GM_addStyle(`
.giscus {
    display: ${(Academic == true ? 'none' : 'unset')};
}
.giscus-frame {
    margin-top: 20px;
}
        `);

        const lanButton = document.getElementsByClassName('btn-group dropright mb-3')[0];
        const blankLine = document.createElement('div');
        (blankLine as HTMLElement).style.marginTop = '20px';
        lanButton.parentNode?.insertBefore(blankLine, lanButton);
    }
}