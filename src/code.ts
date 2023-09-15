import { Darktheme } from "./variables";

export function CodeCopy() {
    if (!(/^.*\/manage\/statement(\?.*){0,1}$/).test(window.location.href)) {
        const CodeBlocks = document.getElementsByTagName('pre');
        for (const cb in CodeBlocks) {
            if (CodeBlocks[cb] && CodeBlocks[cb].nodeType) {
                const Content = CodeBlocks[cb].innerText;
                CodeBlocks[cb].style.position = 'relative';
                const CopyButton = document.createElement('button');
                CodeBlocks[cb].insertBefore(CopyButton, CodeBlocks[cb].children[0]);
                CopyButton.setAttribute('class', 'copybutton');
                CopyButton.setAttribute('id', `copybutton${cb}`);
                if (Darktheme) CopyButton.setAttribute('style', `color: white;`);
                CopyButton.innerHTML = '<i class="fa-solid fa-copy"></i>';
                CopyButton.onclick = () => {
                    GM_setClipboard(Content, 'text');
                    CopyButton.innerHTML = '<i class="fa-solid fa-check"></i>';
                    setTimeout(() => { CopyButton.innerHTML = '<i class="fa-solid fa-copy"></i>'; }, 500);
                }
            }
        }
    }
}