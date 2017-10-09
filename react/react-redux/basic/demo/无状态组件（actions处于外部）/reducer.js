export default (state, action) => {

    if (state == undefined) {
        state = {
            "v": 0,
            "a": 1,
            "b": 2
        }
    }

    if (action.type == "ADD") {
        return {"v": state.v + 1}
    } else if (action.type == "CUT") {
        return {"v": state.v - 1}
    }

    return state;
}