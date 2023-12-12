import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import IndividualArticle from './Components/Individual-Article';
function App() {
  return (
    <>
    <Header />
    <Nav />
    <Routes>
      <Route path="/" element={ <Articles /> }></Route>
      <Route path="/:article_id" element={ <IndividualArticle /> }></Route>
    </Routes>
    </>
  );
};
export default App;