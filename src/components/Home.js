//Here one dot means one step up outside from the folder which is components and other dot means again one step up outside from the folder which is now at src foldeer
import Notes from './Notes';


export const Home = (props) => {
  const {showAlert} = props
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  )
}