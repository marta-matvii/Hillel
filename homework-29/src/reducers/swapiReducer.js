export const FETCH_PERSON_REQUEST = 'FETCH_PERSON_REQUEST';
export const FETCH_PERSON_SUCCESS = 'FETCH_PERSON_SUCCESS';
export const FETCH_PERSON_FAILURE = 'FETCH_PERSON_FAILURE';
export const CLEAR_DATA = 'CLEAR_DATA';

const initialState = {
  person: null, 
  loading: false, 
  error: null 
};

const swapiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERSON_REQUEST:
      return {
        ...state,
        loading: true, 
        error: null 
      };
    
    case FETCH_PERSON_SUCCESS:
      return {
        ...state,
        loading: false, 
        person: action.payload, 
        error: null
      };
    
    case FETCH_PERSON_FAILURE:
      return {
        ...state,
        loading: false, 
        person: null,
        error: action.payload 
      };
    
    case CLEAR_DATA:
      return {
        ...initialState 
      };
    
    default:
      return state; 
  }
};

export default swapiReducer;