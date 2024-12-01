import { createEntityAdapter } from "@reduxjs/toolkit"

const postAdapter = createEntityAdapter({
    sortComparer : (a, b) => b.date.localeCompare(a.date)
})

const initialState = postAdapter.getInitialState( )