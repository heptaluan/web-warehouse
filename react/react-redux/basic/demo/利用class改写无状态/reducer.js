export default (state, action) => {

    if (state == undefined) {
        state = {
            "v": 0,
            "a": 1,
            "b": 2
        }
    }

    switch(action.type) {
        case "ADD":
            return {...state, "v": state.v + 1}
            break;
        case "CUT":
            return {...state, "v": state.v - 1}
            break;
        case "ADDNUMBER":
            console.log(action.number)
            return {...state, "v": state.v + action.number}
            break;
    }

    return state;
}