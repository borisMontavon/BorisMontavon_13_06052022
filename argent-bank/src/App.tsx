import './css/main.css';
import { Routes, Route } from "react-router-dom";
import { Nav } from './components/nav';
import { HomePage } from './components/homePage';
import { LoginPage } from './components/loginPage';
import { UserPage } from './components/userPage';
import { ErrorPage } from './components/errorPage';
import { SignUpPage } from './components/signUpPage';
import { Footer } from './components/footer';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
