import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {inspectionStageService} from "../../services";

const initialState = {
    stages: [],
    stageForUpdate: null,
    loading: false,
    error: null,
};

const getAllFromStageSlice = createAsyncThunk( // асинхронный метод
    'StageSlice/getAll',
    async (_, {rejectWithValue,}) => {
        try {
            const {data} = await inspectionStageService.getAll();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const stageSlice = createSlice({
    name: 'stageSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllFromStageSlice.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllFromStageSlice.fulfilled,(state, action)=>{
                state.stages = action.payload
                state.loading =false
            })

            .addDefaultCase((state, action) => {
                const [pathElement] = action.type.split('/').splice(-1);
                if (pathElement === 'rejected') {
                    state.error = action.payload;
                    state.loading = false;
                }

            })
});

const {reducer: stageReducer, actions: {}} = stageSlice;

const stageActions = {
    getAllFromStageSlice
};

export {
    stageReducer,
    stageActions
}