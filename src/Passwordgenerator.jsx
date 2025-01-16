import React, { useCallback, useEffect, useState } from "react";
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from "@/hooks/use-toast"




const Passwordgenerator = () => {

    const [Length, setLength] = useState(8);
    const [includeNumber, setNumber] = useState(false);
    const [includeSymbol, setSymbol] = useState(false);
    const [password, setPassword] = useState('');

    const generatePassword = useCallback(() => {
        {
            let password = '';
            let Letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const Numbers = '0123456789';
            const Symbols = '~!@#$%^&*()<>:';

            if (includeNumber) Letters += Numbers;
            if (includeSymbol) Letters += Symbols;

            for (let i = 0; i < Length; i++) {
                const randomIndex = Math.floor(Math.random() * Letters.length);

                password += Letters.charAt(randomIndex);
            }

            setPassword(password);
        }
    }, [Length, includeNumber, includeSymbol])

    const { toast } = useToast()

    const copyPasswordtoClipboard = () => {
        window.navigator.clipboard.writeText(password);
        toast({title: "Copied!", description: "Password Copied to Clipboard!"})
    }

    useEffect(() => {
        generatePassword(password)
    }, [Length, includeNumber, includeSymbol, setPassword]);

    return (
        <div style={{ fontFamily: 'monospace' }} className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Password Generator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Generated Password Display */}
                    <div className="space-y-2">
                        <Label htmlFor="generated-password">Generated Password</Label>
                        <div className="relative flex items-center">
                            <Input
                                value={password}
                                id="generated-password"
                                placeholder="Your generated password"
                                className="pr-12"
                                readOnly />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute right-1 p-0 h-8 w-8 hover:bg-gray-100"
                                            onClick={copyPasswordtoClipboard}
                                            >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Copy to Clipboard</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Password Length</Label>
                            <span className="text-sm font-medium">{Length} characters</span>
                        </div>
                        <Slider
                            className="w-full cursor-pointer" valu={[Length]} defaultValue={[8]} max={48} onValueChange={(val) => setLength(val[0])} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="numbers-toggle" className="cursor-pointer">
                                Include Numbers
                            </Label>
                            <Switch id="numbers-toggle" checked={includeNumber} onCheckedChange={() => setNumber((prev) => !prev)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label className="cursor-pointer">
                                Include Symbols
                            </Label>
                            <Switch defaultChecked={includeSymbol} onCheckedChange={() => { setSymbol((prev) => !prev) }} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


export default Passwordgenerator;