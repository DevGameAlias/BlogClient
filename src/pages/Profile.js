import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';




const ShortStory = ()=>{
    // button to 'create' in the pop up card that we create
    // button to 'update' POP up card
    // button to delete
    // button that allows you to pull up an blog by name

}

const Profile = () =>{

    return(
        // 
        <>
        <div className="blog">
        {/* Insertn Blog Crud here */}
        </div>
        <div className="short-story">
            {/* Insert Short story CRUD here */}
        </div>

        </>
    )
}


function NewsletterPopup({ onClose }) {
    const [isVisible, setIsVisible] = useState(false); // State for visibility
    const [title, setTitle]= useState('') // set title
    const [description, setDescription] = useState('')
    const [body, setBody]= useState('')
    
    
    useEffect(() => {
        // Delay before making the popup visible
        const timer = setTimeout(() => {
            setIsVisible(true); // Show the popup after 500ms
            setTimeout(() => {
                setIsSliding(true); // set is slidding after becoming visable
            }, 200);// delay
        }, 4000); // Delay before showing the popup

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription logic here
        console.log("subscribed:", email);
        setEmail('');
        onClose(); // Close the popup after submission
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50  bg-opacity-50`}>
            {isVisible && (
                <div
                className={`bg-white p-6 rounded border shadow-md transition-transform duration-2000`}

                >
                    <h2 className="text-lg font-bold mb-4">Subscribe to our Newsletter</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 p-2 mb-4 w-full"
                            required 
                        />

                        <input
                        type = "description"
                        placeholder="Description"
                        value ={description}
                        required
                        />

                        <input
                        type="text"
                        placeholder="Body"
                        value={body}
                        required
                        />
                    </form>
                    <div className="p-1">
                    <button onClick={onClose} className="mt-1  text-green-800">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewsletterPopup;