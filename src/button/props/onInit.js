/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import type { XProps } from './types';

export type XOnInitDataType = {|
    
|};

export type XOnInitActionsType = {|
    enable : () => ZalgoPromise<void>,
    disable : () => ZalgoPromise<void>
|};

export type XOnInit = (XOnInitDataType, XOnInitActionsType) => ZalgoPromise<void>;

export function buildXOnInitData() : XOnInitDataType {
    // $FlowFixMe
    return {};
}

export function buildXOnInitActions(set : (boolean) => void) : XOnInitActionsType {
    return {
        enable:  () => ZalgoPromise.try(() => set(true)),
        disable: () => ZalgoPromise.try(() => set(false))
    };
}

export type OnInit = () => {|
    initPromise : ZalgoPromise<void>,
    isEnabled : () => boolean
|};

export function getOnInit(xprops : XProps) : OnInit {
    const { onInit } = xprops;

    return () => {
        let enabled = true;

        const initPromise = ZalgoPromise.try(() => {
            if (onInit) {
                return onInit(buildXOnInitData(), buildXOnInitActions(val => {
                    enabled = val;
                }));
            }
        });

        return {
            initPromise,
            isEnabled: () => enabled
        };
    };
}
