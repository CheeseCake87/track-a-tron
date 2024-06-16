import {onMount, useContext} from "solid-js";
import {ContextClientAdd} from "../../../contextManagers/ContextClientAdd";
import ClientAddHeader from "./ClientAddHeader";
import {ContextMain} from "../../../contextManagers/ContextMain";
import rpc_client_add_needs from "../../../rpc/client_add/rpc_client_add_needs";


export default function ClientAdd() {

    const ctxMain = useContext(ContextMain)
    const ctxClientAdd = useContext(ContextClientAdd)

    return (
        <div className={'px-2'}>
            <ClientAddHeader/>
            <form>
                <div className={'form-section'}>
                    <h2>Details</h2>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Business Name</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>First Name</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Last Name</label>
                            <input type={'text'}/>
                        </div>
                    </div>
                </div>
                <div className={'form-section'}>
                    <h2>Contact</h2>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Email Address</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Landline</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Mobile</label>
                            <input type={'text'}/>
                        </div>
                    </div>
                </div>
                <div className={'form-section'}>
                    <h2>Address</h2>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Building Name</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Sub Building Name</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Building Number</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Sub Building Number</label>
                            <input type={'text'}/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Address Line 1</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Address Line 2</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Address Line 3</label>
                            <input type={'text'}/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>City / Town</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>County</label>
                            <input type={'text'}/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Postcode</label>
                            <input type={'text'}/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Country</label>
                            <select>
                                <option>Select...</option>
                                <option>Scotland</option>
                                <option>England</option>
                                <option>Wales</option>
                                <option>Northern Ireland</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}