'use client'

import { Button } from "@/components/ui/button"
import { useLoginWithAbstract } from "@abstract-foundation/agw-react"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState } from "react"
import { useAccount, useDisconnect } from "wagmi"

const currencies = [
    { code: 'US/$', label: 'USD' },
    { code: 'EU/€', label: 'EUR' },
    { code: 'GB/£', label: 'GBP' },
    { code: 'JP/¥', label: 'JPY' },
    { code: 'CH/₣', label: 'CHF' },
]

const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'es', label: 'Español' },
]

export function Header() {
    const [currency, setCurrency] = useState('US/$')
    const [language, setLanguage] = useState('en')
    const { login } = useLoginWithAbstract()
    const { address, status } = useAccount()
    const { disconnect } = useDisconnect()

    return (
        <header className="bg-card text-card-foreground">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-4xl font-bold text-primary">
                        Ski Resort
                    </span>
                </div>

                {/* Right side controls */}
                <div className="flex items-center space-x-4">
                    {/* Currency & Language Selector */}
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <Button
                                variant="outline"
                                className="min-w-[80px]"
                            >
                                {currency}
                            </Button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="min-w-[200px] bg-card rounded-md p-2 shadow-lg border border-border"
                                align="end"
                            >
                                <div className="p-2">
                                    <div className="text-sm font-medium text-muted-foreground mb-2">
                                        Currency
                                    </div>
                                    {currencies.map((curr) => (
                                        <DropdownMenu.Item
                                            key={curr.code}
                                            className="outline-none select-none px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-accent"
                                            onSelect={() => setCurrency(curr.code)}
                                        >
                                            {curr.label} ({curr.code})
                                        </DropdownMenu.Item>
                                    ))}

                                    <div className="text-sm font-medium text-muted-foreground mb-2 mt-4">
                                        Language
                                    </div>
                                    {languages.map((lang) => (
                                        <DropdownMenu.Item
                                            key={lang.code}
                                            className="outline-none select-none px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-accent"
                                            onSelect={() => setLanguage(lang.code)}
                                        >
                                            {lang.label}
                                        </DropdownMenu.Item>
                                    ))}
                                </div>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>

                    {/* Wallet Connection */}
                    {status === "connected" ? (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <Button
                                    variant="outline"
                                    className="font-mono"
                                >
                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                </Button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    className="min-w-[200px] bg-card rounded-md p-2 shadow-lg border border-border"
                                    align="end"
                                >
                                    <div className="p-2">
                                        <div className="text-sm text-muted-foreground mb-2">
                                            Connected Wallet
                                        </div>
                                        <p className="text-sm font-mono mb-4">
                                            {address}
                                        </p>
                                        <DropdownMenu.Item
                                            className="outline-none select-none px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-accent text-destructive"
                                            onSelect={() => disconnect()}
                                        >
                                            Disconnect
                                        </DropdownMenu.Item>
                                    </div>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    ) : (
                        <Button
                            variant="default"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={login}
                        >
                            LOGIN
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}