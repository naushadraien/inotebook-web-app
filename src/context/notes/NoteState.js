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
        //The token will come from our local storage
        'auth-token': localStorage.getItem('token')
      }
    });
    //this will parse the function
    const json = await response.json()
    // console.log(json)
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
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
    // console.log(json)

    // console.log("Adding a new Note")
    // const note = json;
  }


  //Delete a note
  const deleteNote = async (id) => {
    //API CALL for deleting the note from database of backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        //this was copied from header section of update Note of thunderclient
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)


    // console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL or FETCH from backend to edit note from clientside
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        //this was copied from header section of update Note of thunderclient
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)
  
    //let newNotes = JSON.parse(JSON.stringify(notes)) makes a copy of previous notes and then it will be updated
    let newNotes = JSON.parse(JSON.stringify(notes))
  //Logic for editing the notes at client side
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
  setNotes(newNotes);
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