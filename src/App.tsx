import React from 'react';
import './App.css';
import Form from "./Form/Form";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import Layout from "./Layout/Layout";



const App: React.FC = () => {

    const currPage = useLocation()

  return (
          <div className="App">
              <header>
                  <nav>
                      <ul>
                          <li className={`${currPage.pathname === '/RD-task/2' && 'active'}`}><Link to={`/RD-task/2`}>Логин</Link></li>
                          <li className={`${currPage.pathname === '/RD-task/1' && 'active'}`}><Link to={`/RD-task/1`}>Верстка</Link></li>
                      </ul>
                  </nav>
              </header>
              <main>
                  <Routes>
                      <Route path="/RD-task/2" element={<Form />}/>
                      <Route path="/RD-task/1" element={<Layout />}/>
                  </Routes>
              </main>
          </div>
  );
}

export default App;
