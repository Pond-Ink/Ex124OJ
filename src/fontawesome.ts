export function FontAwesome() {
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
}