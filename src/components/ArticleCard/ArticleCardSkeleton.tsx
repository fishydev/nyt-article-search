import "./ArticleCardSkeleton.sass"

export const CardSkeleton = () => {
  return (
    <div className="Skeleton__Card" data-testid="article-skeleton">
      <div className="Skeleton__Image loading"></div>
      <div className="Skeleton__Content">
        <div className="loading" />
        <div className="loading" />
      </div>
    </div>
  )
}
