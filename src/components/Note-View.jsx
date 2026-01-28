import {Card,CardContent,CardHeader,CardTitle,CardFooter} from "./ui/card"
import { NotePropType } from "../lib/type";
import { formatDate } from "../lib/storage";
import propTypes from "prop-types";
import { Button } from "./ui/button";
import { IconEdit } from "@tabler/icons-react";
import { ScrollArea } from "./ui/scroll-area"
export default function NoteView({note,onEdit}){
    return (<Card >
        <CardHeader onClick={onEdit}>
            <CardTitle className="border-b [.border-b]:pb-1 dark:border-neutral-800 border-neutral-100">{note.title}</CardTitle>
            
            <p className="text-sm text-muted-foreground ">
                {formatDate(note.createdAt)}
            </p>
            
        </CardHeader>
        <CardContent onClick={onEdit}>
            <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="whitespace-pre-wrap">{note.content}</div>
            </ScrollArea>
            
        </CardContent>
        <CardFooter className="flex justify-end" >
            <Button onClick={onEdit}><IconEdit/> Edit Note</Button>
        </CardFooter>
        </Card>)
}

NoteView.propTypes = {
  note: NotePropType,
  onEdit:propTypes.func.isRequired,
};


