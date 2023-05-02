const updateButton = document.querySelector("#update-post")

updateButton.addEventListener('click', () => {
    const updateForm = document.querySelector("#update-form")
    updateForm.setAttribute('style', 'display: block')
    updateButton.setAttribute('style', "display: none")
});

const updatePostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#new-title").value.trim();
    const post_text = document.querySelector('#update-text').value.trim();
    if (title && post_text) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title, post_text}),
            headers: {'Content-Type': 'application/json'}
        });
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Oops! Could not update post. Try again.')
    };
  };
};

document.querySelector("#submit-update").addEventListener('click', updatePostHandler)