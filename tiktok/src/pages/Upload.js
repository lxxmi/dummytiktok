import { useState } from 'react';
import faker from 'faker';
import axios from 'axios';

const Upload =() => {

  const [video, setVideo] = useState(null)
  const [caption, setCaption] = useState(null)
  let id = faker.random.uuid()
  let today = new Date()
  let timestamp = today.toISOString()

  let data = {
    id: id,
    name: "Wazza",
    username: "teabag",
    avatar: "https://i.imgur.com/9KYq7VG.png",
    is_followed: false,
    video: video,
    caption: caption,
    likes: 10,
    comments: 2,
    timestamp: timestamp,
    button_visible: false,
  }

  const handleForm = async (e)=>{
    e.preventDefault()

    axios.post("/.netlify/functions/addPost", data)
    .then(res => console.log(res))
    .catch(e => console.error("err",e))
  }
      return (
      <div className="Upload">
        <form onSubmit={handleForm}>
          <label>Caption</label>
          <input
           type="text"
           name="caption"
           onChange={(e)=> setCaption(e.target.value)}
           />

          <label>Video Url</label>
          <input
           type="text"
           name="videoUrl"
           onChange={(e)=> setVideo(e.target.value)}
           /> 
           <button type="submit">Post</button>
        </form>
      </div>
    );
  }
  
  export default Upload;