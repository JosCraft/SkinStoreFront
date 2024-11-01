import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Curtiembre } from "../interface/interface";
import { apiService } from "../../services/apiServices";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../ui/select";

export function CurtiembreF() {

  useEffect(() => {
    apiService.get(`/curtiembre`)
    .then((data: Curtiembre[]) => {
        console.log(data);
    })
    .catch(error => {
        console.log(error)
    })
  },[]);

 

    return (
      <div className="flex flex-col gap-1">
          <p>Try to use select</p>
          <Select>
            <SelectTrigger className="w-[180px]" >
              <SelectValue placeholder="Materiales" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Cuero</SelectItem>
            </SelectContent>
          </Select>
          <p>Finish Try to use</p>
      </div>
  );
}

export default CurtiembreF
