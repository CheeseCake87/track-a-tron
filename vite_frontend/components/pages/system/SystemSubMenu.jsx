import {BoxIcon, InfoIcon} from "../../globals/Icons";

export default function SystemSubMenu(props) {
    return (
        <div className={'sub-menu'}>
            <div className={props.systemSection() === 'information' ? 'sub-menu-icon-active' : 'sub-menu-icon'} onClick={
                () => props.setSystemSection('information')
            }>
                <div><InfoIcon size={20}/></div>
                <div>Information</div>
            </div>
            <div className={props.systemSection() === 'services' ? 'sub-menu-icon-active' : 'sub-menu-icon'} onClick={
                () => props.setSystemSection('services')
            }>
                <div><BoxIcon size={20}/></div>
                <div>Services</div>
            </div>
        </div>
    )
}