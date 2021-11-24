import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { startChecking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if(checking) {
        return (
            <div style={{ height: '100vh', width: '100vw' }}>
                <div 
                    className="text-center" 
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                >
                    <div 
                        className="spinner-border text-primary" 
                        role="status"
                        style={{
                            width: '4rem',
                            height: '4rem',
                        }}
                    >
                        <span className="visually-hidden"></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={ <PublicRoute isAuthenticated={ !!uid } /> }>
                    <Route exact path="/login" element={ <LoginScreen /> } />
                </Route>

                <Route exact path="/" element={ <PrivateRoute isAuthenticated={ !!uid } /> }>
                    <Route exact path="/" element={ <CalendarScreen /> } />
                </Route>

                <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
        </Router>
    )
}
