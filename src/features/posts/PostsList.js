import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostsAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

export const PostsList = () => {
  const posts = useSelector((state) => state.posts)
  // const renderedPosts = posts.map((post) => (
  //   <article className="post-excerpt" key={post.id}>
  //     <h3>{post.title}</h3>
  //     <PostAuthor userId={post.id} />
  //     <TimeAgo />
  //     <p className="post-content">{post.content.substring(0, 100)}</p>
  //     <Link to={`/posts/${post.id}`} className="button muted-button">
  //       View Post
  //     </Link>
  //   </article>
  // ))

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => {
    return (
      <div>
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <div>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
          </div>
          <p className="post-content">{post.content.substring(0, 100)}</p>
          <ReactionButtons post={post} />
          <Link to={`/posts/${post.id}`} className="button muted-button">
            View Post
          </Link>
        </article>
      </div>
    )
  })
  return renderedPosts
}
