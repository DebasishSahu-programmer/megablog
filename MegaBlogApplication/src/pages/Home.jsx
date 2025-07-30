import React, { useEffect, useState } from 'react'
import authService from '../appwrite/auth';
import service from "../appwrite/config";
import { Container, PostCard } from '../components/index'

function Home() {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        authService.getCurrentUser().then((userData) => {
            setUserData(userData)

        })
    }, [])
    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    
    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center ">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center ">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home