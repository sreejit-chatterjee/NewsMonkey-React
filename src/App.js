import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


const App = () =>{
  const [progress, setProgress] = useState(0)
  
    return (
      <Router>
        <div>
          <LoadingBar
            color="#f11946"
            height={4}
            progress={progress}
          />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <News setProgress = {setProgress}
                  key="general"
                  pageSize={6}
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              path="/sports"
              element={
                <News setProgress = {setProgress}
                  key="sports"
                  pageSize={6}
                  country="in"
                  category="sports"
                />
              }
            ></Route>
            <Route
              path="/business"
              element={
                <News setProgress = {setProgress}
                  key="business"
                  pageSize={6}
                  country="in"
                  category="business"
                />
              }
            ></Route>
            <Route
              path="/health"
              element={
                <News setProgress = {setProgress}
                  key="health"
                  pageSize={6}
                  country="in"
                  category="health"
                />
              }
            ></Route>
            <Route
              path="/entertainment"
              element={
                <News setProgress = {setProgress}
                  key="entertainment"
                  pageSize={6}
                  country="in"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              path="/technology"
              element={
                <News setProgress = {setProgress}
                  key="technology"
                  pageSize={6}
                  country="in"
                  category="technology"
                />
              }
            ></Route>
            <Route
              path="/science"
              element={
                <News setProgress = {setProgress}
                  key="science"
                  pageSize={6}
                  country="in"
                  category="science"
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    );
  }

  export default App;