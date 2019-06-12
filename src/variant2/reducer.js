import { randomId } from "./index";

export const initState = [];

export function reducer(state, action) {
    switch (action.type) {
        case "ADD_SUBLIST": {
            let list_1 = [...state];
            list_1
                .find(el => el.id === action.id)
                .sublist.push({
                    id: randomId(),
                    name: action.value,
                    sublist: []
                });

            return [...list_1];
        }
        case "ADD_ITEM": {
            let list_1 = [...state];
            list_1.push({
                id: randomId(),
                name: action.value,
                sublist: []
            });

            return [...list_1];
        }
        case "REMOVE_SUBLIST": {
            let list_1 = [...state];
            list_1[list_1.findIndex(el => el.id === action.id)].sublist = [];

            return [...list_1];
        }
        case "REMOVE_ITEM": return state.filter(el => el.id !== action.id);
        case "UP": {
            let list_1 = [...state];
            let index = list_1.findIndex(el => el.id === action.id);
            let prevElement = { ...list_1[index - 1] };
            list_1[index - 1] = { ...list_1[index] };
            list_1[index] = { ...prevElement };

            return [...list_1];
        }
        case "DOWN": {
            let list_1 = [...state];
            let index = list_1.findIndex(el => el.id === action.id);
            let prevElement = { ...list_1[index] };
            list_1[index] = { ...list_1[index + 1] };
            list_1[index + 1] = { ...prevElement };

            return [...list_1];
        }
        default:
            return [...state];
    }
}
