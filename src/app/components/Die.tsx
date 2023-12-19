import React from "react"

export interface DieProps {
    held: boolean,
    holdHandler: React.MouseEventHandler<HTMLDivElement>,
    value: number,
}

export default function Die(props: DieProps) {
    const styles = {
        backgroundColor: props.held ? "#59E391" : "white"
    }
    return (
        <div className="die-face" onClick={props.holdHandler} style={styles}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}
