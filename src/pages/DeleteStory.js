import { useState,useEffect } from "react";

//this function is to delete the blog posts
const [post, setPost] = useState([])

const uRl = `http://localhost:3000/stories/${postId}`


const StoryDelete = () =>{
    const handleDelete = async ({postId, onDelete, onCancel}) =>{
    
        try{
            //variable that holds the response of the fetch request
            const response = await fetch(uRl,{
            method:'Delete',
            headers: {'Content-type': 'application/json'}})
            //caught data to json
            const resData = await response.json()

            
            if (!response.ok) {
                throw new Error('Failed to delete the post');
            }else{
                onDelete(postId);

            }

            // If successful, call onDelete with postId
    
            }catch(error){
            console.error('error fetching post',error);
        }
    }


    return(
            <div className="popup">
              <h2>Confirm Deletion</h2> {/* Header added for context */}
              <p>Are you sure you want to delete this post?</p> {/* Optional descriptive text */}
              <button onClick={handleDelete}>Delete</button>
              <button onClick={onCancel}>Cancel</button> {/* Call onCancel to close the popup */}
            </div>
        );
}


export default StoryDelete;