import {createContext, createEffect, createSignal, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import rpc_get_client from "../rpc/client/rpc_get_client";
import {ContextMain} from "./ContextMain";
import rpc_update_client from "../rpc/client/rpc_update_client";
import {ContextClient} from "./ContextClient";

export const ContextSalesTill = createContext()

export function SalesTillContextProvider() {

    const ctxMain = useContext(ContextMain)

    return (
        <ContextSalesTill.Provider value={}>
            <Outlet/>
        </ContextSalesTill.Provider>
    )
}