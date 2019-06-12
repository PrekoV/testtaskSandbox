import React from 'react'
import Sublist from "./Sublist";
export const randomId = () => Math.floor(Math.random() * (1000000 - 1) + 1);

export default function Variant2() {
    const list = []
    return (
        <div>
            <Sublist randomId={randomId} sublist={[...list]}/>
        </div>
    )
}
