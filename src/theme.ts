import { Darktheme, Ligatures } from "./variables";

export function Theme() {
    GM_addElement('link', {
        href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.1/css/fontawesome.css',
        rel: 'stylesheet'
    });
    GM_addElement('link', {
        href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.1/css/brands.css',
        rel: 'stylesheet'
    });
    GM_addElement('link', {
        href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.1/css/solid.css',
        rel: 'stylesheet'
    });

    GM_addStyle(`
@import url(https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css);
code {
    font-family: "Fira Code" !important;
    ${Ligatures ? '' : 'font-variant-ligatures: none !important;'}
}
.card {
    ${Darktheme ? 'border-color: rgba(255,255,255,.125); !important' : ''}
}
.card-footer {
    ${Darktheme ? 'border-color: rgba(255,255,255,.03); !important' : ''}
}
pre, pre.sh_sourceCode {
${Darktheme ?  `
    color: #e0e0e0 !important;
    background-color: #222 !important;
    border-color: #2e2e30 !important;
` : ''}
}
code > span {
    font-style: normal !important;
    font-weight: 400 !important;
}
code > span.sh_preproc,
code > span.sh_keyword,
code > span.sh_type {
    color: ${!Darktheme ? '#8959a8' : '#cc99cd'} !important;
}
code > span.sh_string,
code > span.sh_specialchar {
    color: ${!Darktheme ? '#718c00' : '#7ec699'} !important;
}
code > span.sh_cbracket {
    color: ${!Darktheme ? '#4d4d4c' : '#cccccc'} !important;
}
code > span.sh_symbol {
    color: ${!Darktheme ? '#3e999f' : '#67cdcc'} !important;
}
code > span.sh_number {
    color: ${!Darktheme ? '#f5871f' : '#f08d49'} !important;
}
code > span.sh_function {
    color: ${!Darktheme ? '#4271ae' : '#f08d49'} !important;
}
code > span.sh_comment {
    color: ${!Darktheme ? '#8e908c' : '#999999'} !important;
}
.copybutton {
    font-size: 1.1em;
    width: 2.2em;
    height: 2.2em;
    padding: 0;
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${Darktheme ? 'rgb(255,255,255,.1)' : 'rgb(0,0,0,.1)'};
    border: 0 solid transparent;
    border-bottom-left-radius: .28571429rem;
}
.copybutton:hover {
    background-color: ${Darktheme ? 'rgb(255,255,255,.2)' : 'rgb(0,0,0,.2);'};
}
.copybutton:focus {
    outline: none;
}
    `);

    if (Darktheme) {
        GM_addStyle(`
body {
    color: #f2eee8;
    background-color: #222;
}

a.header-a {
    color: #f2eee8;
}

.navbar-light .navbar-brand {
    color: #fff
}
.navbar-light .navbar-brand:focus,.navbar-light .navbar-brand:hover {
    color: #fff
}
.navbar-light .navbar-nav .nav-link {
    color: rgba(255,255,255,.5)
}
.navbar-light .navbar-nav .nav-link:focus,.navbar-light .navbar-nav .nav-link:hover {
    color: rgba(255,255,255,.75)
}
.navbar-light .navbar-nav .nav-link.disabled {
    color: rgba(255,255,255,.25)
}
.navbar-light .navbar-nav .active>.nav-link,.navbar-light .navbar-nav .nav-link.active,.navbar-light .navbar-nav .nav-link.show,.navbar-light .navbar-nav .show>.nav-link {
    color: #fff
}
.navbar-light .navbar-toggler {
    color: rgba(255,255,255,.5);
    border-color: rgba(255,255,255,.1)
}
.navbar-light .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")
}
.navbar-light .navbar-text {
    color: rgba(255,255,255,.5)
}
.navbar-light .navbar-text a {
    color: #fff
}
.navbar-light .navbar-text a:focus,.navbar-light .navbar-text a:hover {
    color: #fff
}
.bg-light {
    background-color: #343a40!important
}
a.bg-light:focus,a.bg-light:hover,button.bg-light:focus,button.bg-light:hover {
    background-color: #1d2124!important
}

.uoj-footer {
    border-top-color: #272b31;
}

.page-header {
    border-color: #2e2e30;
}

.page-link, .page-item.disabled .page-link {
    background-color: #222;
    border-color: #2e2e30;
}

.card {
    background-color: #222;
}
.card-header {
    background-color: rgba(255,255,255,.03);
    border-bottom-color: rgba(255,255,255,.125);
}

.card-uoj-accepted>.card-header,
.card-uoj-wrong>.card-header,
.card-uoj-acceptable-answer>.card-header,
.card-uoj-tle>.card-header {
    opacity: 0.9;
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #f2eee8;
    background-color: #222;
    border-color: #2e2e30 #2e2e30 #222;
}
.nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {
    border-color: #2e2e30 #2e2e30 #222;
}
.nav-tabs {
    border-bottom-color: #2e2e30;
}

.bootstrap-switch .bootstrap-switch-handle-on, .bootstrap-switch .bootstrap-switch-handle-off, .bootstrap-switch .bootstrap-switch-label {
    background-color: #222;
    border-color: #2e2e30;
    color: #f2eee8;
}

.table {
    color: #f2eee8;
}
.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(255,255,255,.05);
}
.table-hover tbody tr:hover {
    color: #cccccc;
    background-color: rgba(255,255,255,.075);
}
.table thead th {
    border-bottom-color: #2e2e30;
}
.table td, .table th {
    border-color: #2e2e30;
    border-top-color: #2e2e30;
}
.table-bordered td, .table-bordered th {
    border-color: #2e2e30;
}

.form-control {
    color: #f2eee8;
    background-color: #222;
    border-color: #2e2e30;
}
.form-control:focus {
    color: #f2eee8;
    background-color: #222;
}

.img-thumbnail, .img-rounded {
    background-color: #222;
}

.list-group {
    background-color: #222;
}
.list-group-item {
    background-color: #222;
    border-color: rgba(255, 255, 255, .125);
}

.dropdown-menu.show {
    background-color: #222;
    border-color: rgba(255, 255, 255, .15);
}
.dropdown-item {
    color: #f2eee8;
}
.dropdown-item:focus, .dropdown-item:hover {
    color: #f2eee8;
    text-decoration: none;
    background-color: #14171c;
}

.CodeMirror, .CodeMirror-scroll {
    background-color: #222;
    color: #f2eee8;
}
.CodeMirror-activeline-background, .CodeMirror-scroll .CodeMirror-activeline-background {
    background-color: #241e17;
}
.CodeMirror div.CodeMirror-cursor {
    border-left-color: white!important;
}
.CodeMirror-gutters, .CodeMirror-scroll > .CodeMirror-gutters {
    background-color: #222;
    border-right-color: #59554f;
    color: #59554f;
}
.CodeMirror-linenumber {
    background-color: #222;
    color: #59554f;
}
.blog-content-md-editor-toolbar {
    background: #343a40
}

#rating-tooltip {
    background-color: rgb(0,17,17)!important;
    border: rgb(0,34,34)!important;
}

#MathJax_ZoomFrame {
    color: black;
}
        `);
    }
}