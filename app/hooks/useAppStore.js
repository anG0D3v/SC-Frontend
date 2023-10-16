import { useSelector } from 'react-redux';
import { globalSelector } from '../utils/utils';

export default function useAppStore(selector) {
    const appSelector = useSelector(globalSelector(selector));
    return appSelector;
}