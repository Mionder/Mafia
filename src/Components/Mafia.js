import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Mafia extends Component {
    state = {
        randomRoles: [],
        players: 0,
        isReady: false,
        playerStatus: false,
        randomedRoles: [],
        indexArray: 0,
        isDoctor: false,
        isDon: false,
        showError: false,
        errorText: "",
        showModalWindow: false,
    }

    createArrayWithRoles = () => {
        // const {showError} = this.state;
        if (this.state.players === 0) {
            this.setState({showError: true, errorText: "Введите количество игроков"})
        }
        else if (typeof +this.state.players != "number"){
            this.setState({showError: true, errorText: "Вам нужно ввести цифру игроков"})
        }
        else if(this.state.players <5){
            this.setState({showError: true, errorText: "Минимальное количество игроков - 5"})
        }
        else {
            const {isDoctor, isDon} = this.state;
            let roles = [];
            if (this.state.players >= 5 && this.state.players < 7) {
                roles = ["Мафия", "Шериф"]
            } else if (this.state.players >= 7 && this.state.players <= 8) {
                roles = ["Мафия", "Мафия", "Шериф"];
            } else if (this.state.players >= 9) {
                roles = ['Мафия', "Мафия", "Мафия", "Шериф"];

            }
            if (isDoctor) {  
                roles.push("Доктор");
            }
            if (isDon) {
                roles.shift();
                roles.push("Дон")
            }
            let roleLength = roles.length;
            for (let i = 0; i < this.state.players - roleLength; i++) {
                roles.push("Мирный житель")
            }
            console.log(roles)
            this.shuffle(roles);
            this.setState({isReady: true})
        }
    }
    shuffle = async (array) => {
        array.sort(() => Math.random() - 0.5);
        await this.setState({
            randomedRoles: array,
        })
    }

    render() {
        const {randomRoles, showModalWindow, isReady, players, playerStatus, randomedRoles, indexArray, isDoctor, isDon, showError, errorText} = this.state;
        return (
            <div className="mafia">
                <svg onClick={()=>this.setState({showModalWindow: !showModalWindow})} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog"
                     className="svg-inline--fa fa-cog fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
                </svg>
                {
                    showModalWindow && (
                        <div className="modal-change">
                            <Link to="/" className="item">Мафия</Link>
                            <div className="separator"></div>
                            <Link to="/spy" className="item">Шпион</Link>
                        </div>
                    )
                }
                <div className="_container">
                    {
                        isReady ? (
                            <div className="mafia-card">
                                {
                                    playerStatus ? (
                                        <div className="player-role">
                                            <p className="player-number">Игрок номер {indexArray + 1}</p>
                                            <p className="player-role">{randomedRoles[indexArray]}</p>
                                            <button className="btn next-btn"
                                                    onClick={() => this.setState({
                                                        playerStatus: false,
                                                        indexArray: indexArray + 1
                                                    })}>Следующий
                                            </button>
                                        </div>
                                    ) : indexArray < players ? (
                                        <button onClick={() => this.setState({playerStatus: true})}
                                                className="btn">Выбор
                                            карты</button>) : (
                                        <div>
                                            <Link to={{pathname: "/game", propsRoles: randomedRoles}} className="btn">Начать
                                                игру</Link>
                                        </div>
                                    )
                                }

                            </div>
                        ) : (
                            <div className="mafia-card">
                                <div className="players-set">
                                    {showError &&
                                    <div className="error-modal">
                                        {errorText}
                                    </div>
                                    }
                                    <p className="title-player">Введите кол-во игроков</p>
                                    <input type="number" placeholder="Введите кол-во игроков" min="5" max="15"
                                           className="players-input"
                                           onChange={(e) => this.setState({players: e.target.value})}/>
                                    <button className="btn" onClick={this.createArrayWithRoles}>Начать</button>
                                    <div className="variants">
                                        <div className="checkbox-wrapper">
                                            <input onChange={(e) => this.setState({isDoctor: e.target.value})}
                                                   type="checkbox" id="checkbox-doc"/>
                                            <label className="label-ch" htmlFor="checkbox-doc">Доктор</label>
                                        </div>
                                        <div className="checkbox-wrapper">
                                            <input onChange={(e) => this.setState({isDon: e.target.value})}
                                                   type="checkbox" id="checkbox-don"/>
                                            <label className="label-ch" htmlFor="checkbox-don">Дон</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        )
    }
}