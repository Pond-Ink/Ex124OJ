import { Darktheme } from "./variables";

function replaceClassName(before: string, after: string) {
    const list = document.getElementsByClassName(before);
    while (list.length) {
        list[0].classList.add(after);
        list[0].classList.remove(before);
    }
}

export function DarkenTheme() {
    if (Darktheme) {
        GM_addStyle(`
body {
    color: #f2eee8;
    background-color: #0d1117;
}

.page-header {
    border-color: #2e2e30;
}

.uoj-footer {
    border-top-color: #272b31;
}

.page-link, .page-item.disabled .page-link {
    background-color: #0d1117;
    border-color: #3e3c3c;
}

.card {
    background-color: #0d1117;
}
.card-header {
    background-color: rgba(255,255,255,.03);
    border-bottom-color: rgba(255,255,255,.125);
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #f2eee8;
    background-color: #0d1117;
    border-color: #2e2e30 #2e2e30 #0d1117;
}

.nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {
    border-color: #2e2e30 #2e2e30 #0d1117;
}

.nav-tabs {
    border-bottom-color: #2e2e30;
}

.border-info, .bg-info {
    opacity: 0.9;!important;
}

.btn-info, .btn-primary, .btn-warning, .btn-danger {
    opacity: 0.8;
}

.bootstrap-switch .bootstrap-switch-handle-on, .bootstrap-switch .bootstrap-switch-handle-off, .bootstrap-switch .bootstrap-switch-label {
    background-color: #0d1117;
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
    color: #d1c9bf;
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
    color: #a99e91;
    background-color: #0d1117;
    border-color: #3e3c3c;
}
.form-control:focus {
    color: #a99e91;
    background-color: #0d1117;
}

.img-thumbnail, .img-rounded {
    background-color: #0d1117;
}

.list-group-item {
    background-color: #0d1117;
    border-color: rgba(255, 255, 255, .125);
}

.dropdown-menu.show {
    background-color: #0d1117;
}

.dropdown-item {
    color: #f2eee8;
}

.dropdown-item:focus, .dropdown-item:hover {
    color: #f2eee8;
    text-decoration: none;
    background-color: #14171c;
}

.list-group {
    background-color: #0d1117;
}

.CodeMirror, .CodeMirror-scroll {
    background-color: #0d1117;
    color: #f2eee8;
}
.CodeMirror-activeline-background, .CodeMirror-scroll .CodeMirror-activeline-background {
    background-color: #241e17;
}
.CodeMirror div.CodeMirror-cursor {
    border-left-color: white!important;
}
.CodeMirror-gutters, .CodeMirror-scroll > .CodeMirror-gutters {
    background-color: #0d1117;
    border-right-color: #59554f;
    color: #59554f;
}
.CodeMirror-linenumber {
    background-color: #0d1117;
    color: #59554f;
}
.blog-content-md-editor-toolbar {
    background: #343a40
}
        `);
        document.addEventListener("DOMContentLoaded",  () => {
            replaceClassName('navbar-light', 'navbar-dark');
            replaceClassName('bg-light', 'bg-dark');
        });
    }
}