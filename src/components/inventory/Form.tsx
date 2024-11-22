
import { SelectCurtiembre } from "./SelectCurtiembre";
import { SelectCategoria } from "./SelectCategoria";
import { SelectTipo } from "./SelectTipo";
import { SelectColor } from "./SelectColor";
import { TableItems } from "./tableItems";


export const DataForm = () => {



  return (
    <div>
      <SelectCurtiembre />
      <SelectCategoria  />
      <SelectColor />
      <SelectTipo />
      <TableItems />
    </div>
  );
};

export default DataForm;
