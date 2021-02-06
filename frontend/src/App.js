import { useSelector } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import SigninPage from './pages/SigninPage';

function App() {
  const userSignin = useSelector((state) => state.userSignin);

  const year = new Date().getFullYear();

  const { userInfo } = userSignin;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header userInfo={userInfo} />
        <main>
          <Route path="/signin" component={SigninPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/" component={HomePage} exact />
        </main>
        <footer> © {year} TODO LIST</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
