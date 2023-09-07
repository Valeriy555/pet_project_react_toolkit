import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services";


const initialState = {
    users: [],
    userForUpdate: null,
    loading: false,
    error: null,
};

const getAllFromUserSlice = createAsyncThunk( // асинхронный метод
    'userSlice/getAll',
    async (_, thunkAPI) => {
        try {
            const {data} = await userService.getAll();
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const createInUserSlice = createAsyncThunk(
    'userSlice/create',
    async ({user}, thunkAPI) => {
        try {
            const {data} = await userService.create(user);
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const updateInUserSlice = createAsyncThunk(
    'userSlice/updateById',
    async ({_id, user}, thunkAPI) => {
        try {
            const {data} = await userService.updateById(_id, user);
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const deleteFromUserSlice = createAsyncThunk(
    'userSlice/deleteById',
    async ({_id}, thunkAPI) => {
        try {
            await userService.deleteById(_id);
            return _id
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: { // для синхронных действий
        setUserForUpdate: (state, action) => {
            state.userForUpdate = action.payload
        }
    },
    extraReducers: builder => // для асинхронных действий
        builder
            .addCase(getAllFromUserSlice.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllFromUserSlice.fulfilled, (state, action) => {
                state.users = action.payload
                state.loading = false
            })

            .addCase(createInUserSlice.fulfilled, (state, action) => {
                state.users.push(action.payload)

            })
            .addCase(updateInUserSlice.fulfilled, (state, action) => {
                const findUser = state.users.find(value => value._id === action.payload._id);
                Object.assign(findUser, action.payload);
                state.userForUpdate = null; // сбрасывает значение
            })
            .addCase(deleteFromUserSlice.fulfilled, (state, action) => {
                const userIndex = state.users.findIndex(value => value._id === action.payload);
                state.users.splice(userIndex, 1);
            })
            .addDefaultCase((state, action) => {
                const [pathElement] = action.type.split('/').splice(-1);
                if (pathElement === 'rejected') {
                    state.error = action.payload;
                    state.loading = false;
                }

            })
});

const {reducer: userReducer, actions: {setUserForUpdate}} = userSlice;

const userActions = {
    getAllFromUserSlice,
    createInUserSlice,
    deleteFromUserSlice,
    updateInUserSlice,
    setUserForUpdate
}


export {
    userReducer,
    userActions
}