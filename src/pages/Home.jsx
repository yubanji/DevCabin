import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import logo from "../styles/images/LogoWhite.png";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }

        window.history.pushState(null, null, window.location.href);
        window.addEventListener("popstate", () => {
            navigate("/");
        });

        return () => {
            window.removeEventListener("popstate", () => {
                navigate("/");
            });
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove authentication token
        localStorage.removeItem("username"); // Clear stored username
        navigate("/", { replace: true });

        window.history.pushState(null, null, window.location.href);
    };

    return (
        <div className={styles.container}>
            <img src={logo} alt="logo" className={styles.logo} />
            <h1 className={styles.title}>Welcome to DevCabin</h1>
            <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, molestiae! Impedit cupiditate eligendi vero, 
                dolor molestiae dolorem perferendis, rerum quas nostrum labore 
                placeat maiores ab? Ea recusandae accusamus et soluta?
            </p>    

            <button className={styles.logoutbutton} onClick={handleLogout}>
                LOGOUT
            </button>
        </div>
    );
};

export default Home;
