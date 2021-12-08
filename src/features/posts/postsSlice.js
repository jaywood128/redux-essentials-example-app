import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0 }
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More Text',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
  }
]
//Remember: reducer functions must always create new state values immutably,
//by making copies! It's safe to call mutating functions like Array.push()
//or modify object fields like state.someField = someValue inside of createSlice(),
//because it converts those mutations into safe immutable updates
//internally using the Immer library, but don't try to mutate any data
//doutside of createSlice!
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    },
    prepare(title, content, userId) {
      return {
        payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user: userId
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      console.log(postId)
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  }
})
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer
