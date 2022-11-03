import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { AccountContext } from '../../presentation/hooks'
import {
    getCurrentAccountAdapter,
    setCurrentAccountAdapter
} from '../../data/localstorage/CurrentAccountAdapter'
import { PrivateRoute } from '../components'
import MakeSignin from '../pages/Signin'
import MakeRooms from '../pages/Rooms'
import MakeMessages from "../pages/Messages";

const MainRouter: React.FC = () => {
    return (
        <>
            <AccountContext.Provider
                value={{
                    setCurrentAccount: setCurrentAccountAdapter,
                    getCurrentAccount: getCurrentAccountAdapter
                }}
            >
                <HashRouter>
                    <Routes>
                        <Route path='/signin' element={<MakeSignin />} />
                        {/*<Route path='/logout' element={<MakeLogout />} />*/}
                        <Route path='/' element={<PrivateRoute><MakeRooms /></PrivateRoute>} />
                        <Route path='/messages/:roomId' element={<PrivateRoute><MakeMessages /></PrivateRoute>} />
                    </Routes>
                </HashRouter>
            </AccountContext.Provider>
        </>
    )
}

export default MainRouter