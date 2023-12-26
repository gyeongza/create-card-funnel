import { useInfiniteQuery } from '@tanstack/react-query';
import ListRow from '../common/ListRow';
import { getCards } from '@/remote/card';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback } from 'react';
import Bedge from '../common/Bedge';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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
          scrollThreshold="100px"
        >
          <ul>
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
                  right={
                    card.payback != null ? <Bedge label={card.payback} /> : null
                  }
                  withArrow={true}
                  onClick={() => {
                    navigate(`/card/${card.id}`);
                  }}
                />
              );
            })}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default CardList;
