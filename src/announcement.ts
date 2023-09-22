export function exAnnouncements() {
    const PostsExp = /<body[\s\S]*?>([\s\S]*?)<\/body>/;
    const WrittenByExp = /^by (.*)$/;
    const DateTimeExp = /^(.*?) .*$/;
    if (document.getElementsByClassName('uoj-content')[0].children[0].children[0].children[0]) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://ex124oj.pond.ink/categories/Announcements/",
            nocache: true,
            onload: function(data) {
                const Announcements = document.querySelector('div.uoj-content > div.card.card-default > div.card-body > div.row > div:first-child > table');
                if (Announcements) {
                    Announcements.querySelector('thead > tr')!.innerHTML = '<th style="width:30%">公告</th><th style="width:10%"></th><th style="width:10%"></th><th style="width:30%">Ex 公告</th><th style="width:10%"></th><th style="width:10%"></th>';
                    const trs = Announcements.querySelectorAll('tbody > tr');
                    for (var tr = 0; tr < trs.length - 1; ++tr) {
                        if (trs[tr].innerHTML) {
                            trs[tr].innerHTML = (trs[tr].children.length > 2 ? trs[tr].innerHTML : '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>') + '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
                            if (WrittenByExp.test(trs[tr].children[1] && trs[tr].children[1].innerHTML)) {
                                trs[tr].children[1].innerHTML = trs[tr].children[1].innerHTML.match(WrittenByExp)![1];
                            }
                            if (DateTimeExp.test(trs[tr].children[2] && trs[tr].children[2].innerHTML)) {
                                trs[tr].children[2].innerHTML = '<small>' + trs[tr].children[2].textContent!.match(DateTimeExp)![1] + '</small>';
                            }
                        }
                    }
                    trs[trs.length - 1].innerHTML = '<td class="text-right" colspan="3"><a href="/announcements">所有公告……</a></td><td class="text-right" colspan="3"><a href="https://ex124oj.pond.ink/categories/Announcements/">所有公告……</a></td>';
                    const PostsPage = (new DOMParser()).parseFromString(data.response, 'text/html');
                    const Posts = PostsPage.querySelectorAll('article');
                    for (var i = 0; i < Posts.length && i < 5; ++i) {
                        const title = (Posts[i].querySelector('a.post-title-link') as HTMLAnchorElement);
                        (Announcements.querySelector('tbody') as HTMLElement).children[i].children[3].innerHTML = `<a href="https://ex124oj.pond.ink${title.getAttribute('href')}">${title.innerText}</a>`;
                        (Announcements.querySelector('tbody') as HTMLElement).children[i].children[4].innerHTML = '<a class="uoj-username" href="https://ex124oj.pond.ink/" style="color:rgb(40,173,202)">Ex124OJ</a>';
                        const date = (Posts[i].querySelector('time') as HTMLTimeElement);
                        (Announcements.querySelector('tbody') as HTMLElement).children[i].children[5].innerHTML = '<small>' + date.getAttribute('content') + '</small>'
                    }
                }
            }
        });
    }
}