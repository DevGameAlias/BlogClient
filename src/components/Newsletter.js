import { useState } from "react";

const NewsletterForm = () =>{
    const [email,SetEmail]=useState('')

    const EmailSubmit = async () =>{
        const uRL= 'http://localhost:3000/signup'
        const sensitive = email

        try{

            const response = await fetch(uRL,{
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify(sensitive)
            })

        }catch{

        }


    }
    return(
        <>
        <form >
            <input type="text" placeholder="Type Email" className="bg-transparent border-amber-950"/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
            </button>
        </form>
        </>
    )

}

export default NewsletterForm;