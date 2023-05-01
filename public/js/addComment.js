const commentButton = document.querySelector("#create-comment")

commentButton.addEventListener('click', () => {
    const commentForm = document.querySelector("#create-comment-form")
    commentForm.setAttribute('style', 'display: block')
    commentButton.setAttribute('style', "display: none")
});

const createCommentHandler = async (event) => {
    event.preventDefault();
    const comment_text = document.querySelector("#comment-text").value.trim();
    const id = window.location.toString().split("/")[window.location.toString().split("/").length-1]

    if (comment_text) {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({comment_text}),
            headers: {'Content-Type': 'application/json'}
        });
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Oops! Could not create comment. Try again.')
    };
  };
};

document.querySelector("#submit-new-comment").addEventListener('click', createCommentHandler)