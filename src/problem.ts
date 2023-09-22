import { isProblem } from "./utils";
import { Darktheme } from "./variables";
import { CodeCopy } from "./code";

declare function sh_highlightDocument(): void;

function appendsource() {
    const mathjaxconfig = document.createElement('script');
    mathjaxconfig.type = 'text/x-mathjax-config';
    mathjaxconfig.innerHTML = `
        MathJax.Hub.Config({
            showProcessingMessages: false,
            tex2jax: {
                inlineMath: [["$", "$"], ["\\\\(", "\\\\)"]],
                processEscapes:true
            },
            menuSettings: {
                zoom: "Hover"
            }
        });
    `;
    document.head.appendChild(mathjaxconfig);
    const mathjax = document.createElement('script');
    mathjax.src = '//cdn.bootcss.com/mathjax/2.6.0/MathJax.js?config=TeX-AMS_HTML';
    document.head.appendChild(mathjax);
    const jquery = document.createElement('script');
    jquery.src = 'http://124.221.194.184/js/jquery.form.min.js';
    document.head.appendChild(jquery);
    const shtypical = document.createElement('link');
    shtypical.type = 'text/css';
    shtypical.rel = 'stylesheet';
    shtypical.href = 'http://124.221.194.184/css/sh_typical.min.css';
    document.head.append(shtypical);
    const shmain = document.createElement('script');
    shmain.src = 'http://124.221.194.184/js/sh_main.min.js';
    document.head.appendChild(shmain);
    shmain.addEventListener('load', function() {
        sh_highlightDocument();
    });
}

export function Problem() {
    GM_addStyle(`
.partly-hidden {
    transition: opacity 125ms;
}
.partly-hidden:not(:hover) {
    opacity: 0;
}
    `);

    const uojcontent = document.querySelector('div.uoj-content');
    if (!uojcontent) {
        return;
    }
    if (!uojcontent.querySelectorAll('.page-header').length) {
        const lostpage = document.body.innerHTML;

        uojcontent.innerHTML = `
<div class="row d-flex justify-content-center">
    <span class="badge badge-secondary mr-1" id="time-limit">时间限制:</span>
    <span class="badge badge-secondary mr-1" id="memory-limit">空间限制:</span>
</div>
<div class="float-right">
    <div class="uoj-click-zan-block" id="vote"></div>
</div>
${ (() => {
    if (isProblem()![2]) {
        return `
<div class="page-header row">
    <h1 class="col-md-3 text-left" id="contest-name"><small></small></h1>
    <h1 class="col-md-7 text-center" id="problem-name"></h1>
    <div class="col-md-2 text-right" id="contest-countdown"></div>
</div>
        `;
    } else {
        return `<h1 class="page-header text-center" id="problem-name"></h1>`;
    }
})() }
<a role="button" class="btn btn-info float-right" href="${isProblem()![2] ? `/contest/${isProblem()![2]}` : ''}/problem/${isProblem()![3]}/statistics"><span class="glyphicon glyphicon-stats"></span> 统计</a>

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#tab-statement" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-book"></span> 描述</a></li>
    ${ isProblem()![2] ? `<li class="nav-item"><a class="nav-link" id="nav-contest" href="/contest/${isProblem()![2]}" role="tab">返回比赛</a></li>` : ''}
</ul>
<div class="tab-content">
    <div class="tab-pane active" id="tab-statement">
    </div>
</div>`

        GM_xmlhttpRequest({
            method: "GET",
            url: `https://ex124oj.pond.ink/api${isProblem()![2] ? `/contest/${isProblem()![2]}` : ''}/problem/${isProblem()![3]}`,
            nocache: true,
            onload: (data) => {
                if (data.status == 200) {
                    const res = JSON.parse(data.response);
                    const title = document.querySelector('head > title');
                    if (title && res.title) {
                        title.innerHTML = res.title;
                    }
                    const problename = document.querySelector('#problem-name');
                    if (problename && res.problemname) {
                        problename.innerHTML = res.problemname;
                    }
                    const contestname = document.querySelector('#contest-name');
                    if (contestname && res.contestname) {
                        contestname.innerHTML = res.contestname;
                    }
                    const statement = document.querySelector('#tab-statement');
                    if (statement && res.statement) {
                        statement.innerHTML = res.statement;
                    }
                    const timelimit = document.querySelector('#time-limit');
                    if (timelimit && res.timelimit) {
                        timelimit.innerHTML = res.timelimit;
                    }
                    const memorylimit = document.querySelector('#memory-limit');
                    if (memorylimit && res.memorylimit) {
                        memorylimit.innerHTML = res.memorylimit;
                    }
                    const vote = document.querySelector('#vote');
                    if (vote && res.vote) {
                        vote.innerHTML = res.vote;
                        eval('$(".uoj-click-zan-block").click_zan_block();');
                    }
                    const countdown = document.querySelector('#contest-countdown');
                    if (countdown && res.script) {
                        eval(res.script);
                    }

                    appendsource();

                    CodeCopy();
                } else {
                    document.body.innerHTML = lostpage;
                }
            }
        });
    }

    const tabcontent = document.querySelector('div.tab-content');

    if (tabcontent) {
        const navbar = document.createElement('div');
        tabcontent.before(navbar);
        navbar.setAttribute('style', 'border-bottom: 1px solid ' + (Darktheme ? '#2e2e30' : '#dee2e6;'));
        const statisticsButton = document.querySelector('div.uoj-content > a[role=button]');
        if (statisticsButton) navbar.appendChild(statisticsButton);

        const DownloadTag = document.createElement('a');
        navbar.appendChild(DownloadTag);
        DownloadTag.setAttribute('role', 'button');
        DownloadTag.setAttribute('class', 'btn btn-primary float-right partly-hidden');
        DownloadTag.setAttribute('href', '/download.php?type=problem&id=' + isProblem()![3]);
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
            TJInnerTag.setAttribute('href', '/download.php?type=tj&id=' + isProblem()![3]);
            TJInnerTag.innerHTML = '<span class="glyphicon glyphicon-book"></span> 题解';
        }
    }
}