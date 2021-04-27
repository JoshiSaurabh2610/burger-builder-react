import * as actionType from '../actions/actionTypes';

const initialState={
    idToken:null,
    userId:null,
    error:null,
    loading:false,
};

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionType.AUTH_START:
            return{
                ...state,
                loading:true,
                error:null,
            }
        case actionType.AUTH_SUCESS:
            return{
                idToken:action.data.idToken,
                userId:action.data.localId,
                error:null,
                loading:false,
            }
        case actionType.AUTH_FAIL:
            return{
                idToken:null,
                userId:null,
                error:action.err,
                loading:false,
            }
        case actionType.AUTH_LOGOUT:
            return{
                ...state,
                idToken:null,
                userId:null,
            }
        default:
            return state;
    }
};

export default reducer;