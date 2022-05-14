import classNames from 'classnames'
import Skeleton, {
  SkeletonProps as ISkeletonProps,
} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const SkeletonLoader = ({ className, ...rest }: ISkeletonProps) => {
  return (
    <Skeleton
      {...rest}
      baseColor="#1f2125"
      highlightColor="#292a2e"
      className={classNames('rounded-lg', className)}
    />
  )
}
