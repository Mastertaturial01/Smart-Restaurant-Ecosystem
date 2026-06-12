const Skeleton = ({ className, variant = 'default', width, height }) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded'
  
  const variantClasses = {
    default: 'rounded-md',
    circle: 'rounded-full',
    text: 'h-4 w-full',
    card: 'h-24 w-full',
    avatar: 'h-10 w-10',
    button: 'h-10 w-20',
  }

  const style = {
    width: width || undefined,
    height: height || undefined,
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
      style={style}
    />
  )
}

const SkeletonCard = () => {
  return (
    <div className="glass-card p-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton variant="text" className="w-1/2 mb-2" />
          <Skeleton variant="text" className="w-1/3" />
        </div>
        <Skeleton variant="circle" className="h-8 w-8" />
      </div>
      <Skeleton variant="card" className="h-16" />
    </div>
  )
}

const SkeletonKPICard = () => {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="h-8 w-8" />
          <div>
            <Skeleton variant="text" className="w-16 mb-1" />
            <Skeleton variant="text" className="w-24" />
          </div>
        </div>
        <Skeleton variant="button" className="h-6 w-12" />
      </div>
    </div>
  )
}

const SkeletonTable = ({ rows = 5 }) => {
  return (
    <div className="glass-card p-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton variant="text" className="w-1/4" />
          <Skeleton variant="text" className="w-1/4" />
          <Skeleton variant="text" className="w-1/4" />
          <Skeleton variant="text" className="w-1/4" />
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton variant="text" className="w-1/4" />
            <Skeleton variant="text" className="w-1/4" />
            <Skeleton variant="text" className="w-1/4" />
            <Skeleton variant="text" className="w-1/4" />
          </div>
        ))}
      </div>
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonKPICard, SkeletonTable }
