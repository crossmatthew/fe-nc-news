import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import IndividualArticle from './Components/Individual-Article';
import Users from './Components/Users';
import IndividualUser from './Components/Individual-User';
function App() {
  return (
    <>
    <Header />
    <Nav />
    <Routes>
      <Route path="/" element={ <Articles /> }></Route>
      <Route path="/:article_id" element={ <IndividualArticle /> }></Route>
      <Route path="/Users" element= { <Users /> }></Route>
      <Route path="/users/:username" element={ <IndividualUser /> }></Route>
    </Routes>
    </>
  );
};
export default App;