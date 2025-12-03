'use client'
import { useEffect } from 'react'

type UseObserveTableLastItemType = {
	loadMore: () => void
	hasMore: boolean
	isLoadingMore: boolean
	loadMoreRef: React.RefObject<HTMLDivElement | null>
}

/**
 * A hook that observes the last item in a table and calls the loadMore function
 * when it comes into view. Useful for infinite scrolling.
 *
 * @param {Object} props
 * @prop {Function} loadMore - The function to call to load more data.
 * @prop {boolean} hasMore - Whether there is more data to load.
 * @prop {boolean} isLoadingMore - Whether the loadMore function is currently being called.
 * @prop {React.RefObject<HTMLDivElement | null>} loadMoreRef - A reference to the last item in the table.
 * @returns {void}
 */
export const useObserveTableLastItem = ({
	loadMore,
	hasMore,
	isLoadingMore,
	loadMoreRef,
}: UseObserveTableLastItemType) => {
	useEffect(() => {
		// Skip if no loadMore function or no more data to load
		if (!loadMore || !hasMore || isLoadingMore) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					// Debounce the loadMore call

					setTimeout(() => {
						loadMore()
					}, 100) // Adjust debounce delay as needed (100ms is usually sufficient)
				}
			},
			{ threshold: 0.1 }
		)

		const currentRef = loadMoreRef.current
		if (currentRef) {
			observer.observe(currentRef)
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef)
			}
		}
	}, [hasMore, isLoadingMore, loadMore])
}
