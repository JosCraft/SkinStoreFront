import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SelectCurtiembre } from "./SelectCurtiembre";
import { SelectCategoria } from "./SelectCategoria";
import { SelectTipo } from "./SelectTipo";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const DataForm = () => {

  const [idCurtiembre, setIdCurtiembre] = useState(0);
  const [idCategoria, setIdCategoria] = useState(0);
  const [idTipo, setIdTipo] = useState(0);

  const handleCurtiembre = (id: number) => {
    setIdCurtiembre(id);
  }

  const handleCategoria = (id: number) => {
    setIdCategoria(id);
  }

  const handleTipo = (id: number) => {
    setIdTipo(id);
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        idTipo: 0,
        medida: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <SelectCurtiembre onValueChangeCurtiembre={handleCurtiembre} />
      <SelectCategoria onValueChange={handleCategoria} />
      <SelectTipo onValueChange={handleTipo}  idCategoria={idCategoria} idCurtiembre={idCurtiembre}  />
    </div>
  );
};

export default DataForm;
