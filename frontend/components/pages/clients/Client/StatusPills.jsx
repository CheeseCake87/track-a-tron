import {useContext} from "solid-js";
import {ContextClient} from "../../../../contextManagers/ContextClient";

export default function StatusPills() {
    const ctxClient = useContext(ContextClient)

    return (
        <div className={'flex flex-row flex-wrap gap-2 w-full mb-4'}>

            <div className={'card-group-slim'}>

                <div className={'card-labelled-pill'}>
                    <div className={'card-labelled-pill-label'}>
                        Client ID
                    </div>
                    <div className={'card-labelled-pill-text'}>
                        {ctxClient.client().client_id}
                    </div>
                </div>

                <div className={'card-labelled-pill'}>
                    <div className={'card-labelled-pill-label'}>
                        Added By
                    </div>
                    <div className={'card-labelled-pill-text'}>
                        {ctxClient.client().__added_by}
                    </div>
                </div>

                <div className={'card-labelled-pill'}>
                    <div className={'card-labelled-pill-label'}>
                        Created
                    </div>
                    <div className={'card-labelled-pill-text'}>
                        {ctxClient.client().__created}
                    </div>
                </div>

            </div>

        </div>
    )
}
