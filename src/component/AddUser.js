import React, { useState } from 'react';
import posed,{PoseGroup} from 'react-pose';
import UserConsumer from '../context';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import http from 'stream-http';

//var uniqid = require('uniqid');

const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: { display: "block" }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: "none"
        }
    }

});

function AddUser(){
    
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState({
        recipientName: '',
        occasion: '',
        characterTraits: '',
        error: false
    });
    const [createdCard, setCreatedCard] = useState('')
    const resetForm = () => {
        setUser({
            recipientName: '',
            occasion: '',
            characterTraits: '',
            error: false
        });
    };
    const validateForm = () => {
        const { recipientName, occasion, characterTraits } = user;
        const hasError = recipientName === "" || occasion === "" || characterTraits === "";
        
        setUser(prevUser => ({
            ...prevUser,
            error: hasError
        }));
    
        return !hasError;
    };
    const changeInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const createGreetingCard = () => {
        const { recipientName, occasion, characterTraits } = user;
        const traitsList = characterTraits.split(',').map(trait => trait.trim());
        const traitsText = traitsList.join(', ');

        const greetingMessage = `Dear ${recipientName}, congratulations on ${occasion}! Your character traits, ${traitsText},
        truly make you stand out. Remember what Benjamin Franklin once said, Lost time is never found again. Your proactive nature and ${traitsText} ensure that every moment is well-spent. Make each day your masterpiece!`;

        return greetingMessage;
    };  
    const addUser = async (dispatch, updateLastMessage, e) => {
        e.preventDefault();      
        if (!validateForm()) {
            return;
        }
        const newUser = {
            recipientName: user.recipientName,
            occasion: user.occasion,
            characterTraits: user.characterTraits
        };
    
        /*const response = await axios.post('https://api.example.com/data', {
            httpsAgent: new http.Agent("http://localhost:3004/users", newUser )
          })*/
       //const response = await axios.post("http://localhost:3004/users", newUser);
        dispatch({ type: "ADD_USER", payload: newUser });

        const greetingMessage = createGreetingCard();
        /*await axios.post('https://api.example.com/data', {
            httpsAgent: new http.Agent( "http://localhost:3004/users", { message: greetingMessage, userId: response.data.id })
          })*/
        // await axios.post("http://localhost:3004/users", { message: greetingMessage, userId: response.data.id });
        updateLastMessage(greetingMessage);
        setCreatedCard(greetingMessage);
        resetForm();     
    };
    const toggleVisibility = () => {
        setVisible(!visible);
    };
        return <UserConsumer>
            {
                value => {
                    const{dispatch, updateLastMessage}=value;
                    return (
                        <div className="col-md-8 mb-4">
                            <button onClick={toggleVisibility} className="btn btn-dark btn-block mb-2">{
                                visible ? "Hide Form" : "Show Form"
                            }</button>
                            <Animation pose={visible ? 'visible' : 'hidden'}>
                                <div className='card'>
                                    <div className="card-header">
                                        <h4 >
                                            Create Greetings Card
                                        </h4>

                                        <div className="card-body">
                                            {
                                                user.error ?
                                                <div className='alert alert-danger'>
                                                    Please, check your information
                                                </div> 
                                                :
                                                 null
                                            }
                                            <form >
                                                <div className="form-group">
                                                    <label htmlFor="recipientName"> Recipient Name </label>
                                                    <input type="text"
                                                        name="recipientName"
                                                        id="recipientName"
                                                        placeholder="Enter  Recipient Name"
                                                        className="form-control"
                                                        value={user.recipientName}
                                                        onChange={changeInput}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="occasion">Occasion </label>
                                                    <input type="text"
                                                        name="occasion"
                                                        id="occasion"
                                                        placeholder="Enter Occasion"
                                                        className="form-control"
                                                        value={user.occasion}
                                                        onChange={changeInput} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="characterTraits">Character Traits </label>
                                                    <input type="text"
                                                        name="characterTraits"
                                                        id="characterTraits"
                                                        placeholder="Enter Character Traits"
                                                        className="form-control"
                                                        value={user.characterTraits}
                                                        onChange={changeInput} />
                                                </div>
                                                <button className='btn btn-danger btn-block' onClick={(e)=>addUser(dispatch,updateLastMessage, e)}>Create Card</button>
                                            </form>                                           
                                        </div>
                                    </div>
                                </div>
                               <hr></hr>
                            <div className="col-md-15 mb-4">                          
                            <div className="card red-border">
                            <div className="card-body">
                            <h5 className="card-title">Greetings!</h5>
                            <p className="card-text">{createdCard}</p>
                            </div>
                            </div>
                            </div>                           
                            </Animation>
                           
                        </div> 
                                           
                    )

                }
            }
        </UserConsumer>
    
}

export default AddUser;