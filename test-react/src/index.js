import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class FriendsList extends React.Component {
//     render() {
//         return (
//                 <div>
//                     <h3>Friends List</h3>
//                     <ol>
//                         <li>Mihai</li>
//                         <li>Mihai</li>
//                         <li>Mihai</li>
//                         <li>Mihai</li>
//                     </ol>
//                 </div>
//             );
//     }
// }

function FriendsList(props) {
    return (
        
        <li onClick={props.onClick}>{props.value}</li>
        
        )
}


class MessageBox extends React.Component {
    
    openMessageBox = (value) => {
        console.log(value);
    }
    
    render() {
        return (
            <ol>
                <FriendsList value={friendsList[0]} onClick={() => this.openMessageBox(friendsList[0])}/>
                <FriendsList value={friendsList[1]} onClick={() => this.openMessageBox(friendsList[1])}/>
                <FriendsList value={friendsList[2]} onClick={() => this.openMessageBox(friendsList[2])}/>
            </ol>
            )
    }
}

const friendsList = ["Mihai", "Mihaela", "Alina"]

ReactDOM.render(<MessageBox />, document.getElementById('root'));