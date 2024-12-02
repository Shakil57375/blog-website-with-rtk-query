import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectPostById, useDeletePostMutation, useUpdatePostMutation } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const [updatePost, { isLoading }] = useUpdatePostMutation()
    const [deletePost] = useDeletePostMutation()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)

    if (!post) {
        return (
            <section className="p-6 bg-red-50 text-center">
                <h2 className="text-xl font-bold text-red-600">Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && !isLoading

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await updatePost({ id: post.id, title, body: content, userId }).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    const onDeletePostClicked = async () => {
        try {
            await deletePost({ id: post.id }).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        }
    }

    return (
        <section className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Post</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="postTitle" className="block text-gray-700 font-medium mb-2">Post Title:</label>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>
                <div>
                    <label htmlFor="postAuthor" className="block text-gray-700 font-medium mb-2">Author:</label>
                    <select
                        id="postAuthor"
                        value={userId}
                        onChange={onAuthorChanged}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor="postContent" className="block text-gray-700 font-medium mb-2">Content:</label>
                    <textarea
                        id="postContent"
                        name="postContent"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={content}
                        onChange={onContentChanged}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-300"
                    >
                        Save Post
                    </button>
                    <button
                        type="button"
                        onClick={onDeletePostClicked}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                    >
                        Delete Post
                    </button>
                </div>
            </form>
        </section>
    )
}

export default EditPostForm
