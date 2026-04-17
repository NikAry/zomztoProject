import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

export function FPprofile(props) {
    const id = useParams().id
    const [partnerData, setPartnerData] = React.useState(null);
    // console.log(id)
    React.useEffect(() => {
        const apiCall = async () => {
            const response = await axios.get(`http://localhost:3000/view/food-partner/${id}`,{withCredentials: true});
            setPartnerData(response.data);
        };
        apiCall();
    }, [id]);

    return (
        <div>
            <h1>Food partner Profile</h1>
        </div>
    );
}

export function UserProfile(props) {
    const [userProfile, setUserProfile] = React.useState(null)
    React.useEffect(() => {
        const apiCall = async () => {
            const response = await axios.get(`http://localhost:3000/view/user/profile`,{withCredentials: true});
            console.log(response.data.user.fullName)
            setUserProfile(response.data.user.fullName);
        }
        apiCall()
    }, [])

    return (
        <div>
            <h1>{userProfile}</h1>
        </div>
    )
}