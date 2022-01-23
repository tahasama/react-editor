export const example = `import React, { useState } from 'react';
                 import ReactDOM from 'react-dom';

                 const App = () => {
                   const [clicked, setClicked] = useState(false);
                   return (
                     <div>
                       <h1>Hello World</h1>
                       <button onClick={() => setClicked(!clicked)}>Click!</button>
                       {clicked && <p>Lets start Coding!!</p>}
                     </div>
                   );
                 };
 
                 export default App;
 
                 ReactDOM.render(
                   <React.StrictMode>
                     <App />
                   </React.StrictMode>,
                   document.getElementById('root')
                 );`;

export const htmlExample = `<h1>Hello world</h1>
                   <button onclick="myFunction()">Click me</button>
                   <p id="demo" class="hello"></p>
                   `;
export const cssExample = `.hello {
                    background-color: aquamarine;
                    font-size: 20px;
                  }`;
export const javaScriptExample = `function myFunction() {
                         document.getElementById("demo").innerHTML = "let's start coding";
                        }
                        `;
