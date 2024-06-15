import {onMount, useContext} from "solid-js";
import {ContextClientAdd} from "../../../contextManagers/ContextClientAdd";
import ClientAddHeader from "./ClientAddHeader";
import {ContextMain} from "../../../contextManagers/ContextMain";
import rpc_client_add_needs from "../../../rpc/client_add/rpc_client_add_needs";


export default function ClientAdd() {


    const ctxClientAdd = useContext(ContextClientAdd)

    return (
        <div className={'px-2'}>
            <ClientAddHeader/>
            <form>
                <div className={'form-section pb-4'}>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <div className={'inline-label'}>
                                <label>Source</label>
                                <select>
                                    <option>Select...</option>
                                    <option>option 1</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                </select>
                            </div>
                        </div>
                        <div className={'py-2'}>
                            <div className={'inline-label'}>
                                <label>Campaign</label>
                                <select>
                                    <option>Select...</option>
                                    <option>option 1</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                </select>
                            </div>
                        </div>
                        <div className={'py-2'}>
                            <div className={'inline-label'}>
                                <label>Status</label>
                                <select>
                                    <option>Select...</option>
                                    <option>option 1</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'form-section'}>
                    <h2>Details</h2>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Title</label>
                            <select>
                                <option>Select...</option>
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Mss</option>
                            </select>
                        </div>
                        <div className={'py-2'}>
                            <label>First Name</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Middle Name(s)</label>
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
                            <label>Flat, Name, Number</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>Street</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'py-2'}>
                            <label>District</label>
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