import React from "react";
import { createRoot } from "react-dom/client";
import '../styles/App.scss'
import {Movies} from "./movies.jsx";
import "../styles/reset.scss"
const container = document.getElementById("root");
const root = createRoot(container);
function App() {

  return (
      <div className={'container'}>
          <Movies/>
      </div>
  )
}

root.render(<App />);
