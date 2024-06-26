import {useContext} from "solid-js";
import {
    AssetsIcon,
    ClientIcon,
    InvoiceIcon,
    LogoutIcon,
    ReceiptIcon,
    SalesTillIcon,
    SettingsIcon,
    StockIcon,
    UserIcon,
    WorkshopIcon
} from "../globals/Icons";
import {ContextMain} from "../../contextManagers/ContextMain";


export function MainMenu() {

    const ctxMain = useContext(ContextMain)

    return (
        <div className={'main-menu'}>
            <div>
                <div className={
                    ctxMain.mainMenuLocation() === 'sales_till'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><SalesTillIcon size={ctxMain.iconSize()}/></div>
                    <div>Sales Till</div>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'receipts'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><ReceiptIcon size={ctxMain.iconSize()}/></div>
                    <div>Receipts</div>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'workshop'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><WorkshopIcon size={ctxMain.iconSize()}/></div>
                    <div>Workshop</div>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'stock'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><StockIcon size={ctxMain.iconSize()}/></div>
                    <div>Stock</div>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'assets'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><AssetsIcon size={ctxMain.iconSize()}/></div>
                    <div>Assets</div>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'clients'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><ClientIcon size={ctxMain.iconSize()}/></div>
                    <div>Clients</div>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'invoices'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><InvoiceIcon size={ctxMain.iconSize()}/></div>
                    <div>Invoices</div>
                </div>
            </div>

            <div>
                <div className={
                    ctxMain.mainMenuLocation() === 'account'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('account')
                         ctxMain.navigator('/account')
                     }}>
                    <div><UserIcon size={ctxMain.iconSize()}/></div>
                    <div>Account</div>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'system'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('system')
                         ctxMain.navigator('/system')
                     }}>
                    <div><SettingsIcon size={ctxMain.iconSize()}/></div>
                    <div>System</div>
                </div>
                <div className={'main-menu-icon'}
                     onClick={() => ctxMain.logout()}>
                    <div><LogoutIcon size={ctxMain.iconSize()}/></div>
                    <div>Logout</div>
                </div>
            </div>
        </div>
    )
}