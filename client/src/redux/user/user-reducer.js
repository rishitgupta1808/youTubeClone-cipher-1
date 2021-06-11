const INITIAL_VALUE = {
    username : null,
    userid : null
}

const userReducer = (state= INITIAL_VALUE,action)=>{

    switch(action.type){
        case 'SET_CURRENT_USER':
            return{
                ...state,
                username : action.payload.username,
                userid : action.payload.userid
                
            }
            default : return state
    }
}

export default userReducer;