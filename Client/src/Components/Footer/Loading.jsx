import React from 'react'
import "./loader.css"
import { useContext } from 'react'
import { Context } from '../../main'
import { Navigate,useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const Loading = ({children}) => {
    const {loading,isAuthorized}=useContext(Context)
    const location=useLocation()
  
    if(loading){
        return(
    <div class="orbit-container">
    <div class="center-image">
      <img src="https://svgsilh.com/svg_v2/1504058.svg" alt="Center" />
    </div>
    <div class="orbit-image">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsqJuwrnyKBvldXifJZ6iFFDj0DBUU8Cj2MQ&s" alt="Orbiting" />
    </div>
  </div>)}
  
  if(!isAuthorized){
    toast.error("Please login to continue")
    return ( <Navigate to="/login" state={{ from: location }} replace />);
  }
  return children;
}

export default Loading