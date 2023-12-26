import { useInfiniteQuery } from '@tanstack/react-query';
import ListRow from '../common/ListRow';
import { getCards } from '@/remote/card';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback } from 'react';

function CardList() {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam }) => getCards(pageParam),
    initialPageParam: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNextPageParam: (snapShot: any) => {
      return snapShot.lastVisible;
    },

    select: ({ pages }) => pages.flatMap((page) => page.items),
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  if (data === null) {
    return null;
  }

  return (
    <div>
      {data && (
        <InfiniteScroll
          dataLength={data.length}
          hasMore={hasNextPage}
          loader={<></>}
          next={loadMore}
        >
          {data?.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={card.payback !== null ? <div>{card.payback}</div> : null}
                withArrow={true}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default CardList;
