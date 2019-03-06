import { IVoice } from './interfaces/Voice';

export function createVoice(source: any, vca: any) {

    const voice: IVoice = {
        source,
        vca
    }

    return voice;
}