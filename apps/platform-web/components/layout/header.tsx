import Link from "next/link";
import { Button } from "../ui/button";
import ToggleTheme from "../ui/theme-toggle";

interface HeaderProps {
  aside: React.ReactNode;
};

export function Header({ aside }: HeaderProps) {
    return (
        <div className="flex justify-between p-2">
            <div>
                {aside}
            </div>
            <div className="flex items-center gap-3">
                <ToggleTheme />
            </div>
        </div>
    )
}