'use client'

import React from "react";
import Confetti from "react-confetti";
import dynamic from 'next/dynamic'
import useWindowSize from 'react-use/lib/useWindowSize';

const Die = dynamic(() => import('@/components/Die'), { ssr: false })

export default function Home() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const {width, height} = useWindowSize();

    React.useEffect(() => {
        const firstValue = dice[0].value;
        const allHeld = dice.every(die => die.held);
        const allSameNumber = dice.every(die => die.value === firstValue);
        if (allHeld && allSameNumber) {
            setTenzies(true);
        }
    }, [dice]);

    function randomDieValue() {
        return Math.ceil(Math.random() * 6);
    }

    function allNewDice() {
        const newArray = [];
        for (let i = 0; i < 10; i++) {
            const newDie = {
                value: randomDieValue(),
                held: false,
                id: i + 1,
            };
            newArray.push(newDie);
        }
        return newArray;
    }

    function rollUnheldDice() {
        if (!tenzies) {
            setDice((oldDice) => oldDice.map((die, i) =>
                die.held ?
                    die :
                    {value: randomDieValue(), held: false, id: i + 1},
            ));
        } else {
            setDice(allNewDice());
            setTenzies(false);
        }
    }

    function holdDice(id: number) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ?
                {...die, held: !die.held} :
                die;
        }));
    }

    const diceElements = dice.map((die) => (
        <Die key={die.id} {...die}
             holdHandler={() => holdDice(die.id)} />
    ));

    return (
        <main>
            {tenzies && <Confetti width={width}
                                  height={height} />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">{diceElements}</div>
            <button className="roll-dice"
                    onClick={rollUnheldDice}>
                {tenzies ? "Reset Game" : "Roll"}
            </button>
        </main>
    );
}
