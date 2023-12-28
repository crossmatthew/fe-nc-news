import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import IndividualArticle from './Components/Individual-Article';
import TopicArticles from './Components/TopicArticles';
import Topics from './Components/Topics';
import Users from './Components/Users';
import IndividualUser from './Components/Individual-User';
import ErrorHandler from './Components/ErrorHandler';
function App() {
  return (
    <>
    <Header />
    <Nav />
    <Routes>
      <Route path="/" element={ <Articles /> }></Route>
      <Route path="/:article_id" element={ <IndividualArticle /> }></Route>
      <Route path="/users" element= { <Users /> }></Route>
      <Route path="/topics" element={ <Topics /> }></Route>
      <Route path="/topics/:topic" element={ <TopicArticles /> }></Route>
      <Route path="/users/:username" element={ <IndividualUser /> }></Route>
      <Route path='*' element={ <ErrorHandler/> }></Route>
    </Routes>
    </>
  );
};
export default App;