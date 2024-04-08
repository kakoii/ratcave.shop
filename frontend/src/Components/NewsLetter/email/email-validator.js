const VALID_EMAIL_ENDINGS = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com', 'aol.com', 'zoho.com', 'protonmail.com', 'yandex.com', 'mail.com', 'gmx.com', 'tutanota.com', 'fastmail.com', 'hushmail.com', 'runbox.com', 'disroot.org', 'posteo.de', 'mailbox.org', 'kolabnow.com', 'riseup.net', 'tuta.io']

export const validateEmail = (email) => !!VALID_EMAIL_ENDINGS.some(v => email.includes(v))

export { VALID_EMAIL_ENDINGS as validEnding }