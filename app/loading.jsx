'use client'
import { Triangle } from 'react-loader-spinner';
import { COLORS } from './utils/constants';

export default function Loading() {
    return <div className="flex flex-1 justify-center items-center h-screen">
        <Triangle
            height="80"
            width="80"
            color={COLORS.PRIMARY_COLOR_900}
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    </div>
 }