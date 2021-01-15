import Feed from '../components/Feed';
import SuggestedAccounts from './../components/SuggestedAccounts';
import FollowersColumn from './../components/FollowersColumn';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {

  const [posts, setPosts] = useState([])
  let following, descFol, descPosts, topFiveFollowing, notFollowing, descNotFol, topFiveNotFollowing;

  const fetchData = async ()=>{
    console.log("fetchData")
    let res = await axios.get("/.netlify/functions/posts");
    setPosts(res.data)
    console.log(posts)
  }

  const toggleFollowing = async (user)=>{
    let toggledValue = user.is_followed?false : true
    let data = {is_followed:toggledValue}

    await axios.put('/.netlify/functions/edit', {userId: user.id, data:data})
    .then(res => console.log(res))
    .catch(err => console.error("error", err))
    .then(()=> fetchData())
  }

  useEffect(()=>{
    fetchData();
  },[])

  if(posts){
    descPosts = posts.sort((a, b)=> a.id < b.id ? 1 : -1 )

    following = posts.filter(post => post.is_followed)
    descFol = following.sort((a, b)=> a.likes < b.likes ? 1 : -1 )
    topFiveFollowing = descFol.slice(0,5)

    notFollowing = posts.filter(post => post.is_followed === false)
    descNotFol = notFollowing.sort((a, b)=> a.likes < b.likes ? 1 : -1 )
    topFiveNotFollowing = descNotFol.slice(0,5)
  }

  return (
    <>
    {posts &&
        <div className="Home">
        <FollowersColumn users={topFiveFollowing}/>
        <div className ="feed">
           {posts.map((post, index)=>(
             <Feed
              key={index} 
              post={post} 
              toggleFollow ={(userToToggle) => toggleFollowing(userToToggle)} />
            ))}
        </div>
        <SuggestedAccounts
         users={topFiveNotFollowing} 
         toggleFollow ={(userToToggle) => toggleFollowing(userToToggle)}/>
    </div>
  }
    </>
    );
  }
  
  export default Home;