import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { FiSend } from "react-icons/fi";
import {useGlobalContext} from '../context/globalContext'
import { useNavigate} from 'react-router-dom';
import {db} from '../firebase/config';
import { getDocs,collection , addDoc} from 'firebase/firestore';

const StyledHome = styled.div`
.home{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align:center;

    
}
.home-title {
    margin-bottom: 2rem; 
}
.title {
    font-size: 2rem;
    color: #000;
    max-width: 660px;
    font-family:Gilroy-Bold,sans-serif;
    margin: 0;
}

  .onbording{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width:100%;
    
  }
  .email-section, .subjet-section, .writing-email {
    width: 100%; 
  }

  .email-section{
    text-align: center;
    @media (min-width: 768px) {
      width: 30%; 
    }
  }
  .email-input{
    border-radius: 1.5rem;
    border: 2px solid #004897;
    background-color: #fbfbfb;
    height:3rem;
    width: 70%;
    text-align:center;
    padding: 2rem 2rem;
    margin: 0.5rem auto; 

  }
  .emailbtn {
    margin: 0.5rem auto;
    display: flex; 
    align-items: center;
    justify-content: center; 
    width: 70%; 
    height: 3rem; 
    border-radius: 1.5rem;
    border: 2px solid #004897;
    background-color: #fbfbfb;
    font-family:'Gilroy-Medium',sans-serif;
    
  }
  .emailbtn.active {
    background-color: #b2daff;
  }
  .subjet-section{
    text-align: center;
    @media (min-width: 768px) {
      width: 30%; 
    }
  }
  .subject {
    margin:0.5rem;
  }
  .writing-email{
    border-radius: 1rem;
    border: 2px solid #004897;
    box-shadow: 0px 4px 36px -5px rgba(0, 122, 255, 0.23) inset;
    background-color: #fbfbfb;
    padding:1rem 2rem;
    margin: 0 1rem;
    @media (min-width: 768px) {
      width: 30%; 
    }
  }

  .subject{
    color: #000;
    max-width: 348px;
    font-family:Gilroy-Bold,sans-serif;
    font-height:400;
    font-size:1.5rem;
  }
  .emailContent {
    background-color: #fbfbfb;
    color: #000;
    max-width: 348px;
    font-family:  Gilroy-Light,sans-serif;
    width:100%;
    min-height: 8rem; 
    resize: none; 
    padding:1rem;
    border-radius: 1rem;
    border:none;
  }
  .button-group {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 1rem auto;
  }
  .send {
    justify-content: center;
    border-radius: 1rem;
    background-color: var(--Default-SystemBlue-Light, #007aff);
    display: flex;
    gap: 0.5rem;
    font-size: 1rem;
    color: var(--Label-Color-Dark-Primary, #fff);
    font-weight: 300;
    white-space: nowrap;
    font-family:  Gilroy-Regular,sans-serif;
    text-align: center;
    letter-spacing: -0.41px;
    line-height: 100%;
    padding: 1rem 2rem;
    border:none;
  }
  .edit{
    justify-content: center;
    border-radius: 1rem;
    background-color: rgba(0, 122, 255, 0.15);
    color: var(--Default-SystemBlue-Light, #007aff);
    white-space: nowrap;
    text-align: center;
    letter-spacing: -0.41px;
    font-size: 1rem;
    font-weight: 300;
    padding: 1rem 2rem;
    font-family:  Gilroy-Regular,sans-serif;
    border:none;
  }
`;
const Home = () => {
  const {user} = useGlobalContext()
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [activeEmail, setActiveEmail] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [emailContent, setEmailContent] = useState("Hello,");

  const subjectsCollection = collection(db,'subjects')
  useEffect(() => {
    const addUser = async()=>{
      try{
        const userSnapshot = await getDocs(collection(db, 'users'));
        const existingUsers = userSnapshot.docs.map((doc) => doc.data().id);
        if (!existingUsers.includes(user.uid)) {
            await addDoc(collection(db, 'users'), {
                id: user.uid,
                email: user.email,
            });
            console.log('User added to Firestore:', user.uid);
        }
      }catch(err){
        console.log(err)
      }   
      
  }
    if (user == null) {
      navigate('/');
    }
    else {
      addUser()
    }
    const getSubject = async() =>{
      try {
        const data = await getDocs(subjectsCollection)
        const subjectData = data.docs.map((doc) =>(doc.data()))
        setSubjectList(subjectData)
      }catch(err){
        console.log(err)
      }
    }
    const fetchEmails = async () => {
        try {
          const emailsSnapshot = await getDocs(collection(db, 'emails'));
          const emailsData = emailsSnapshot.docs.map((doc) => doc.data());
          setEmails(emailsData);
        } catch (err) {
          console.error('Error fetching emails from Firestore:', err);
        }
    };
    
    fetchEmails();
    getSubject();
  }, [user,navigate]);
  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleKeyDown = async(e) => {
    if (e.key === 'Enter' && newEmail.trim() !== '') {
      const emailData = {
        userId: user.uid,
        email: newEmail.trim()
      };
  
      try {
        await addDoc(collection(db, 'emails'), emailData);
        setEmails([...emails, emailData]);
        setNewEmail('');
      } catch (err) {
        console.error('Error adding email to Firestore:', err);
      }
    }
  };
  const handleEmailClick = (value) => {
    setActiveEmail(activeEmail === value ? null : value);
  };
  const handleSubjectClick = (value) => {
    setActiveSubject(activeSubject === value ? null : value);
  };
  const sendEmail = async () => {
    if (!activeEmail || !activeSubject) {
        alert('Please select an email and a subject.');
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: activeSubject?.title, emailContent, recipientEmail: activeEmail })
    };

    try {
        const response = await fetch('http://localhost:5000/send-email', requestOptions);
        const data = await response.json();
        alert('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Error sending email. Please try again.');
    }
};



  return (
    <StyledHome>
        <div className="home">
            <div className="home-title">
                <h1 className='title'>Boss, No Time Today? 💃</h1>
            </div>
            
            <div className="onbording">
                <div className="email-section">
                    <input className="email-input" type="email" id="emailInput" placeholder="Enter your email" aria-label="Enter your email" 
                     value={newEmail}
                     onChange={handleEmailChange}
                     onKeyDown={handleKeyDown}/>
                        {emails.map((email, index) => (
                          <button key={index} className={`email-input emailbtn ${activeEmail === email.email ? 'active' : ''}`}
                          onClick={() => handleEmailClick(email.email)}>
                            {email.email}
                          </button>
                        ))}
              

                </div>
                <div className="subjet-section">
                {subjectList.map((subject,index) => (
                  <button key={index} 
                  className={`email-input emailbtn ${activeSubject === subject ? 'active' : ''}`}
                  onClick={() => handleSubjectClick(subject)}> {subject.title}</button>
                        ))}
                </div>
                <div className="writing-email">
                    <p className="subject">{activeSubject?.title}</p>
                    <textarea   readOnly={isEditing} className="emailContent" aria-label="Enter your email content" 
                     value={emailContent}
                     onChange={(e) => setEmailContent(e.target.value)}></textarea>
                    <div className="button-group">
                    <button className="edit" onClick={() => setIsEditing(!isEditing)}>Edit Email</button>
                    <button className="send" onClick={sendEmail} ><FiSend />Send Email</button>
                    </div>
                </div>
            </div>
        </div>
   
    </StyledHome>
  )
}

export default Home