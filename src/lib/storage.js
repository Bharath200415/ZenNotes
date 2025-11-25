export function formatDate(timestamp){
    return new Date(timestamp).toLocaleDateString("en-US",{
        year:"numeric",
        month:"short",
        day:"numeric"
    })

}