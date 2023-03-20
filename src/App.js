import "./App.css";
import { Route, Routes } from "react-router-dom";
import routes from "./components/routes";
import Layout from "./components/Layout";
import * as status from './service/checkStatus'
import React, {createContext, useEffect, useState } from "react";

export const UserContext = createContext({});


function App() {

    const [userStatus, setUserStatus] = useState({
        success: false,
        message: 'loading'
    });

    useEffect(()=> {
        const fetchStatus = async () => {
            const roleObj = await status.userStatus();
            setUserStatus(roleObj)
        /* 
        1. Fall nicht registriert: {success: false, message: 'Token missing'}
        2. Fall registriert, aber nicht verifiziert: {success: true, message: 'unverified'}
        3. Fall registriert, und verifiziert: {success: true, message: 'user'}
        4. Fall registriert, und admin: {success: true, message: 'admin'}
        */
        }

        fetchStatus()
          .catch(console.error);
      },[])

    return (
        <div className="App">
            <UserContext.Provider value={userStatus}>
                <Layout>
                    <Routes>
                        {routes.map((route) => {
                            return <Route key={route.id} {...route} />;
                        })}
                    </Routes>
                </Layout>
            </UserContext.Provider>
        </div>
    );
}

export default App;
