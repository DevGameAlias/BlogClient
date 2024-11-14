import { useState } from "react";

const NewsletterForm = () =>{
    const [email,setEmail]=useState('')

    const EmailSubmit = async (e) =>{
        e.preventDefault()
        console.log('eemailsubmit');
        const uRL= 'http://localhost:3000/newsletter/signup'
        

        try{

            const response = await fetch(uRL,{
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify({email})
            })

            if(!response.ok){
                console.log("Cannot Post Email");
            }
        }catch(error) {
            console.error('An error occurred:', error);
        }


    }
    return(
        <>
        <form onSubmit={EmailSubmit}>
            <input type="text" 
            placeholder="Type Email"
            value={email}
            className="border-black bg-transparent p-2 rounded" onChange={(e)=>{setEmail(e.target.value)}}/>
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
            </button>
        </form>
        </>
    )

}

export default NewsletterForm;