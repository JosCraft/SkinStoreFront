import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";
import { Button } from "../ui/button";
import { HiMiniPlusCircle } from "react-icons/hi2";

import { useState } from "react";

import { DataForm } from "./Form";

const FormMaterial = () => {
    const [isVisible, setIsVisible] = useState(false);
  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogTrigger asChild>
        <Button className="bg-amber-500 text-white font-semibold hover:bg-amber-600 rounded-md px-4 py-2 transition-colors duration-200">
            <HiMiniPlusCircle size={35} />
            Agregar Material
        </Button>
        </DialogTrigger>

        <DialogContent 
        aria-describedby="dialog-description" 
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
        >
        <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-800">
            Seleccione los materiales que llevará
            </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild >
             <DataForm/>
        </DialogDescription>
        </DialogContent>
    </Dialog>
  )
}

export default FormMaterial
