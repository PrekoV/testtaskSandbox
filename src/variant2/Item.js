import React from "react";
import Sublist from "./Sublist";
import AddItem from "./AddItem";

function Item({
    name,
    active,
    setactive,
    id,
    sublist,
    randomId,
    remove,
    removeSublist,
    addSublist,
    position,
    parentLength,
    up,
    down
}) {
    return (
        <>
            <li style={{ margin: "5px 25px" }} className="Item">
                <span>{name}</span>
                {active !== id && sublist && sublist.length === 0 ? (
                    <button onClick={() => setactive(id)}>Add Sublist</button>
                ) : (
                    <button onClick={() => removeSublist(id)}>
                        Remove Sublist
                    </button>
                )}
                {position === "down" && parentLength > 1 && (
                    <button onClick={() => down(id)}>&darr;</button>
                )}
                {position === "up" && parentLength > 1 && (
                    <button onClick={() => up(id)}>&uarr;</button>
                )}
                {position === "and" && parentLength > 1 && (
                    <>
                        <button onClick={() => down(id)}>&darr;</button>{" "}
                        <button onClick={() => up(id)}>&uarr;</button>{" "}
                    </>
                )}
                <button onClick={() => remove(id)}>Remove</button>
                {sublist && sublist.length !== 0 && (
                    <Sublist
                        randomId={randomId}
                        active={active}
                        sublist={sublist}
                    />
                )}
                {active === id && <AddItem add={e => addSublist(e, id)} />}
            </li>
        </>
    );
}

export default Item;
