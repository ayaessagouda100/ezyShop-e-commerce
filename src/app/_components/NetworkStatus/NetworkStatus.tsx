"use client";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function NetworkStatus() {
    useEffect(() => {
        function handleOnline() {
            toast.success("Connected to the internet!", { duration: 3000 });
        }

        function handleOffline() {
            toast.error("No internet connection!", { duration: 3000 });
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return null;
}
