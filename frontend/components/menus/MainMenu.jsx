import {useContext} from "solid-js";
import {
    AssetsIcon,
    ClientIcon,
    InvoiceIcon,
    LogoutIcon, PurchaseOrderIcon,
    ReceiptIcon,
    RefundIcon,
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

                {/*

                <div className={
                    ctxMain.mainMenuLocation() === 'sales_till'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><SalesTillIcon size={ctxMain.iconSize()}/></div>
                    <p>Sales Till</p>
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
                    <p>Receipts</p>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'refunds'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('refunds')
                         ctxMain.navigator('/')
                     }}>
                    <div><RefundIcon size={ctxMain.iconSize()}/></div>
                    <p>Refunds</p>
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
                    <p>Invoices</p>
                </div>

                */}
                <div className={
                    ctxMain.mainMenuLocation() === 'workshop'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><WorkshopIcon size={ctxMain.iconSize()}/></div>
                    <p>Workshop</p>
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
                    <p>Clients</p>
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
                    <p>Stock</p>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'assets'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><PurchaseOrderIcon size={ctxMain.iconSize()}/></div>
                    <p>Purchase&nbsp;Orders</p>
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
                    <p>Assets</p>
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
                    <p>Account</p>
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
                    <p>System</p>
                </div>
                <div className={'main-menu-icon'}
                     onClick={() => ctxMain.logout()}>
                    <div><LogoutIcon size={ctxMain.iconSize()}/></div>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}