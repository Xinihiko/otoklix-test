import { redirect } from 'next/dist/server/api-utils';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const moment = require('moment');

async function fetchPost (id) {
  const res = await fetch('http://localhost:3000/api/posts/' + id );
  const data = await res.json();
  
  return data
}

function TableRow ({blog_post, onClick}) {
  function fillPostModal (post_id) {
    let id = document.getElementById('inputId');
    let title = document.getElementById('inputTitle');
    let content = document.getElementById('inputContent');
    
    fetchPost(post_id).then((data)=>{
      id.value = post_id;
      title.value = data.title;
      content.value = data.content;
    }, ()=> {}  
    );
  }

  function editPost (e) {
    e.stopPropagation();
    e.preventDefault();
    const target = e.currentTarget;
    const id = target.getAttribute('data-id');

    const showModal = document.getElementById('show-modal');
    showModal.click();

    fillPostModal(id);
  }

  function deletePost (e) {
    e.stopPropagation();
    e.preventDefault();
    const target = e.currentTarget;
    const id = target.getAttribute('data-id');
    const title = document.getElementById('inputTitle').value;
    const content = document.getElementById('inputContent').value;

    let data = new FormData();
    data['title'] = title;
    data['content'] = content;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
      window.location.reload();
    };
    xhttp.open("DELETE", "/api/posts/"+id, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
  }

  return (
    <tr data-key={blog_post.id} onClick={onClick}>
      <td>{blog_post.id}</td>
      <td>{blog_post.title}</td>
      <td>{moment(blog_post.published_at).format("Do MMM YYYY, HH:mm:ss")}</td>
      <td>{moment(blog_post.created_at).format("Do MMM YYYY, HH:mm:ss")}</td>
      <td>{moment(blog_post.updated_at).format("Do MMM YYYY, HH:mm:ss")}</td>
      <td className='action-buttons'>
        <button type='button' className='btn py-0' data-id={blog_post.id} onClick={editPost}>
          <i className='bi bi-gear' />
        </button>
        <button type='button' className='btn  py-0' data-id={blog_post.id} onClick={deletePost}>
          <i className='bi bi-trash' />
        </button>
      </td>
    </tr>
  )
}

function PostModal () {
  function submitBtnHandler (e) {
    e.preventDefault();
    const id = document.getElementById('inputId').value;
    const title = document.getElementById('inputTitle').value;
    const content = document.getElementById('inputContent').value;

    let data = new FormData();
    data['title'] = title;
    data['content'] = content;

    const xhttp = new XMLHttpRequest();

    if (id === "") {
      xhttp.onload = () => {
        window.location.reload();
      };
      xhttp.open("POST", "/api/posts", true);
    } else {
      xhttp.onload = ()=>{
        window.location.reload();
      };
      xhttp.open("PUT", "/api/posts/"+id, true);
    }
    
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));

    document.getElementsByClassName('btn-close')[0].click();
  }
      
  
  return (
    <div className="modal fade" id="postModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="postModalTitle">Post Form</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form className="form" id="postForm">
            <div className="modal-body">
              <input hidden type="text" value="" id='inputId' readOnly />
              <label htmlFor="inputTitle">Title</label>
              <input type="text" className='form form-control' id='inputTitle' placeholder='Title' />

              <label htmlFor="inputContent">Content</label>
              <textarea className='form form-control' id='inputContent' placeholder='Content' rows='10' />
            </div>
            <div className="modal-footer">
              <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={submitBtnHandler} id="submit-btn" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function BlogPost ({ blog_posts }) {
  function resetPostModal () {
    let id = document.getElementById('inputId');
    let title = document.getElementById('inputTitle');
    let content = document.getElementById('inputContent');

    id.value = "";
    title.value = "";
    content.value = "";
  }

  function filterTable () {
    let filterText = document.getElementById('filterText').value.toUpperCase();
    const postTable = document.getElementById('postTable');
    const tr = postTable.getElementsByTagName('tr');

    for (let index = 0; index < tr.length; index++) {
      const td = tr[index].getElementsByTagName('td')[1];
      if (td) {
        let td_data = td.textContent || td.innerText;
        if (td_data.toUpperCase().indexOf(filterText) > -1) {
          tr[index].style.display = "";
        } else {
          tr[index].style.display = "none";
        }
      }
    }
  }

  function redirectTo (e) {
    const id = e.currentTarget.getAttribute('data-key');
    window.location.href = "/post/"+id;
  }

  return (
      <>
        <h1 className="mb-3 text-center fw-bolder display-3 gradientText" >
          Blog Post Management
        </h1>

        <div className="container mb-3">
          <div className='row'>
            <div className='col-8 m-md-3'>
              <input type="text" className='form-control' placeholder='Search...' id='filterText' onChange={filterTable} />
            </div>
            <button className='btn btn-primary col-3 mx-0 m-md-3' id="show-modal" data-bs-toggle="modal" data-bs-target="#postModal" onClick={resetPostModal}><i className="bi bi-plus" /> Add Post</button>
          </div>
        </div>

        <div className='container'>
          <table className='table' id='postTable' >
            <thead>
              <tr>
                <th className='col-1'>ID</th>  
                <th className='col-4'>Title</th>  
                <th className='col-2'>Published Time</th>  
                <th className='col-2'>Created On</th>  
                <th className='col-2'>Last Updated</th>  
                <th className='col-1'>Action</th>  
              </tr>
            </thead>
            <tbody id="table-body">
              {
                blog_posts.map(blog_post => {
                  return(<TableRow blog_post={blog_post} key={blog_post.id} onClick={redirectTo} />)
                })
              }
            </tbody>
          </table>  
        </div>
         
      </>
  )
}

export default function Home({ blog_posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog Post Management</title>
        <meta name="description" content="Blog post management site." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <BlogPost blog_posts={blog_posts} />
        <PostModal />
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/posts');
  const data = await res.json();
  
  return {
    props: {
      blog_posts: data
    }
  }
}