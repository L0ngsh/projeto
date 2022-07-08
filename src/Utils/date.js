export const dateParser = (isoDate) => {
    const date = new Date(isoDate);
    
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}