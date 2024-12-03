
import MainAdmLayout from '../../../templates/MainAdmLayout'
import { ChartGanancias, ChartVentas, CardDashboard  } from './components'

export const Dashboard = () => {
  return (
    <MainAdmLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Dashboard</h1>
        {/*Card the Cantidad de usuarios */}
        <CardDashboard />
        {/*Card de cantidad de materiales en inventario */}
        {/*Card de Ganancias */}
        {/*Card de Ventas */}

        {/*Plot de ventas */}
        <ChartVentas />
        {/*Plot de ganancias */}
        <ChartGanancias />
        {/*Card de material mas vendido */}
        {/*Card de material menos vendido */}
        {/*Card de material con mas ganancias */}
        {/*Card de material con menos ganancias*/}


      </div>
    </MainAdmLayout>
  )
}

export default Dashboard;