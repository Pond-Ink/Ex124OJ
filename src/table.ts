export function TableStyle() {
    const Tables = document.getElementsByTagName('table');
    for (const table in Tables) {
        if (Tables[table].nodeType) {
            const parentNode = Tables[table].parentNode as Element;
            const parentClass = parentNode.getAttribute('class');
            const classList = Tables[table].classList;
            if (parentClass !== 'legend' && classList.length === 0) {
                Tables[table].classList.add('table', 'table-bordered');
            }
        }
    }

    const ths = document.getElementsByTagName('th');
    for (const th in ths) {
        if (ths[th].nodeType && ths[th].getAttribute('align')) {
            ths[th].setAttribute('style', 'text-align:' + ths[th].getAttribute('align'));
        }
    }
}
