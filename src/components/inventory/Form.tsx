import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SelectCurtiembre } from "./SelectCurtiembre";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const DataForm = () => {

  const [idCurtiembre, setIdCurtiembre] = useState(0);


  const handleCurtiembre = (id: number) => {
    setIdCurtiembre(id);
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Label>Username</Label>
        <Input {...form.register("username")} />
        <SelectCurtiembre handleCurtiembre={handleCurtiembre} />
        
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default DataForm;
