import React from 'react';

const DeleteBlog = ({ blogId, onDelete }) => {
    // handleDelete function, if successful it calls the onDelete callback to inform the parent component to update the state (e.g., refresh the blog list).
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/blog/blogs/${blogId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');

            // Call the onDelete callback to update parent component
            onDelete(blogId);
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Delete Blog</h2>
            <p className="mb-4">Are you sure you want to delete this blog?</p>
            <button
                onClick={handleDelete}
                className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-200"
            >
                Confirm Delete
            </button>
        </div>
    </div>
);
};

export default DeleteBlog; 