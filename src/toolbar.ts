export function RandomProblem() {
    var SearchBox = document.getElementById('form-search-problem')
    if (SearchBox) {
        const RandomButton = document.createElement('div');
        RandomButton.setAttribute('class', 'input-group-append');
        RandomButton.innerHTML = '<button class="btn btn-search btn-outline-primary" style="height: calc(1.5em + 0.75rem + 2px);" onclick="randomProblem();">随机跳题</button>';
        const RandomScript = document.createElement('script');
        RandomScript.innerHTML = 
`function randomProblem() {
    const randomProblemId = Math.ceil(Math.random() * 3000);
    ($.get('/problem/' + randomProblemId, (data, status) => {
        if (status == 'success') {
            window.location.href = '/problem/' + randomProblemId;
        } else {
            randomProblem();
        }
    })).error(() => {
        randomProblem();
    })
}`;
        SearchBox.after(RandomButton);
        RandomButton.after(RandomScript);
    }
}