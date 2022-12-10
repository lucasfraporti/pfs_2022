import blogFetch from '../axios/config';
import { useState, useEffect } from "react";
import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = async() => {
        try {
            const response = await blogFetch.get(`/room`);
            const data = response.data;
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className='home'>
            <h1>Aulas cadastradas</h1>
            {posts.length === 0 ? (<p>Nenhum post encontrado</p>) : (
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.name}</h2>
                        <h3>Descrição: <p>{post.description}</p></h3>

                        {post.subjects.map((subject) => (
                        <div key={subject.id}>
                            <h3>Disciplina: <p>{subject.name}</p></h3>
                        </div>))}

                        {post.videos.map((videos) => ( 
                        <div key={videos.id}>
                            <h3>Nome da gravação: <p>{videos.title}</p></h3>
                            <h3>Link da gravação: <p>{videos.url}</p></h3>
                        </div>))}
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;