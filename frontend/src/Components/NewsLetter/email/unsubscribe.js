export const unsubscribeUser = () => {
    fetch('/unsubscribe', { method: 'POST' }).then(response => { console.log(response.status) })
}