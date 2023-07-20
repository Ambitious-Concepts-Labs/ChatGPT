import Account from '../../components/Account'
import Layout from '../../components/Layout'
import { DataProvider } from '../../utils/DataContext'

const index = () => {
  return (
    <DataProvider>
          <Layout> 
              <Account/>
          </Layout>
      </DataProvider>
  )
}

export default index;