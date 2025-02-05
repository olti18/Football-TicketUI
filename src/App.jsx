import React from "react";
import AuthForm from "./pages/AuthForm"; // Sigurohu që rruga është e saktë
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
`;

function App() {
  return (
    <Container className="container">
      <AuthForm />
    </Container>
  );
}

export default App;

// import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

// function App() {
//   return (
//     <Container>
//        <AuthForm />
//     </Container>
//   );
// }

// export default App;

// import React from "react";
// import AuthForm from "./pages/AuthForm";
// //import { Container } from "./styles"; // Opsionale për stilizim të organizuar

// const App = () => {
//   return (
//     <Container>
//       <AuthForm />
//     </Container>
//   );
// };

// export default App;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// // export default App
// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Auth from "./components/Auth";
// // Import other components as needed

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <h1>Football Ticketing System</h1>
//         </header>
//         <main>
//           <Switch>
//             <Route path="/auth" component={Auth} />
//             {/* Add other routes as needed */}
//           </Switch>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;
