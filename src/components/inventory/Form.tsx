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
      <SelectCurtiembre />
      <SelectCategoria  />
      <SelectTipo />
    </div>
  );
};

export default DataForm;
