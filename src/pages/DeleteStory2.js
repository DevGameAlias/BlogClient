
//this component is strictly for handling the visual UI deletion 
const StoryDelete = ({ postId, onDelete }) => {
    const uRl = `http://localhost:3000/stories/${postId}`;

    const handleDelete = async () => {
        try {
            //variable that holds the response of the fetch request
            const response = await fetch(uRl, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' }
            });
            
            //caught data to json
            const resData = await response.json();

            if (response.ok) {
                onDelete(postId);
            } else {
                throw new Error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="popup">
            <form action="">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this post?</p>
                <button type="button" onClick={handleDelete}>Delete</button>
                {/* <button type="button" onClick={onCancel}>Cancel</button> */}
            </form>
        </div>
    );
};

export default StoryDelete;
