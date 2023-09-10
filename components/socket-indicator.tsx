"use client"

import { useSocket } from "@/components/providers/socket-provider"
import { Badge } from "@/components/ui/badge"

export const SocketIndicator = () => {
    const { isConnected } = useSocket();
    if (!isConnected) {
    return (
        <div className="flex items-center">
            <Badge
                className="bg-yellow-600 text-white border-none"
                variant="outline"
            
            >
            Fallback: Polling every 1s
            </Badge>
        </div>
    )}

    return (
        <div className="flex items-center">
        <Badge
            className="bg-emerald-600 text-white border-none"
            variant="outline"
        
        >
       Live real-time updates
        </Badge>
    </div>
    )

}