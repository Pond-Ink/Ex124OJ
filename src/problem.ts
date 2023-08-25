import { isProblem } from "./utils";

export function downloadData() {
    const DownloadTag = document.createElement('a');
    document.querySelector('div.uoj-content > a[role=button]')!.after(DownloadTag);
    DownloadTag.setAttribute('role', 'button');
    DownloadTag.setAttribute('class', 'btn btn-primary float-right');
    DownloadTag.setAttribute('href', '/download.php?type=problem&id=' + isProblem()![1]);
    DownloadTag.setAttribute('target', '_blank');
    DownloadTag.innerHTML = '<span class="glyphicon glyphicon-download-alt"></span> 下载数据';

    const navtabs = document.querySelector('div.uoj-content > ul[role=tablist]');
    if (navtabs) {
        const TJTag = document.createElement('li');
        navtabs.insertBefore(TJTag, null);
        TJTag.setAttribute('class', 'nav-item');
        const TJInnerTag = document.createElement('a');
        TJTag.appendChild(TJInnerTag);
        TJInnerTag.setAttribute('role', 'tab');
        TJInnerTag.setAttribute('class', 'nav-link');
        TJInnerTag.setAttribute('href', '/download.php?type=tj&id=' + isProblem()![1]);
        TJInnerTag.innerHTML = '<span class="glyphicon glyphicon-book"></span> 题解';
    }
}