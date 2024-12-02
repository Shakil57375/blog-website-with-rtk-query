import { useGetUsersQuery } from "../users/usersSlice";
import { Link } from "react-router-dom";

const PostAuthor = ({ userId }) => {
    const { data: users, error, isLoading } = useGetUsersQuery();

    if (isLoading) return <span>Loading...</span>;
    if (error) return <span>Error loading users</span>;

    // Access the specific author by their userId
    const author = users?.entities[userId];

    return (
        <span>
            by {author ? <Link to={`/user/${userId}`}>{author.name}</Link> : 'Unknown author'}
        </span>
    );
};

export default PostAuthor;
