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
        `);

        replaceClassName('navbar-light', 'navbar-dark');
        replaceClassName('bg-light', 'bg-dark');
    }
}