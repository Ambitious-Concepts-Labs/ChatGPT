
const VehiclesTabContent = (props: any) => {
    const {index, children} = props
  return (
    <div className="TabContent">
     { children }
    </div>
    )
}

export default VehiclesTabContent