import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Footer/Header'
import './help.css'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import { useRef } from 'react';
import { useContext } from 'react';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import Loader from '../Footer/Loader';


const Help = () => {
  const server=import.meta.env.VITE_API_URL
  const{setIsAuthorized,isAuthorized,user,loading}=useContext(Context)
  const [ans, setAns] = useState([]);
  const keyRef = useRef(null)
  const navigate=useNavigate()
  useEffect(() => {
    const handleStartConv = async () => {
      await axios.post(`${server}/chat/start-chat`, { start: "start" },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    }
    setTimeout(() => {
      setAns(prev => [{ role: 'assistant', content: "Hello, How may I help you today....." }])

    }, 1000)

    handleStartConv()
  }, [])

  useEffect(() => {

    const saved = localStorage.getItem('chatMessages');
    if (saved) setAns(JSON.parse(saved));
  }, []);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleClearandSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMOuseClick=(e)=>{
    e.preventDefault()
    handleClearandSubmit()
  }
  const handleClear = async () => {

      if (!keyRef.current.innerText.trim()) return;
      setAns(prev => [...prev, { role: 'user', content: `${keyRef.current.innerText}` }])
      localStorage.setItem('chatMessages', JSON.stringify(ans));
      let ques = keyRef.current.innerText
      return ques ;
    
  }

  const handleClearandSubmit = async () => {
      let ques = await handleClear()
      if(ques.length==0) return
      keyRef.current.innerText = ''
      handleSubmit(ques)
  }
  const handleSubmit = async (ques) => {
    try {

      await axios.post(`${server}/chat/question`,
        { "query": ques }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }).then((res) => {
        console.log(res)
        setAns(prev => [...prev, { role: 'assistant', content: `${res.data.ans}` }])
      })
    } catch (error) {
      console.log(error)
    }

  }

  return (<>
    {loading?<><Loader/></>:<>
      <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png" height="85px" />
      <div style={{ margin: "20px" }}>
        <div className='ans-container'>
          {ans.map((msg, index) => (
            <div key={index}>
              {msg.role == 'assistant' ? <>
                <div className='assistant-msg'>
                  <span>{msg.content}</span>
                </div>
              </> : <>
                <div className='user-msg'>
                  <span>{msg.content}</span>
                </div>
              </>}
            </div>
          ))}
        </div>
      </div>

      <div className='ques-container'>
        <div className="question" ref={keyRef} contentEditable="true" suppressContentEditableWarning="true" ></div>
        <button type='submit' onClick={handleMOuseClick}><SendIcon /></button>
      </div>
      <Footer />
    </>}
    </>
    
  )
}

export default Help