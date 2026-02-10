'use client'
import {CategoryFilter} from "@/components/shared/context/CategoryFilter";
import React from "react";
import {SessionProvider} from "next-auth/react";

export default function Providers({children}: {children: React.ReactNode}) {
	return <SessionProvider><CategoryFilter>{children}</CategoryFilter></SessionProvider>
}