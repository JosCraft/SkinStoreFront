
import MainAdmLayout from '../../../templates/MainAdmLayout'
import { ChartGanancias, ChartVentas, CardDashboard, CardStat, CardGa  } from './components'

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

        <div  className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4' >
          {/*Plot de ventas */}
          <ChartVentas />
          {/*Plot de ganancias */}
          <ChartGanancias />
        </div>
       
        {/*Card de material mas vendido */}
        <CardStat />
        {/*Card de material con mas ganancias */}
        <CardGa />

      </div>
    </MainAdmLayout>
  )
}

export default Dashboard;
