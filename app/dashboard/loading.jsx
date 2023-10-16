'use client'
import { Triangle } from 'react-loader-spinner';
import { CustomLabel } from '../components';
import { COLORS } from '../utils/constants';

export default function Loading() {
    return <div className="flex flex-1 flex-col justify-center items-center h-[82.5vh]">
        <Triangle
            height="80"
            width="80"
            color={COLORS.PRIMARY_COLOR_900}
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
        <CustomLabel children='Loading...' />
    </div>
}