import { UPDATE_OPTION } from "../reducers/types";

export const updateTogglesOption = (value) => dispatch => {
    dispatch({type: UPDATE_OPTION, payload: value});
};