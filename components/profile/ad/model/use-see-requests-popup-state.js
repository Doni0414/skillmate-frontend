import { useState } from "react";
import { useEffect } from "react";

export function useSeeRequestsPopupState() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return {mounted};
}