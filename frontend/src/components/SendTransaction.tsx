'use client'

import { useGlobalWalletSignerClient } from "@abstract-foundation/agw-react"
import { useState } from "react"
import { parseEther } from "viem"
import { useAccount } from "wagmi"

export function SendTransaction() {
    const { data: client } = useGlobalWalletSignerClient()
    const { status } = useAccount()
    const [isLoading, setIsLoading] = useState(false)

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

    async function purchasePass() {
        if (!client || !contractAddress) return

        setIsLoading(true)
        try {
            const hash = await client.sendTransaction({
                to: contractAddress,
                // Convert ETH value to wei using parseEther
                value: parseEther("0.01"),
            })
            console.log("Transaction sent:", hash)
        } catch (error) {
            console.error("Transaction failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={purchasePass}
            disabled={isLoading || status !== "connected"}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
            {isLoading ? "Processing..." : "Purchase Pass"}
        </button>
    )
}