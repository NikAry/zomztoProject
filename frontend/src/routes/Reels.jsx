import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './homeElements/Navbar';
import FooterArea from './homeElements/FooterArea';
import { BadgePlus, Dot, HeartPlus, Star} from 'lucide-react';

const Reels = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([])
    useEffect(()=>{
        const fetchVideos = async()=>{
            try {
                const response = await axios.get('http://localhost:3000/food/',{withCredentials: true})
                console.log(response.data.list)
                setVideos(response.data.list)
            } catch (error) {
                console.error('Error fetching videos:', error)
            }
        }
        fetchVideos()
    },[]) // Fixed: was [videos.length] which caused infinite re-fetches

    // const [currentVideo, setCurrentVideo] = useState(0);
    const videoRefs = useRef([]);
    const restartTimeouts = useRef(new Map());

    useEffect(() => {
        if (videos.length === 0) return; // Don't set up observer until videos are loaded

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        // Video is now visible - play it and clear any restart timeout
                        video.play();
                        const timeoutId = restartTimeouts.current.get(video);
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                            restartTimeouts.current.delete(video);
                        }
                    } else {
                        // Video is no longer visible - pause it and set restart timeout
                        video.pause();
                        const timeoutId = setTimeout(() => {
                            video.currentTime = 0; // Restart video from beginning
                            restartTimeouts.current.delete(video);
                        }, 2000); // 2 seconds
                        restartTimeouts.current.set(video, timeoutId);
                    }
                });
            },
            { threshold: 0.5 }
        );

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            // Cleanup observer
            videoRefs.current.forEach((video) => {
                if (video) observer.unobserve(video);
            });
            // Cleanup all pending timeouts
            restartTimeouts.current.forEach((timeoutId) => {
                clearTimeout(timeoutId);
            });
            restartTimeouts.current.clear();
        };
    }, [videos.length]); // Re-run when videos are loaded

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <>
        {/* <Navbar /> */}
        <div style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}>
            {videos.map((video, index) => (
                <div key={video._id} style={{ height: '100vh', position: 'relative', top: '1px', scrollSnapAlign: 'start' }}>
                    <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={video.video}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loop
                        muted
                        playsInline
                    />
                    <div className="option" style={{
                        position: 'absolute',
                        top: '25rem',
                        textAlign: 'right',
                        right: '0.5rem',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems:'center',
                        gap: '1rem',
                        border: '1px solid rgba(255,255,255,0.8)',
                        width: '3rem',
                        height:'11rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        <Star size={34} color="yellow"  />
                        <HeartPlus size={34} color="#ffffff" />
                        <BadgePlus size={34} color="#ffffff" />
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: '4rem',
                        left: '1rem',
                        color: 'white',
                        display: 'flex',
                        // alignItems:'space-evenly',
                        flexDirection:'column',
                        gap: '0.3rem',
                        border: '1px solid rgba(255,255,255,0.8)',
                        width: '12rem',
                        height:'11rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        <div className='profileDetail'>
                            <div className="dp">pic</div>
                            <div className="namePartner">Partner Name</div>
                        </div>
                        <div className="contentInfo">
                            <h3>{video.itemName}</h3>
                            <h3>{video.description}</h3>
                        </div>
                        
                    </div>
                    <button
                        onClick={handleHomeClick}
                        style={{
                            position: 'absolute',
                            bottom: '50px',
                            right: '20px',
                            padding: '10px 20px',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Buy
                    </button>
                </div>
            ))}
        </div>
        <FooterArea />
        </>

    );
};

export default Reels;