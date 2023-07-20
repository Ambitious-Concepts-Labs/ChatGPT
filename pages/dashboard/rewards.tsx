import Layout from '../../components/Layout'
import Rewards from '../../components/Rewards';
import { DataProvider } from '../../utils/DataContext'

const index = () => {
  return (
    <DataProvider>
      <Layout> 
        <Rewards />
      </Layout>
    </DataProvider>
  )
}

export default index;
