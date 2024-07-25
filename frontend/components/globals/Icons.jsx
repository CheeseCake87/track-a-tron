export function EyeOpenIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="1.5"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>)
}

export function EyeClosedIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="1.5"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>)
}

export function ClientIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z"/>
        <path d="M10 16h6"/>
        <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
        <path d="M4 8h3"/>
        <path d="M4 12h3"/>
        <path d="M4 16h3"/>
    </svg>)
}

export function NoClientsIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="#2c3e50"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M8 4h10a2 2 0 0 1 2 2v10m-.57 3.399c-.363 .37 -.87 .601 -1.43 .601h-10a2 2 0 0 1 -2 -2v-12"/>
        <path d="M10 16h6"/>
        <path d="M11 11a2 2 0 0 0 2 2m2 -2a2 2 0 0 0 -2 -2"/>
        <path d="M4 8h3"/>
        <path d="M4 12h3"/>
        <path d="M4 16h3"/>
        <path d="M3 3l18 18"/>
    </svg>)
}

export function UserIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"/>
    </svg>)
}

export function UsersIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>
    </svg>)
}

export function TeamsIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"/>
        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
        <path d="M17 10h2a2 2 0 0 1 2 2v1"/>
        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
        <path d="M3 13v-1a2 2 0 0 1 2 -2h2"/>
    </svg>)
}

export function CampaignsIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 8a3 3 0 0 1 0 6"/>
        <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5"/>
        <path
            d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8"/>
    </svg>)
}

//
// export function TeamsIcon(props) {
//     if (props.size === undefined) {
//         props.size = 24
//     }
//     if (props.size === undefined) {
//         props.size = 24
//     }
//
//     return (
//         <svg xmlns="http://www.w3.org/2000/svg"
//              className="icon icon-tabler icon-tabler-flag"
//              width={props.size}
//              height={props.size}
//              viewBox="0 0 24 24"
//              stroke-width="1.5"
//              stroke="currentColor"
//              fill="none"
//              stroke-linecap="round"
//              stroke-linejoin="round">
//             <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
//             <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z"/>
//             <path d="M5 21v-7"/>
//         </svg>
//     )
// }

export function LogoutIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"/>
        <path d="M15 12h-12l3 -3"/>
        <path d="M6 15l-3 -3"/>
    </svg>)
}

export function PhoneIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 14v-3a8 8 0 1 1 16 0v3"/>
        <path d="M18 19c0 1.657 -2.686 3 -6 3"/>
        <path d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z"/>
        <path d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z"/>
    </svg>)
}

export function PhoneRecordsIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/>
        <path d="M9 12a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"/>
    </svg>)
}

export function CalenderIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"/>
        <path d="M16 3v4"/>
        <path d="M8 3v4"/>
        <path d="M4 11h16"/>
        <path d="M7 14h.013"/>
        <path d="M10.01 14h.005"/>
        <path d="M13.01 14h.005"/>
        <path d="M16.015 14h.005"/>
        <path d="M13.015 17h.005"/>
        <path d="M7.01 17h.005"/>
        <path d="M10.01 17h.005"/>
    </svg>)
}

export function SettingsIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
        <path d="M6 4v4"/>
        <path d="M6 12v8"/>
        <path d="M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
        <path d="M12 4v10"/>
        <path d="M12 18v2"/>
        <path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
        <path d="M18 4v1"/>
        <path d="M18 9v11"/>
    </svg>)
}

export function FirstPageIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 12l10 0"/>
        <path d="M10 12l4 4"/>
        <path d="M10 12l4 -4"/>
        <path d="M4 4l0 16"/>
    </svg>)
}

export function LastPageIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M14 12l-10 0"/>
        <path d="M14 12l-4 4"/>
        <path d="M14 12l-4 -4"/>
        <path d="M20 4l0 16"/>
    </svg>)
}

export function NextPageIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 12l14 0"/>
        <path d="M15 16l4 -4"/>
        <path d="M15 8l4 4"/>
    </svg>)
}

export function PrevPageIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 12l14 0"/>
        <path d="M5 12l4 4"/>
        <path d="M5 12l4 -4"/>
    </svg>)
}

export function FilterIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className="icon icon-tabler icon-tabler-filter"
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"/>
    </svg>)
}

export function FilterClearIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M12 20l-3 1v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v3"/>
        <path d="M16 19h6"/>
    </svg>)
}

export function CircleIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke={props.color}
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" stroke-width="0"
              fill="currentColor"/>
    </svg>)
}

export function ErrorIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke={props.color}
                 stroke-width="1.5"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>)
}

export function InfoIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke={props.color}
                 stroke-width="1.5"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>)
}

export function ConfirmedIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke={props.color}
                 stroke-width="1.5"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>)
}

export function BoxIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (<svg xmlns="http://www.w3.org/2000/svg"
                 className={'p-0.5'}
                 width={props.size}
                 height={props.size}
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke={props.color}
                 stroke-width="1.5"
                 stroke-linecap="round"
                 stroke-linejoin="round">
        <path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>)
}

export function LogsIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24" fill="none" stroke={props.color}
             stroke-width="1.5"
             stroke-linecap="round"
             stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
    )
}

export function WorkshopIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={props.color}
             stroke-width="1.5"
             stroke-linecap="round"
             stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
        </svg>
    )
}

export function SalesTillIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={props.color}
             stroke-width="1.5"
             stroke-linecap="round"
             stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
    )
}

export function StockIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={props.color}
             stroke-width="1.5"
             stroke-linecap="round"
             stroke-linejoin="round">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
    )
}

export function AssetsIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={props.color}
             stroke-width="1.5"
             stroke-linecap="round"
             stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
    )
}

export function ReceiptIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={props.color}
             stroke-width="1.5"
             stroke-linecap="round"
             stroke-linejoin="round">
            <path
                d="M20.493,6.849c0,-3.448 -1.265,-3.584 -2.316,-3.584c-2.024,-0 -2.737,0.846 -2.737,3.584l0.064,13.887l-3.973,-1.334l-2.665,1.329l-2.707,-1.39l-2.652,1.383l0.02,-13.875c0,-0 0.407,-3.649 4.421,-3.584c2.463,0.039 10.229,-0 10.229,-0"
            />
            <path d="M20.26,6.849l-4.517,-0"/>
            <path d="M6.024,8.792l6.893,0.001"/>
            <path d="M6.024,11.467l6.893,0"/>
            <path d="M6.024,14.183l6.893,0"/>
        </svg>
    )
}

export function InvoiceIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={props.color}
             stroke-width="1.5"
             stroke-linecap="round"
             stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
    )
}

export function RefundIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={props.color}
             stroke-width="1.5"
             stroke-linecap="round"
             stroke-linejoin="round">
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
        </svg>
    )
}

export function PurchaseOrderIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color === undefined) {
        props.color = 'currentColor'
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={props.color}
             stroke-width="1.5"
             stroke-linecap="round"
             stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
    )
}

export function LetterXIcon(props) {
    if (props.size === undefined) {
        props.size = 24
    }

    if (props.color ===  undefined) {
        props.color = 'currentColor'
    }

    if (props.strokeWidth === undefined) {
        props.strokeWidth = 1.5
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={'p-0.5'}
             width={props.size}
             height={props.size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={props.color}
             stroke-width={props.strokeWidth}
             stroke-linecap="round"
             stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    )
}