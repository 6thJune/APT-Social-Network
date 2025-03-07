// Like post
async function likePost(elm) {
    const postId = elm.closest('.feed__post').getAttribute('post-id');
    const res = await fetch('/like-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
    })
    const result = await res.json();
    if (result.success)
        location.reload();
}

// Search
const searchResult = document.querySelector('.search__result');
const searchBar = document.querySelector('.search-bar__input');
searchBar.addEventListener('input', async () => {
    let searchContent = searchBar.value;
    const res = await fetch('/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchContent })
    })
    const result = await res.json();
    if (result.result.length != 0) {
        searchResult.innerHTML = '';
        result.result.forEach(u => {
            searchResult.insertAdjacentHTML('beforeend', `
                <a href="/home/${u}" class="result__item">${u}</a>
                `)
        })

    }
    else if (searchContent != '') {
        searchResult.innerHTML = '';
        searchResult.insertAdjacentHTML('beforeend', `
            <div class="result__item --not-found">Không có kết quả</div>
            `)
    }
    else
        searchResult.innerHTML = '';
})
// change theme
const themeChanger = document.querySelector('.menu__item.--theme');
themeChanger.addEventListener('click', async () => {
    const getRes = await fetch('/get-theme')
    const getResult = await getRes.json();
    let themeStatus = getResult.theme;

    const changeRes = await fetch('/change-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeStatus })
    });
    const changeResult = await changeRes.json();
    if (changeResult.success)
        location.reload();
})