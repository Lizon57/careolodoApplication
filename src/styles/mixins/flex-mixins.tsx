export const flexColumnMixin = (gap?: string) => {
    return `
        display: flex;
        flex-direction: column;
        ${gap ? `gap: ${gap};` : ''}
        `
}

export const flexColumnCenterMixin = (gap?: string) => {
    return `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        ${gap ? `gap: ${gap};` : ''}
    `
}

export const flexAlignCenterMixin = (gap?: string) => {
    return `
        display: flex;
        align-items: center;
        ${gap ? `gap: ${gap};` : ''}
    `
}

export const flexCenterizeMixin = () => {
    return `
        display: flex;
        justify-content: center;
        align-items: center;
    `
}