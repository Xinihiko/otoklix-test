export default function PostDetail ({blog_post}) {
    function backHome (e) {
        window.location.href = "http://localhost:3000/";
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-3 fw-bolder display-3 gradientText" >
                <button className="btn btn-xl" onClick={backHome}>
                    <i className="bi bi-chevron-left h2" />
                </button>
                {blog_post.title}
            </h1>
            <p className="mx-5 px-3">
                {blog_post.content}
            </p>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    console.log(ctx.query.id);
    const res = await fetch('http://localhost:3000/api/posts/'+ctx.query.id);
    const data = await res.json();
    
    return {
        props: {
            blog_post: data
        }
    }
}