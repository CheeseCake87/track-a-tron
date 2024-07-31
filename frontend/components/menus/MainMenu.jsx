import {Show, useContext} from "solid-js";
import {
    ClientIcon,
    HideMainMenu,
    LogoutIcon,
    SettingsIcon,
    ShowMainMenu,
    UserIcon,
    WorkshopIcon
} from "../globals/Icons";
import {ContextMain} from "../../contextManagers/ContextMain";
import {A} from "@solidjs/router";


export function MainMenu() {

    const ctxMain = useContext(ContextMain)

    function classLookup(location) {
        return ctxMain.mainMenuLocation() === location
            ? 'main-menu-icon-active'
            : 'main-menu-icon'
    }

    return (
        <div className={'main-menu'} style={{width: ctxMain.showMainMenu() ? '250px' : `${ctxMain.iconSize() + 55}px`}}>
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
                    <div><AssetsIcon size={ctxMain.iconSize()}/></div>
                    <p>Assets</p>
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

                */}

                <A href="/workshop" activeClass="main-menu-icon-active" inactiveClass="main-menu-icon">
                    <WorkshopIcon size={ctxMain.iconSize()}/>
                    <Show when={ctxMain.showMainMenu()}>
                        <p>Workshop</p>
                    </Show>
                </A>
                <A href='/clients' activeClass="main-menu-icon-active" inactiveClass="main-menu-icon">
                    <ClientIcon size={ctxMain.iconSize()}/>
                    <Show when={ctxMain.showMainMenu()}>
                        <p>Clients</p>
                    </Show>
                </A>

            </div>

            <div>
                <A href='/account' activeClass="main-menu-icon-active" inactiveClass="main-menu-icon">
                    <UserIcon size={ctxMain.iconSize()}/>
                    <Show when={ctxMain.showMainMenu()}>
                        <p>Account</p>
                    </Show>
                </A>

                <A href='/system' activeClass="main-menu-icon-active" inactiveClass="main-menu-icon">
                    <SettingsIcon size={ctxMain.iconSize()}/>
                    <Show when={ctxMain.showMainMenu()}>
                        <p>System</p>
                    </Show>
                </A>

                <Show when={ctxMain.showMainMenu()} fallback={
                    <div className={'main-menu-icon'}
                         onClick={() => {
                             ctxMain.setShowMainMenu(true)
                         }}>
                        <ShowMainMenu size={ctxMain.iconSize()}/>
                    </div>
                }>
                    <div className={'main-menu-icon'}
                         onClick={() => {
                             ctxMain.setShowMainMenu(false)
                         }}>
                        <HideMainMenu size={ctxMain.iconSize()}/>
                        <p>Hide&nbsp;Menu</p>
                    </div>
                </Show>

                <div className={'main-menu-icon'}
                     onClick={() => ctxMain.logout()}>
                    <LogoutIcon size={ctxMain.iconSize()}/>
                    <Show when={ctxMain.showMainMenu()}>
                        <p>Logout</p>
                    </Show>
                </div>
            </div>
        </div>
    )
}