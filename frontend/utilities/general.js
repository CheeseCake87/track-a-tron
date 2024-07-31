export function displayName(business_name, first_name, last_name) {
    let name = ''
    if (first_name) {
        name = first_name
    }
    if (last_name) {
        if (first_name) {
            name += ' ' + last_name
        } else {
            name = last_name
        }
    }

    if (business_name) {
        if (name !== '') {
            return name + ' (' + business_name + ')'
        } else {
            return business_name
        }
    }
    return name ? name : '-'
}

export function displayContact(phone, email, alt_phone, alt_email) {
    let contact = []
    if (phone) {
        contact.push(phone)
    }
    if (email) {
        contact.push(email)
    }
    if (alt_phone) {
        contact.push(alt_phone)
    }
    if (alt_email) {
        contact.push(alt_email)
    }
    if (contact.length === 0) {
        return '-'
    }
    return contact.join(', ')
}