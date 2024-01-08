import React, { Component, createContext } from 'react'
//import axios from "axios";

 const UserContext= createContext();
 //Provider, Consumer
  const reducer= (state, action)=>{
  switch(action.type){
    
    case "ADD_USER":
    return {
        ...state,
        users: [...state.users, action.payload]
    }  
    default:
        return state

  }
  
  }
 export class UserProvider extends Component {
  state = {
    users: [],
    lastMessage: '', // Track the last entered message
    dispatch: action => {
        this.setState(state => reducer(state, action));
    },
    updateLastMessage: message => {
      this.setState({ lastMessage: message });
  }
};
/*componentDidMount = async() => {
       const response= await axios.get("http://localhost:3004/users")
       this.setState({
        users: response.data
       })
}*/
updateLastMessage = message => {
  this.setState({
      lastMessage: message
  });
};

  render() {
    const contextValue = {
      ...this.state,
      updateLastMessage: this.updateLastMessage
  };

    return (
      <UserContext.Provider value={contextValue}>
                {this.props.children}
            </UserContext.Provider>

    )
  }
}

const UserConsumer=UserContext.Consumer;
export default UserConsumer;
