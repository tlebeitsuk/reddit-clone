import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    getData();
  }, []);

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

    setTitle("");
    setUrl("");

    getData();
  }

  async function getData() {
    const response = await fetch("http://127.0.0.1:3000/posts");
    const data = await response.json();
    setPosts(data);
  }

  return (
    <>
      <header>
        <h1>Reddit Clone</h1>
        <button
          type="button"
          className="btn btn-light"
          data-toggle="modal"
          data-target="#newPost"
        >
          <div className="d-flex align-items-center gap-2">
            <ion-icon name="add-circle"></ion-icon>
            <span>New Post</span>
          </div>
        </button>
      </header>
      <main>
        <ul className="list-group list-group-flush">
          {posts.map((post) => (
            <li className="list-group-item" key={post.id}>
              <div className="row align-items-center">
                <a className="col" target="_blank" href={post.url}>
                  <h2>{post.title}</h2>
                  <span>{post.url}</span>
                </a>
                <div id="voting" className="col-2">
                  <div className="row text-center justify-content-center">
                    <button
                      type="button"
                      className="btn"
                      aria-label="Upvote"
                      onClick={() => upVote(post.id)}
                    >
                      <ion-icon name="caret-up"></ion-icon>
                    </button>
                    <p className="votes">{post.votes}</p>
                    <button
                      type="button"
                      aria-label="Downvote"
                      className="btn"
                      onClick={() => downVote(post.id)}
                    >
                      <ion-icon name="caret-down"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <div
        className="modal fade"
        id="newPost"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Post
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="post-title" className="col-form-label">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="post-url" className="col-form-label">
                    URL
                  </label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="url"
                    required
                    className="form-control"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-light"
                data-dismiss="modal"
                onClick={newPost}
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
