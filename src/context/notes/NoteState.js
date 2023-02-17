import noteContext from "./noteContext";
import { useState } from "react";

//it is for creating the state of notes which can be accessible for all components of our app using context api which is in noteContext.js
const NoteState = (props) => {
  //local host which can be used to fetch API from backend
  const host = "http://localhost:5000"

  //notesInitial is updated from fetchAPI
  const notesInitial = []

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


   //Get all notes from backend
   const getNotes = async () => {
    //API CALL or FETCH all notes from backend
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        //this was copied from header section of update Note of thunderclient
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzkyMjQ3N2NhYWEwMmQ0ZTVhYWJkIn0sImlhdCI6MTY3NjQ1NzUzMH0.dsI-m6ixeaTjZZS_DY9-1qL4vE-o9HYOOk75p258hyk'
      }
    });
    //this will parse the function
    const json = await response.json()
    console.log(json)
    //setNotes(json) will show all the notes of a user at client side
    setNotes(json)
  }



  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO: API CALL
    //API CALL or FETCH from backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        //this was copied from header section of update Note of thunderclient
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzkyMjQ3N2NhYWEwMmQ0ZTVhYWJkIn0sImlhdCI6MTY3NjQ1NzUzMH0.dsI-m6ixeaTjZZS_DY9-1qL4vE-o9HYOOk75p258hyk'
      },
      body: JSON.stringify({title, description, tag})
    });


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
  const deleteNote = async (id) => {
    //API CALL for deleting the note from database of backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        //this was copied from header section of update Note of thunderclient
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzkyMjQ3N2NhYWEwMmQ0ZTVhYWJkIn0sImlhdCI6MTY3NjQ1NzUzMH0.dsI-m6ixeaTjZZS_DY9-1qL4vE-o9HYOOk75p258hyk'
      }
    });
    const json = response.json();
    console.log(json)


    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL or FETCH from backend to edit note from clientside
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        //this was copied from header section of update Note of thunderclient
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzkyMjQ3N2NhYWEwMmQ0ZTVhYWJkIn0sImlhdCI6MTY3NjQ1NzUzMH0.dsI-m6ixeaTjZZS_DY9-1qL4vE-o9HYOOk75p258hyk'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
  


  //Logic for editing the notes at client side
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }

  }
}


return (
  // <noteContext.Provider value={{state, update}}>   Here {state, update} is used in modern js without writing {state:state, update:update}
  // <noteContext.Provider value={{state:state, update:update}}>
  //this is for exporting to all in the curly braces to other file
  <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
    {props.children}
  </noteContext.Provider>
)
}

export default NoteState;