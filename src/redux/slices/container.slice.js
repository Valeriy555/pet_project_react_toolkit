import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {containerService} from "../../services";


const initialState = {
    containers: [],
    containerForUpdate: null,
    loading: false,
    error: null,

};

const getAllFromContainerSlice = createAsyncThunk(
    'containerSlice/getAll',
    async (_, {rejectWithValue,}) => {
        try {
            const {data} = await containerService.getAll();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const createInContainerSlice = createAsyncThunk(
    'containerSlice/create',
    async ({container},{rejectWithValue})=>{
        try {
            const {data} = await containerService.create(container);
            return data;

        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateInContainerSlice = createAsyncThunk(
    'containerSlice/updateById',
    async ({_id, container}, {rejectWithValue}) => {
        try {
            const {data} = await containerService.updateById(_id, container);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteFromContainerSlice = createAsyncThunk(
    'containerSlice/deleteById',
    async ({_id}, {rejectWithValue}) => {
        try {
            await containerService.deleteById(_id);
            return _id
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const containerSlice = createSlice({
    name: 'containerSlice',
    initialState,
    reducers: {
        setContainerForUpdate: (state, action) => {
            state.containerForUpdate = action.payload
        }
    },

    extraReducers: builder =>
        builder
            .addCase(getAllFromContainerSlice.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllFromContainerSlice.fulfilled, (state, action) => {
                state.containers = action.payload
                state.loading = false
            })

            .addCase(createInContainerSlice.fulfilled,(state, action)=>{
                state.containers.push(action.payload)
            })
            .addCase(updateInContainerSlice.fulfilled, (state, action)=>{
                const findContainer = state.containers.find(value => value._id === action.payload._id);
                Object.assign(findContainer, action.payload);
                state.containerForUpdate = null;
            })
            .addCase(deleteFromContainerSlice.fulfilled, (state, action) => {
                const containerIndex = state.containers.findIndex(value => value._id === action.payload);
                state.containers.splice(containerIndex, 1);
            })
            .addDefaultCase((state, action) => {
                const [pathElement] = action.type.split('/').splice(-1);
                if (pathElement === 'rejected') {
                    state.error = action.payload;
                    state.loading = false;
                }

            })

});

const {reducer: containerReducer, actions: {setContainerForUpdate}} = containerSlice;

const containerActions = {
    getAllFromContainerSlice,
    createInContainerSlice,
    updateInContainerSlice,
    deleteFromContainerSlice,
    setContainerForUpdate
}

export {
    containerReducer,
    containerActions
}