import React, { useState } from "react";
import "./App.css";

const randomId = () => Math.floor(Math.random() * (1000000 - 1) + 1);

function App() {
    const [list, setList] = useState([
        {
            id: randomId(),
            name: "Coffee",
            sublist: [
                {
                    id: randomId(),
                    name: "black",
                    sublist: [
                        { id: randomId(), name: "small", sublist: [] },
                        { id: randomId(), name: "big", sublist: [] }
                    ]
                },
                {
                    id: randomId(),
                    name: "Green",
                    sublist: [
                        { id: randomId(), name: "small", sublist: [] },
                        {
                            id: randomId(),
                            name: "medium",
                            sublist: [
                                {
                                    id: randomId(),
                                    name: "GREENFIELD",
                                    sublist: []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: randomId(),
            name: "Tea",
            sublist: [
                {
                    id: randomId(),
                    name: "black",
                    sublist: [
                        { id: randomId(), name: "small", sublist: [] },
                        { id: randomId(), name: "big", sublist: [] }
                    ]
                }
            ]
        }
    ]);
    const [active, setActive] = useState("");

    const addSublist = (e, id) => {
        e.preventDefault();
        let newList = [...list];
        let findDeep = function(data, id) {
            return data.some(function(item) {
                if (item.id === id) {
                    item.sublist.push({
                        id: randomId(),
                        name: e.target.input.value,
                        sublist: []
                    });
                    return true;
                } else if (item.sublist) return findDeep(item.sublist, id);
            });
        };
        findDeep(newList, id) && setList(newList)
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
        let arr = [...list];
        let newObj = {
            id: list.length,
            name: e.target.input.value,
            sublist: []
        };
        arr.push(newObj);
        setList(arr);
    };

    const remove = id => {
        let newList = [...list];
        let a = []
        let findDeep = function(data, id) {
            return data.some(function(item) {
                if (item.id === id) {
                    a.push(item)
                    data.splice(data.indexOf(item), 1);
                    return true;
                } else if (item.sublist) return findDeep(item.sublist, id);
            });
        };
        findDeep(newList, id);
        setList(newList);
    };

    const up = (id, index) => {
        let newList = [...list]
        let findDeep = function(data, id) {
            return data.some(function(item) {
                if (item.id === id) {
                    let a = {...data[index-1]}
                    data[index-1] = data[index]
                    data[index] = a
                    return true;
                } else if (item.sublist) return findDeep(item.sublist, id);
            });
        };
        findDeep(newList, id);
        setList(newList)
    }

    const down = (id, index) => {
        let newList = [...list]
        let findDeep = function(data, id) {
            return data.some(function(item) {
                if (item.id === id) {
                    let a = {...data[index+1]}
                    data[index+1] = data[index]
                    data[index] = a
                    return true;
                } else if (item.sublist) return findDeep(item.sublist, id);
            });
        };
        findDeep(newList, id);
        setList(newList)
    }

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
                        next={item.id}
                        remove={remove}
                        index={index}
                        parentArrayLength = {list.length}
                        up={up}
                        down={down}
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

function Item({ name, sublist, addSublist, active, setActive, next, remove, index, parentArrayLength, up, down }) {
    let next1;
    return (
        <li>
            <div>
                {name}{" "}
                {/* {sublist.length - 1 === index && <button  >up</button>} */}
                { parentArrayLength - 1 === index && parentArrayLength !== 1 && <button onClick={() => up(next, index)} >&uarr;</button>}
                { index === 0  && parentArrayLength !== 1 && <button onClick={() => down(next, index)} >&darr;</button>}
                { parentArrayLength !== 1 && index !== 0 && parentArrayLength - 1 !== index && <> <button  onClick={() => up(next, index)} >&uarr;</button> <button onClick={() => down(next, index)} >&darr;</button> </>}
                {console.log(name, index, parentArrayLength)}
                <button onClick={() => setActive(next)}> Add Sublist</button>
                <button onClick={() => remove(next)}>Remove</button>
            </div>
            <ul style={{ margin: "5px 25px" }}>
                {sublist !== null &&
                    sublist.map((item, index) => {
                        next1 = item.id;
                        return (
                            <Item
                                key={item.id}
                                {...item}
                                addSublist={addSublist}
                                setActive={setActive}
                                active={active}
                                next={next1}
                                remove={remove}
                                index = {index}
                                parentArrayLength={sublist.length}
                                up={up}
                                down = {down}
                            />
                        );
                    })}
                {active === next && (
                    <form onSubmit={e => addSublist(e, active)}>
                        <input name="input" type="text" />
                        <button>Add</button>
                    </form>
                )}
            </ul>
        </li>
    );
}
