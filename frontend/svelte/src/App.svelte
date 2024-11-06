<script>
    let posts = $state([]);
    let url = $state("");
    let title = $state("");

    async function upVote(postId) {
        await fetch(`http://localhost:3000/posts/${postId}/upvote`, {
            method: "PATCH",
        });

        getData();
    }

    async function downVote(postId) {
        await fetch(`http://localhost:3000/posts/${postId}/downvote`, {
            method: "PATCH",
        });

        getData();
    }

    async function newPost() {
        await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                url,
            }),
        });

        title = "";
        url = "";

        getData();
    }

    async function getData() {
        const response = await fetch("http://127.0.0.1:3000/posts");
        posts = await response.json();
    }

    getData();
</script>

<header>
    <h1>Reddit Clone</h1>
    <button
        type="button"
        class="btn btn-light"
        data-toggle="modal"
        data-target="#newPost"
    >
        <div class="d-flex align-items-center gap-2">
            <ion-icon name="add-circle"></ion-icon>
            <span>New Post</span>
        </div>
    </button>
</header>
<main>
    <ul class="list-group list-group-flush">
        {#each posts as post}
            <li class="list-group-item">
                <div class="row align-items-center">
                    <a class="col" target="_blank" href={post.url}>
                        <h2>{post.title}</h2>
                        <span>{post.url}</span>
                    </a>
                    <div id="voting" class="col-2">
                        <div class="row text-center justify-content-center">
                            <button
                                type="button"
                                class="btn"
                                onclick={() => upVote(post.id)}
                                aria-label="Upvote"
                            >
                                <ion-icon name="caret-up"></ion-icon>
                            </button>
                            <p class="votes">
                                {post.votes}
                            </p>
                            <button
                                type="button"
                                aria-label="Downvote"
                                class="btn"
                                onclick={() => downVote(post.id)}
                            >
                                <ion-icon name="caret-down"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        {/each}
    </ul>
</main>

<!-- Modal -->
<div
    class="modal fade"
    id="newPost"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New Post</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="post-title" class="col-form-label"
                            >Title</label
                        >
                        <input
                            type="text"
                            bind:value={title}
                            required
                            class="form-control"
                        />
                    </div>
                    <div class="form-group">
                        <label for="post-url" class="col-form-label">URL</label>
                        <input
                            type="url"
                            bind:value={url}
                            required
                            class="form-control"
                        />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-dismiss="modal"
                    >Cancel</button
                >
                <button
                    type="button"
                    class="btn btn-light"
                    data-dismiss="modal"
                    onclick={newPost}>Create Post</button
                >
            </div>
        </div>
    </div>
</div>

<style>
    .list-group {
        width: 100%;
        gap: 12px;
    }

    .list-group-item {
        color: #ff4400;
        border: 1px solid;
        border-width: 1px !important;
        border-radius: 6px !important;
    }

    .list-group-item:hover {
        background: #292529;
    }

    .list-group-item h2 {
        font-size: 1.6em;
    }

    .list-group-item span {
        font-size: 0.8em;
        color: #95a5ad;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    #voting {
        border-left: 1px solid #ff4400;
    }

    #voting ion-icon {
        width: 30px;
        height: 30px;
    }

    #voting button {
        padding: 0;
        width: 48px;
        display: flex;
        justify-content: center;
    }

    .votes {
        font-size: 1.6em;
        margin: 0;
        color: #ffab8d;
        font-weight: 500;
    }
</style>
