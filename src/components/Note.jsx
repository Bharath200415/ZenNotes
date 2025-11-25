import {Button} from "@/components/ui/button";
import Notesidebar from "./Notesidebar";
import Header from "./Header";
import { useState } from "react";
import { NotePropType } from "../lib/type";


export default function Home(){
    const [notes,setNotes] = useState([]);
    const [activeNote,setActiveNote] = useState(null);
    console.log(activeNote);
    const createNewNote=()=>{
        const newNote={
            id:Date.now().toString(),
            title:"New Note",
            content: "lorem ipsum bhhahs bhahdssjc bhdcssc sjcs ",
            createdAt:Date.now(),
        }; 
        console.log(newNote)
        setNotes((prev)=>[...prev,newNote]);

    }
    const selectNote=(note)=>{
        setActiveNote(note);
        
    }
    const renderNoteContent = ()=>{
        return null;
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Header onNewNote={createNewNote} />
            <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1"><Notesidebar notes={notes} onSelectNote={selectNote}/></div>
                <div className="md:col-span-2">{renderNoteContent}</div>

            </main>

        </div>
    )
}