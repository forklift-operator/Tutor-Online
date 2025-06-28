import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
    onDelete: (id: string) => Promise<void>,
    userId: string,
    className?: string
}

export function UserCardActionsDropdown({userId, onDelete, className} :Props) {
  return (
    <div className={`flex ${className}`}>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-transparent p-0 min-w-0" align="start">
        <DropdownMenuGroup className="bg-transparent p-0 ">
          <DropdownMenuItem className="p-0 px-0 mb-1">
            <Button onClick={() => onDelete(userId)} variant={'destructive'} className="w-full">Delete</Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0 px-0">
            <Button className="w-full">Edit</Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
