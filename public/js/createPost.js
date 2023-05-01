const postButton = document.querySelector("#create-post")
let postForm = document.querySelector("#create-post-form")

postButton.addEventListener('click', () => {
    postForm.setAttribute('style', 'display: block')
});

const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#post-title").value.trim();
    const post_text = document.querySelector("#post-content").value.trim();

    if (title && post_text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, post_text}),
            headers: {'Content-Type': 'application/json'}
        });
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('Oops! Could not create post. Try again.')
    };
    console.log(response)
  };
};

document.querySelector("#submit-new-post").addEventListener('click', createPostHandler)