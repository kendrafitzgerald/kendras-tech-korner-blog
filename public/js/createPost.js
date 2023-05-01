const postButton = document.querySelector("#create-post")
let postForm = document.querySelector("#create-post-form")

postButton.addEventListener('click', () => {
    postForm.setAttribute('style', 'display: block')
});

const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#post-title").value.trim();
    const postContent = document.querySelector("#post-content").value.trim();

    if (title && postContent) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, postContent}),
            headers: {'Content-Type': 'application/json'}
        });
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('Failed to create post. Try again.')
    };
  };
};

document.querySelector("#submit-new-post").addEventListener('click', createPostHandler)