import React from 'react';
import styled from 'styled-components';
import {useGlobalContext} from '../context/globalContext'
import { useNavigate} from 'react-router-dom';


const StyledNavbar = styled.div`
    padding: 0 2rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
    .img {
        aspect-ratio: 7.69;
        object-fit: auto;
        object-position: center;
        width: 100%;
        fill: #000;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        max-width: 289px;
        margin:1rem;
    }
    .btn{
        border-radius: 3rem;
        border: 2px solid #004897;
        box-shadow: 0 4px 36px -5px rgba(0, 122, 255, 0.23) inset;
        background-color: #b2daff;
        max-width: 253px;
        margin:1rem;
        padding:1rem;
    }
   

`;




const Navbar = ({ showButton }) => {

  const {logedOut,user} = useGlobalContext()
  const navigate = useNavigate();

  const handleGoogleLogOut = async () =>{
    try {
        await logedOut()
        navigate('/')
    }catch(err){
      console.log(err)
    }
  }


  return (
    <StyledNavbar>
        <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/39fef70e887f66d8aac621bc15f34712d3feca750a9232f687c3aaee3d371595?apiKey=5271c3f55f8c4e358643544a2d861fea&"
        className="img" alt="logo"
      />
      <div>
      {showButton && <><button className='btn' onClick={handleGoogleLogOut}>Logout</button>
      <button className='btn'>Hello, {user?.displayName}</button></>}
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
