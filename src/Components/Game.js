import React, {useState, useEffect} from "react";
import $ from "jquery";
import Player from "./Player";
import MafiaMusic from "../assets /mafia.mp3";

export default function Game(propsRoles) {
    const [role, setRole] = useState(propsRoles.location.propsRoles);
    const [nightKill, setNightKill] = useState(0);
    const [nightHeal, setNightHeal] = useState(0);
    const [nightCheck, setNightCheck] = useState(0);
    const [nights, setNights] = useState([]);
    const [isShowNight, setShowNight] = useState(false);
    const [timer, setTimer] = useState(60);
    const [stage, setStage] = useState("mafia");
    const [gameStart, setGameStart] = useState(false);

    $(document).ready(function () {
        $('.add-night').click(function () {
            $('.mafia').addClass('mafia-invis');
        })
        $('.fa-times-night').click(function () {
            $('.mafia').removeClass('mafia-invis');
        })
    })
    useEffect(() => {

        if (timer === -5 && stage === "sheriff") {
            setStage("Game");
            setGameStart(true)
        }
        if (timer === -7 && stage !== "sheriff") {
            setStage("sheriff");
            setTimer(20);
            // document.getElementsByTagName("audio")[0].pause();

        }
    }, [timer])

    useEffect(() => {
        // document.getElementsByTagName("audio")[0].play();

        let timerInterval = setInterval(() => {
            setTimer(prevState => prevState - 1);
        }, 1000)
        if (role !== undefined) {
            localStorage.setItem("roles", JSON.stringify(role));
        }
    }, [])

    function renderSelect(arr) {
        if (role === undefined) {
            let localRoles = localStorage.getItem("roles");
            if (localRoles == undefined) {
                window.location.href = window.location.href.slice(0, -4).concat('error');
            } else {
                arr = JSON.parse(localRoles);
            }
        }
        if (arr === undefined) {
            window.location.href = window.location.href.slice(0, -4).concat('error');
        }
        return arr.map((item, index) => {
            return (
                <option key={index} value={index + 1}>{index + 1}</option>
            )
        })
    }

    function renderFields(arr) {

        if (role === undefined) {
            let localRoles = localStorage.getItem("roles");
            if (localRoles == undefined) {
                window.location.href = window.location.href.slice(0, -4).concat('error');
            } else {
                arr = JSON.parse(localRoles);

            }
        }
        if (arr === undefined) {
            window.location.href = window.location.href.slice(0, -4).concat('error');
        }
        return arr.map((item, index) => {
            return (
                <Player key={index} id={index + 1} role={item}/>
            )
        })
    }

    function setNight() {
        setNights([
            `Стреляли в: ${nightKill}`,
            `Лечили: ${nightHeal}`,
            `Проверяли: ${nightCheck}`,
        ]);
        if (nightKill != nightHeal) {
            let dead = $('.game-role')[nightKill - 1];
            // console.log($('.game-role')[nightKill-1]);
            $(dead).addClass('text-dec-lth');
        }
        setShowNight(true);
        
    }

    function endGame() {
        localStorage.setItem("roles", undefined);
        window.location.href = window.location.href.slice(0, -4);
    }

    function setNext() {
        if (stage === "mafia") {
            setStage("sheriff");
            setTimer(20);
        } else if (stage === "sheriff") {
            setStage("Game");
            setGameStart(true)
        }
    }

    return (
        <div className="mafia">
            {
                !gameStart ? (
                        <div className="modal-start-game">

                            <p className="title dark">{stage === "mafia" ? 'Договорка мафии' : stage === "sheriff" ? "Знакомство с шерифом" : stage === "Game" ? "" : ""}</p>

                            <div className="timer title dark">
                                {
                                    timer >= 0 ? timer < 10 ? `0:0${timer}` : `0:${timer}` : "Время вышло"
                                }
                            </div>

                            <button onClick={setNext} className="btn">
                                Далее
                            </button>

                        </div>
                    ) :


                    <div className="_container">
                        <div className="mafia-wrapper">
                            <p className="title">Игроки:</p>
                            {renderFields(role)}
                        </div>
                        <div className="nights">
                            <p className="title">Ночь:</p>
                            <p className="subtitle">Мафия стреляла в игрока</p>
                            <select onChange={(e) => setNightKill(e.target.value)} className="select-night" name=""
                                    id="">
                                <option value="none" defaultValue disabled>Выбери игрока</option>
                                {renderSelect(role)}
                            </select>
                            <p className="subtitle">Доктор лечил игрока:</p>
                            <select onChange={(e) => setNightHeal(e.target.value)} className="select-night" name=""
                                    id="">
                                <option value="none" defaultValue disabled>Выбери игрока</option>
                                {renderSelect(role)}
                            </select>
                            <p className="subtitle">Шериф проверил игрока:</p>
                            <select onChange={(e) => setNightCheck(e.target.value)} className="select-night" name=""
                                    id="">
                                <option value="none" defaultValue disabled>Выбери игрока</option>
                                {renderSelect(role)}
                            </select>
                            <button className="btn add-night" onClick={setNight}>Записать</button>
                            <button className="btn add-night mt-20" onClick={endGame}>Закончить игру</button>
                            {isShowNight &&
                            <div className="night-accidents">
                                <svg onClick={() => setShowNight(false)} aria-hidden="true" focusable="false"
                                     data-prefix="fas"
                                     data-icon="times"
                                     className="svg-inline--fa fa-times fa-times-night fa-w-11" role="img"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 352 512">
                                    <path fill="currentColor"
                                          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                </svg>
                                {/*<p className="night-accidents-label">Killed Healed Checked</p>*/}
                                <p className="night-title">Ночью:</p>
                                <p className="night-accidents-label">{nights[0]}</p>
                                <p className="night-accidents-label">{nights[1]}</p>
                                <p className="night-accidents-label">{nights[2]}</p>
                            </div>
                            }
                        </div>
                    </div>
            }
        </div>

    )
}