import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from '../redux/questionsSlice'
const store=configureStore({
    reducer:{
        qpoolData:questionsSlice
    }
})

export default store