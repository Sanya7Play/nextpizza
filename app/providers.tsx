import {CategoryFilter} from "@/components/shared/context/CategoryFilter";
import React from "react";

export default function Providers({children}: {children: React.ReactNode}) {
	return <CategoryFilter>{children}</CategoryFilter>
}