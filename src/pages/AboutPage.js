// AboutPage.js
// This component displays an about section for Mike.N, 
// highlighting Mike's background and love for storytelling.
// It includes a title, a placeholder image, and a descriptive paragraph.
// The layout is styled using Tailwind CSS for a responsive and visually appealing design.

// AboutPage.js
import React from 'react';


const AboutPage = () => {
    return (
           
           <div className="flex flex-col items-center min-h-screen  bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 p-6 transition-all duration-1000">

                <h1 className=" font-serif text-6xl font-thin mb-10 ">About Mike.N </h1>
                {/*Display client image*/}
              <img
             src={"https://via.placeholder.com/300" }
             alt="client provided image" 
             className=" w-64 h-64  object-cover shadow-lg mb-10" // Tailwind classes for styling
             /> 
                
        <p className=" font-serif text-lg text-gray-700 leading-relaxed text-center mx-3 p-3 rounded-lg shadow-md">

        Mike is a husband, father, grandfather and retired Air Force member from Washington, Missouri. Mike grew up loving westerns and SF, including: The Lone Ranger, Fury, Wanted Dead or Alive, The Virginian, Star Trek, The Time Tunnel, The Outer Limits, The Twilight Zone, and One Step Beyond. Mike’s love of storytelling began in early childhood when he told his older brother bedtime adventures. Maryville University chose his short story, Laughter and Tears - A Story about Virginia Berning for publication by the university's literary book Magnolia. In 2017, he and his son helped start Washington Wordsmiths, a writer’s group in the Washington Public Library. His short story, Family, was included in the first Wordsmiths’ anthology, The Bridges Between Us, independently published in June, 2019.


        </p>
   
</div>
    )
}


export default AboutPage;
