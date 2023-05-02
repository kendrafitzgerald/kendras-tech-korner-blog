const deleteButton = document.querySelector('#delete-post')

deletePostHandler = async (event) => {
    event.preventDefault();
    const id = window.location.toString().split("/")[window.location.toString().split("/").length-1]
    const response = await fetch (`/api/post/${id}`, {
        method: DELETE
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post')
    }

};

deleteButton.addEventListener('click', deletePostHandler)