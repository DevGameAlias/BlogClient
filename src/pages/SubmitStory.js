//SubmitStory

const StorySubmit = async (
    e,
    title,
    content,
    description,
    setTitle,
    setContent,
    setDescription,
    setLoading,
    setError,
    setSuccess
  ) => {
  e.preventDefault();
  setLoading(true); // start loading state
  setError(""); //reset previous errors
  setSuccess(""); //Reset previous success messages

  try {
    console.log("Submitting story:", { title, content, description });
    //created const for fetch and await
    const response = await fetch("http://localhost:3000/stories", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        title: title,
        content: content,
        description: description,
      }),
    });

    // conditional for error checking on creation of story
    if (!response.ok) {
      throw new Error("failed to create story");
    }

    const result = await response.json();
    setSuccess("Story Created");
    console.log(result);
    //Clearing input fields after submission
    setTitle("");
    setContent("");
    setDescription("");
  } catch (err) {
    console.error(err);
    setError("Unable to create story. Please try again"); //setting error message
  } finally {
    setLoading(false);
  }
};

export default StorySubmit;