import { useSearchParams } from 'next/navigation';

export default function useTokenUri() {
    const searchParams = useSearchParams();
    return searchParams.get('tokenURI');
};
