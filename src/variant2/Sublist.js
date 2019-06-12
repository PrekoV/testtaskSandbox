import React, { useState, useReducer } from "react";
import Item from "./Item";
import AddItem from "./AddItem";
import { reducer, initState } from "./reducer";

function Sublist({ sublist, randomId }) {
    let updatedState;
    // const [list, setList] = useState(sublist);
    sublist.length !== 0
        ? (updatedState = sublist)
        : (updatedState = initState);
    const [active, setactive] = useState("");
    const [state, dispatch] = useReducer(reducer, updatedState);

    const remove = id => {
        dispatch({ type: "REMOVE_ITEM", id });

        //////////////////////////////////////////////////////////////////
        // let list_1 = [...list];
        // for (let index = 0; index < list_1.length; index++) {
        //     if (list_1[index].id === id) {
        //         list_1.splice(index, 1);
        //     }
        // }
        // setList(list_1);
        //////////////////////////////////////////////////////////////////
    };

    const addSublist = (e, id) => {
        e.preventDefault();
        if (e.target.input.value) {
            dispatch({ type: "ADD_SUBLIST", id, value: e.target.input.value });

            //////////////////////////////////////////////////////////////////
            // let list_1 = [...list];
            // for (let index = 0; index < list_1.length; index++) {
            //     if (list_1[index].id === id) {
            //         list_1[index].sublist.push({
            //             id: randomId(),
            //             name: e.target.input.value,
            //             sublist: []
            //         });
            //     }
            // }
            // setList(list_1 );
            //////////////////////////////////////////////////////////////////

            e.target.input.value = "";
            setactive("");
        }
    };

    const add = e => {
        e.preventDefault();
        if (e.target.input.value) {
            dispatch({ type: "ADD_ITEM", value: e.target.input.value });

            //////////////////////////////////////////////////////////////////
            // let list_1 = [...list];
            // list_1.push({
            //     id: randomId(),
            //     name: e.target.input.value,
            //     sublist: []
            // });
            // setList(list_1);
            //////////////////////////////////////////////////////////////////
            
            e.target.input.value = "";
            setactive("");
        }
    };

    const removeSublist = id => {
        dispatch({ type: "REMOVE_SUBLIST", id });

        //////////////////////////////////////////////////////////////////
        // let list_1 = [...list];
        // let index = list_1.indexOf(list_1.find(el => el.id === id));
        // list_1[index].sublist = [];
        // setList(list_1);
        //////////////////////////////////////////////////////////////////
    };

    const up = id => {
        dispatch({ type: "UP", id });

        //////////////////////////////////////////////////////////////////
        // let list_1 = [...list];
        // let index = list_1.indexOf(list_1.find(el => el.id === id));
        // let prevElement = { ...list_1[index - 1] };
        // list_1[index - 1] = { ...list_1[index] };
        // list_1[index] = { ...prevElement };
        // setList(list_1);
        //////////////////////////////////////////////////////////////////
    };

    const down = id => {
        dispatch({ type: "DOWN", id });

        //////////////////////////////////////////////////////////////////
        // let list_1 = [...list];
        // let index = list_1.indexOf(list_1.find(el => el.id === id));
        // let prevElement = { ...list_1[index] };
        // list_1[index] = { ...list_1[index + 1] };
        // list_1[index + 1] = { ...prevElement };
        // setList(list_1);
        //////////////////////////////////////////////////////////////////
    };

    return (
        <ul className="Sublist">
            {state &&
                state.map(item => (
                    <Item
                        addSublist={addSublist}
                        active={active}
                        setactive={setactive}
                        sublist={[...state]}
                        removeSublist={removeSublist}
                        randomId={randomId}
                        key={item.id}
                        remove={remove}
                        position={
                            state.indexOf(
                                state.find(el => el.id === item.id)
                            ) === 0
                                ? "down"
                                : state.indexOf(
                                      state.find(el => el.id === item.id)
                                  ) ===
                                  state.length - 1
                                ? "up"
                                : "and"
                        }
                        parentLength={state.length}
                        up={up}
                        down={down}
                        {...item}
                    />
                ))}
            <AddItem add={add} />
        </ul>
    );
}

export default Sublist;
