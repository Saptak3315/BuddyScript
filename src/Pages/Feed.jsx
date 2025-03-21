import React, { useEffect, useState } from "react";
import Post from "./Post";
export default function PostCard({po,sp,obj}) {
    const [npo, snpo] = useState("");
    const [comment,scomment]=useState("");
    const [reply, sreply] = useState({});
    const username= localStorage.getItem("liu");
    const [tog,stog]=useState(false);
    const [comments, setComments] = useState(obj.comments);
    const [replyText, setReplyText] = useState({});
    const [showLikers, setShowLikers] = useState(false);
    useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("po")) || [];
    sp(storedPosts); 
  }, []);
  const posttoggle=(e)=>{
    e.preventDefault();
    let pt=tog;
    stog(!pt);
  }
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("po")) || obj.comments; 
    setComments(storedComments);
  }, []);
  const likePost = (id) => {
    const updatedPosts = po.map((post) =>
      post.id === id
        ? {
            ...post,
            likers: post.likers.includes(username)
              ? post.likers.filter((user) => user !== username) 
              : [...post.likers, username],
          }
        : post
    );
  
    sp(updatedPosts);
    localStorage.setItem("po", JSON.stringify(updatedPosts));
  };
  
  const handleEdit = (postId) => {
    const postToEdit = po.find((post) => post.id === postId);
    const newContent = prompt("Edit your post:", postToEdit.content);
    if (newContent === null || newContent.trim() === "") {
      alert("Please Write Something");
      return;
    }
    const updatedPosts = po.map((post) =>
      post.id === postId
        ? { ...post, content: newContent }
        : post
    );
    sp(updatedPosts); 
    localStorage.setItem("po", JSON.stringify(updatedPosts)); 
  
    //alert("Post updated successfully!");
  };
      
      const addComment = (pid) => {
        if (!comment.trim()) {
          alert("Please Write Something");
          return;
        }
        const postId = pid.id;
        const updatedPosts = po.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: Date.now(),
                    user: username,
                    text: comment,
                    replies: [],
                  },
                ],
              }
            : post
        );
        //alert("Your Comment is posted");
        localStorage.setItem("po", JSON.stringify(updatedPosts));
        sp(updatedPosts);
        scomment("");
      };
      const deletePost = (postId) => {
        const postToDelete = po.find((post)=>post.id===postId);
        if (postToDelete.user !== username) {
            alert("You can only delete your own posts!");
            return;
        }
        const updatedPosts = po.filter((post)=>post.id!==postId);
        sp(updatedPosts);
        localStorage.setItem("po", JSON.stringify(updatedPosts));
        //alert("Your Post is deleted");
    };

    const hlr = (commentId, value) => {
      setReplyText((prev) => ({
        ...prev,
        [commentId]: value,
      }));
    };
    const replyToComment = (postId, commentId) => {
      const reply = replyText[commentId];
      if (!reply) {
        alert("Please write a reply")
         return
      };
      const updatedPosts = po.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: [
                        ...(comment.replies || []),
                        { user: username, text: reply }, 
                      ],
                    }
                  : comment
              ),
            }
          : post
      );
      sp(updatedPosts);
      localStorage.setItem("po", JSON.stringify(updatedPosts));
      setReplyText((prev) => ({
        ...prev,
        [commentId]: "",
      }));
    
      //alert("Replied");
    };
  return (
    <div class="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div class="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div class="_feed_inner_timeline_post_top">
          <div class="_feed_inner_timeline_post_box">
            <div class="_feed_inner_timeline_post_box_image">
              <img src="assets/images/post_img.png" alt="" class="_post_img" />
            </div>
            <div class="_feed_inner_timeline_post_box_txt">
              <h4 class="_feed_inner_timeline_post_box_title">{obj.user}</h4>
              <p class="_feed_inner_timeline_post_box_para">
              {obj.dif} {obj.dif > 1 ? "minutes":"minute"} ago .<a href="#0">Public</a>
              </p>
            </div>
          </div>
          <div class="_feed_inner_timeline_post_box_dropdown">
            <div class="_feed_timeline_post_dropdown">
              <button href="" onClick={posttoggle} class="_feed_timeline_post_dropdown_link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="17"
                  fill="none"
                  viewBox="0 0 4 17"
                >
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>

            <div class={`_feed_timeline_dropdown ${tog?"show":''}`} >
              <ul class="_feed_timeline_dropdown_list">
                <li class="_feed_timeline_dropdown_item">
                  <a href="#0" class="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.2"
                          d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"
                        />
                      </svg>
                    </span>
                    Save Post
                  </a>
                </li>
                <li class="_feed_timeline_dropdown_item">
                  <a href="#0" class="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="22"
                        fill="none"
                        viewBox="0 0 20 22"
                      >
                        <path
                          fill="#377DFF"
                          fill-rule="evenodd"
                          d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    Turn On Notification
                  </a>
                </li>
                <li class="_feed_timeline_dropdown_item">
                  <a href="#0" class="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.2"
                          d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"
                        />
                      </svg>
                    </span>
                    Hide
                  </a>
                </li>
                <li hidden={obj.user !== username} className="_feed_timeline_dropdown_item" onClick={() => handleEdit(obj.id)}>
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="#1890FF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"
                          />
                          <path
                            stroke="#1890FF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"
                          />
                        </svg>
                      </span>
                      Edit Post
                    </a>
                </li>
                <li hidden={obj.user !== username} class="_feed_timeline_dropdown_item" onClick={() => deletePost(obj.id)}>
                  <a href="" class="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.2"
                          d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"
                        />
                      </svg>
                    </span>
                    Delete Post
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h4 class="_feed_inner_timeline_post_title">{obj.content}</h4>
        <div class="_feed_inner_timeline_image">
          <img src="assets/images/timeline_img.png" alt="" class="_time_img" />
        </div>
      </div>
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
      <div 
        className="_feed_inner_timeline_total_reacts_image" 
        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
        onClick={() => setShowLikers(!showLikers)}
      >
        {obj.likers.length} {obj.likers.length < 2 ? "Like" : "Likes"}
      </div>

      <div className="_feed_inner_timeline_total_reacts_txt">
        <p className="_feed_inner_timeline_total_reacts_para1">
        <span>{obj.comments.length}</span> {obj.comments.length > 1 ? "Comments" : "Comment"}
        </p>

        <p className="_feed_inner_timeline_total_reacts_para2">
          <span>0</span> Share
        </p>
      </div>
      {showLikers && (
        <div className="likers-list">
          <h4>Likers:</h4>
          <ul>
            {obj.likers.map((liker, index) => (
              <li key={index}>{liker}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
      <div class="_feed_inner_timeline_reaction">
      <button
  className="_feed_inner_timeline_reaction_emoji _feed_reaction _feed_reaction_active"
  onClick={() => likePost(obj.id)} 
>
  <span className="_feed_inner_timeline_reaction_link">
    <span>
      <br />
      {obj.likers.includes(username) ? "Liked" : <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M498.323,297.032c0-7.992-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914 c0-27.037-21.996-49.032-49.032-49.032H330.206c11.434-29.24,17.665-64.728,17.665-101.419c0-23.266-18.928-42.194-42.194-42.194 s-42.193,18.928-42.193,42.194c0,83.161-58.012,145.389-144.355,154.844c-0.592,0.065-1.159,0.197-1.7,0.38 C111.752,235.129,104.235,232,96,232H32c-17.645,0-32,14.355-32,32v152c0,17.645,14.355,32,32,32h64 c9.763,0,18.513-4.4,24.388-11.315c20.473,2.987,33.744,9.534,46.568,15.882c16.484,8.158,33.53,16.595,63.496,16.595h191.484 c27.037,0,49.032-21.996,49.032-49.032c0-7.991-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914 c0-7.991-1.901-15.683-5.553-22.635C491.126,326.766,498.323,312.507,498.323,297.032z M465.561,325.727H452c-4.418,0-8,3.582-8,8 s3.582,8,8,8h11.958c3.061,5.1,4.687,10.847,4.687,16.854c0,12.106-6.56,23.096-17.163,28.919h-14.548c-4.418,0-8,3.582-8,8 s3.582,8,8,8h13.481c2.973,5.044,4.553,10.71,4.553,16.629c0,18.214-14.818,33.032-33.032,33.032H230.452 c-26.223,0-40.207-6.921-56.398-14.935c-12.358-6.117-26.235-12.961-46.56-16.594c0.326-1.83,0.506-3.71,0.506-5.632V295 c0-4.418-3.582-8-8-8s-8,3.582-8,8v121c0,8.822-7.178,16-16,16H32c-8.822,0-16-7.178-16-16V264c0-8.822,7.178-16,16-16h64 c8.822,0,16,7.178,16,16c0,4.418,3.582,8,8,8s8-3.582,8-8c0-3.105-0.453-6.105-1.282-8.947 c44.778-6.106,82.817-25.325,110.284-55.813c27.395-30.408,42.481-70.967,42.481-114.208c0-14.443,11.75-26.194,26.193-26.194 c14.443,0,26.194,11.75,26.194,26.194c0,39.305-7.464,76.964-21.018,106.04c-1.867,4.004-0.134,8.764,3.871,10.631 c1.304,0.608,2.687,0.828,4.025,0.719c0.201,0.015,0.401,0.031,0.605,0.031h143.613c18.214,0,33.032,14.818,33.032,33.032 c0,11.798-6.228,22.539-16.359,28.469h-14.975c-4.418,0-8,3.582-8,8s3.582,8,8,8h12.835c3.149,5.155,4.822,10.984,4.822,17.079 C482.323,308.985,475.927,319.848,465.561,325.727z"></path> <path d="M422.384,325.727h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S426.802,325.727,422.384,325.727z"></path> <path d="M436.934,263.953h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S441.352,263.953,436.934,263.953z"></path> <path d="M407.833,387.5h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S412.252,387.5,407.833,387.5z"></path> <path d="M80,264c-8.822,0-16,7.178-16,16s7.178,16,16,16s16-7.178,16-16S88.822,264,80,264z"></path> </g> </g></svg>} 
    </span>
  </span>
</button>

  <button class="_feed_inner_timeline_reaction_comment _feed_reaction">
    <span class="_feed_inner_timeline_reaction_link">
      <svg
        class="_reaction_svg"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        fill="none"
        viewBox="0 0 21 21"
      >
        <path
          stroke="#000"
          d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
        ></path>
        <path
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.938 9.313h7.125M10.5 14.063h3.563"
        ></path>
      </svg>
      Comment
    </span>
  </button>

  <button class="_feed_inner_timeline_reaction_share _feed_reaction">
    <span class="_feed_inner_timeline_reaction_link">
      <svg
        class="_reaction_svg"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="21"
        fill="none"
        viewBox="0 0 24 21"
      >
        <path
          stroke="#000"
          stroke-linejoin="round"
          d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
        ></path>
      </svg>
      Share
    </span>
  </button>
</div>

      <div class="_feed_inner_timeline_cooment_area">
        <div class="_feed_inner_comment_box">
          <form class="_feed_inner_comment_box_form" onSubmit={(e) => e.preventDefault()}>
            <div class="_feed_inner_comment_box_content">
              <div class="_feed_inner_comment_box_content_image">
                <img
                  src="assets/images/comment_img.png"
                  alt=""
                  class="_comment_img"
                />
              </div>
              <div class="_feed_inner_comment_box_content_txt">
                <textarea
                  class="form-control _comment_textarea"
                  placeholder="Write a comment"
                  value={comment}
                  onChange={(e) => scomment(e.target.value)}
                  id="floatingTextarea1"
                ></textarea>
                <button type="button" onClick={()=>addComment(obj)}><span>💬</span></button>
              </div>
            </div>
            <div class="_feed_inner_comment_box_icon">
              <button class="_feed_inner_comment_box_icon_btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#000"
                    fill-opacity=".46"
                    fill-rule="evenodd"
                    d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button class="_feed_inner_comment_box_icon_btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#000"
                    fill-opacity=".46"
                    fill-rule="evenodd"
                    d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="_timline_comment_main">
  <div className="_previous_comment">
    <button type="button" className="_previous_comment_txt">
      View 4 previous comments
    </button>
  </div>
  {obj.comments.map((comment) => (
    <div key={comment.id} className="_comment_main">
      <div className="_comment_image">
        <a href="profile.html" className="_comment_image_link">
          <img src="assets/images/txt_img.png" alt="" className="_comment_img1" />
        </a>
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <a href="profile.html">
                <h4 className="_comment_name_title">{comment.user}</h4>
              </a>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment.text}</span>
            </p>
          </div>
          {comment.replies?.map((reply, replyIndex) => (
            <div key={replyIndex} className="_single_reply">
              
              <div className="_reply_area">
                <div className="_reply_details">
                  <div className="_reply_details_top">
                    <div className="_reply_name">
                      <a href="profile.html">
                        <h4 className="_reply_name_title">{reply.user}</h4>
                      </a>
                    </div>
                  </div>
                  <div className="_reply_status">
                    <p className="_reply_status_text">
                      <span>{reply.text}</span>
                    </p>
                  </div>
                </div>
                <div className="_reply_reply">
                  <div className="_reply_reply_num">
                    <ul className="_reply_reply_list">
                      <li>
                        <span className="_time_link"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="_feed_inner_comment_box">
          <form className="_feed_inner_comment_box_form">
            <div className="_feed_inner_comment_box_content">
              <div className="_feed_inner_comment_box_content_image">
              </div>
              <div className="_feed_inner_comment_box_content_txt">
                <textarea
                  className="form-control _comment_textarea"
                  placeholder="Write a reply..."
                  value={replyText[comment.id] || ""}
                  onChange={(e) => hlr(comment.id, e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="_feed_inner_comment_box_icon">
              <button
                type="button"
                className="_feed_inner_comment_box_icon_btn"
                onClick={() => replyToComment(obj.id, comment.id)}
              >
                Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}