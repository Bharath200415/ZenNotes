import propTypes from "prop-types";
import {Plus} from "lucide-react";
import { Button } from "@/components/ui/button"

function EmptyState ({message,buttonText}){
  return (
    <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
            <p className="text-muted-foreground mb-4">{message}</p>
            <Button>
                <Plus className="h-4 w-4 mr-2"/>{buttonText}
            </Button>
        </div>
    </div>
  )
}
EmptyState.propTypes = {
    message:propTypes.string,
    buttonText:propTypes.string,
    onButtonClick:()=>propTypes.void
}

export default EmptyState;