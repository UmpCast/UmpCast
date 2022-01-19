import { createContext } from 'react'

import { AuthPhase } from '@/models/authentication'

import { EditContext, EditEvent, EditTypestate } from '@/machines/editMachine'
import React from 'react'
import { Interpreter } from 'xstate'

export const UpdateAuthContext = createContext<
    (phase: AuthPhase | undefined) => void
>(() => {})

export const SeasonStructContext = createContext<
    Interpreter<EditContext, any, EditEvent, EditTypestate>
>(null as any)
