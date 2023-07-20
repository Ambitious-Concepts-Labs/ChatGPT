import Layout from '../../components/Layout'
import Usage from '../../components/Usage'
import { DataProvider } from '../../utils/DataContext'

const index = () => {
  return (
    <DataProvider>
      <Layout> 
        <Usage />
      </Layout>
    </DataProvider>
  )
}

export default index;