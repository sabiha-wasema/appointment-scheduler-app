import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase/firebase.init"; 



const Main = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); 
    }, []);

    return (
        <div>
            
             <Navbar user={user} />
             <div className='bg-gradient-to-r from-green-500 to-teal-500'>
             <Outlet />
             </div>
            <Footer/>
          
        </div>
    );
};

export default Main;