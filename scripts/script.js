const posts = JSON.parse(localStorage.getItem('posts')) || []

const postsArea = document.querySelector('.posts')
const modalPost = document.querySelector('.modal-post')
const confirmPostButton = document.querySelector('.confirm-post-button')
const postContent = document.querySelector('#post-content')
const modalToEditPosts = document.querySelector('.edit-post-modal')
const editPostContent = document.querySelector('#edit-post-content')
const editPostModalButton = document.querySelector('.edit-post-button')

const openModalPost = document.querySelector('.posts-area button').addEventListener('click', (e) => {
    e.preventDefault()

    postContent.value = ""
    modalPost.style.display = "flex"
    document.body.style.overflow = "hidden"

})

const closeModal = document.querySelector('.close-modal').addEventListener('click', (e) => {
    e.preventDefault()

    modalPost.style.display = "none"
    document.body.style.overflow = "overlay"
})

confirmPostButton.addEventListener('click', (e) => {
    
    e.preventDefault()

    let content = postContent.value

    if(content != "") {
        createPost(content)
        modalPost.style.display = "none"
        document.body.style.overflow = "overlay"
    }

}) 

function postID () {
    let date = new Date
    let id = date.getTime()
  
    return id
}

function createPost(content) {
    
    posts.unshift({
        content: content,
        id: String(postID())
    })
    
    localStorage.setItem('posts', JSON.stringify(posts))
    
    updatePosts()
}

function updatePosts() {
    postsArea.innerHTML = ""

    posts.forEach(post => {
        postsArea.innerHTML += postStructure(post)
    })
}

function postStructure(post) {

    let html = `
    <article class="post" data-id="${post.id}">
        <div class="post-header">
            <div class="post-profile-infos">
                <div class="profile-image">
                    <img src="images/profile-image.jpg" alt="Image de perfil do usuário">    
                </div>
                <div class="post-user-infos">
                    <p class="post-username">Christian Matos</p>
                    <p class="post-occupation">Assistente Administrativo | Kroton</p>
                </div>
            </div>
            <div class="post-header-button">
                <button class="modal-options"></button>
                <button class="close-options"></button>
            </div>
            <div class="edit-or-delete-post-modal">
                <ul>
                    <li class="edit-post">
                        <img src="images/edit-post.png" alt="">
                        <span>Editar Publicação</span>
                    </li>
                    <li class="delete-post">
                        <img src="images/delete-post.png" alt="">
                        <span>Excluir Publicação</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="posted">
            ${post.content}
        <div>
    </article>`

    return html
}

postsArea.addEventListener('click', (e) => {

    const postHeader = e.target.parentElement.parentElement
    const editOrDeletePostButtons = document.querySelectorAll('.post-header-button')
    const editOrDeletePostModal = document.querySelectorAll('.edit-or-delete-post-modal')

    editOrDeletePostModal.forEach(modal => {
        modal.style.display = "none"
    })

    editOrDeletePostButtons.forEach(buttons => {
        buttons.children[0].style.display = "flex"
        buttons.children[1].style.display = "none"
    })

    if(e.target.classList.contains('modal-options')) {
        postHeader.children[2].style.display = "block"
        e.target.style.display = "none"
        e.target.nextElementSibling.style.display = "block"
    }

    if(e.target.classList.contains('close-options')) {
        postHeader.children[2].style.display = "none"
        e.target.style.display = "none"
        e.target.previousElementSibling.style.display = "block"
    }

    if(e.target.classList.contains('edit-post')) {
        const id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
        const currentContent = posts.findIndex(post => post.id == id)
        openEditPostModal()
        modalToEditPosts.setAttribute('data-id', id)
        editPostContent.value = posts[currentContent].content
    }

    if(e.target.classList.contains('delete-post')) {
        const id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
        deletePost(id)
    }
})

editPostModalButton.addEventListener('click', (e) => {
    e.preventDefault()
    
    const idToEditPost = modalToEditPosts.getAttribute('data-id')
    const newcontent = editPostContent.value
    
    editPost(idToEditPost, newcontent)
    closeEditPostModal()
})

document.querySelector('.close-edit-post-modal').addEventListener('click', (e) => {
    e.preventDefault()
    
    closeEditPostModal()
})

function deletePost(getId) {
    const idToDelete = posts.findIndex(post => post.id == getId)

    posts.splice(idToDelete, 1)
    localStorage.setItem('posts', JSON.stringify(posts))
    updatePosts()
}

function editPost(getId, getNewContent) {
    const idToEdit = posts.findIndex(post => post.id == getId)
    
    posts[idToEdit].content = getNewContent
    posts[idToEdit].id = getId

    localStorage.setItem('posts', JSON.stringify(posts))
    updatePosts()  
}

function openEditPostModal() {
    modalToEditPosts.style.display = 'flex'
}

function closeEditPostModal() {
    modalToEditPosts.style.display = 'none'
}

updatePosts()