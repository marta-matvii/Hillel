import {
  FETCH_PERSON_REQUEST,
  FETCH_PERSON_SUCCESS,
  FETCH_PERSON_FAILURE,
  CLEAR_DATA
} from '../reducers/swapiReducer';

const fetchPersonRequest = () => ({
  type: FETCH_PERSON_REQUEST
});

const fetchPersonSuccess = (person) => ({
  type: FETCH_PERSON_SUCCESS,
  payload: person
});

const fetchPersonFailure = (error) => ({
  type: FETCH_PERSON_FAILURE,
  payload: error
});

export const fetchPerson = (personId) => {
  return async (dispatch) => {
    dispatch(fetchPersonRequest());
    
    try {
      const response = await fetch(`https://swapi.py4e.com/api/people/${personId}/`);
      
      if (!response.ok) {
        throw new Error('Person not found');
      }
      
      const person = await response.json();
      dispatch(fetchPersonSuccess(person));
      
    } catch (error) {
      dispatch(fetchPersonFailure(error.message));
    }
  };
};

export const clearData = () => ({
  type: CLEAR_DATA
});