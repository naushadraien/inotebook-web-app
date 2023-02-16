import noteContext from "./noteContext";
import { useState } from "react";

//it is for creating the state of notes which can be accessible for all components of our app using context api which is in noteContext.js
const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "63ed1805a46c5421c54adf7589",
          "user": "63ec922477caaa02d4e5aabd",
          "title": "My Title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2023-02-15T17:36:05.808Z",
          "__v": 0
        },
        {
          "_id": "63ee22b883ccc34ff51b348ca0",
          "user": "63ec922477caaa02d4e5aabd",
          "title": "My Title23",
          "description": "Please wake up early233",
          "tag": "personal",
          "date": "2023-02-16T12:34:00.223Z",
          "__v": 0
        },
        {
          "_id": "63ed1805a6c53214c54adf7589",
          "user": "63ec922477caaa02d4e5aabd",
          "title": "My Title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2023-02-15T17:36:05.808Z",
          "__v": 0
        },
        {
          "_id": "63ed1805a6c352414c54adf7589",
          "user": "63ec922477caaa02d4e5aabd",
          "title": "My Title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2023-02-15T17:36:05.808Z",
          "__v": 0
        },
        {
          "_id": "63ed18053a6c5214c54adf7589",
          "user": "63ec922477caaa02d4e5aabd",
          "title": "My Title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2023-02-15T17:36:05.808Z",
          "__v": 0
        },
        {
          "_id": "63ed1805a6c3521c54adf7589",
          "user": "63ec922477caaa02d4e5aabd",
          "title": "My Title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2023-02-15T17:36:05.808Z",
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


    //Add a note
      const addNote = (title, description, tag)=>{
        //TODO: API CALL
        console.log("Adding a new Note")
        const note = {
          "_id": "63ed1805a6c3521c54adf7589",
          "user": "63ec922477caaa02d4e5aabd",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-02-15T17:36:05.808Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }

    //Delete a note
    const deleteNote = (id)=>{
        
    }

    //Edit a note
    const editNote = (id)=>{
        
    }

    return(
        // <noteContext.Provider value={{state, update}}>   Here {state, update} is used in modern js without writing {state:state, update:update}
        // <noteContext.Provider value={{state:state, update:update}}>
        //this is for exporting to all in the curly braces to other file
        <noteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;