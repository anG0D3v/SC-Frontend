import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function useAppRouter() {
    const router = useRouter();

    const pushRoute = useCallback((route, asRoute = route) => {
        router.push(route, asRoute);
    }, []);
    
    return { ...router, push: pushRoute };
}