import AktuellePrios from "./../parts/AktuellePrios";
import Notizen from "./../parts/Notizen";
import ToDoList from "./../parts/ToDoList";

function HomePage({ currentUser }) {
  return (
    <>
      <ToDoList username={currentUser} />
      <Notizen username={currentUser} />
      <Notizen username={currentUser} />
      <AktuellePrios />
      {currentUser}
    </>
  );
}

export default HomePage;
