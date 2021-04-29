import * as ActionTypes from './ActionTypes';

export const addComment = (capsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: capsiteId,
        rating: rating,
        author: author,
        text: text
    }
});