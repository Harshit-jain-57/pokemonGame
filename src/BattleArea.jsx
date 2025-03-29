
import { useEffect, useState } from "react";
import "./index.css"
export default function BattleArea({ player, opponent }) {
    const [playerHp, setPlayerHp] = useState(player.hp);
    const [opponentHp, setOpponentHp] = useState(opponent.hp);
    const [turn, setTurn] = useState("player");
    
    // Generate random attack values for each move at the start of the game
    const [playerMoves, setPlayerMoves] = useState([]);
    
    useEffect(() => {
        const moves = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 10);
        setPlayerMoves(moves);
    }, []); // Runs only once when component mounts

    function attack(moveIndex) {
        if (turn === "player") {
            setOpponentHp((prevHp) => Math.max(prevHp - playerMoves[moveIndex], 0));
            setTurn("opponent");
        }
    }

    useEffect(() => {
        if (turn === "opponent" && opponentHp > 0 && playerHp > 0) {
            const timer = setTimeout(() => {
                const opponentAttack = Math.floor(Math.random() * 20) + 10;
                setPlayerHp((prevHp) => Math.max(prevHp - opponentAttack, 0));
                setTurn("player");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [turn, opponentHp, playerHp]);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>BATTLE ARENA </h2>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                    <h3>{opponent.id.toUpperCase()}</h3>
                    <img src={opponent.image} alt={opponent.id} />
                    <p>HP: {opponentHp}</p>
                </div>
                <div>
                    <h3>{player.id.toUpperCase()}</h3>
                    <img src={player.image} alt={player.id} />
                    <p>HP: {playerHp}</p>
                </div>
                
            </div>
            
            {playerHp > 0 && opponentHp > 0 ? (
                turn === "player" ? (
                    <div>
                        <h3>YOUR MOVE</h3>
                        {playerMoves.map((move, index) => (
                            <button 
                                key={index} 
                                onClick={() => attack(index)}
                                style={{ margin: "5px", padding: "10px 15px", cursor: "pointer" }}
                            >
                               {player.moves[index].toUpperCase()} ( DAMAGE : {move})
                            </button>
                        ))}
                    </div>
                ) : (
                    <h3>OPPONENT'S TURN... </h3>
                )
            ) : (
                <h2>{playerHp > 0 ? "You Win! 🎉" : "You Lost! 💀"}</h2>
            )}
        </div>
    );
}

