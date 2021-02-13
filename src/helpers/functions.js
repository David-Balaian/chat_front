export const parseDate = (ms) => {
    if(!ms) {
        return ""
    }
    let date = new Date(ms)
    let delta = Date.now() - ms
    if(delta < 8640000000){
        return date.toLocaleString().split(", ")[1]
    }else{
        return date.toLocaleDateString()
    }
}