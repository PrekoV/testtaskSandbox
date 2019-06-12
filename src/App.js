import React, { useState } from "react";
import "./App.css";
import Variant1 from './Variant1'
import Variant2 from "./variant2";

function App() {
    return (
        <div className="App">
            <Variant1/>
            <div style={{width: '100%', height: 2, backgroundColor: 'black'}}></div>
            <Variant2/>
        </div>
    );
}

export default App;