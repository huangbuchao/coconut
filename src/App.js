import React, { Component } from "react";
import "./App.css";

function Square(props) {
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
    }
    return squares.indexOf(null) === -1 ? "over" : null;
}

function isGameOver(squares) {
    for(let value of squares) {
        if(value === null) {
            return false;
        }
    }
    return true;
}

class Board extends Component {
    renderSquare(i) {
        return (
            <Square
                key={ i }
                value={ this.props.squares[i] }
                onClick={ () => this.props.onClick(i) }
            />
        );
    }

    render() {
        const array = Array(3).fill(null);
        let lists = array.map((v, i) => {
            return (
                <div key={ i } className="board-row">{
                    array.map((v, j) => {
                        return this.renderSquare(i * 3 + j);
                    })
                }</div>
            );
        });
        return(
            <div>{ lists }</div>
        );
    }
}

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            location: [
                [null, null]
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const location = this.state.location;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        console.log(history);
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            location: location.concat([[
                Math.floor(i / 3) + 1,
                i % 3 + 1
            ]]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const location = this.state.location;

        const moves = history.map((step, move) => {
            const desc = move ?
                "Go to move#" + move + " && " + "行: " + location[move][0] + "列: " + location[move][1]
                : "Go to game start";
            return(
                <li key={ move }>
                    <button onClick={ () => this.jumpTo(move) }>{ desc }</button>
                </li>
            );
        });

        let status;
        if (winner) {
            if (winner === "over") {
                status = 'This is a draw!';
            } else {
                status = 'Winner: ' + winner;
            }
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return(
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={ current.squares }
                        onClick={ (i) => this.handleClick(i) }
                    />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{ moves }</ol>
                </div>
            </div>
        );
    }
}

export class App extends Component {
    render() {
      return(
        <div className="App">
          <h1> Hi, React! </h1>
          <h2>{ new Date().toLocaleTimeString() }</h2>
          <div>
              <Game />
          </div>
        </div>
      );
    }
}