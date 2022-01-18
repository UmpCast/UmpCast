import React from 'react'
import { State, Interpreter, EventObject } from 'xstate'

export const createMachineContext = <TContext, TEvent extends EventObject>() =>
    React.createContext<
        [
            State<TContext, TEvent>,
            Interpreter<TContext, any, TEvent>['send'],
            Interpreter<TContext, any, TEvent>
        ]
    >(null as any)
