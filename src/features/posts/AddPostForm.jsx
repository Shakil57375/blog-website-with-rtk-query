import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
    const [addNewPost, { isLoading }] = useAddNewPostMutation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const users = useSelector(selectAllUsers);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await addNewPost({ title, body: content, userId }).unwrap();
                setTitle('');
                setContent('');
                setUserId('');
                navigate('/');
            } catch (err) {
                console.error('Failed to save the post', err);
            }
        }
    };

    // Check if users are loaded and available
    const usersOptions = users?.length
        ? users.map((user) => (
              <option key={user.id} value={user.id}>
                  {user.name}
              </option>
          ))
        : <option value="">Loading users...</option>;

    return (
        <section className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Post</h2>
            <form className="space-y-6">
                <div>
                    <label htmlFor="postTitle" className="block text-lg font-medium text-gray-700">Post Title:</label>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter post title"
                    />
                </div>

                <div>
                    <label htmlFor="postAuthor" className="block text-lg font-medium text-gray-700">Author:</label>
                    <select
                        id="postAuthor"
                        value={userId}
                        onChange={onAuthorChanged}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select author</option>
                        {usersOptions}
                    </select>
                </div>

                <div>
                    <label htmlFor="postContent" className="block text-lg font-medium text-gray-700">Content:</label>
                    <textarea
                        id="postContent"
                        name="postContent"
                        value={content}
                        onChange={onContentChanged}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Write your post content"
                        rows="5"
                    ></textarea>
                </div>

                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                    className={`w-full py-2 px-4 rounded-lg shadow-md text-white font-semibold ${
                        canSave ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
