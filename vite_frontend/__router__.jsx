/* @refresh reload */
import {render} from 'solid-js/web'
import {Navigate, Route, Router, Routes} from '@solidjs/router'
import AllElements from './components/pages/AllElements'
import Login from './components/pages/auth/Login'
import ForgotPassword from "./components/pages/auth/ForgotPassword";
import VerificationCode from "./components/pages/auth/VerificationCode";
import ChangePassword from "./components/pages/auth/ChangePassword";
import {ClientsContextProvider} from "./contextManagers/ContextClients";
import Clients from "./components/pages/clients/Clients";
import {MainContextProvider} from "./contextManagers/ContextMain";
import Users from "./components/pages/users/Users";
import {UserContextProvider} from "./contextManagers/ContextUsers";
import {SystemContextProvider} from "./contextManagers/ContextSystem";
import System from "./components/pages/system/System";
import {YourAccountContextProvider} from "./contextManagers/ContextYourAccount";
import YourAccount from "./components/pages/your_account/YourAccount";
import {ClientAddContextProvider} from "./contextManagers/ContextClientAdd";
import ClientAdd from "./components/pages/client_add/ClientAdd";
import Client from "./components/pages/client/Client";
import {ClientContextProvider} from "./contextManagers/ContextClient";
import Installer from "./components/pages/installer/Installer";

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error('Root element not found. Did you forget ' +
        'to add it to your index.html? Or maybe the id attribute got misspelled?')
}

render(() => (
        <Router>
            <Routes>

                <Route path="/all" component={AllElements}/>

                <Route path="" component={MainContextProvider}>
                    <Route path="/" component={() => <Navigate href={'/clients'}/>}/>

                    <Route path="/login" component={Login}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                    <Route path="/verification-code">
                        <Route path="/" component={() => <Navigate href={'/login'}/>}/>
                        <Route path="/:account_id" component={VerificationCode}/>
                    </Route>
                    <Route path="/change-password">
                        <Route path="/" component={() => <Navigate href={'/login'}/>}/>
                        <Route path="/:account_id" component={ChangePassword}/>
                    </Route>

                    <Route path="" component={ClientsContextProvider}>
                        <Route path="/clients" component={Clients}/>
                    </Route>

                    <Route path="/client">
                        <Route path="/" component={() => <Navigate href={'/clients'}/>}/>
                        <Route path="" component={ClientAddContextProvider}>
                            <Route path="/add" component={ClientAdd}/>
                        </Route>
                        <Route path="" component={ClientContextProvider}>
                            <Route path="/:client_id" component={Client}/>
                        </Route>
                    </Route>

                    <Route path="" component={UserContextProvider}>
                        <Route path="/users" component={Users}/>
                    </Route>

                    <Route path="" component={SystemContextProvider}>
                        <Route path="/system" component={System}/>
                    </Route>
                    <Route path="/system/install" component={Installer}/>

                    <Route path="" component={YourAccountContextProvider}>
                        <Route path="/your-account" component={YourAccount}/>
                    </Route>

                </Route>
            </Routes>
        </Router>
    ),
    root
)
