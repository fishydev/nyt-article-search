import "./CardSkeleton.sass"

export const CardSkeleton = () => {
  return (
    <div className="Skeleton__Card">
      <div className="Skeleton__Image loading"></div>
      <div className="Skeleton__Content">
        <div className="loading" />
        <div className="loading" />
      </div>
    </div>
  )
}
