/* @refresh reload */
import {render} from 'solid-js/web'
import {Navigate, Route, Router, Routes} from '@solidjs/router'
import AllElements from './components/pages/AllElements'
import Login from './components/pages/auth/Login'
import ForgotPassword from "./components/pages/auth/ForgotPassword";
import VerificationCode from "./components/pages/auth/VerificationCode";
import ChangePassword from "./components/pages/auth/ChangePassword";
import {ClientsContextProvider} from "./contextManagers/ContextClients";
import Clients from "./components/pages/clients/Clients/Clients";
import {MainContextProvider} from "./contextManagers/ContextMain";
import {SystemContextProvider} from "./contextManagers/ContextSystem";
import {AccountContextProvider} from "./contextManagers/ContextAccount";
import Account from "./components/pages/account/Account";
import {ClientAddContextProvider} from "./contextManagers/ContextClientAdd";
import ClientAdd from "./components/pages/clients/ClientAdd/ClientAdd";
import Client from "./components/pages/clients/Client/Client";
import {ClientContextProvider} from "./contextManagers/ContextClient";
import Installer from "./components/pages/installer/Installer";
import SystemInformation from "./components/pages/system/SystemInformation";
import SystemUsers from "./components/pages/system/SystemUsers";
import SystemServices from "./components/pages/system/SystemServices";
import {RejectAuthContextProvider} from "./contextManagers/ContextRejectAuth";
import {RequireAuthContextProvider} from "./contextManagers/ContextRequireAuth";
import {RequireAdminContextProvider} from "./contextManagers/ContextRequireAdmin";
import SystemLogs from "./components/pages/system/SystemLogs";
import {WorkshopContextProvider} from "./contextManagers/ContextWorkshop";
import {WorkshopTicketAddContextProvider} from "./contextManagers/ContextWorkshopTicketAdd";
import WorkshopTicketAdd from "./components/pages/workshop/WorkshopTicketAdd/WorkshopTicketAdd";
import WorkshopTicket from "./components/pages/workshop/WorkshopTicket/WorkshopTicket";
import {WorkshopTicketContextProvider} from "./contextManagers/ContextWorkshopTicket";
import Workshop from "./components/pages/workshop/Workshop/Workshop";

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
                        <Route path="/" component={() => <Navigate href={'/workshop'}/>}/>
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
                            <Route path="/clients">
                                <Route path="/" component={Clients}/>
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
                        <Route path="" component={WorkshopContextProvider}>
                            <Route path="/workshop">
                                <Route path="/" component={Workshop}/>
                                <Route path="/ticket">
                                    <Route path="/" component={() => <Navigate href={'/workshop'}/>}/>
                                    <Route path="" component={WorkshopTicketAddContextProvider}>
                                        <Route path="/add" component={WorkshopTicketAdd}/>
                                    </Route>
                                    <Route path="" component={WorkshopTicketContextProvider}>
                                        <Route path="/:workshop_tag" component={WorkshopTicket}/>
                                    </Route>
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
                                <Route path="/logs" component={SystemLogs}/>
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
