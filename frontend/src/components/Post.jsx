import React from 'react'

function Post({post}) {
  return (
    <div className="bs1 p-2">
      <div className="d-flex">
        <div className="d-flex">
          {post.user.profilePicUrl == "" ? (
            <span>{post.user.username[0]}</span>
          ) : (
            <span>{post.user.profilePicUrl}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post