import { Ligatures } from "./variables";

export function CodeBlock() {
    GM_addStyle(
`@import url(https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css);
code {
    font-family: "Fira Code";
    ${Ligatures ? '' : 'font-variant-ligatures: none;'}
}
code.sh_cpp>span {
    font-style: normal !important;
    font-weight: 400 !important;
}
code.sh_cpp>span.sh_preproc,
code.sh_cpp>span.sh_keyword,
code.sh_cpp>span.sh_type {
    color: #8959a8;
}
code.sh_cpp>span.sh_string {
    color: #718c00;
}
code.sh_cpp>span.sh_cbracket {
    color: #4d4d4c;
}
code.sh_cpp>span.sh_symbol {
    color: #3e999f;
}
code.sh_cpp>span.sh_number {
    color: #f5871f;
}
code.sh_cpp>span.sh_function {
    color: #4271ae;
}
code.sh_cpp>span.sh_comment {
    color: #8e908c;
}
.copybutton {
    font-size: 1.1em;
    width: 2.2em;
    height: 2.2em;
    padding: 0;
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgb(0,0,0,.1);
    border: 0 solid transparent;
    border-bottom-left-radius: .28571429rem;
}
.copybutton:hover {
    background-color: rgb(0,0,0,.2);
}
.copybutton:focus {
    outline: none;
}`);

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