import React from 'react'

export default function AddItem({add}) {
    return (
        <form onSubmit={add}>
            <input type="text" name="input"/>
            <button>Add</button>
        </form>
    )
}
