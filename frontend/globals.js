export const API_URL = import.meta.env.DEV ? 'http://127.0.0.1:7070' : ''

export const DEVICE_TYPES = [
    'All-in-One',
    'Desktop',
    'Laptop',
    'Tablet',
    'Phone',
    'Other'
]

export const STATUS_CODES = {
    1: {
        'name': 'Open',
        'style': {'background-color': '#114a06', 'color': '#ffffff'}
    },
    2: {
        'name': 'In Progress',
        'style': {'background-color': '#413ab8', 'color': '#ffffff'},
    },
    3: {
        'name': 'Waiting for Part(s)',
        'style': {'background-color': '#985408', 'color': '#ffffff'},
    },
    4: {
        'name': 'Waiting for Client',
        'style': {'background-color': '#741b78', 'color': '#ffffff'},
    },
    5: {
        'name': 'Ready for Pickup',
        'style': {'background-color': '#b1d3bf', 'color': '#232323'},
    },
    6: {
        'name': 'Completed',
        'style': {'background-color': '#ecc146', 'color': '#232323'},
    },
    7: {
        'name': 'Cancelled',
        'style': {'background-color': '#e44756', 'color': '#232323'},
    }
}

export const STATUS_CODES_ARRAY = Object.entries(STATUS_CODES).map(
    ([key, value]) => {
        return {code: parseInt(key), label: value.name};
    });

export const CATEGORY_CODES = {
    1: 'Drop-in',
    2: 'Remote',
    3: 'Callout',
    4: 'Multiple',
}

export const CATEGORY_CODES_ARRAY = Object.entries(CATEGORY_CODES).map(
    ([key, value]) => {
        return {code: parseInt(key), label: value};
    });