// export const Add = () => ({ "type": "ADD" })
// export const Cut = () => ({ "type": "CUT" })

// 如果不写 return，可以使用 () 来替代
export const Add = () => { return { "type": "ADD" }}
export const Cut = () => { return { "type": "CUT" }}
export const addNumber = (number) => { return { "type": "ADDNUMBER", number }}