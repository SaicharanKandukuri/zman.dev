// https://codepen.io/jh3y/pen/LYNZwGm?editors=0010
"use client"
import { useState, useRef, useEffect, Fragment } from "react";
import gsap from 'gsap';
import './bear.css';
import {useTheme} from "next-themes";

const random = gsap.utils.random
const { set, to, timeline } = gsap

const armLimit = random(0,3)
const headLimit = random(armLimit + 1, armLimit + 3)
const angerLimit = random(headLimit+1, headLimit+3)
const armDuration = 0.2
const bearDuration = 0.25
const checkboxDuration = 0.25
const pawDuration = 0.1

const sounds = {} // can figure this out later yk.

export default function BearButton() {
    const [checked, setChecked] = useState<boolean>(false)
    const [count, setCount] = useState<number>(1)
    const bearRef = useRef(null)
    const swearRef = useRef(null)
    const armWrapRef = useRef(null)
    const pawRef = useRef(null)
    const armRef = useRef(null)
    const bgRef = useRef(null)
    const indicatorRef = useRef(null)
    const { theme, setTheme } = useTheme()

    const playFlashbang = () => {
        const audio = new Audio('/throwing-flashbang-sound-effect-cs-go.mp3');
        audio.play();
    };

    const onHover = () => {
        if (Math.random() > 0.5 && count > armLimit) {
            to(bearRef.current, bearDuration / 2, { y: '40%'} )
        }
    }

    const offHover = () => {
        if (!checked) {
            to(bearRef.current, bearDuration / 2, { y: '100%'})
        }
    }

    const onChange = () => {
        playFlashbang();
        if (checked) {
            console.log(checked)
            return
        }
        setChecked(true)
        setTimeout(() => {
            setTheme('light')
        }, 2200); // Delay matches the boom in the audio
    }

    useEffect(() => {
        const grabBearTL = () => {
            /**
             * Different height translations for the bear elements
             *
             * Paw will go to scaleX 0.8
             * Arm scaleX goes down to 0.7
             * Arm wrap translates to 50% or 50px
             * Bear goes 100% -> 40% -> 0
             */

            let bearTranslation
            if (count > armLimit && count < headLimit) {
                bearTranslation = '40%'
            } else if ( count >= headLimit ) {
                bearTranslation = '0%'
            }

            const onComplete = () => {
                setChecked(false)
                setCount(count + 1)
            }

            let onBearComplete = () => {}
            if (Math.random() > 0.5 && count > angerLimit) {
                onBearComplete = () => {
                    set(swearRef.current, { display: 'block' })
                }
            }

            const base = armDuration * 2 + pawDuration
            const preDelay = Math.random()
            const delay = count > armLimit ? base + bearDuration + preDelay : base
            const bearTL = timeline({ delay: Math.random(), onComplete })
            bearTL
                .add(
                    count > armLimit
                        ? to(bearRef.current, {
                            duration: bearDuration,
                            onComplete: onBearComplete,
                            y: bearTranslation,
                        })
                        : () => {}
                )
                .to(
                    armWrapRef.current,
                    { x: 50, duration: armDuration },
                    count > armLimit ? preDelay : 0
                )
                .to(armRef.current, { scaleX: 0.7, duration: armDuration })
                .to(pawRef.current, {
                    duration: pawDuration,
                    scaleX: 0.8,
                })
                .to(
                    bgRef.current,
                    {
                        onStart: () => {
                            console.log("Checked")
                            setTheme('dark')
                        },
                        duration: checkboxDuration,
                        backgroundColor: '#aaa',
                    },
                    delay
                )
                .to(
                    indicatorRef.current,
                    { duration: checkboxDuration, x: '0%' },
                    delay
                )
                .to(pawRef.current, { duration: pawDuration, scaleX: 0 }, delay)
                .to(
                    armRef.current,
                    { duration: pawDuration, scaleX: 1 },
                    delay + pawDuration
                )
                .to(
                    armWrapRef.current,
                    { duration: armDuration, x: 0 },
                    delay + pawDuration
                )
                .to(
                    bearRef.current,
                    { duration: bearDuration, y: '100%' },
                    delay + pawDuration
                )
            return bearTL
        }
        const showTimeLine = () => {
            timeline({
                onStart: () => {},
            }).to(
                bgRef.current,
                { duration: checkboxDuration, backgroundColor: '#2eec71' },
                0
            )
                .to(indicatorRef.current, { duration: checkboxDuration, x: '100%' }, 0)
                .add(grabBearTL(), checkboxDuration)
        }
        if (checked) showTimeLine()
    }, [checked, count]);

    return (
        <Fragment>
            <div className="bear__wrap">
                <div ref={swearRef} className="bear__swear">
                    mf, stop
                </div>
                <svg
                    ref={bearRef}
                    className="bear"
                    viewBox="0 0 284.94574 359.73706"
                    preserveAspectRatio="xMinYMin">
                    <g id="layer1" transform="translate(-7.5271369,-761.38595)">
                        <g
                            id="g5691"
                            transform="matrix(1.2335313,0,0,1.2335313,-35.029693,-212.83637)">
                            <path
                                id="path4372"
                                d="M 263.90933,1081.4151 A 113.96792,96.862576 0 0 0 149.99132,985.71456 113.96792,96.862576 0 0 0 36.090664,1081.4151 l 227.818666,0 z"
                                style={{ fill: '#784421', fillOpacity: 1 }}
                            />
                            <path
                                id="path5634"
                                d="m 250.42825,903.36218 c 2e-5,66.27108 -44.75411,114.99442 -102.42825,114.99442 -57.674143,0 -98.428271,-48.72334 -98.428251,-114.99442 4e-6,-66.27106 40.754125,-92.99437 98.428251,-92.99437 57.67413,0 102.42825,26.72331 102.42825,92.99437 z"
                                style={{ fill: '#784421', fillOpacity: 1 }}
                            />
                            <path
                                id="path5639"
                                d="m 217,972.86218 c 2e-5,21.53911 -30.44462,42.00002 -68,42.00002 -37.55538,0 -66.000019,-20.46091 -66,-42.00002 0,-21.53911 28.44464,-36 66,-36 37.55536,0 68,14.46089 68,36 z"
                                style={{ fill: '#e9c6af', fillOpacity: 1 }}
                            />
                            <path
                                id="path5636"
                                d="m 181.5,944.36218 c 0,8.28427 -20.59974,26.5 -32.75,26.5 -12.15026,0 -34.75,-18.21573 -34.75,-26.5 0,-8.28427 22.59974,-13.5 34.75,-13.5 12.15026,0 32.75,5.21573 32.75,13.5 z"
                                style={{ fill: '#000000', fillOpacity: 1 }}
                            />
                            <g id="g5681">
                                <ellipse
                                    style={{ fill: '#784421', fillOpacity: 1 }}
                                    id="path5657"
                                    cx="69"
                                    cy="823.07269"
                                    rx="34.5"
                                    ry="33.289474"
                                />
                                <path
                                    style={{ fill: '#e9c6af', fillOpacity: 1 }}
                                    d="M 69,47.310547 A 24.25,23.399124 0 0 0 44.75,70.710938 24.25,23.399124 0 0 0 64.720703,93.720703 c 0.276316,-0.40734 0.503874,-0.867778 0.787109,-1.267578 1.70087,-2.400855 3.527087,-4.666237 5.470704,-6.798828 1.943616,-2.132591 4.004963,-4.133318 6.179687,-6.003906 2.174725,-1.870589 4.461274,-3.611714 6.855469,-5.226563 2.394195,-1.614848 4.896019,-3.10338 7.498047,-4.46875 0.539935,-0.283322 1.133058,-0.500695 1.68164,-0.773437 A 24.25,23.399124 0 0 0 69,47.310547 Z"
                                    id="ellipse5659"
                                    transform="translate(0,752.36216)"
                                />
                            </g>
                            <g transform="matrix(-1,0,0,1,300,0)" id="g5685">
                                <ellipse
                                    ry="33.289474"
                                    rx="34.5"
                                    cy="823.07269"
                                    cx="69"
                                    id="ellipse5687"
                                    style={{ fill: '#784421', fillOpacity: 1 }}
                                />
                                <path
                                    transform="translate(0,752.36216)"
                                    id="path5689"
                                    d="M 69,47.310547 A 24.25,23.399124 0 0 0 44.75,70.710938 24.25,23.399124 0 0 0 64.720703,93.720703 c 0.276316,-0.40734 0.503874,-0.867778 0.787109,-1.267578 1.70087,-2.400855 3.527087,-4.666237 5.470704,-6.798828 1.943616,-2.132591 4.004963,-4.133318 6.179687,-6.003906 2.174725,-1.870589 4.461274,-3.611714 6.855469,-5.226563 2.394195,-1.614848 4.896019,-3.10338 7.498047,-4.46875 0.539935,-0.283322 1.133058,-0.500695 1.68164,-0.773437 A 24.25,23.399124 0 0 0 69,47.310547 Z"
                                    style={{ fill: '#e9c6af', fillOpacity: 1 }}
                                />
                            </g>
                            <ellipse
                                ry="9.6790915"
                                rx="9.2701159"
                                cy="900.38916"
                                cx="105.83063"
                                id="path4368"
                                style={{ fill: '#000000', fillOpacity: 1 }}
                            />
                            <ellipse
                                style={{ fill: '#000000', fillOpacity: 1 }}
                                id="ellipse4370"
                                cx="186.89894"
                                cy="900.38916"
                                rx="9.2701159"
                                ry="9.6790915"
                            />
                            {count >= angerLimit && (
                                <Fragment>
                                    <path
                                        id="path4396"
                                        d="m 92.05833,865.4614 39.42665,22.76299"
                                        style={{
                                            stroke: '#000000',
                                            strokeWidth: 4.86408424,
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round',
                                            strokeMiterlimit: 4,
                                            strokeOpacity: 1,
                                        }}
                                    />
                                    <path
                                        style={{
                                            stroke: '#000000',
                                            strokeWidth: 4.86408424,
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round',
                                            strokeMiterlimit: 4,
                                            strokeOpacity: 1,
                                        }}
                                        d="m 202.82482,865.4614 -39.42664,22.76299"
                                        id="path4400"
                                    />
                                </Fragment>
                            )}
                        </g>
                    </g>
                </svg>
            </div>
            <div ref={armWrapRef} className="bear__arm-wrap">
                <svg
                    ref={armRef}
                    className="bear__arm"
                    viewBox="0 0 250.00001 99.999997"
                    preserveAspectRatio="xMinYMin">
                    <g transform="translate(868.57141,-900.93359)" id="layer1">
                        <path
                            style={{ fill: '#784421', fillOpacity: 1 }}
                            d="m -619.43416,945.05124 c 4.18776,73.01076 -78.25474,53.24342 -150.21568,52.94118 -82.38711,-0.34602 -98.92158,-19.44459 -98.92157,-47.05883 0,-27.61424 4.78794,-42.54902 73.82353,-42.54902 69.03559,0 171.43607,-30.93764 175.31372,36.66667 z"
                            id="path4971"
                        />
                        <ellipse
                            style={{ fill: '#e9c6af', fillOpacity: 1 }}
                            id="path4974"
                            cx="-683.02264"
                            cy="950.98572"
                            rx="29.910826"
                            ry="29.414362"
                        />
                    </g>
                </svg>
            </div>
            <div ref={pawRef} className="bear__paw" />
            <div className="fixed top-[80%] bottom-0 left-0 right-0 bg-background" />
            <div className="checkbox" onMouseOver={onHover} onMouseOut={offHover}>
                <input type="checkbox" onChange={onChange} checked={checked} />
                <div ref={bgRef} className="checkbox__bg" />
                <div ref={indicatorRef} className="checkbox__indicator" />
            </div>
        </Fragment>
    )
}
