import './App.css'
import Home from './pages/home/Home.jsx'
import NewPost from './pages/newpost/NewPost.jsx'
import OverviewPost from './pages/overviewpost/OverviewPost.jsx'
import {Routes, Route, useNavigate, NavLink} from 'react-router-dom'
import NotFound from "./pages/notfound/NotFound.jsx";
import PostDetail from "./pages/postDetailPage/PostDetail.jsx";
import logoMedium from "./assets/logo-medium.png";

function App() {
    const navigate= useNavigate()

    return (
        <>
            <nav className="main-navigation outer-content-container">
                <div className="inner-nav-container">
                    <button type="button" className="main-navigation-logo-button" onClick={()=> navigate("/")}>
                        <img src={logoMedium} alt="logo that link to home page"/>
                    </button>
                    <ul className="main-navigation-links">
                        <li>
                            <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"} to = "/"> Home </NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"} to = "/posts"> Alle posts </NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"} to = "/newpost"> Nieuwe post maken </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/newpost" element={<NewPost/>}/>
                    <Route path="/posts/:id" element={<PostDetail/>}/>
                    <Route path="/posts" element={<OverviewPost/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <footer className="footer-navigation outer-content-container">
                Blogventure &copy; 2023 - ontwikkeld voor NOVI Hogeschool
            </footer>
        </>
    )
}

export default App
