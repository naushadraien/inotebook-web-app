import noteContext from "./noteContext";
import { useState } from "react";

//it is for creating the state of notes which can be accessible for all components of our app using context api which is in noteContext.js
const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "63ed1805a6c521c54adf7589",
          "user": "63ec922477caaa02d4e5aabd",
          "title": "My Title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2023-02-15T17:36:05.808Z",
          "__v": 0
        },
        {
          "_id": "63ee22b88ccc4ff51b348ca0",
          "user": "63ec922477caaa02d4e5aabd",
          "title": "My Title23",
          "description": "Please wake up early233",
          "tag": "personal",
          "date": "2023-02-16T12:34:00.223Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    // const s1 = {
    //     "name": "Rehan",
    //     "class": "5b"
    // }
    //This is for setting the state
    // const [state, setState] = useState(s1);
    //this is for setting the state after 1 sec
    // const update =()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name": "Rohan",
    //             "class": "10b"
    //         })
    //     }, 1000);
    // }
    return(
        // <noteContext.Provider value={{state, update}}>   Here {state, update} is used in modern js without writing {state:state, update:update}
        // <noteContext.Provider value={{state:state, update:update}}>
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;