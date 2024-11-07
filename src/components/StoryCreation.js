import React, { useState } from 'react';

const StoryCreation = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 

    // Submit handler simplified
    const StorySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            console.log("Submitting story:", { title, content, description });
            const token = document.cookie.split(';').find(row => row.startsWith('token=')).split('=')[1];
            const response = await fetch("http://localhost:3000/stories", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    description: description,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create story");
            }

            const result = await response.json();
            setSuccess("Story Created");
            console.log(result);

            // Clear input fields after submission
            setTitle("");
            setContent("");
            setDescription("");
        } catch (err) {
            console.error(err);
            setError("Unable to create story. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="short-story">
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
                    <div className="bg-white p-6 rounded border shadow-md transition-transform duration-2000">
                        <h2 className="text-lg font-bold mb-4">Create Story</h2>

                        {/* Form Submission */}
                        <form onSubmit={StorySubmit}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border border-gray-300 p-2 mb-4 w-full"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="border border-gray-300 p-2 mb-4 w-full"
                            />

                            <textarea
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                className="border border-gray-300 p-2 mb-4 w-full"
                            />

                            <button
                                type="submit"
                                className={`bg-blue-500 text-white p-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "Posting..." : "Post"}
                            </button>
                        </form>

                        {/* Displaying Success/Error Messages */}
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                        {success && <div className="text-green-500 mt-2">{success}</div>}

                        <div className="p-1">
                            <button className="mt-1 text-green-800">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StoryCreation;
