import { useState } from "react"
export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing => !editing));
    }

    function handleChangeName(event) {
        setPlayerName(event.target.value);
    }



    let editableplayerName = <span className="player-name">{playerName}</span>
    let btnCaption = "Edit"

    if (isEditing) {
        editableplayerName = (<input type="text" required value={playerName} onChange={handleChangeName}></input>);
        btnCaption = "Save"
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editableplayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    )
}