export const writeToLocalStorage = (key:string,value:any) =>{
localStorage.setItem(key,JSON.stringify(value))
}

export const readFromLocalStorage = (key:string) =>{
    const data = localStorage.getItem(key)
    // console.log('data',data)
    
    if(data){
        return JSON.parse(data)
    }
    return null
}

