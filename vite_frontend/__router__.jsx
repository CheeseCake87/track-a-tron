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
import {SystemContextProvider} from "./contextManagers/ContextSystem";
import {AccountContextProvider} from "./contextManagers/ContextAccount";
import Account from "./components/pages/account/Account";
import {ClientAddContextProvider} from "./contextManagers/ContextClientAdd";
import ClientAdd from "./components/pages/client_add/ClientAdd";
import Client from "./components/pages/client/Client";
import {ClientContextProvider} from "./contextManagers/ContextClient";
import Installer from "./components/pages/installer/Installer";
import SystemInformation from "./components/pages/system/SystemInformation";
import SystemUsers from "./components/pages/system/SystemUsers";
import SystemServices from "./components/pages/system/SystemServices";
import {RejectAuthContextProvider} from "./contextManagers/ContextRejectAuth";
import {RequireAuthContextProvider} from "./contextManagers/ContextRequireAuth";
import {RequireAdminContextProvider} from "./contextManagers/ContextRequireAdmin";

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

                    <Route path="" component={RequireAuthContextProvider}>
                        <Route path="/" component={() => <Navigate href={'/clients'}/>}/>
                    </Route>

                    <Route path="" component={RejectAuthContextProvider}>
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
                    </Route>

                    <Route path="" component={RequireAuthContextProvider}>
                        <Route path="" component={ClientsContextProvider}>
                            <Route path="/clients" component={Clients}/>

                            <Route path="/client">
                                <Route path="/" component={() => <Navigate href={'/clients'}/>}/>
                                <Route path="" component={ClientAddContextProvider}>
                                    <Route path="/add" component={ClientAdd}/>
                                </Route>
                                <Route path="" component={ClientContextProvider}>
                                    <Route path="/:client_id" component={Client}/>
                                </Route>
                            </Route>
                        </Route>
                    </Route>

                    <Route path="" component={RequireAuthContextProvider}>
                        <Route path="" component={RequireAdminContextProvider}>
                            <Route path="/system" component={SystemContextProvider}>
                                <Route path="/" component={() => <Navigate href={'/system/information'}/>}/>
                                <Route path="/information" component={SystemInformation}/>
                                <Route path="/users" component={SystemUsers}/>
                                <Route path="/services" component={SystemServices}/>
                            </Route>
                        </Route>
                    </Route>

                    <Route path="" component={RequireAuthContextProvider}>
                        <Route path="" component={AccountContextProvider}>
                            <Route path="/account" component={Account}/>
                        </Route>
                    </Route>

                    <Route path="/install" component={Installer}/>

                </Route>
            </Routes>
        </Router>
    ),
    root
)
