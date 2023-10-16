import useAppStore from './useAppStore';
import userSlice from '@/redux/reducer/user';

const useAppSlice = () => ({ user: useAppStore(userSlice.name) });
export default useAppSlice;
