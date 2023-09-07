import { isProblem } from "./utils";

export function downloadData() {
    GM_addStyle(
`.partly-hidden {
    transition: opacity 125ms;
}
.partly-hidden:not(:hover) {
    opacity: 0;
}`
    );

    const tabcontent = document.querySelector('div.tab-content');

    if (tabcontent) {
        const navbar = document.createElement('div');
        tabcontent.before(navbar);
        navbar.setAttribute('style', 'border-bottom: 1px solid #dee2e6;');
        const statisticsButton = document.querySelector('div.uoj-content > a[role=button]');
        if (statisticsButton) navbar.appendChild(statisticsButton);

        const DownloadTag = document.createElement('a');
        navbar.appendChild(DownloadTag);
        DownloadTag.setAttribute('role', 'button');
        DownloadTag.setAttribute('class', 'btn btn-primary float-right partly-hidden');
        DownloadTag.setAttribute('href', '/download.php?type=problem&id=' + isProblem()![1]);
        DownloadTag.setAttribute('target', '_blank');
        DownloadTag.innerHTML = '<span class="glyphicon glyphicon-download-alt"></span> 下载数据';

        const navtabs = document.querySelector('div.uoj-content > ul[role=tablist]');
        if (navtabs) {
            navbar.appendChild(navtabs);
            navtabs.setAttribute('style', 'border-bottom: none');
            const TJTag = document.createElement('li');
            navtabs.insertBefore(TJTag, null);
            TJTag.setAttribute('class', 'nav-item partly-hidden');
            const TJInnerTag = document.createElement('a');
            TJTag.appendChild(TJInnerTag);
            TJInnerTag.setAttribute('role', 'tab');
            TJInnerTag.setAttribute('class', 'nav-link');
            TJInnerTag.setAttribute('href', '/download.php?type=tj&id=' + isProblem()![1]);
            TJInnerTag.innerHTML = '<span class="glyphicon glyphicon-book"></span> 题解';
        }
    }
}