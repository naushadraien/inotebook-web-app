import noteContext from "./noteContext";
// import { useState } from "react";

//it is for creating the state of notes which can be accessible for all components of our app using context api which is in noteContext.js
const NoteState = (props)=>{
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
        <noteContext.Provider value={{}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;