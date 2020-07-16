import * as React from "react";
import Board, {calculateWinner} from "./board";

export class Game extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentSquares = history[history.length - 1].squares.slice();

        if (calculateWinner(currentSquares) || currentSquares[i]) {
            return;
        }
        currentSquares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            stepNumber: history.length,
            history: history.concat([{squares: currentSquares}]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>);
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={ (i) => this.handleClick(i) }/>
                </div>
                <div className="game-info">
                    <div>{status}</div>

                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) === 0,
        });
    }
}