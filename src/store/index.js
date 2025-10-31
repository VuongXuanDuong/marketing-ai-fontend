import { createStore } from 'vuex';
import b2b from './modules/b2b';
import b2c from './modules/b2c';

export default createStore({
    modules: {
        b2b,
        b2c
    }
});