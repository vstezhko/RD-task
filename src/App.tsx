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
                          <li className={`${currPage.pathname === '/RD-task' && 'active'}`}><Link to={`/`}>Логин</Link></li>
                          <li className={`${currPage.pathname === '/RD-task/layout' && 'active'}`}><Link to={`/layout`}>Верстка</Link></li>
                      </ul>
                  </nav>
              </header>
              <main>
                  <Routes>
                      <Route path="/RD-task" element={<Form />}/>
                      <Route path="/RD-task/layout" element={<Layout />}/>
                  </Routes>
              </main>
          </div>
  );
}

export default App;
