import { useState, useEffect, useRef } from "react"
import { NotePropType } from "../lib/type"
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from "./ui/card"
import {Input} from "./ui/input"
import {Textarea} from "./ui/textarea"
import { ScrollArea } from "./ui/scroll-area"
import { formatDate } from "../lib/storage"
import propTypes from "prop-types"
import { Button } from "./ui/button"

export default function NoteEditor({note,onCancel,onSave}){
    const [title,setTitle] = useState(note.title);
    const [content,setContent] = useState(note.content);
    const isFirstRender = useRef(true);
    const editorRef = useRef(null);

    // Auto-save with debounce
    useEffect(() => {
        // Skip auto-save on initial render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            onSave({
                ...note,
                title: title.trim() || "Untitled Note",
                content,
            });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [title, content, note, onSave]);

    // Handle click outside to exit edit mode
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editorRef.current && !editorRef.current.contains(event.target)) {
                onCancel();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onCancel]);

    return (
        <Card ref={editorRef}>
            <CardHeader>
                <Input 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Note title"
                    className="font-semibold border-none px-0 text-2xl focus-visible:ring-0"
                />
                <p className="text-sm text-muted-foreground">
                    {formatDate(note.createdAt)}
                </p>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)]">
                    <Textarea 
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        placeholder="Write your note here..."
                        className="min-h-[calc(100vh-320px)] resize-none border-none focus-visible:ring-0 p-0"
                    />
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={onCancel}>Done</Button>
            </CardFooter>
        </Card>
    )

}
NoteEditor.propTypes = {
    note:NotePropType,
    onCancel:propTypes.func.isRequired,
    onSave:propTypes.func.isRequired,
}