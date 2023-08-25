export function changeGravatarURL() {
    const GravatarURLRegExp = /\/\/cn.gravatar.com\/avatar\/(.*)/;
    const Gravatars = document.querySelectorAll('img');
    for (const i in Gravatars) {
        if (Gravatars[i] && Gravatars[i].nodeType
         && GravatarURLRegExp.test(Gravatars[i].getAttribute('src')!)
         && Gravatars[i].getAttribute('alt')!.toLowerCase().includes('avatar')) {
            Gravatars[i].setAttribute('src', '//cravatar.cn/avatar/' + Gravatars[i].getAttribute('src')!.match(GravatarURLRegExp)![1]);
        }
    }
}