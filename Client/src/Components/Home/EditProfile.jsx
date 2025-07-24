import React from 'react'
import "./profile.css"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main'
import { useContext, useState, useRef } from 'react'
import axios from 'axios';

const EditProfile = () => {
    const server=import.meta.env.VITE_API_URL
    const { setIsAuthorized, isAuthorized, user } = useContext(Context)
    const [name, setName] = useState("");
    const [phone, setPhone] = useState();
    const navigate = useNavigate()
    const inputPic = useRef()
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePic = () => {
        inputPic.current.click()
    }

    const handleEdit=async(e)=>{
        e.preventDefault
        try {
            const data = new FormData();
            data.append('name', name);
            data.append('phone', phone);
            if (file) data.append('profilePic', file);
            const update=await axios.post(`${server}/auth/updateProfile`,data)
            console.log(update)
            
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='edit-profile-container'>


            <div className='edit-profile-pic'>
                <input type='file' style={{ display: "none" }} ref={inputPic} accept="image/*" onChange={(e) => setFile(e.target.files[0])} ></input>
                <div onClick={handlePic}>
                    {user.profilePic ? <img src={user.profilePic.public_id}/> : <AccountCircleRoundedIcon style={{ fontSize: "220px", color: "gray", cursor: "pointer" }} />}</div>
            </div>
            <form className='edit-profile-input' onSubmit={handleEdit}>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                <input type='email'/>
                <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <button to="/editprofile" type='submit'> <span>Update Profile </span><TrendingFlatRoundedIcon /></button>
            </form>
            
        </div>
    )
}

export default EditProfile