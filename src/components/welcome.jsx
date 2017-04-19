import React, { Component } from 'react';
import { compose, withHandlers, withState, withProps } from 'recompose';

const Header = ({ counter, name, increment, vis, isVisible, display }) => {
    return (<div>
        <h2 > Pollar quest {counter}{display.display} </h2>
        <h1 style={display}> Welcome Here - {isVisible.toString()}</h1>
        <button onClick={increment} > add </button>
        <button onClick={vis} > show </button>
    </div>
    )
}

const Hoc = (ComponentRender) => {
    return class ready extends Component {
        render() {
            return (
                <div>
                        <h1> Tutorial </h1>
                    <ComponentRender />
                </div>
            );
        }
    }
};

export default compose(
    Hoc,
    withState('counter', 'setCounter', 1),
    withState('isVisible', 'setvisibility', true),
    withState('display', 'setdisplay', true),

    withHandlers({
        decrement: ({ setCounter }) => () => setCounter(n => n - 1),
        reset: ({ setCounter }) => () => setCounter(0),
        vis: ({ setvisibility }) => () => setvisibility(n => !n),
        increment: ({ setCounter }) => () => setCounter(n => n + 1),

    }),
    withProps(({ isVisible }) => {
        return {
            display: isVisible ?  { display: 'block' } : { display: 'none' },
        }
    }),
    
)(Header);