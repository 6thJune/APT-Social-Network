const photoReader = document.querySelector('.post__photo-reader');
const input = document.querySelector('input[name=photo]');
const photoPreview = document.querySelector('.post__photo-preview');
const photoThumbnail = document.querySelector('.photo-preview__thumbnail');
const thumbnailDel = document.querySelector('.photo-preview__delete');

const logOutBtn = document.querySelector('.head__log-out-btn');
const warningBox = document.querySelector('.warning');
const warningMessage = document.querySelector('.warning__message');
const acceptBtn = document.querySelector('.warning__accept');
const denyBtn = document.querySelector('.warning__deny');

// Log out
logOutBtn.addEventListener('click', () => {
    warningBox.style.display = 'flex';
    warningMessage.textContent = 'Xác nhận đăng xuất?';
    denyBtn.addEventListener('click', () => {
        warningBox.style.display = 'none';
    })
    acceptBtn.addEventListener('click', () => {
        window.location = '/';
    })
})

// Create post
photoReader.addEventListener('click', () => {
    input.click();
})

input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoThumbnail.src = e.target.result;
            photoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

thumbnailDel.addEventListener('click', () => {
    photoPreview.src = null;
    photoPreview.style.display = 'none';
    input.value = '';
})

async function createPost() {
    document.querySelector('body').style.overflow = 'hidden';
    document.getElementById('page-loader').style.display = 'flex';
    const content = document.querySelector('.post__content-reader').value;
    const photo = document.querySelector('input[name=photo]').files[0];
    const formData = new FormData();
    formData.append('content', content);
    formData.append('photo', photo);
    const res = await fetch('/profile/create-post', {
        method: 'POST',
        body: formData
    })
    const result = await res.json();
    if (result.success) {
        document.querySelector('body').style.overflow = 'unset';
        document.getElementById('page-loader').style.display = 'none';
        location.reload();
    }
    else
        alert(result.message);
}

// Delete post
function deletePost(elm) {
    warningBox.style.display = 'flex';
    warningMessage.textContent = 'Xác nhận xóa bài viết?';
    denyBtn.addEventListener('click', () => {
        warningBox.style.display = 'none';
    })
    acceptBtn.addEventListener('click', async () => {
        document.querySelector('body').style.overflow = 'hidden';
        document.getElementById('page-loader').style.display = 'flex';
        const postId = elm.closest('.feed__post').getAttribute('post-id');
        const res = await fetch('/profile/delete-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId })
        })
        const result = await res.json();
        if (result.success) {
            document.querySelector('body').style.overflow = 'unset';
            document.getElementById('page-loader').style.display = 'none';
            location.reload();
        }
    })
}