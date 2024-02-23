import React, { useEffect } from 'react'
import styled from 'styled-components';
import img from "../assets/unsplash.png"
import {useGlobalContext} from '../context/globalContext'
import { useNavigate} from 'react-router-dom';



const StyledLoginForm = styled.div`
    .login-container{
        display:flex;
        align-items:flex-start;
        flex-wrap: wrap;
        justify-content: center;
        height:50vh;
        margin:3rem auto;
    }
    .left-section{
        width: 40%;
        height: 100%;
        position: relative;
    }
    .left-section img {
        width: 60%;
        height: 100%;
        border-radius: 3rem; 
    }
    .gradient-overlay{
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 3rem;
        border: 2px solid #004897;
        background: linear-gradient(180deg, #b2daff 0%, rgba(178, 218, 255, 0) 100%);
        box-shadow: 0px 4px 36px -5px rgba(0, 122, 255, 0.23) inset;
        pointer-events: none;
        height: 100%;
        width: 60%;
    }
    .right-section {
        width: 40%;
        height: 100%;
        text-align: center;
    }
    .greeting-text{
        font-size: 60px;
        font-weight: 400;
        line-height: 1.2;
        letter-spacing: -0.41px;
        font-family: Gilroy-Bold,  sans-serif;
        color: #000;
    }
    .btn {
        border-radius: 3rem;
        border: 2px solid #004897;
        box-shadow: 0px 4px 36px -5px rgba(0, 122, 255, 0.23) inset;
        background-color: #b2daff;
        width: 50%;
        padding:1rem;
        margin:0.5rem;
    }
    .input-field{
        border-radius: 3rem;
        border: 2px solid #004897;
        box-shadow: 0px 4px 36px -5px rgba(0, 122, 255, 0.23) inset;
        background-color: #fbfbfb;
        width: 50%;
        padding:1rem;
        display:block;
        margin:0.5rem auto;
    }
`;

const LoginForm = () => {

  const {googleSignIn,user} = useGlobalContext()
  const navigate = useNavigate();
  const handleGoogleSignIn = async () =>{
    try {

      await googleSignIn();
      
          
        
    }catch(err){
      console.log(err)
    }
  
  }
  useEffect(() => {
    if (user != null) {
      navigate('/loged');
    }
    
  }, [user,navigate]);
  return (
    <StyledLoginForm>
    <div className="login-container">
      <div className="left-section">
        <img src={img} alt=""/>
        <div className="gradient-overlay"></div>
      </div>
      <div className="right-section">
        <h1 className="greeting-text">Good Morning!</h1>
        <button className="btn" onClick={handleGoogleSignIn}>Connect With Google</button>
        <input type="email" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <button className="btn">Enter</button>
      </div>
    </div>
    </StyledLoginForm>
  )
}

export default LoginForm