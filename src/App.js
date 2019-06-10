import React, { useState } from "react";
import "./App.css";

const randomId = () => Math.floor(Math.random() * (1000000 - 1) + 1);

function App() {
    const [list, setList] = useState([]);
    const [active, setActive] = useState("");

    const addSublist = (e, id) => {
        e.preventDefault();
        if (e.target.input.value !== "") {
            let newList = [...list];
            let findDeep = function(data, id) {
                return data.some(function(item) {
                    if (item.id === id) {
                        console.log(id, data);
                        item.sublist.push({
                            id: randomId(),
                            name: e.target.input.value,
                            sublist: []
                        });
                        return true;
                    } else if (item.sublist) return findDeep(item.sublist, id);
                });
            };
            findDeep(newList, id) && setList(newList);
            console.log(list);
            e.target.input.value = "";
        }

        // if (findDeep(newList, id)) {
        //     console.log(newItem)
        //     newItem[0][0].sublist.push({
        //             id: randomId(),
        //             name: e.target.input.value,
        //             sublist: []
        //         });
        //     setList(newList)
        // };
    };

    const add = e => {
        e.preventDefault();
        if (e.target.input.value !== "") {
            let arr = [...list];
            let newObj = {
                id: randomId(),
                name: e.target.input.value,
                sublist: []
            };
            arr.push(newObj);
            setList(arr);
            e.target.input.value = "";
        }
    };

    const remove = id => {
        console.log(id);
        let newList = [...list];
        let a = [];
        let findDeep = function(data, id) {
            return data.some(function(item) {
                if (item.id === id) {
                    a.push(item);
                    data.splice(data.indexOf(item), 1);
                } else if (item.sublist) return findDeep(item.sublist, id);
            });
        };
        findDeep(newList, id);
        setList(newList);
    };

    const up = (id, index) => {
        let newList = [...list];
        let findDeep = function(data, id) {
            return data.some(function(item) {
                if (item.id === id) {
                    let a = { ...data[index - 1] };
                    data[index - 1] = { ...data[index] };
                    data[index] = { ...a };
                    return true;
                } else if (item.sublist) return findDeep(item.sublist, id);
            });
        };
        findDeep(newList, id);
        setList(newList);
    };

    const down = (id, index) => {
        let newList = [...list];
        let findDeep = function(data, id) {
            return data.some(function(item) {
                if (item.id === id) {
                    let a = { ...data[index + 1] };
                    data[index + 1] = { ...data[index] };
                    data[index] = { ...a };
                    return true;
                } else if (item.sublist) return findDeep(item.sublist, id);
            });
        };
        findDeep(newList, id);
        setList(newList);
    };

    const remoteSublist = id => {
        let newList = [...list];
        let findDeep = function(data, id) {
            return data.some(function(item) {
                if (item.id === id) {
                    item.sublist = [];
                    return true;
                } else if (item.sublist) return findDeep(item.sublist, id);
            });
        };
        findDeep(newList, id);
        setList(newList);
    };
    console.log(list);
    return (
        <div className="App">
            <ul>
                {list.map((item, index) => (
                    <Item
                        key={item.id}
                        parent={item.id}
                        {...item}
                        addSublist={addSublist}
                        setActive={setActive}
                        active={active}
                        itemId={item.id}
                        remove={remove}
                        index={index}
                        parentArrayLength={list.length}
                        up={up}
                        down={down}
                        remoteSublist={remoteSublist}
                    />
                ))}
                <li>
                    <form onSubmit={add}>
                        <input name="input" type="text" />
                        <button>Add</button>
                    </form>
                </li>
            </ul>
        </div>
    );
}

export default App;

function Item({
    name,
    sublist,
    addSublist,
    active,
    setActive,
    itemId,
    remove,
    index,
    parentArrayLength,
    up,
    down,
    remoteSublist
}) {
    // let currentId;
    return (
        <li>
            <div>
                {name}
                {parentArrayLength - 1 === index && parentArrayLength !== 1 && (
                    <button onClick={() => up(itemId, index)}>&uarr;</button>
                )}
                {index === 0 && parentArrayLength !== 1 && (
                    <button onClick={() => down(itemId, index)}>&darr;</button>
                )}
                {parentArrayLength !== 1 &&
                    index !== 0 &&
                    parentArrayLength - 1 !== index && (
                        <>
                            {" "}
                            <button onClick={() => up(itemId, index)}>
                                &uarr;
                            </button>{" "}
                            <button onClick={() => down(itemId, index)}>
                                &darr;
                            </button>{" "}
                        </>
                    )}
                {sublist.length !== 0 ? (
                    <button onClick={() => remoteSublist(itemId)}>
                        Remote Sublist
                    </button>
                ) : (
                    <button onClick={() => setActive(itemId)}>
                        {" "}
                        Add Sublist
                    </button>
                )}

                <button
                    onClick={() => {
                        remove(itemId);
                        setActive(null);
                    }}
                >
                    Remove
                </button>
            </div>
            <ul style={{ margin: "5px 25px" }}>
                {sublist !== null &&
                    sublist.map((item, index) => {
                        // next1 = item.id;
                        return (
                            <Item
                                key={item.id}
                                {...item}
                                addSublist={addSublist}
                                setActive={setActive}
                                active={active}
                                itemId={item.id}
                                remove={remove}
                                index={index}
                                parentArrayLength={sublist.length}
                                up={up}
                                down={down}
                                remoteSublist={remoteSublist}
                            />
                        );
                    })}
                {(active === itemId || sublist.length !== 0) && (
                    <form
                        onSubmit={e => {
                            addSublist(e, active);
                            setActive("");
                        }}
                    >
                        <input
                            onFocus={() => setActive(itemId)}
                            name="input"
                            type="text"
                        />
                        <button>Add</button>
                    </form>
                )}
            </ul>
        </li>
    );
}
