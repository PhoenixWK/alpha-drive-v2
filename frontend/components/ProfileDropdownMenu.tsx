
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ProfileDropdownMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="xl:py-10" asChild>
                <Button
                    variant="ghost" 
                    className="bg-transparent flex flex-row items-center justify-center gap-4 xl:border-2 border-[#EAEAEA] dark:border-[#364670] dark:hover:bg-[#364670] dark:hover:border-[#364670]"
                >
                    <Avatar className="w-10 h-10 xl:w-14 xl:h-14">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ul className="hidden xl:flex flex-col items-start justify-start gap-1">
                        <li>
                            <p className="text-lg font-semibold text-[#435179] dark:text-white">John Doe</p>
                        </li>
                        <li>
                            <p className="text-lg text-[#BBBBC1]">john.doe@example.com</p>
                        </li>
                    </ul>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 py-2 mr-5 cursor-pointer dark:bg-transparent">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-lg font-semibold text-[#435179] dark:text-white dark:hover:bg-[#364670]">
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-lg font-semibold text-[#435179] dark:text-white dark:hover:bg-[#364670]">
                        Upgrade              
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-lg font-semibold text-[#435179] dark:text-white dark:hover:bg-[#364670]">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}