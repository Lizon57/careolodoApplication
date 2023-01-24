import { devicesMinWidth } from "../media-queries/devices"

export const appGridMixin = () => {
    return `
        display: grid;
        grid-template-columns: minmax(5px, 1fr) minmax(auto, 1400px) minmax(5px, 1fr);
        
        @media ${devicesMinWidth.mobile} {
            grid-template-columns: minmax(15px, 1fr) minmax(auto, 1400px) minmax(15px, 1fr);
        }
    `
}