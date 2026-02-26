
'use client';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback, useRef } from 'react';

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Initialize from URL
    const query = searchParams.get('topic') || '';
    const [searchQuery, setSearchQuery] = useState(query);
    
    // Use ref to track if this is the first render
    const isFirstRender = useRef(true);
    
    // Debounce function
    useEffect(() => {
        // Skip on first render to avoid unnecessary update
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        
        // Debounce: wait 500ms after user stops typing
        const timer = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });
                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });
                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500); // 500ms debounce
        
        return () => clearTimeout(timer);
    }, [searchQuery, pathname]); // Removed router and searchParams from deps

    return (
        <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
            <Image src="/icons/search.svg" alt='search' width={15} height={15} />
            <input 
                type="text" 
                placeholder='Search Companions...' 
                className='outline-none' 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
        </div>
    );
}

export default SearchInput;